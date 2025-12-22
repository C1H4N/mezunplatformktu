module.exports = [
"[project]/app/(pages)/(auth)/login/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Login
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)"); // Gerçek NextAuth importu
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)"); // Gerçek Next.js Navigation importları
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)"); // Gerçek react-hot-toast importu
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)"); // Gerçek Next.js Link importu
"use client";
;
;
;
;
;
;
function Login() {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const hasShownToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Butonun etkinliğini kontrol etmek için basit doğrulama
    const isFormValid = email.trim() !== "" && password.trim() !== "";
    // Giriş işlemini yönetir
    const handleLogin = async (e)=>{
        e.preventDefault();
        // Form geçerli değilse işlemi durdur
        if (!isFormValid) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Lütfen tüm alanları doldurunuz.");
            return;
        }
        setLoading(true);
        // Gerçek NextAuth signIn çağrısı
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
            email: email.toLowerCase().trim(),
            password,
            redirect: false
        });
        setLoading(false);
        if (!res) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Sunucuya ulaşılamadı.");
        } else if (res.ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success("Giriş başarılı! Yönlendiriliyorsun...");
            setTimeout(()=>router.push("/"), 800);
        } else {
            // Hata mesajını daha kullanıcı dostu yap
            let errorMessage = "Giriş başarısız.";
            if (res.error?.includes("CredentialsSignin")) {
                errorMessage = "E-posta/Telefon veya şifreniz yanlış.";
            } else if (res.error) {
                errorMessage = "Giriş başarısız: " + res.error;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(errorMessage);
        }
    };
    // Yetkilendirme hataları için bildirimleri gösterir
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unauthorized = searchParams.get("unauthorized");
        if (!hasShownToast.current && unauthorized) {
            hasShownToast.current = true;
            if (unauthorized === "1") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Giriş yapmamışsın! Merak etme sepetin güvende :)");
            } else if (unauthorized === "2") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Oturum açmalısın!");
            }
        }
    }, [
        searchParams
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-screen bg-zinc-950 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm p-8 border border-zinc-700 bg-zinc-900 text-white shadow-2xl rounded-xl transition-all duration-300",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-8 text-center text-blue-400",
                    children: "Ktü Mezun Platformu"
                }, void 0, false, {
                    fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleLogin,
                    className: "flex flex-col gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Email veya Telefon",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                className: "px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                placeholder: "Şifre",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                className: `px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400 transition-colors`
                            }, void 0, false, {
                                fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            // Form geçerli değilse veya yükleniyorsa butonu devre dışı bırak
                            disabled: loading || !isFormValid,
                            className: `
              w-full py-3 font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg
              ${loading || !isFormValid ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/50"}
            `,
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "opacity-25",
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "opacity-75",
                                                fill: "currentColor",
                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    "Giriş yapılıyor..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this) : "Giriş Yap"
                        }, void 0, false, {
                            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            className: "text-center text-sm font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors",
                            children: "Hesabın yok mu? Aramıza Katıl!"
                        }, void 0, false, {
                            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/reset-password-email",
                            className: "text-center text-sm text-zinc-400 hover:text-zinc-300 underline underline-offset-2 transition-colors",
                            children: "Şifremi unuttum :("
                        }, void 0, false, {
                            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(pages)/(auth)/login/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _typeof(o) {
    "@babel/helpers - typeof";
    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/OverloadYield.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _OverloadYield(e, d) {
    this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
        i({}, "", {});
    } catch (e) {
        i = 0;
    }
    module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
        function o(r, n) {
            _regeneratorDefine(e, r, function(e) {
                return this._invoke(r, n, e);
            });
        }
        r ? i ? i(e, r, {
            value: n,
            enumerable: !t,
            configurable: !t,
            writable: !t
        }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regenerator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regeneratorDefine = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-ssr] (ecmascript)");
function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
        var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
        return regeneratorDefine(u, "_invoke", function(r, n, o) {
            var i, c, u, f = 0, p = o || [], y = !1, G = {
                p: 0,
                n: 0,
                v: e,
                a: d,
                f: d.bind(e, 4),
                d: function d(t, r) {
                    return i = t, c = 0, u = e, G.n = r, a;
                }
            };
            function d(r, n) {
                for(c = r, u = n, t = 0; !y && f && !o && t < p.length; t++){
                    var o, i = p[t], d = G.p, l = i[2];
                    r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
                }
                if (o || r > 1) return a;
                throw y = !0, n;
            }
            return function(o, p, l) {
                if (f > 1) throw TypeError("Generator is already running");
                for(y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;){
                    i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                    try {
                        if (f = 2, i) {
                            if (c || (o = "next"), t = i[o]) {
                                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                                if (!t.done) return t;
                                u = t.value, c < 2 && (c = 0);
                            } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                            i = e;
                        } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                    } catch (t) {
                        i = e, c = 1, u = t;
                    } finally{
                        f = 1;
                    }
                }
                return {
                    value: t,
                    done: y
                };
            };
        }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function() {
        return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function() {
        return this;
    }), regeneratorDefine(u, "toString", function() {
        return "[object Generator]";
    }), (module.exports = _regenerator = function _regenerator() {
        return {
            w: i,
            m: f
        };
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var OverloadYield = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/OverloadYield.js [app-ssr] (ecmascript)");
var regeneratorDefine = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-ssr] (ecmascript)");
function AsyncIterator(t, e) {
    function n(r, o, i, f) {
        try {
            var c = t[r](o), u = c.value;
            return u instanceof OverloadYield ? e.resolve(u.v).then(function(t) {
                n("next", t, i, f);
            }, function(t) {
                n("throw", t, i, f);
            }) : e.resolve(u).then(function(t) {
                c.value = t, i(c);
            }, function(t) {
                return n("throw", t, i, f);
            });
        } catch (t) {
            f(t);
        }
    }
    var r;
    this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
    })), regeneratorDefine(this, "_invoke", function(t, o, i) {
        function f() {
            return new e(function(e, r) {
                n(t, i, e, r);
            });
        }
        return r = r ? r.then(f, f) : f();
    }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regenerator = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regenerator.js [app-ssr] (ecmascript)");
var regeneratorAsyncIterator = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-ssr] (ecmascript)");
function _regeneratorAsyncGen(r, e, t, o, n) {
    return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorAsync.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regeneratorAsyncGen = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-ssr] (ecmascript)");
function _regeneratorAsync(n, e, r, t, o) {
    var a = regeneratorAsyncGen(n, e, r, t, o);
    return a.next().then(function(n) {
        return n.done ? n.value : a.next();
    });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorKeys.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _regeneratorKeys(e) {
    var n = Object(e), r = [];
    for(var t in n)r.unshift(t);
    return function e() {
        for(; r.length;)if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
        return e.done = !0, e;
    };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorValues.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
function _regeneratorValues(e) {
    if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return {
            next: function next() {
                return e && r >= e.length && (e = void 0), {
                    value: e && e[r++],
                    done: !e
                };
            }
        };
    }
    throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/regeneratorRuntime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var OverloadYield = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/OverloadYield.js [app-ssr] (ecmascript)");
var regenerator = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regenerator.js [app-ssr] (ecmascript)");
var regeneratorAsync = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorAsync.js [app-ssr] (ecmascript)");
var regeneratorAsyncGen = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-ssr] (ecmascript)");
var regeneratorAsyncIterator = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-ssr] (ecmascript)");
var regeneratorKeys = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorKeys.js [app-ssr] (ecmascript)");
var regeneratorValues = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorValues.js [app-ssr] (ecmascript)");
function _regeneratorRuntime() {
    "use strict";
    var r = regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
    function n(r) {
        var e = "function" == typeof r && r.constructor;
        return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
    }
    var o = {
        "throw": 1,
        "return": 2,
        "break": 3,
        "continue": 3
    };
    function a(r) {
        var e, t;
        return function(n) {
            e || (e = {
                stop: function stop() {
                    return t(n.a, 2);
                },
                "catch": function _catch() {
                    return n.v;
                },
                abrupt: function abrupt(r, e) {
                    return t(n.a, o[r], e);
                },
                delegateYield: function delegateYield(r, o, a) {
                    return e.resultName = o, t(n.d, regeneratorValues(r), a);
                },
                finish: function finish(r) {
                    return t(n.f, r);
                }
            }, t = function t(r, _t, o) {
                n.p = e.prev, n.n = e.next;
                try {
                    return r(_t, o);
                } finally{
                    e.next = n.n;
                }
            }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
            try {
                return r.call(this, e);
            } finally{
                n.p = e.prev, n.n = e.next;
            }
        };
    }
    return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
        return {
            wrap: function wrap(e, t, n, o) {
                return r.w(a(e), t, n, o && o.reverse());
            },
            isGeneratorFunction: n,
            mark: r.m,
            awrap: function awrap(r, e) {
                return new OverloadYield(r, e);
            },
            AsyncIterator: regeneratorAsyncIterator,
            async: function async(r, e, t, o, u) {
                return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
            },
            keys: regeneratorKeys,
            values: regeneratorValues
        };
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/regenerator/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// TODO(Babel 8): Remove this file.
var runtime = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/regeneratorRuntime.js [app-ssr] (ecmascript)")();
module.exports = runtime;
// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
    } else {
        Function("r", "regeneratorRuntime = r")(runtime);
    }
}
}),
"[project]/node_modules/@babel/runtime/helpers/toPrimitive.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
var toPrimitive = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/toPrimitive.js [app-ssr] (ecmascript)");
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toPropertyKey = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-ssr] (ecmascript)");
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/arrayWithHoles.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayLikeToArray = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-ssr] (ecmascript)");
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
    }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/nonIterableRest.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/slicedToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayWithHoles = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/arrayWithHoles.js [app-ssr] (ecmascript)");
var iterableToArrayLimit = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js [app-ssr] (ecmascript)");
var unsupportedIterableToArray = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-ssr] (ecmascript)");
var nonIterableRest = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/nonIterableRest.js [app-ssr] (ecmascript)");
function _slicedToArray(r, e) {
    return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/classCallCheck.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/createClass.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toPropertyKey = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-ssr] (ecmascript)");
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/assertThisInitialized.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
var assertThisInitialized = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/assertThisInitialized.js [app-ssr] (ecmascript)");
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _getPrototypeOf(t) {
    return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _setPrototypeOf(t, e) {
    return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/inherits.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-ssr] (ecmascript)");
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/isNativeFunction.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _isNativeFunction(t) {
    try {
        return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
        return "function" == typeof t;
    }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/construct.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var isNativeReflectConstruct = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js [app-ssr] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-ssr] (ecmascript)");
function _construct(t, e, r) {
    if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [
        null
    ];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/@babel/runtime/helpers/wrapNativeSuper.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var getPrototypeOf = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-ssr] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-ssr] (ecmascript)");
var isNativeFunction = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/isNativeFunction.js [app-ssr] (ecmascript)");
var construct = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/construct.js [app-ssr] (ecmascript)");
function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
        if (null === t || !isNativeFunction(t)) return t;
        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== r) {
            if (r.has(t)) return r.get(t);
            r.set(t, Wrapper);
        }
        function Wrapper() {
            return construct(t, arguments, getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(t.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), setPrototypeOf(Wrapper, t);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/node_modules/next-auth/core/errors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/regenerator/index.js [app-ssr] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-ssr] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)"));
var _classCallCheck2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/classCallCheck.js [app-ssr] (ecmascript)"));
var _createClass2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/createClass.js [app-ssr] (ecmascript)"));
var _possibleConstructorReturn2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js [app-ssr] (ecmascript)"));
var _getPrototypeOf2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-ssr] (ecmascript)"));
var _inherits2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/inherits.js [app-ssr] (ecmascript)"));
var _wrapNativeSuper2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/wrapNativeSuper.js [app-ssr] (ecmascript)"));
function _callSuper(t, o, e) {
    return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
var UnknownError = exports.UnknownError = function(_Error) {
    function UnknownError(error) {
        var _message;
        var _this;
        (0, _classCallCheck2.default)(this, UnknownError);
        _this = _callSuper(this, UnknownError, [
            (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error
        ]);
        _this.name = "UnknownError";
        _this.code = error.code;
        if (error instanceof Error) {
            _this.stack = error.stack;
        }
        return _this;
    }
    (0, _inherits2.default)(UnknownError, _Error);
    return (0, _createClass2.default)(UnknownError, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack
                };
            }
        }
    ]);
}((0, _wrapNativeSuper2.default)(Error));
var OAuthCallbackError = exports.OAuthCallbackError = function(_UnknownError) {
    function OAuthCallbackError() {
        var _this2;
        (0, _classCallCheck2.default)(this, OAuthCallbackError);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        _this2 = _callSuper(this, OAuthCallbackError, [].concat(args));
        (0, _defineProperty2.default)(_this2, "name", "OAuthCallbackError");
        return _this2;
    }
    (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
    return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
var AccountNotLinkedError = exports.AccountNotLinkedError = function(_UnknownError2) {
    function AccountNotLinkedError() {
        var _this3;
        (0, _classCallCheck2.default)(this, AccountNotLinkedError);
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
            args[_key2] = arguments[_key2];
        }
        _this3 = _callSuper(this, AccountNotLinkedError, [].concat(args));
        (0, _defineProperty2.default)(_this3, "name", "AccountNotLinkedError");
        return _this3;
    }
    (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
    return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
var MissingAPIRoute = exports.MissingAPIRoute = function(_UnknownError3) {
    function MissingAPIRoute() {
        var _this4;
        (0, _classCallCheck2.default)(this, MissingAPIRoute);
        for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++){
            args[_key3] = arguments[_key3];
        }
        _this4 = _callSuper(this, MissingAPIRoute, [].concat(args));
        (0, _defineProperty2.default)(_this4, "name", "MissingAPIRouteError");
        (0, _defineProperty2.default)(_this4, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
        return _this4;
    }
    (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
    return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
var MissingSecret = exports.MissingSecret = function(_UnknownError4) {
    function MissingSecret() {
        var _this5;
        (0, _classCallCheck2.default)(this, MissingSecret);
        for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++){
            args[_key4] = arguments[_key4];
        }
        _this5 = _callSuper(this, MissingSecret, [].concat(args));
        (0, _defineProperty2.default)(_this5, "name", "MissingSecretError");
        (0, _defineProperty2.default)(_this5, "code", "NO_SECRET");
        return _this5;
    }
    (0, _inherits2.default)(MissingSecret, _UnknownError4);
    return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
var MissingAuthorize = exports.MissingAuthorize = function(_UnknownError5) {
    function MissingAuthorize() {
        var _this6;
        (0, _classCallCheck2.default)(this, MissingAuthorize);
        for(var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++){
            args[_key5] = arguments[_key5];
        }
        _this6 = _callSuper(this, MissingAuthorize, [].concat(args));
        (0, _defineProperty2.default)(_this6, "name", "MissingAuthorizeError");
        (0, _defineProperty2.default)(_this6, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
        return _this6;
    }
    (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
    return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
var MissingAdapter = exports.MissingAdapter = function(_UnknownError6) {
    function MissingAdapter() {
        var _this7;
        (0, _classCallCheck2.default)(this, MissingAdapter);
        for(var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++){
            args[_key6] = arguments[_key6];
        }
        _this7 = _callSuper(this, MissingAdapter, [].concat(args));
        (0, _defineProperty2.default)(_this7, "name", "MissingAdapterError");
        (0, _defineProperty2.default)(_this7, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
        return _this7;
    }
    (0, _inherits2.default)(MissingAdapter, _UnknownError6);
    return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
var MissingAdapterMethods = exports.MissingAdapterMethods = function(_UnknownError7) {
    function MissingAdapterMethods() {
        var _this8;
        (0, _classCallCheck2.default)(this, MissingAdapterMethods);
        for(var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++){
            args[_key7] = arguments[_key7];
        }
        _this8 = _callSuper(this, MissingAdapterMethods, [].concat(args));
        (0, _defineProperty2.default)(_this8, "name", "MissingAdapterMethodsError");
        (0, _defineProperty2.default)(_this8, "code", "MISSING_ADAPTER_METHODS_ERROR");
        return _this8;
    }
    (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
    return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
var UnsupportedStrategy = exports.UnsupportedStrategy = function(_UnknownError8) {
    function UnsupportedStrategy() {
        var _this9;
        (0, _classCallCheck2.default)(this, UnsupportedStrategy);
        for(var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++){
            args[_key8] = arguments[_key8];
        }
        _this9 = _callSuper(this, UnsupportedStrategy, [].concat(args));
        (0, _defineProperty2.default)(_this9, "name", "UnsupportedStrategyError");
        (0, _defineProperty2.default)(_this9, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
        return _this9;
    }
    (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
    return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
var InvalidCallbackUrl = exports.InvalidCallbackUrl = function(_UnknownError9) {
    function InvalidCallbackUrl() {
        var _this10;
        (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
        for(var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++){
            args[_key9] = arguments[_key9];
        }
        _this10 = _callSuper(this, InvalidCallbackUrl, [].concat(args));
        (0, _defineProperty2.default)(_this10, "name", "InvalidCallbackUrl");
        (0, _defineProperty2.default)(_this10, "code", "INVALID_CALLBACK_URL_ERROR");
        return _this10;
    }
    (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
    return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
function upperSnake(s) {
    return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
    return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
            var method, _args = arguments;
            return _regenerator.default.wrap(function _callee$(_context) {
                while(1)switch(_context.prev = _context.next){
                    case 0:
                        _context.prev = 0;
                        method = methods[name];
                        _context.next = 4;
                        return method.apply(void 0, _args);
                    case 4:
                        return _context.abrupt("return", _context.sent);
                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);
                        logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
                    case 10:
                    case "end":
                        return _context.stop();
                }
            }, _callee, null, [
                [
                    0,
                    7
                ]
            ]);
        }));
        return acc;
    }, {});
}
function adapterErrorHandler(adapter, logger) {
    if (!adapter) return;
    return Object.keys(adapter).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
            var _len10, args, _key10, method, e, _args2 = arguments;
            return _regenerator.default.wrap(function _callee2$(_context2) {
                while(1)switch(_context2.prev = _context2.next){
                    case 0:
                        _context2.prev = 0;
                        for(_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++){
                            args[_key10] = _args2[_key10];
                        }
                        logger.debug("adapter_".concat(name), {
                            args: args
                        });
                        method = adapter[name];
                        _context2.next = 6;
                        return method.apply(void 0, args);
                    case 6:
                        return _context2.abrupt("return", _context2.sent);
                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](0);
                        logger.error("adapter_error_".concat(name), _context2.t0);
                        e = new UnknownError(_context2.t0);
                        e.name = "".concat(capitalize(name), "Error");
                        throw e;
                    case 15:
                    case "end":
                        return _context2.stop();
                }
            }, _callee2, null, [
                [
                    0,
                    9
                ]
            ]);
        }));
        return acc;
    }, {});
}
}),
"[project]/node_modules/next-auth/utils/logger.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/regenerator/index.js [app-ssr] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-ssr] (ecmascript)"));
var _errors = __turbopack_context__.r("[project]/node_modules/next-auth/core/errors.js [app-ssr] (ecmascript)");
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function formatError(o) {
    if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
        return {
            message: o.message,
            stack: o.stack,
            name: o.name
        };
    }
    if (hasErrorProperty(o)) {
        var _o$message;
        o.error = formatError(o.error);
        o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
    }
    return o;
}
function hasErrorProperty(x) {
    return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
    error: function error(code, metadata) {
        metadata = formatError(metadata);
        console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
    },
    warn: function warn(code) {
        console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
    },
    debug: function debug(code, metadata) {
        console.log("[next-auth][debug][".concat(code, "]"), metadata);
    }
};
function setLogger() {
    var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var debug = arguments.length > 1 ? arguments[1] : undefined;
    if (!debug) _logger.debug = function() {};
    if (newLogger.error) _logger.error = newLogger.error;
    if (newLogger.warn) _logger.warn = newLogger.warn;
    if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = exports.default = _logger;
function proxyLogger() {
    var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
    var basePath = arguments.length > 1 ? arguments[1] : undefined;
    try {
        if ("TURBOPACK compile-time truthy", 1) {
            return logger;
        }
        //TURBOPACK unreachable
        ;
        var clientLogger;
        var _loop;
        var level;
    } catch (_unused) {
        return _logger;
    }
}
}),
"[project]/node_modules/next-auth/utils/parse-url.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseUrl;
function parseUrl(url) {
    var _url2;
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}
}),
"[project]/node_modules/next-auth/client/_utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/regenerator/index.js [app-ssr] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-ssr] (ecmascript)"));
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function fetchData(_x, _x2, _x3) {
    return _fetchData.apply(this, arguments);
}
function _fetchData() {
    _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
        var _ref, ctx, _ref$req, req, url, _req$headers, options, res, data, _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
            while(1)switch(_context.prev = _context.next){
                case 0:
                    _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
                    url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
                    _context.prev = 2;
                    options = {
                        headers: _objectSpread({
                            "Content-Type": "application/json"
                        }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
                            cookie: req.headers.cookie
                        } : {})
                    };
                    if (req !== null && req !== void 0 && req.body) {
                        options.body = JSON.stringify(req.body);
                        options.method = "POST";
                    }
                    _context.next = 7;
                    return fetch(url, options);
                case 7:
                    res = _context.sent;
                    _context.next = 10;
                    return res.json();
                case 10:
                    data = _context.sent;
                    if (res.ok) {
                        _context.next = 13;
                        break;
                    }
                    throw data;
                case 13:
                    return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);
                case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](2);
                    logger.error("CLIENT_FETCH_ERROR", {
                        error: _context.t0,
                        url: url
                    });
                    return _context.abrupt("return", null);
                case 20:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                2,
                16
            ]
        ]);
    }));
    return _fetchData.apply(this, arguments);
}
function apiBaseUrl(__NEXTAUTH) {
    if ("TURBOPACK compile-time truthy", 1) {
        return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
    }
    //TURBOPACK unreachable
    ;
}
function now() {
    return Math.floor(Date.now() / 1000);
}
function BroadcastChannel() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
    return {
        receive: function receive(onReceive) {
            var handler = function handler(event) {
                var _event$newValue;
                if (event.key !== name) return;
                var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
                if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
                onReceive(message);
            };
            window.addEventListener("storage", handler);
            return function() {
                return window.removeEventListener("storage", handler);
            };
        },
        post: function post(message) {
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
        }
    };
}
}),
"[project]/node_modules/next-auth/react/types.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
var _typeof = __turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {
    SessionContext: true,
    useSession: true,
    getSession: true,
    getCsrfToken: true,
    getProviders: true,
    signIn: true,
    signOut: true,
    SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/regenerator/index.js [app-ssr] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-ssr] (ecmascript)"));
var _slicedToArray2 = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/@babel/runtime/helpers/slicedToArray.js [app-ssr] (ecmascript)"));
var React = _interopRequireWildcard(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
var _logger2 = _interopRequireWildcard(__turbopack_context__.r("[project]/node_modules/next-auth/utils/logger.js [app-ssr] (ecmascript)"));
var _parseUrl = _interopRequireDefault(__turbopack_context__.r("[project]/node_modules/next-auth/utils/parse-url.js [app-ssr] (ecmascript)"));
var _utils = __turbopack_context__.r("[project]/node_modules/next-auth/client/_utils.js [app-ssr] (ecmascript)");
var _jsxRuntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _types = __turbopack_context__.r("[project]/node_modules/next-auth/react/types.js [app-ssr] (ecmascript)");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _types[key];
        }
    });
});
var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;
function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
        return e ? t : r;
    })(e);
}
function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
        default: e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
    }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && ({}).hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
var __NEXTAUTH = {
    baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
    basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
    baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
    basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
    _lastSync: 0,
    _session: undefined,
    _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
function useOnline() {
    var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false), _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2), isOnline = _React$useState2[0], setIsOnline = _React$useState2[1];
    var setOnline = function setOnline() {
        return setIsOnline(true);
    };
    var setOffline = function setOffline() {
        return setIsOnline(false);
    };
    React.useEffect(function() {
        window.addEventListener("online", setOnline);
        window.addEventListener("offline", setOffline);
        return function() {
            window.removeEventListener("online", setOnline);
            window.removeEventListener("offline", setOffline);
        };
    }, []);
    return isOnline;
}
var SessionContext = exports.SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
function useSession(options) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    var value = React.useContext(SessionContext);
    if (!value && ("TURBOPACK compile-time value", "development") !== "production") {
        throw new Error("[next-auth]: `useSession` must be wrapped in a <SessionProvider />");
    }
    var _ref2 = options !== null && options !== void 0 ? options : {}, required = _ref2.required, onUnauthenticated = _ref2.onUnauthenticated;
    var requiredAndNotLoading = required && value.status === "unauthenticated";
    React.useEffect(function() {
        if (requiredAndNotLoading) {
            var url = "/api/auth/signin?".concat(new URLSearchParams({
                error: "SessionRequired",
                callbackUrl: window.location.href
            }));
            if (onUnauthenticated) onUnauthenticated();
            else window.location.href = url;
        }
    }, [
        requiredAndNotLoading,
        onUnauthenticated
    ]);
    if (requiredAndNotLoading) {
        return {
            data: value.data,
            update: value.update,
            status: "loading"
        };
    }
    return value;
}
function getSession(_x) {
    return _getSession2.apply(this, arguments);
}
function _getSession2() {
    _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
        var _params$broadcast;
        var session;
        return _regenerator.default.wrap(function _callee3$(_context3) {
            while(1)switch(_context3.prev = _context3.next){
                case 0:
                    _context3.next = 2;
                    return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);
                case 2:
                    session = _context3.sent;
                    if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
                        broadcast.post({
                            event: "session",
                            data: {
                                trigger: "getSession"
                            }
                        });
                    }
                    return _context3.abrupt("return", session);
                case 5:
                case "end":
                    return _context3.stop();
            }
        }, _callee3);
    }));
    return _getSession2.apply(this, arguments);
}
function getCsrfToken(_x2) {
    return _getCsrfToken.apply(this, arguments);
}
function _getCsrfToken() {
    _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
        var response;
        return _regenerator.default.wrap(function _callee4$(_context4) {
            while(1)switch(_context4.prev = _context4.next){
                case 0:
                    _context4.next = 2;
                    return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);
                case 2:
                    response = _context4.sent;
                    return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);
                case 4:
                case "end":
                    return _context4.stop();
            }
        }, _callee4);
    }));
    return _getCsrfToken.apply(this, arguments);
}
function getProviders() {
    return _getProviders.apply(this, arguments);
}
function _getProviders() {
    _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
            while(1)switch(_context5.prev = _context5.next){
                case 0:
                    _context5.next = 2;
                    return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);
                case 2:
                    return _context5.abrupt("return", _context5.sent);
                case 3:
                case "end":
                    return _context5.stop();
            }
        }, _callee5);
    }));
    return _getProviders.apply(this, arguments);
}
function signIn(_x3, _x4, _x5) {
    return _signIn.apply(this, arguments);
}
function _signIn() {
    _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
        var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;
        return _regenerator.default.wrap(function _callee6$(_context6) {
            while(1)switch(_context6.prev = _context6.next){
                case 0:
                    _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
                    baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
                    _context6.next = 4;
                    return getProviders();
                case 4:
                    providers = _context6.sent;
                    if (providers) {
                        _context6.next = 8;
                        break;
                    }
                    window.location.href = "".concat(baseUrl, "/error");
                    return _context6.abrupt("return");
                case 8:
                    if (!(!provider || !(provider in providers))) {
                        _context6.next = 11;
                        break;
                    }
                    window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
                        callbackUrl: callbackUrl
                    }));
                    return _context6.abrupt("return");
                case 11:
                    isCredentials = providers[provider].type === "credentials";
                    isEmail = providers[provider].type === "email";
                    isSupportingReturn = isCredentials || isEmail;
                    signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
                    _signInUrl = "".concat(signInUrl).concat(authorizationParams ? "?".concat(new URLSearchParams(authorizationParams)) : "");
                    _context6.t0 = fetch;
                    _context6.t1 = _signInUrl;
                    _context6.t2 = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    _context6.t3 = URLSearchParams;
                    _context6.t4 = _objectSpread;
                    _context6.t5 = _objectSpread({}, options);
                    _context6.t6 = {};
                    _context6.next = 25;
                    return getCsrfToken();
                case 25:
                    _context6.t7 = _context6.sent;
                    _context6.t8 = callbackUrl;
                    _context6.t9 = {
                        csrfToken: _context6.t7,
                        callbackUrl: _context6.t8,
                        json: true
                    };
                    _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
                    _context6.t11 = new _context6.t3(_context6.t10);
                    _context6.t12 = {
                        method: "post",
                        headers: _context6.t2,
                        body: _context6.t11
                    };
                    _context6.next = 33;
                    return (0, _context6.t0)(_context6.t1, _context6.t12);
                case 33:
                    res = _context6.sent;
                    _context6.next = 36;
                    return res.json();
                case 36:
                    data = _context6.sent;
                    if (!(redirect || !isSupportingReturn)) {
                        _context6.next = 42;
                        break;
                    }
                    url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
                    window.location.href = url;
                    if (url.includes("#")) window.location.reload();
                    return _context6.abrupt("return");
                case 42:
                    error = new URL(data.url).searchParams.get("error");
                    if (!res.ok) {
                        _context6.next = 46;
                        break;
                    }
                    _context6.next = 46;
                    return __NEXTAUTH._getSession({
                        event: "storage"
                    });
                case 46:
                    return _context6.abrupt("return", {
                        error: error,
                        status: res.status,
                        ok: res.ok,
                        url: error ? null : data.url
                    });
                case 47:
                case "end":
                    return _context6.stop();
            }
        }, _callee6);
    }));
    return _signIn.apply(this, arguments);
}
function signOut(_x6) {
    return _signOut.apply(this, arguments);
}
function _signOut() {
    _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
        var _options$redirect;
        var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;
        return _regenerator.default.wrap(function _callee7$(_context7) {
            while(1)switch(_context7.prev = _context7.next){
                case 0:
                    _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
                    baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
                    _context7.t0 = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    _context7.t1 = URLSearchParams;
                    _context7.next = 6;
                    return getCsrfToken();
                case 6:
                    _context7.t2 = _context7.sent;
                    _context7.t3 = callbackUrl;
                    _context7.t4 = {
                        csrfToken: _context7.t2,
                        callbackUrl: _context7.t3,
                        json: true
                    };
                    _context7.t5 = new _context7.t1(_context7.t4);
                    fetchOptions = {
                        method: "post",
                        headers: _context7.t0,
                        body: _context7.t5
                    };
                    _context7.next = 13;
                    return fetch("".concat(baseUrl, "/signout"), fetchOptions);
                case 13:
                    res = _context7.sent;
                    _context7.next = 16;
                    return res.json();
                case 16:
                    data = _context7.sent;
                    broadcast.post({
                        event: "session",
                        data: {
                            trigger: "signout"
                        }
                    });
                    if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
                        _context7.next = 23;
                        break;
                    }
                    url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
                    window.location.href = url;
                    if (url.includes("#")) window.location.reload();
                    return _context7.abrupt("return");
                case 23:
                    _context7.next = 25;
                    return __NEXTAUTH._getSession({
                        event: "storage"
                    });
                case 25:
                    return _context7.abrupt("return", data);
                case 26:
                case "end":
                    return _context7.stop();
            }
        }, _callee7);
    }));
    return _signOut.apply(this, arguments);
}
function SessionProvider(props) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    var children = props.children, basePath = props.basePath, refetchInterval = props.refetchInterval, refetchWhenOffline = props.refetchWhenOffline;
    if (basePath) __NEXTAUTH.basePath = basePath;
    var hasInitialSession = props.session !== undefined;
    __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;
    var _React$useState3 = React.useState(function() {
        if (hasInitialSession) __NEXTAUTH._session = props.session;
        return props.session;
    }), _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2), session = _React$useState4[0], setSession = _React$useState4[1];
    var _React$useState5 = React.useState(!hasInitialSession), _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2), loading = _React$useState6[0], setLoading = _React$useState6[1];
    React.useEffect(function() {
        __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
            var _ref4, event, storageEvent, _args = arguments;
            return _regenerator.default.wrap(function _callee$(_context) {
                while(1)switch(_context.prev = _context.next){
                    case 0:
                        _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
                        _context.prev = 1;
                        storageEvent = event === "storage";
                        if (!(storageEvent || __NEXTAUTH._session === undefined)) {
                            _context.next = 10;
                            break;
                        }
                        __NEXTAUTH._lastSync = (0, _utils.now)();
                        _context.next = 7;
                        return getSession({
                            broadcast: !storageEvent
                        });
                    case 7:
                        __NEXTAUTH._session = _context.sent;
                        setSession(__NEXTAUTH._session);
                        return _context.abrupt("return");
                    case 10:
                        if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
                            _context.next = 12;
                            break;
                        }
                        return _context.abrupt("return");
                    case 12:
                        __NEXTAUTH._lastSync = (0, _utils.now)();
                        _context.next = 15;
                        return getSession();
                    case 15:
                        __NEXTAUTH._session = _context.sent;
                        setSession(__NEXTAUTH._session);
                        _context.next = 22;
                        break;
                    case 19:
                        _context.prev = 19;
                        _context.t0 = _context["catch"](1);
                        logger.error("CLIENT_SESSION_ERROR", _context.t0);
                    case 22:
                        _context.prev = 22;
                        setLoading(false);
                        return _context.finish(22);
                    case 25:
                    case "end":
                        return _context.stop();
                }
            }, _callee, null, [
                [
                    1,
                    19,
                    22,
                    25
                ]
            ]);
        }));
        __NEXTAUTH._getSession();
        return function() {
            __NEXTAUTH._lastSync = 0;
            __NEXTAUTH._session = undefined;
            __NEXTAUTH._getSession = function() {};
        };
    }, []);
    React.useEffect(function() {
        var unsubscribe = broadcast.receive(function() {
            return __NEXTAUTH._getSession({
                event: "storage"
            });
        });
        return function() {
            return unsubscribe();
        };
    }, []);
    React.useEffect(function() {
        var _props$refetchOnWindo = props.refetchOnWindowFocus, refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;
        var visibilityHandler = function visibilityHandler() {
            if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
                event: "visibilitychange"
            });
        };
        document.addEventListener("visibilitychange", visibilityHandler, false);
        return function() {
            return document.removeEventListener("visibilitychange", visibilityHandler, false);
        };
    }, [
        props.refetchOnWindowFocus
    ]);
    var isOnline = useOnline();
    var shouldRefetch = refetchWhenOffline !== false || isOnline;
    React.useEffect(function() {
        if (refetchInterval && shouldRefetch) {
            var refetchIntervalTimer = setInterval(function() {
                if (__NEXTAUTH._session) {
                    __NEXTAUTH._getSession({
                        event: "poll"
                    });
                }
            }, refetchInterval * 1000);
            return function() {
                return clearInterval(refetchIntervalTimer);
            };
        }
    }, [
        refetchInterval,
        shouldRefetch
    ]);
    var value = React.useMemo(function() {
        return {
            data: session,
            status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
            update: function update(data) {
                return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
                    var newSession;
                    return _regenerator.default.wrap(function _callee2$(_context2) {
                        while(1)switch(_context2.prev = _context2.next){
                            case 0:
                                if (!(loading || !session)) {
                                    _context2.next = 2;
                                    break;
                                }
                                return _context2.abrupt("return");
                            case 2:
                                setLoading(true);
                                _context2.t0 = _utils.fetchData;
                                _context2.t1 = __NEXTAUTH;
                                _context2.t2 = logger;
                                _context2.next = 8;
                                return getCsrfToken();
                            case 8:
                                _context2.t3 = _context2.sent;
                                _context2.t4 = data;
                                _context2.t5 = {
                                    csrfToken: _context2.t3,
                                    data: _context2.t4
                                };
                                _context2.t6 = {
                                    body: _context2.t5
                                };
                                _context2.t7 = {
                                    req: _context2.t6
                                };
                                _context2.next = 15;
                                return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);
                            case 15:
                                newSession = _context2.sent;
                                setLoading(false);
                                if (newSession) {
                                    setSession(newSession);
                                    broadcast.post({
                                        event: "session",
                                        data: {
                                            trigger: "getSession"
                                        }
                                    });
                                }
                                return _context2.abrupt("return", newSession);
                            case 19:
                            case "end":
                                return _context2.stop();
                        }
                    }, _callee2);
                }))();
            }
        };
    }, [
        session,
        loading
    ]);
    return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
        value: value,
        children: children
    });
}
}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/goober/dist/goober.modern.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "css",
    ()=>u,
    "extractCss",
    ()=>r,
    "glob",
    ()=>b,
    "keyframes",
    ()=>h,
    "setup",
    ()=>m,
    "styled",
    ()=>w
]);
let e = {
    data: ""
}, t = (t)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return t || e;
}, r = (e)=>{
    let r = t(e), l = r.data;
    return r.data = "", l;
}, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n = /\n+/g, o = (e, t)=>{
    let r = "", l = "", a = "";
    for(let n in e){
        let c = e[n];
        "@" == n[0] ? "i" == n[1] ? r = n + " " + c + ";" : l += "f" == n[1] ? o(c, n) : n + "{" + o(c, "k" == n[1] ? "" : t) + "}" : "object" == typeof c ? l += o(c, t ? t.replace(/([^,])+/g, (e)=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t)=>/&/.test(t) ? t.replace(/&/g, e) : e ? e + " " + t : t)) : n) : null != c && (n = /^--/.test(n) ? n : n.replace(/[A-Z]/g, "-$&").toLowerCase(), a += o.p ? o.p(n, c) : n + ":" + c + ";");
    }
    return r + (t && a ? t + "{" + a + "}" : a) + l;
}, c = {}, s = (e)=>{
    if ("object" == typeof e) {
        let t = "";
        for(let r in e)t += r + s(e[r]);
        return t;
    }
    return e;
}, i = (e, t, r, i, p)=>{
    let u = s(e), d = c[u] || (c[u] = ((e)=>{
        let t = 0, r = 11;
        for(; t < e.length;)r = 101 * r + e.charCodeAt(t++) >>> 0;
        return "go" + r;
    })(u));
    if (!c[d]) {
        let t = u !== e ? e : ((e)=>{
            let t, r, o = [
                {}
            ];
            for(; t = l.exec(e.replace(a, ""));)t[4] ? o.shift() : t[3] ? (r = t[3].replace(n, " ").trim(), o.unshift(o[0][r] = o[0][r] || {})) : o[0][t[1]] = t[2].replace(n, " ").trim();
            return o[0];
        })(e);
        c[d] = o(p ? {
            ["@keyframes " + d]: t
        } : t, r ? "" : "." + d);
    }
    let f = r && c.g ? c.g : null;
    return r && (c.g = c[d]), ((e, t, r, l)=>{
        l ? t.data = t.data.replace(l, e) : -1 === t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
    })(c[d], t, i, f), d;
}, p = (e, t, r)=>e.reduce((e, l, a)=>{
        let n = t[a];
        if (n && n.call) {
            let e = n(r), t = e && e.props && e.props.className || /^go/.test(e) && e;
            n = t ? "." + t : e && "object" == typeof e ? e.props ? "" : o(e, "") : !1 === e ? "" : e;
        }
        return e + l + (null == n ? "" : n);
    }, "");
function u(e) {
    let r = this || {}, l = e.call ? e(r.p) : e;
    return i(l.unshift ? l.raw ? p(l, [].slice.call(arguments, 1), r.p) : l.reduce((e, t)=>Object.assign(e, t && t.call ? t(r.p) : t), {}) : l, t(r.target), r.g, r.o, r.k);
}
let d, f, g, b = u.bind({
    g: 1
}), h = u.bind({
    k: 1
});
function m(e, t, r, l) {
    o.p = t, d = e, f = r, g = l;
}
function w(e, t) {
    let r = this || {};
    return function() {
        let l = arguments;
        function a(n, o) {
            let c = Object.assign({}, n), s = c.className || a.className;
            r.p = Object.assign({
                theme: f && f()
            }, c), r.o = / *go\d+/.test(s), c.className = u.apply(r, l) + (s ? " " + s : ""), t && (c.ref = o);
            let i = e;
            return e[0] && (i = c.as || e, delete c.as), g && i[0] && g(c), d(i, c);
        }
        return t ? t(a) : a;
    };
}
;
}),
"[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckmarkIcon",
    ()=>L,
    "ErrorIcon",
    ()=>C,
    "LoaderIcon",
    ()=>F,
    "ToastBar",
    ()=>N,
    "ToastIcon",
    ()=>$,
    "Toaster",
    ()=>Fe,
    "default",
    ()=>zt,
    "resolveValue",
    ()=>h,
    "toast",
    ()=>n,
    "useToaster",
    ()=>w,
    "useToasterStore",
    ()=>V
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/goober/dist/goober.modern.js [app-ssr] (ecmascript)");
"use client";
var Z = (e)=>typeof e == "function", h = (e, t)=>Z(e) ? e(t) : e;
var W = (()=>{
    let e = 0;
    return ()=>(++e).toString();
})(), E = (()=>{
    let e;
    return ()=>{
        if (e === void 0 && "undefined" < "u") {
            let t = matchMedia("(prefers-reduced-motion: reduce)");
            e = !t || t.matches;
        }
        return e;
    };
})();
;
var re = 20, k = "default";
var H = (e, t)=>{
    let { toastLimit: o } = e.settings;
    switch(t.type){
        case 0:
            return {
                ...e,
                toasts: [
                    t.toast,
                    ...e.toasts
                ].slice(0, o)
            };
        case 1:
            return {
                ...e,
                toasts: e.toasts.map((r)=>r.id === t.toast.id ? {
                        ...r,
                        ...t.toast
                    } : r)
            };
        case 2:
            let { toast: s } = t;
            return H(e, {
                type: e.toasts.find((r)=>r.id === s.id) ? 1 : 0,
                toast: s
            });
        case 3:
            let { toastId: a } = t;
            return {
                ...e,
                toasts: e.toasts.map((r)=>r.id === a || a === void 0 ? {
                        ...r,
                        dismissed: !0,
                        visible: !1
                    } : r)
            };
        case 4:
            return t.toastId === void 0 ? {
                ...e,
                toasts: []
            } : {
                ...e,
                toasts: e.toasts.filter((r)=>r.id !== t.toastId)
            };
        case 5:
            return {
                ...e,
                pausedAt: t.time
            };
        case 6:
            let i = t.time - (e.pausedAt || 0);
            return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((r)=>({
                        ...r,
                        pauseDuration: r.pauseDuration + i
                    }))
            };
    }
}, v = [], j = {
    toasts: [],
    pausedAt: void 0,
    settings: {
        toastLimit: re
    }
}, f = {}, Y = (e, t = k)=>{
    f[t] = H(f[t] || j, e), v.forEach(([o, s])=>{
        o === t && s(f[t]);
    });
}, _ = (e)=>Object.keys(f).forEach((t)=>Y(e, t)), Q = (e)=>Object.keys(f).find((t)=>f[t].toasts.some((o)=>o.id === e)), S = (e = k)=>(t)=>{
        Y(t, e);
    }, se = {
    blank: 4e3,
    error: 4e3,
    success: 2e3,
    loading: 1 / 0,
    custom: 4e3
}, V = (e = {}, t = k)=>{
    let [o, s] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(f[t] || j), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(f[t]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(a.current !== f[t] && s(f[t]), v.push([
            t,
            s
        ]), ()=>{
            let r = v.findIndex(([l])=>l === t);
            r > -1 && v.splice(r, 1);
        }), [
        t
    ]);
    let i = o.toasts.map((r)=>{
        var l, g, T;
        return {
            ...e,
            ...e[r.type],
            ...r,
            removeDelay: r.removeDelay || ((l = e[r.type]) == null ? void 0 : l.removeDelay) || (e == null ? void 0 : e.removeDelay),
            duration: r.duration || ((g = e[r.type]) == null ? void 0 : g.duration) || (e == null ? void 0 : e.duration) || se[r.type],
            style: {
                ...e.style,
                ...(T = e[r.type]) == null ? void 0 : T.style,
                ...r.style
            }
        };
    });
    return {
        ...o,
        toasts: i
    };
};
var ie = (e, t = "blank", o)=>({
        createdAt: Date.now(),
        visible: !0,
        dismissed: !1,
        type: t,
        ariaProps: {
            role: "status",
            "aria-live": "polite"
        },
        message: e,
        pauseDuration: 0,
        ...o,
        id: (o == null ? void 0 : o.id) || W()
    }), P = (e)=>(t, o)=>{
        let s = ie(t, e, o);
        return S(s.toasterId || Q(s.id))({
            type: 2,
            toast: s
        }), s.id;
    }, n = (e, t)=>P("blank")(e, t);
n.error = P("error");
n.success = P("success");
n.loading = P("loading");
n.custom = P("custom");
n.dismiss = (e, t)=>{
    let o = {
        type: 3,
        toastId: e
    };
    t ? S(t)(o) : _(o);
};
n.dismissAll = (e)=>n.dismiss(void 0, e);
n.remove = (e, t)=>{
    let o = {
        type: 4,
        toastId: e
    };
    t ? S(t)(o) : _(o);
};
n.removeAll = (e)=>n.remove(void 0, e);
n.promise = (e, t, o)=>{
    let s = n.loading(t.loading, {
        ...o,
        ...o == null ? void 0 : o.loading
    });
    return typeof e == "function" && (e = e()), e.then((a)=>{
        let i = t.success ? h(t.success, a) : void 0;
        return i ? n.success(i, {
            id: s,
            ...o,
            ...o == null ? void 0 : o.success
        }) : n.dismiss(s), a;
    }).catch((a)=>{
        let i = t.error ? h(t.error, a) : void 0;
        i ? n.error(i, {
            id: s,
            ...o,
            ...o == null ? void 0 : o.error
        }) : n.dismiss(s);
    }), e;
};
;
var ce = 1e3, w = (e, t = "default")=>{
    let { toasts: o, pausedAt: s } = V(e, t), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map).current, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((c, m = ce)=>{
        if (a.has(c)) return;
        let p = setTimeout(()=>{
            a.delete(c), r({
                type: 4,
                toastId: c
            });
        }, m);
        a.set(c, p);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (s) return;
        let c = Date.now(), m = o.map((p)=>{
            if (p.duration === 1 / 0) return;
            let R = (p.duration || 0) + p.pauseDuration - (c - p.createdAt);
            if (R < 0) {
                p.visible && n.dismiss(p.id);
                return;
            }
            return setTimeout(()=>n.dismiss(p.id, t), R);
        });
        return ()=>{
            m.forEach((p)=>p && clearTimeout(p));
        };
    }, [
        o,
        s,
        t
    ]);
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(S(t), [
        t
    ]), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        r({
            type: 5,
            time: Date.now()
        });
    }, [
        r
    ]), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((c, m)=>{
        r({
            type: 1,
            toast: {
                id: c,
                height: m
            }
        });
    }, [
        r
    ]), T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        s && r({
            type: 6,
            time: Date.now()
        });
    }, [
        s,
        r
    ]), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((c, m)=>{
        let { reverseOrder: p = !1, gutter: R = 8, defaultPosition: z } = m || {}, O = o.filter((u)=>(u.position || z) === (c.position || z) && u.height), K = O.findIndex((u)=>u.id === c.id), B = O.filter((u, I)=>I < K && u.visible).length;
        return O.filter((u)=>u.visible).slice(...p ? [
            B + 1
        ] : [
            0,
            B
        ]).reduce((u, I)=>u + (I.height || 0) + R, 0);
    }, [
        o
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        o.forEach((c)=>{
            if (c.dismissed) i(c.id, c.removeDelay);
            else {
                let m = a.get(c.id);
                m && (clearTimeout(m), a.delete(c.id));
            }
        });
    }, [
        o,
        i
    ]), {
        toasts: o,
        handlers: {
            updateHeight: g,
            startPause: l,
            endPause: T,
            calculateOffset: d
        }
    };
};
;
;
;
;
;
var de = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, me = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, le = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e)=>e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
;
var Te = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e)=>e.secondary || "#e0e0e0"};
  border-right-color: ${(e)=>e.primary || "#616161"};
  animation: ${Te} 1s linear infinite;
`;
;
var ge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, he = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e)=>e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var be = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: absolute;
`, Se = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Ae = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Pe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, $ = ({ toast: e })=>{
    let { icon: t, type: o, iconTheme: s } = e;
    return t !== void 0 ? typeof t == "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](Pe, null, t) : t : o === "blank" ? null : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](Se, null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](F, {
        ...s
    }), o !== "loading" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](be, null, o === "error" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](C, {
        ...s
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](L, {
        ...s
    })));
};
var Re = (e)=>`
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, Ee = (e)=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, ve = "0%{opacity:0;} 100%{opacity:1;}", De = "0%{opacity:1;} 100%{opacity:0;}", Oe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styled"])("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, ke = (e, t)=>{
    let s = e.includes("top") ? 1 : -1, [a, i] = E() ? [
        ve,
        De
    ] : [
        Re(s),
        Ee(s)
    ];
    return {
        animation: t ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"])(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"])(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`
    };
}, N = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](({ toast: e, position: t, style: o, children: s })=>{
    let a = e.height ? ke(e.position || t || "top-center", e.visible) : {
        opacity: 0
    }, i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]($, {
        toast: e
    }), r = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](Ie, {
        ...e.ariaProps
    }, h(e.message, e));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](Oe, {
        className: e.className,
        style: {
            ...a,
            ...o,
            ...e.style
        }
    }, typeof s == "function" ? s({
        icon: i,
        message: r
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], null, i, r));
});
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setup"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]);
var we = ({ id: e, className: t, style: o, onHeightUpdate: s, children: a })=>{
    let i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((r)=>{
        if (r) {
            let l = ()=>{
                let g = r.getBoundingClientRect().height;
                s(e, g);
            };
            l(), new MutationObserver(l).observe(r, {
                subtree: !0,
                childList: !0,
                characterData: !0
            });
        }
    }, [
        e,
        s
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("div", {
        ref: i,
        className: t,
        style: o
    }, a);
}, Me = (e, t)=>{
    let o = e.includes("top"), s = o ? {
        top: 0
    } : {
        bottom: 0
    }, a = e.includes("center") ? {
        justifyContent: "center"
    } : e.includes("right") ? {
        justifyContent: "flex-end"
    } : {};
    return {
        left: 0,
        right: 0,
        display: "flex",
        position: "absolute",
        transition: E() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
        transform: `translateY(${t * (o ? 1 : -1)}px)`,
        ...s,
        ...a
    };
}, Ce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$goober$2f$dist$2f$goober$2e$modern$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, D = 16, Fe = ({ reverseOrder: e, position: t = "top-center", toastOptions: o, gutter: s, children: a, toasterId: i, containerStyle: r, containerClassName: l })=>{
    let { toasts: g, handlers: T } = w(o, i);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("div", {
        "data-rht-toaster": i || "",
        style: {
            position: "fixed",
            zIndex: 9999,
            top: D,
            left: D,
            right: D,
            bottom: D,
            pointerEvents: "none",
            ...r
        },
        className: l,
        onMouseEnter: T.startPause,
        onMouseLeave: T.endPause
    }, g.map((d)=>{
        let c = d.position || t, m = T.calculateOffset(d, {
            reverseOrder: e,
            gutter: s,
            defaultPosition: t
        }), p = Me(c, m);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](we, {
            id: d.id,
            key: d.id,
            onHeightUpdate: T.updateHeight,
            className: d.visible ? Ce : "",
            style: p
        }, d.type === "custom" ? h(d.message, d) : a ? a(d) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](N, {
            toast: d,
            position: c
        }));
    }));
};
var zt = n;
;
 //# sourceMappingURL=index.mjs.map
}),
];

//# sourceMappingURL=_ac770857._.js.map