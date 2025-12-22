(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/SearchFilters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// Örnek veri - Gerçek uygulamada API'den gelecek
const cities = [
    "Tümü",
    "İstanbul",
    "Ankara",
    "İzmir",
    "Trabzon",
    "Bursa",
    "Antalya",
    "Adana",
    "Gaziantep",
    "Konya",
    "Kayseri"
];
const departments = [
    "Tümü",
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "Makine Mühendisliği",
    "İnşaat Mühendisliği",
    "Endüstri Mühendisliği",
    "İşletme",
    "İktisat",
    "Hukuk",
    "Tıp",
    "Mimarlık"
];
const jobFields = [
    "Tümü",
    "Yazılım Geliştirme",
    "Veri Bilimi",
    "Proje Yönetimi",
    "Finansal Analiz",
    "İnsan Kaynakları",
    "Pazarlama",
    "Satış",
    "Eğitim",
    "Sağlık",
    "Hukuk",
    "Mühendislik",
    "Danışmanlık"
];
function SearchFilters(param) {
    let { onFilterChange } = param;
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        search: "",
        city: "Tümü",
        department: "Tümü",
        jobField: "Tümü"
    });
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFilterUpdate = (key, value)=>{
        const newFilters = {
            ...filters,
            [key]: value
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };
    const clearFilters = ()=>{
        const resetFilters = {
            search: "",
            city: "Tümü",
            department: "Tümü",
            jobField: "Tümü"
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };
    const activeFilterCount = [
        filters.city !== "Tümü",
        filters.department !== "Tümü",
        filters.jobField !== "Tümü"
    ].filter(Boolean).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "h-5 w-5 text-muted",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/SearchFilters.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "İsim, şirket veya pozisyon ara...",
                        value: filters.search,
                        onChange: (e)=>handleFilterUpdate("search", e.target.value),
                        className: "w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SearchFilters.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setShowFilters(!showFilters),
                        className: "flex items-center gap-2 text-foreground font-medium lg:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SearchFilters.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            "Filtreler",
                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full",
                                children: activeFilterCount
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 transition-transform ".concat(showFilters ? "rotate-180" : ""),
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/SearchFilters.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: clearFilters,
                        className: "text-sm text-primary hover:text-primary-hover font-medium",
                        children: "Filtreleri Temizle"
                    }, void 0, false, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SearchFilters.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-4 ".concat(showFilters ? "block" : "hidden lg:grid"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "city",
                                className: "block text-sm font-medium text-foreground mb-2",
                                children: "Şehir"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "city",
                                value: filters.city,
                                onChange: (e)=>handleFilterUpdate("city", e.target.value),
                                className: "w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer",
                                children: cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: city,
                                        children: city
                                    }, city, false, {
                                        fileName: "[project]/app/components/SearchFilters.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "department",
                                className: "block text-sm font-medium text-foreground mb-2",
                                children: "Bölüm"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "department",
                                value: filters.department,
                                onChange: (e)=>handleFilterUpdate("department", e.target.value),
                                className: "w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer",
                                children: departments.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: dept,
                                        children: dept
                                    }, dept, false, {
                                        fileName: "[project]/app/components/SearchFilters.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "jobField",
                                className: "block text-sm font-medium text-foreground mb-2",
                                children: "İş Alanı"
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "jobField",
                                value: filters.jobField,
                                onChange: (e)=>handleFilterUpdate("jobField", e.target.value),
                                className: "w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer",
                                children: jobFields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: field,
                                        children: field
                                    }, field, false, {
                                        fileName: "[project]/app/components/SearchFilters.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/SearchFilters.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/SearchFilters.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/SearchFilters.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SearchFilters.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(SearchFilters, "qBheVo6p2v+nGORisSNjqJS7ZZY=");
_c = SearchFilters;
var _c;
__turbopack_context__.k.register(_c, "SearchFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/AlumniCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlumniCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function AlumniCard(param) {
    let { id, name, department, city, jobTitle, company, graduationYear, linkedinUrl, profileImage } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:border-primary group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-primary-light flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-primary transition-colors",
                                    children: profileImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: profileImage,
                                        alt: name,
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AlumniCard.tsx",
                                        lineNumber: 34,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-primary",
                                        children: name.split(" ").map((n)=>n[0]).join("").toUpperCase().slice(0, 2)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AlumniCard.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                linkedinUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-1 -right-1 w-6 h-6 bg-[#0077B5] rounded-full flex items-center justify-center border-2 border-card",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-3 h-3 text-white",
                                        fill: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AlumniCard.tsx",
                                            lineNumber: 44,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AlumniCard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors",
                                    children: name
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted mb-1 truncate",
                                    children: department
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                graduationYear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted",
                                    children: [
                                        "Mezuniyet: ",
                                        graduationYear
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AlumniCard.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 space-y-2 mb-4",
                    children: [
                        jobTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-muted mt-0.5 flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AlumniCard.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-foreground truncate",
                                            children: jobTitle
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AlumniCard.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        company && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted truncate",
                                            children: company
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AlumniCard.tsx",
                                            lineNumber: 80,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-4 h-4 text-muted flex-shrink-0",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AlumniCard.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/AlumniCard.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted truncate",
                                    children: city
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AlumniCard.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 pt-4 border-t border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/mezunlar/".concat(id),
                            className: "flex-1 px-4 py-2 text-sm font-medium text-primary bg-primary-light hover:bg-primary hover:text-white rounded-lg transition-colors text-center",
                            children: "Profili Görüntüle"
                        }, void 0, false, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        linkedinUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: linkedinUrl,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "px-4 py-2 text-sm font-medium text-muted hover:text-primary bg-muted-bg hover:bg-primary-light rounded-lg transition-colors",
                            "aria-label": "LinkedIn",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/AlumniCard.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/AlumniCard.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/AlumniCard.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/AlumniCard.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/AlumniCard.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/AlumniCard.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = AlumniCard;
var _c;
__turbopack_context__.k.register(_c, "AlumniCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/TurkeyMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TurkeyMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// Şehir isimlerini normalize ederek filtre dropdown ile eşleşmeyi kolaylaştırır
function normalizeCityName(name) {
    return name.replace(/\s+\(.*?\)/g, "") // parantez içini kaldır (İstanbul (Avrupa))
    .replace(/-\s*\d+.*/, "") // sonundaki sayısal ekleri kaldır (Trabzon - 100)
    .replace(/\s+/g, " ").trim();
}
function normalizeRegion(name) {
    const map = {
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
        Ğ: "g"
    };
    return name.split("").map((ch)=>map[ch] || ch).join("").toLowerCase().trim();
}
function applyRegionStyles(root) {
    // Bölge sınırlarını belirginleştir (renkleri koru, çizgileri kalınlaştır)
    const regionGroups = root.querySelectorAll("g[data-bolge]");
    regionGroups.forEach((rg)=>{
        const shapes = rg.querySelectorAll("path, polygon, rect, circle, polyline");
        shapes.forEach((sh)=>{
            // Bölge içi şekiller için stroke kalın ve tema uyumlu
            sh.setAttribute("stroke", "var(--border-dark)");
            sh.setAttribute("stroke-width", "1.25");
            sh.setAttribute("vector-effect", "non-scaling-stroke");
        });
        // Bölge dış hat konturu için: şekilleri klonla ve arkaya koy
        const regionOutlineLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        regionOutlineLayer.setAttribute("aria-hidden", "true");
        regionOutlineLayer.setAttribute("pointer-events", "none");
        // Kontur rengi ve görünümü: foreground'un yarı saydamı
        regionOutlineLayer.setAttribute("style", "mix-blend-mode:multiply; opacity:0.6");
        shapes.forEach((sh)=>{
            const clone = sh.cloneNode(true);
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
    const outerPaths = root.querySelectorAll("path[id*='dis-sinir'], path[id*='outer']");
    outerPaths.forEach((p)=>{
        p.setAttribute("stroke", "var(--foreground)");
        p.setAttribute("stroke-width", "1.5");
        p.setAttribute("fill", p.getAttribute("fill") || "transparent");
    });
}
function TurkeyMap(param) {
    let { selectedCity, onCitySelect } = param;
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TurkeyMap.useEffect": ()=>{
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
                root.style.maxWidth = "100%";
                root.style.height = "auto";
                root.style.display = "block";
                root.style.transformOrigin = "center";
                // SVG çevresindeki boş alanı kırpmak için viewBox'ı içerik bbox'una ayarla
                try {
                    const svgEl = root;
                    const bbox = svgEl.getBBox();
                    if (bbox && isFinite(bbox.width) && isFinite(bbox.height) && bbox.width > 0 && bbox.height > 0) {
                        svgEl.setAttribute("viewBox", "".concat(bbox.x, " ").concat(bbox.y, " ").concat(bbox.width, " ").concat(bbox.height));
                        svgEl.removeAttribute("width");
                        svgEl.removeAttribute("height");
                        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
                    }
                } catch (_) {
                // getBBox desteklenmiyorsa default viewBox kullanılmaya devam eder
                }
                // Desktop'ta bir miktar büyüt (küçük görünümü telafi etmek için)
                if ("object" !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 1024px)").matches) {
                    root.style.transform = "scale(1.01)";
                }
                // Bölge bazlı renkler
                applyRegionStyles(containerRef.current);
                const provinceGroups = containerRef.current.querySelectorAll("g[data-iladi]");
                provinceGroups.forEach({
                    "TurkeyMap.useEffect.loadSvg": (g)=>{
                        const cityAttr = g.getAttribute("data-iladi") || g.getAttribute("data-province") || "";
                        const city = normalizeCityName(cityAttr);
                        // Hover ve seçili stilleri
                        g.style.cursor = "pointer";
                        g.style.transition = "transform 120ms ease, filter 120ms ease";
                        g.addEventListener("mouseenter", {
                            "TurkeyMap.useEffect.loadSvg": ()=>{
                                g.style.filter = "brightness(1.1)";
                            }
                        }["TurkeyMap.useEffect.loadSvg"]);
                        g.addEventListener("mouseleave", {
                            "TurkeyMap.useEffect.loadSvg": ()=>{
                                g.style.filter = "";
                            }
                        }["TurkeyMap.useEffect.loadSvg"]);
                        g.addEventListener("mousedown", {
                            "TurkeyMap.useEffect.loadSvg": ()=>{
                                g.style.transform = "scale(0.985)"; // basılma hissi
                            }
                        }["TurkeyMap.useEffect.loadSvg"]);
                        const clearPress = {
                            "TurkeyMap.useEffect.loadSvg.clearPress": ()=>{
                                g.style.transform = "";
                            }
                        }["TurkeyMap.useEffect.loadSvg.clearPress"];
                        g.addEventListener("mouseup", clearPress);
                        g.addEventListener("mouseout", clearPress);
                        // Erişilebilirlik: klavye ile seçim
                        g.setAttribute("tabindex", "0");
                        g.addEventListener("keydown", {
                            "TurkeyMap.useEffect.loadSvg": (ev)=>{
                                if (ev.key === "Enter" || ev.key === " ") {
                                    ev.preventDefault();
                                    onCitySelect(city);
                                }
                            }
                        }["TurkeyMap.useEffect.loadSvg"]);
                        g.addEventListener("click", {
                            "TurkeyMap.useEffect.loadSvg": ()=>onCitySelect(city)
                        }["TurkeyMap.useEffect.loadSvg"]);
                        // İlk render'da seçili şehri highlight et
                        if (selectedCity && city === selectedCity) {
                            g.style.filter = "drop-shadow(0 0 0.5rem var(--color-gold, var(--primary))) brightness(1.08)";
                            const shapes = g.querySelectorAll("path, polygon, rect, circle, polyline");
                            shapes.forEach({
                                "TurkeyMap.useEffect.loadSvg": (sh)=>{
                                    sh.setAttribute("stroke", "var(--color-gold, var(--primary))");
                                    sh.setAttribute("stroke-width", "1.25");
                                }
                            }["TurkeyMap.useEffect.loadSvg"]);
                        }
                    }
                }["TurkeyMap.useEffect.loadSvg"]);
            }
            loadSvg();
            return ({
                "TurkeyMap.useEffect": ()=>{
                    isMounted = false;
                }
            })["TurkeyMap.useEffect"];
        }
    }["TurkeyMap.useEffect"], [
        selectedCity,
        onCitySelect
    ]);
    return(//* Sadece Desktop'ta map gösterimi
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden md:block bg-card border border-border rounded-xl shadow-sm p-3 sm:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-2 sm:px-3 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm sm:text-base font-semibold text-foreground",
                            children: "Türkiye Haritası"
                        }, void 0, false, {
                            fileName: "[project]/app/components/TurkeyMap.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/TurkeyMap.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            selectedCity && selectedCity !== "Tümü" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs sm:text-sm text-muted",
                                children: [
                                    "Seçili: ",
                                    selectedCity
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TurkeyMap.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs sm:text-sm text-muted",
                                children: "Şehir seçin"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TurkeyMap.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onCitySelect("Tümü"),
                                className: "text-xs sm:text-sm px-2 py-1 rounded-md bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors",
                                "aria-label": "Filtreyi Temizle",
                                children: "Temizle"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TurkeyMap.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TurkeyMap.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TurkeyMap.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "w-full overflow-hidden p-4",
                "aria-label": "Türkiye Haritası"
            }, void 0, false, {
                fileName: "[project]/app/components/TurkeyMap.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-0 text-xs text-muted px-2 sm:px-3",
                children: "Şehre tıklayarak filtreleyin. Temizle ile sıfırlayabilirsiniz."
            }, void 0, false, {
                fileName: "[project]/app/components/TurkeyMap.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TurkeyMap.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this));
}
_s(TurkeyMap, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = TurkeyMap;
var _c;
__turbopack_context__.k.register(_c, "TurkeyMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SearchFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SearchFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AlumniCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AlumniCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TurkeyMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TurkeyMap.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Örnek mezun verileri - Gerçek uygulamada API'den gelecek
const mockAlumni = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        department: "Bilgisayar Mühendisliği",
        city: "İstanbul",
        jobTitle: "Kıdemli Yazılım Geliştirici",
        company: "Tech Corp",
        graduationYear: 2018,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "2",
        name: "Ayşe Kaya",
        department: "Elektrik-Elektronik Mühendisliği",
        city: "Ankara",
        jobTitle: "Proje Yöneticisi",
        company: "Enerji A.Ş.",
        graduationYear: 2016,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "3",
        name: "Mehmet Demir",
        department: "İşletme",
        city: "İzmir",
        jobTitle: "Finansal Analist",
        company: "Finans Bank",
        graduationYear: 2019,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "4",
        name: "Zeynep Şahin",
        department: "Bilgisayar Mühendisliği",
        city: "Trabzon",
        jobTitle: "Veri Bilimci",
        company: "Data Analytics Ltd.",
        graduationYear: 2020,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "5",
        name: "Can Öztürk",
        department: "Makine Mühendisliği",
        city: "Bursa",
        jobTitle: "Üretim Mühendisi",
        company: "Otomotiv A.Ş.",
        graduationYear: 2017,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "6",
        name: "Elif Çelik",
        department: "Mimarlık",
        city: "Antalya",
        jobTitle: "Mimar",
        company: "Tasarım Atölyesi",
        graduationYear: 2015,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "7",
        name: "Burak Arslan",
        department: "Hukuk",
        city: "İstanbul",
        jobTitle: "Avukat",
        company: "Hukuk Bürosu",
        graduationYear: 2014,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    },
    {
        id: "8",
        name: "Selin Yıldız",
        department: "İktisat",
        city: "Ankara",
        jobTitle: "Ekonomist",
        company: "Merkez Bankası",
        graduationYear: 2019,
        linkedinUrl: "https://linkedin.com",
        profileImage: ""
    }
];
function Home() {
    _s();
    const [filteredAlumni, setFilteredAlumni] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mockAlumni);
    const [selectedMapCity, setSelectedMapCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Tümü");
    const [currentFilters, setCurrentFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        search: "",
        city: "Tümü",
        department: "Tümü",
        jobField: "Tümü"
    });
    const handleFilterChange = (filters, mapCityOverride)=>{
        setCurrentFilters(filters);
        let filtered = mockAlumni;
        // Arama filtresi
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter((alumni)=>{
                var _alumni_company, _alumni_jobTitle;
                return alumni.name.toLowerCase().includes(searchLower) || ((_alumni_company = alumni.company) === null || _alumni_company === void 0 ? void 0 : _alumni_company.toLowerCase().includes(searchLower)) || ((_alumni_jobTitle = alumni.jobTitle) === null || _alumni_jobTitle === void 0 ? void 0 : _alumni_jobTitle.toLowerCase().includes(searchLower));
            });
        }
        // Şehir filtresi (dropdown + harita birleşik)
        const effectiveMapCity = mapCityOverride !== null && mapCityOverride !== void 0 ? mapCityOverride : selectedMapCity;
        const cityFilter = filters.city !== "Tümü" ? filters.city : effectiveMapCity;
        if (cityFilter !== "Tümü") {
            filtered = filtered.filter((alumni)=>alumni.city === cityFilter);
        }
        // Bölüm filtresi
        if (filters.department !== "Tümü") {
            filtered = filtered.filter((alumni)=>alumni.department === filters.department);
        }
        // İş alanı filtresi (jobTitle içinde arama)
        if (filters.jobField !== "Tümü") {
            filtered = filtered.filter((alumni)=>{
                var _alumni_jobTitle;
                return (_alumni_jobTitle = alumni.jobTitle) === null || _alumni_jobTitle === void 0 ? void 0 : _alumni_jobTitle.toLowerCase().includes(filters.jobField.toLowerCase());
            });
        }
        setFilteredAlumni(filtered);
    };
    const handleMapCitySelect = (city)=>{
        setSelectedMapCity(city);
        const updated = {
            ...currentFilters,
            city
        };
        handleFilterChange(updated, city);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-7",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TurkeyMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                selectedCity: selectedMapCity,
                                onCitySelect: handleMapCitySelect
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SearchFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onFilterChange: handleFilterChange
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-foreground",
                                children: filteredAlumni.length
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            " ",
                            "mezun bulundu"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                filteredAlumni.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: filteredAlumni.map((alumni)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AlumniCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ...alumni
                        }, alumni.id, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 190,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 188,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 mx-auto mb-4 bg-muted-bg rounded-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-12 h-12 text-muted",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 196,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold text-foreground mb-2",
                            children: "Sonuç bulunamadı"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted",
                            children: "Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(Home, "9Vi8yWW9IcmW0VbkG8A+SvpU5P8=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_a6e0c424._.js.map