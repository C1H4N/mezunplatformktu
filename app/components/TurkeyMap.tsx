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
  // Bölge sınırlarını belirginleştir (renkleri koru, çizgileri kalınlaştır)
  const regionGroups = root.querySelectorAll<SVGGElement>("g[data-bolge]");
  regionGroups.forEach((rg) => {
    const shapes = rg.querySelectorAll<SVGElement>(
      "path, polygon, rect, circle, polyline"
    );
    shapes.forEach((sh) => {
      // Bölge içi şekiller için stroke kalın ve tema uyumlu
      sh.setAttribute("stroke", "var(--border-dark)");
      sh.setAttribute("stroke-width", "1.25");
      sh.setAttribute("vector-effect", "non-scaling-stroke");
    });

    // Bölge dış hat konturu için: şekilleri klonla ve arkaya koy
    const regionOutlineLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    regionOutlineLayer.setAttribute("aria-hidden", "true");
    regionOutlineLayer.setAttribute("pointer-events", "none");
    // Kontur rengi ve görünümü: foreground'un yarı saydamı
    regionOutlineLayer.setAttribute(
      "style",
      "mix-blend-mode:multiply; opacity:0.6"
    );

    shapes.forEach((sh) => {
      const clone = sh.cloneNode(true) as SVGElement;
      clone.setAttribute("fill", "none");
      clone.setAttribute("stroke", "var(--foreground)");
      clone.setAttribute("stroke-width", "2");
      clone.setAttribute("vector-effect", "non-scaling-stroke");
      regionOutlineLayer.appendChild(clone);
    });

    // Bölge grubunun başına ekle (arkada dursun)
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

  // Heatmap renk skalası (Maviden Yeşile)
  const getColor = (count: number) => {
    if (count === 0) return "var(--card)"; // Veri yoksa kart rengi
    if (count < 5) return "#e3f2fd"; // Çok açık mavi
    if (count < 10) return "#90caf9"; // Açık mavi
    if (count < 20) return "#42a5f5"; // Mavi
    if (count < 50) return "#26a69a"; // Teal/Yeşilimsi
    if (count < 100) return "#66bb6a"; // Yeşil
    return "#2e7d32"; // Koyu Yeşil
  };

  useEffect(() => {
    let isMounted = true;

    async function loadSvg() {
      const res = await fetch("/api/turkey-map");
      if (!res.ok) return;
      const svgText = await res.text();
      if (!isMounted || !containerRef.current) return;
      containerRef.current.innerHTML = svgText;

      const root = containerRef.current.querySelector("#svg-turkiye-haritasi");
      if (!root) return;

      // Stil: tema renklerine uyumlu
      (root as SVGElement).style.width = "100%";
      (root as SVGElement).style.height = "100%";
      (root as SVGElement).style.display = "block";
      (root as SVGGraphicsElement).style.transformOrigin = "center";

      // SVG çevresindeki boş alanı kırpmak için viewBox'ı içerik bbox'una ayarla
      try {
        const svgEl = root as unknown as SVGSVGElement;
        const bbox = svgEl.getBBox();
        if (
          bbox &&
          isFinite(bbox.width) &&
          isFinite(bbox.height) &&
          bbox.width > 0 &&
          bbox.height > 0
        ) {
          svgEl.setAttribute(
            "viewBox",
            `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
          );
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
      } catch (_) {
        // getBBox desteklenmiyorsa default viewBox kullanılmaya devam eder
      }

      // Bölge bazlı renkler
      applyRegionStyles(containerRef.current);

      const provinceGroups =
        containerRef.current.querySelectorAll<SVGGElement>("g[data-iladi]");

      provinceGroups.forEach((g) => {
        const cityAttr =
          g.getAttribute("data-iladi") || g.getAttribute("data-province") || "";
        const city = normalizeCityName(cityAttr);

        // Heatmap renklendirmesi
        const count = alumniCounts[city] || 0;
        const baseColor = getColor(count);
        
        // Şekilleri renklendir
        const shapes = g.querySelectorAll<SVGElement>(
          "path, polygon, rect, circle, polyline"
        );
        shapes.forEach((sh) => {
          if (selectedCity && city === selectedCity) {
             sh.setAttribute("fill", "var(--color-gold, var(--primary))");
          } else {
             sh.setAttribute("fill", baseColor);
          }
        });

        // Hover ve seçili stilleri
        g.style.cursor = "pointer";
        g.style.transition = "transform 120ms ease, filter 120ms ease";
        
        g.addEventListener("mouseenter", () => {
          g.style.filter = "brightness(0.9)";
          setHoveredCity(city);
        });
        
        g.addEventListener("mouseleave", () => {
          g.style.filter = "";
          setHoveredCity(null);
        });
        
        g.addEventListener("mousedown", () => {
          g.style.transform = "scale(0.985)"; // basılma hissi
        });
        const clearPress = () => {
          g.style.transform = "";
        };
        g.addEventListener("mouseup", clearPress);
        g.addEventListener("mouseout", clearPress);

        // Erişilebilirlik: klavye ile seçim
        g.setAttribute("tabindex", "0");
        g.addEventListener("keydown", (ev: KeyboardEvent) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            onCitySelect(city);
          }
        });
        g.addEventListener("click", () => onCitySelect(city));

        // İlk render'da seçili şehri highlight et
        if (selectedCity && city === selectedCity) {
          g.style.filter =
            "drop-shadow(0 0 0.5rem var(--color-gold, var(--primary))) brightness(1.08)";
          shapes.forEach((sh) => {
            sh.setAttribute("stroke", "var(--color-gold, var(--primary))");
            sh.setAttribute("stroke-width", "1.25");
            sh.setAttribute("fill", "var(--primary)"); // Seçili ise primary renk
            if (sh.tagName === 'path') {
               sh.style.fill = "var(--primary)";
            }
          });
        }
      });
    }

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, [selectedCity, onCitySelect, alumniCounts]);

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
