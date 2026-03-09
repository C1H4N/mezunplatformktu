"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cities } from "../lib/constants";
import { MapPin, Users } from "lucide-react";

interface CityStats {
  total: number;
  employed: number;
  unemployed: number;
  student: number;
  selfEmployed: number;
  unknown: number;
}

interface HomeAlumniMapProps {
  alumniCounts: Record<string, number>;
  abroadCount?: number;
  cityData?: Record<string, CityStats>;
}

function normalizeCityName(name: string): string {
  let cleaned = name
    .replace(/\s*\(.*?\)/g, "")
    .replace(/[0-9]/g, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const lowerCleaned = cleaned.toLocaleLowerCase("tr");

  if (lowerCleaned === "hakkari") return "Hakkâri";
  if (lowerCleaned === "k.maraş" || lowerCleaned === "kahramanmaras")
    return "Kahramanmaraş";
  if (lowerCleaned === "afyon") return "Afyonkarahisar";

  const matchedCity = cities.find(
    (c) => c.toLocaleLowerCase("tr") === lowerCleaned,
  );
  if (matchedCity) return matchedCity;

  return cleaned
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase("tr") +
        word.slice(1).toLocaleLowerCase("tr"),
    )
    .join(" ");
}

export default function HomeAlumniMap({
  alumniCounts,
  abroadCount = 0,
  cityData = {},
}: HomeAlumniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const router = useRouter();

  const totalAlumni =
    Object.values(alumniCounts).reduce((a, b) => a + b, 0) + abroadCount;
  const totalCities =
    Object.keys(alumniCounts).length + (abroadCount > 0 ? 1 : 0);

  // Heatmap renk skalası
  const getColor = (count: number) => {
    if (count === 0) return "#f1f5f9"; // slate-100
    if (count < 3) return "#dbeafe"; // blue-100
    if (count < 5) return "#bfdbfe"; // blue-200
    if (count < 10) return "#93c5fd"; // blue-300
    if (count < 20) return "#60a5fa"; // blue-400
    if (count < 50) return "#3b82f6"; // blue-500
    if (count < 100) return "#2563eb"; // blue-600
    return "#1d4ed8"; // blue-700
  };

  const getTextColor = (count: number) => {
    if (count >= 20) return "#ffffff";
    return "#1e293b";
  };

  // SVG yükleme
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
        if (
          bbox &&
          isFinite(bbox.width) &&
          isFinite(bbox.height) &&
          bbox.width > 0 &&
          bbox.height > 0
        ) {
          svgEl.setAttribute(
            "viewBox",
            `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`,
          );
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
      } catch (_) {}

      // Bölge stillerini uygula
      const regionGroups =
        containerRef.current.querySelectorAll<SVGGElement>("g[data-bolge]");
      regionGroups.forEach((rg) => {
        const shapes = rg.querySelectorAll<SVGElement>(
          "path, polygon, rect, circle, polyline",
        );
        shapes.forEach((sh) => {
          sh.setAttribute("stroke", "#e2e8f0");
          sh.setAttribute("stroke-width", "0.8");
          sh.setAttribute("vector-effect", "non-scaling-stroke");
        });
      });

      if (isMounted) setSvgLoaded(true);
    }

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, []);

  // Renklendirme & etkileşim
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;

    const provinceGroups =
      containerRef.current.querySelectorAll<SVGGElement>("g[data-iladi]");
    const abortController = new AbortController();
    const { signal } = abortController;

    provinceGroups.forEach((g) => {
      const cityAttr =
        g.getAttribute("data-iladi") || g.getAttribute("data-province") || "";
      const city = normalizeCityName(cityAttr);
      const count = alumniCounts[city] || 0;
      const baseColor = getColor(count);

      const shapes = g.querySelectorAll<SVGElement>(
        "path, polygon, rect, circle, polyline",
      );

      shapes.forEach((sh) => {
        sh.setAttribute("fill", baseColor);
        sh.style.fill = baseColor;
        sh.setAttribute("stroke", "#cbd5e1");
        sh.setAttribute("stroke-width", "0.8");
      });

      g.style.cursor = count > 0 ? "pointer" : "default";
      g.style.transition = "filter 200ms ease, transform 150ms ease";

      // Hover
      g.addEventListener(
        "mouseenter",
        () => {
          if (count > 0) {
            shapes.forEach((sh) => {
              sh.setAttribute("fill", "#2563eb");
              sh.style.fill = "#2563eb";
            });
            g.style.filter = "drop-shadow(0 2px 4px rgba(37, 99, 235, 0.3))";
          } else {
            shapes.forEach((sh) => {
              sh.setAttribute("fill", "#e2e8f0");
              sh.style.fill = "#e2e8f0";
            });
          }
          setHoveredCity(city);
        },
        { signal },
      );

      g.addEventListener(
        "mouseleave",
        () => {
          shapes.forEach((sh) => {
            sh.setAttribute("fill", baseColor);
            sh.style.fill = baseColor;
          });
          g.style.filter = "";
          setHoveredCity(null);
        },
        { signal },
      );

      // Tıklama -> Mezunlar sayfasına yönlendir
      g.addEventListener(
        "click",
        () => {
          if (count > 0) {
            router.push(`/mezunlar?city=${encodeURIComponent(city)}`);
          }
        },
        { signal },
      );
    });

    return () => {
      abortController.abort();
    };
  }, [svgLoaded, alumniCounts, router]);

  const hoveredCount = hoveredCity ? alumniCounts[hoveredCity] || 0 : 0;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mezunlarımız Türkiye&apos;nin Her Yerinde
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            İnteraktif harita üzerinden mezunlarımızın illere göre dağılımını
            keşfedin
          </p>
        </div>

        {/* İstatistik kartları */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalAlumni}</p>
              <p className="text-xs text-gray-500">Toplam Mezun</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(alumniCounts).length}
              </p>
              <p className="text-xs text-gray-500">Farklı İl</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-emerald-600 text-lg font-bold">🌍</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{abroadCount}</p>
              <p className="text-xs text-gray-500">Yurt Dışı</p>
            </div>
          </div>
        </div>

        {/* Harita ve bilgi kartı wrapper - sadece desktop */}
        <div className="hidden md:block relative">
          {/* Hover bilgi kartı — detaylı */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-all duration-200">
            {hoveredCity && alumniCounts[hoveredCity] ? (
              (() => {
                const d = cityData[hoveredCity] ?? {
                  total: alumniCounts[hoveredCity] ?? 0,
                  employed: 0,
                  unemployed: 0,
                  student: 0,
                  selfEmployed: 0,
                  unknown: 0,
                };
                const total = d.total || 1;
                return (
                  <div className="bg-white/97 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl px-5 py-3.5 min-w-[260px]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-base font-bold text-gray-900">
                        {hoveredCity}
                      </span>
                      <span className="ml-auto text-xs bg-blue-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                        {d.total} mezun
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {d.employed > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span className="text-xs text-gray-600 flex-1">
                            Çalışıyor
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {d.employed}
                          </span>
                          <span className="text-xs text-gray-400 w-10 text-right">
                            {Math.round((d.employed / total) * 100)}%
                          </span>
                        </div>
                      )}
                      {d.selfEmployed > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shrink-0"></span>
                          <span className="text-xs text-gray-600 flex-1">
                            Serbest Çalışan
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {d.selfEmployed}
                          </span>
                          <span className="text-xs text-gray-400 w-10 text-right">
                            {Math.round((d.selfEmployed / total) * 100)}%
                          </span>
                        </div>
                      )}
                      {d.unemployed > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0"></span>
                          <span className="text-xs text-gray-600 flex-1">
                            İşsiz / İş Arıyor
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {d.unemployed}
                          </span>
                          <span className="text-xs text-gray-400 w-10 text-right">
                            {Math.round((d.unemployed / total) * 100)}%
                          </span>
                        </div>
                      )}
                      {d.student > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                          <span className="text-xs text-gray-600 flex-1">
                            Öğrenime Devam
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {d.student}
                          </span>
                          <span className="text-xs text-gray-400 w-10 text-right">
                            {Math.round((d.student / total) * 100)}%
                          </span>
                        </div>
                      )}
                      {d.unknown > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0"></span>
                          <span className="text-xs text-gray-400 flex-1">
                            Belirtilmemiş
                          </span>
                          <span className="text-xs font-semibold text-gray-400">
                            {d.unknown}
                          </span>
                          <span className="text-xs text-gray-300 w-10 text-right">
                            {Math.round((d.unknown / total) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-200 shadow-lg">
                <span className="text-sm text-gray-500">
                  Bir il üzerine gelin
                </span>
              </div>
            )}
          </div>

          {/* SVG Harita + Yurt Dışı Kutusu */}
          <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="w-full h-[420px] flex items-center justify-center p-6">
              <div
                ref={containerRef}
                className="w-full h-full flex items-center justify-center"
                aria-label="Türkiye Mezun Dağılım Haritası"
              />
            </div>

            {/* Yurt Dışı Kutusu — haritanın sağ alt köşesine, her zaman görünsün */}
            <button
              onClick={() =>
                router.push("/mezunlar?city=Yurt+D%C4%B1%C5%9F%C4%B1")
              }
              className={`absolute bottom-5 right-5 flex items-center gap-2.5 bg-white border-2 rounded-xl px-4 py-2.5 shadow-md hover:shadow-lg transition-all group cursor-pointer ${
                abroadCount > 0
                  ? "border-emerald-300 hover:border-emerald-500"
                  : "border-gray-200 hover:border-gray-300 opacity-70"
              }`}
              title="Yurt dışındaki mezunları gör"
            >
              <span className="text-2xl">🌍</span>
              <div className="text-left">
                <p
                  className={`text-xs font-bold leading-none ${abroadCount > 0 ? "text-emerald-700" : "text-gray-500"}`}
                >
                  Yurt Dışı
                </p>
                <p
                  className={`text-lg font-extrabold leading-tight transition-colors ${abroadCount > 0 ? "text-gray-900 group-hover:text-emerald-600" : "text-gray-400"}`}
                >
                  {abroadCount}{" "}
                  <span className="text-xs font-semibold text-gray-500">
                    mezun
                  </span>
                </p>
              </div>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${abroadCount > 0 ? "bg-emerald-50 group-hover:bg-emerald-100" : "bg-gray-50"}`}
              >
                <MapPin
                  className={`w-4 h-4 ${abroadCount > 0 ? "text-emerald-500" : "text-gray-400"}`}
                />
              </div>
            </button>
          </div>

          {/* Lejant */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <span className="text-xs text-gray-400 mr-2">Az</span>
            {[0, 3, 5, 10, 20, 50, 100].map((threshold) => (
              <div
                key={threshold}
                className="w-6 h-3 rounded-sm"
                style={{
                  backgroundColor: getColor(threshold === 0 ? 0 : threshold),
                }}
                title={`${threshold}+ mezun`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-2">Çok</span>
          </div>

          {/* Mobilde bilgi notu */}
          <p className="text-center text-xs text-gray-400 mt-3">
            İle tıklayarak o ildeki mezunları görüntüleyebilirsiniz
          </p>
        </div>

        {/* Mobil görünüm - Top 10 şehir listesi */}
        <div className="md:hidden">
          <div className="bg-slate-50 rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              En Fazla Mezun Bulunan İller
            </h3>
            <div className="space-y-2.5">
              {Object.entries(alumniCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([city, count], index) => (
                  <button
                    key={city}
                    onClick={() =>
                      router.push(`/mezunlar?city=${encodeURIComponent(city)}`)
                    }
                    className="w-full flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all text-left group"
                  >
                    <span className="w-7 h-7 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold group-hover:bg-blue-100 transition-colors">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {city}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full">
                      {count} mezun
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
