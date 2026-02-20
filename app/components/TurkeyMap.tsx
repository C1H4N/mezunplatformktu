"use client";

import { useState, useEffect, useRef } from "react";

interface TurkeyMapProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
  alumniCounts?: Record<string, number>;
}

// Şehir isimlerini normalize ederek filtre dropdown ile eşleşmeyi kolaylaştırır
function normalizeCityName(name: string): string {
  return name
    .replace(/\s+\(.*?\)/g, "") // parantez içini kaldır (İstanbul (Avrupa))
    .replace(/-\s*\d+.*/, "") // sonundaki sayısal ekleri kaldır (Trabzon - 100)
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRegion(name: string): string {
  const map: Record<string, string> = {
    i: "i",
    ı: "i",
    İ: "i",
    I: "i",
    ş: "s",
    Ş: "s",
    ç: "c",
    Ç: "c",
    ö: "o",
    Ö: "o",
    ü: "u",
    Ü: "u",
    ğ: "g",
    Ğ: "g",
  };
  return name
    .split("")
    .map((ch) => map[ch as keyof typeof map] || ch)
    .join("")
    .toLowerCase()
    .trim();
}

function applyRegionStyles(root: HTMLElement) {
  const regionGroups = root.querySelectorAll<SVGGElement>("g[data-bolge]");
  regionGroups.forEach((rg) => {
    const shapes = rg.querySelectorAll<SVGElement>(
      "path, polygon, rect, circle, polyline"
    );
    shapes.forEach((sh) => {
      // Bölge içi şekiller için ince ve zarif bir kurumsal sınır
      sh.setAttribute("stroke", "var(--border)");
      sh.setAttribute("stroke-width", "1.25");
      sh.setAttribute("vector-effect", "non-scaling-stroke");
    });

    // Bölge dış hat konturu (Sadece arka plan derinliği için)
    const regionOutlineLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    regionOutlineLayer.setAttribute("aria-hidden", "true");
    regionOutlineLayer.setAttribute("pointer-events", "none");
    regionOutlineLayer.setAttribute("style", "opacity: 0.15");

    shapes.forEach((sh) => {
      const clone = sh.cloneNode(true) as SVGElement;
      clone.setAttribute("fill", "none");
      clone.setAttribute("stroke", "var(--foreground)");
      clone.setAttribute("stroke-width", "3");
      clone.setAttribute("vector-effect", "non-scaling-stroke");
      regionOutlineLayer.appendChild(clone);
    });

    // Arkada dursun diye insertBefore
    rg.insertBefore(regionOutlineLayer, rg.firstChild);
  });

  // Bölge dış sınırı için ek bir stil ver (eğer ayrı path varsa)
  const outerPaths = root.querySelectorAll<SVGPathElement>(
    "path[id*='dis-sinir'], path[id*='outer']"
  );
  outerPaths.forEach((p) => {
    p.setAttribute("stroke", "var(--foreground)");
    p.setAttribute("stroke-width", "1.5");
    p.setAttribute("fill", p.getAttribute("fill") || "transparent");
  });
}

export default function TurkeyMap({
  selectedCity,
  onCitySelect,
  alumniCounts = {},
}: TurkeyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);

  // Heatmap renk skalası (Premium Mavi & Slate tonları)
  const getColor = (count: number) => {
    if (count === 0) return "var(--card)"; // Veri yoksa saf arka plan rengi
    if (count < 5) return "var(--primary-light)";
    if (count < 10) return "#94a3b8"; // Slate-400
    if (count < 20) return "#64748b"; // Slate-500
    if (count < 50) return "#475569"; // Slate-600
    if (count < 100) return "var(--primary-hover)"; // Koyu Mavi
    return "var(--primary)"; // Ana Kurumsal Mavi
  };

  // 1. AŞAMA: SVG'yi SADECE İLK RENDERDA BİR KERE YÜKLE
  useEffect(() => {
    let isMounted = true;

    async function loadSvg() {
      if (containerRef.current?.querySelector("#svg-turkiye-haritasi")) {
        if (!svgLoaded && isMounted) setSvgLoaded(true);
        return;
      }

      const res = await fetch("/api/turkey-map");
      if (!res.ok) return;
      const svgText = await res.text();
      if (!isMounted || !containerRef.current) return;
      containerRef.current.innerHTML = svgText;

      const root = containerRef.current.querySelector("#svg-turkiye-haritasi");
      if (!root) return;

      (root as SVGElement).style.width = "100%";
      (root as SVGElement).style.height = "100%";
      (root as SVGElement).style.display = "block";
      (root as SVGGraphicsElement).style.transformOrigin = "center";

      try {
        const svgEl = root as unknown as SVGSVGElement;
        const bbox = svgEl.getBBox();
        if (bbox && isFinite(bbox.width) && isFinite(bbox.height) && bbox.width > 0 && bbox.height > 0) {
          svgEl.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
      } catch (_) { }

      applyRegionStyles(containerRef.current);

      // Montaj bitti
      if (isMounted) setSvgLoaded(true);
    }

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, []); // Asla selectedCity veya alumniCounts'a depend etme!

  // 2. AŞAMA: EKRANDAKİ SVG ÜZERİNDE RENKLENDİRME VE ETKİLEŞİM UYGULAMA
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;

    const root = containerRef.current.querySelector("#svg-turkiye-haritasi");
    if (!root) return;

    const provinceGroups = containerRef.current.querySelectorAll<SVGGElement>("g[data-iladi]");

    // Olası event karmaşasını engellemek için sinyalleyici
    const abortController = new AbortController();
    const { signal } = abortController;

    provinceGroups.forEach((g) => {
      const cityAttr = g.getAttribute("data-iladi") || g.getAttribute("data-province") || "";
      const city = normalizeCityName(cityAttr);

      const count = alumniCounts[city] || 0;
      const baseColor = getColor(count);
      const isSelected = selectedCity && city === selectedCity;

      const shapes = g.querySelectorAll<SVGElement>("path, polygon, rect, circle, polyline");

      // Temel ve Seçili Stil
      shapes.forEach((sh) => {
        sh.setAttribute("stroke", isSelected ? "var(--primary)" : "var(--border)");
        sh.setAttribute("stroke-width", isSelected ? "2" : "1.25");

        if (isSelected) {
          sh.setAttribute("fill", "var(--primary)");
          sh.style.fill = "var(--primary)";
        } else {
          sh.setAttribute("fill", baseColor);
          sh.style.fill = baseColor;
        }
      });

      if (isSelected) {
        g.style.filter = "drop-shadow(0 4px 6px rgba(18, 91, 150, 0.4))"; // Seçili şehre zengin kurumsal mavi highlight
      } else {
        g.style.filter = "";
      }

      g.style.cursor = "pointer";
      g.style.transition = "transform 150ms cubic-bezier(0.16, 1, 0.3, 1)";

      // Hover Olayları
      g.addEventListener("mouseenter", () => {
        if (!isSelected) {
          shapes.forEach(sh => {
            sh.setAttribute("fill", "var(--primary-light)");
            sh.style.fill = "var(--primary-light)";
          });
        }
        setHoveredCity(city);
      }, { signal });

      g.addEventListener("mouseleave", () => {
        if (!isSelected) {
          shapes.forEach(sh => {
            sh.setAttribute("fill", baseColor);
            sh.style.fill = baseColor;
          });
        }
        setHoveredCity(null);
      }, { signal });

      // Basılma Olayları
      g.addEventListener("mousedown", () => {
        g.style.transform = "scale(0.985)";
      }, { signal });

      const clearPress = () => {
        g.style.transform = "";
      };

      g.addEventListener("mouseup", clearPress, { signal });
      g.addEventListener("mouseout", clearPress, { signal });

      // Seçim Olayları ve Erişilebilirlik
      g.setAttribute("tabindex", "0");
      g.style.outline = "none"; // Tarayıcının kare şeklindeki siyah focus outline'ını gizle
      g.addEventListener("keydown", (ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          onCitySelect(city);
        }
      }, { signal });

      g.addEventListener("click", () => onCitySelect(city), { signal });
    });

    return () => {
      abortController.abort(); // effect yeniden renderlandığında eski event'leri kaldır
    };
  }, [svgLoaded, selectedCity, onCitySelect, alumniCounts]);

  return (
    //* Sadece Desktop'ta map gösterimi
    <div className="hidden md:block bg-card border border-border rounded-xl shadow-sm p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2 sm:px-3 mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            Türkiye Haritası
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {selectedCity && selectedCity !== "Tümü" ? (
            <span className="text-xs sm:text-sm text-muted">
              Seçili: {selectedCity}
            </span>
          ) : (
            <span className="text-xs sm:text-sm text-muted">Şehir seçin</span>
          )}
          <button
            type="button"
            onClick={() => onCitySelect("Tümü")}
            className="text-xs sm:text-sm px-2 py-1 rounded-md bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Filtreyi Temizle"
          >
            Temizle
          </button>
        </div>
      </div>
      <div className="w-full h-[500px] overflow-hidden relative bg-muted-bg/30 rounded-lg border border-border/50 flex items-center justify-center p-4">
        {/* Fixed City Label */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm pointer-events-none transition-all duration-200">
          <span className="text-lg font-semibold text-foreground">
            {hoveredCity || selectedCity !== "Tümü" ? (hoveredCity || selectedCity) : "Şehir Seçin"}
          </span>
        </div>

        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
          aria-label="Türkiye Haritası"
        />
      </div>
      <div className="mt-0 text-xs text-muted px-2 sm:px-3">
        Şehre tıklayarak filtreleyin. Temizle ile sıfırlayabilirsiniz.
      </div>
    </div>
  );
}
