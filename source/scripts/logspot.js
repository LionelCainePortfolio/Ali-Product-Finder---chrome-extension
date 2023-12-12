(() => {
    var e = {
            844: function (e, t) {
                "use strict";
                var r =
                        (this && this.__awaiter) ||
                        function (e, t, r, n) {
                            return new (r || (r = Promise))(function (o, i) {
                                function a(e) {
                                    try {
                                        u(n.next(e));
                                    } catch (e) {
                                        i(e);
                                    }
                                }
                                function s(e) {
                                    try {
                                        u(n.throw(e));
                                    } catch (e) {
                                        i(e);
                                    }
                                }
                                function u(e) {
                                    var t;
                                    e.done
                                        ? o(e.value)
                                        : ((t = e.value),
                                          t instanceof r
                                              ? t
                                              : new r(function (e) {
                                                    e(t);
                                                })).then(a, s);
                                }
                                u((n = n.apply(e, t || [])).next());
                            });
                        },
                    n =
                        (this && this.__generator) ||
                        function (e, t) {
                            var r,
                                n,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (r) throw new TypeError("Generator is already executing.");
                                        for (; a; )
                                            try {
                                                if (((r = 1), n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done)) return o;
                                                switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return a.label++, { value: i[1], done: !1 };
                                                    case 5:
                                                        a.label++, (n = i[1]), (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()), a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (6 === i[0] && a.label < o[1]) {
                                                            (a.label = o[1]), (o = i);
                                                            break;
                                                        }
                                                        if (o && a.label < o[2]) {
                                                            (a.label = o[2]), a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(), a.trys.pop();
                                                        continue;
                                                }
                                                i = t.call(e, a);
                                            } catch (e) {
                                                (i = [6, e]), (n = 0);
                                            } finally {
                                                r = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return { value: i[0] ? i[1] : void 0, done: !0 };
                                    })([i, s]);
                                };
                            }
                        };
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.trackEvent = void 0),
                    (t.trackEvent = function (e, t) {
                        return r(void 0, void 0, void 0, function () {
                            var r, o, i, a;
                            return n(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        if (!t.event) return console.error("Logspot - event parameter is required"), [2];
                                        n.label = 1;
                                    case 1:
                                        return (
                                            n.trys.push([1, 5, , 6]),
                                            [
                                                4,
                                                fetch(e.externalApiUrl ? e.externalApiUrl : "".concat("https://api.logspot.io", "/track"), {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json", "x-logspot-pk": e.publicKey },
                                                    mode: "cors",
                                                    body: JSON.stringify({
                                                        name: t.event,
                                                        message: t.message,
                                                        notify: t.notify,
                                                        user_id: t.userId,
                                                        metadata: null !== (i = t.metadata) && void 0 !== i ? i : {},
                                                        hostname: t.hostname,
                                                        url: t.url,
                                                        referrer: (null === (a = t.referrer) || void 0 === a ? void 0 : a.length) ? t.referrer : null,
                                                        language: t.language,
                                                        screen: t.screen,
                                                    }),
                                                }),
                                            ]
                                        );
                                    case 2:
                                        return 200 === (r = n.sent()).status ? [3, 4] : [4, r.json()];
                                    case 3:
                                        return (o = n.sent()), console.debug("Logspot - ", o), [2];
                                    case 4:
                                        return [3, 6];
                                    case 5:
                                        return n.sent(), console.error("Logspot - could not track event"), [3, 6];
                                    case 6:
                                        return [2];
                                }
                            });
                        });
                    });
            },
            381: function (e, t) {
                "use strict";
                var r =
                    (this && this.__assign) ||
                    function () {
                        return (
                            (r =
                                Object.assign ||
                                function (e) {
                                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                    return e;
                                }),
                            r.apply(this, arguments)
                        );
                    };
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.Campaign = t.CAMPAIGN_KEYWORDS = void 0),
                    (t.CAMPAIGN_KEYWORDS = ["gclid", "fbclid", "msclkid", "utm_source", "utm_id", "utm_medium", "utm_campaign", "utm_content", "utm_term"]);
                var n = (function () {
                    function e(e) {
                        (this.sdkConfig = e), (this.campaignParams = this._getParams());
                    }
                    return (
                        (e.prototype.getCampagingParams = function () {
                            var e = this._getParams();
                            return this.sdkConfig.stickyCampaigns ? r(r({}, this.campaignParams), e) : e;
                        }),
                        (e.prototype._getParams = function () {
                            var e = new URLSearchParams(window.location.search),
                                n = Object.fromEntries(e.entries());
                            return t.CAMPAIGN_KEYWORDS.reduce(function (e, t) {
                                var o, i;
                                return (null === (i = n[t]) || void 0 === i ? void 0 : i.length) ? r(r({}, e), (((o = {})[t] = n[t]), o)) : e;
                            }, {});
                        }),
                        e
                    );
                })();
                t.Campaign = n;
            },
            952: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.eraseCookie = t.getCookie = t.setCookie = t.LOGSPOT_COOKIE_ID = void 0),
                    (t.LOGSPOT_COOKIE_ID = "lgspt_uid"),
                    (t.setCookie = function (e, t, r, n) {
                        var o = new Date();
                        o.setTime(o.getTime() + 24 * r * 60 * 60 * 1e3);
                        var i = "; expires=" + o.toUTCString(),
                            a = n ? "; domain=".concat(n) : "";
                        document.cookie = e + "=" + (t || "") + a + i + "; path=/";
                    }),
                    (t.getCookie = function (e) {
                        for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
                            for (var o = r[n]; " " == o.charAt(0); ) o = o.substring(1, o.length);
                            if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
                        }
                        return null;
                    }),
                    (t.eraseCookie = function (e) {
                        document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    });
            },
            222: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.shouldDisableTracking = void 0),
                    (t.shouldDisableTracking = function () {
                        var e = "lgspt_dnt",
                            t = new URLSearchParams(window.location.search),
                            r = void 0 !== Object.fromEntries(t.entries()).dnt,
                            n = r || "1" === localStorage.getItem(e);
                        return r && localStorage.setItem(e, "1"), n;
                    });
            },
            964: function (e, t, r) {
                "use strict";
                var n =
                        (this && this.__assign) ||
                        function () {
                            return (
                                (n =
                                    Object.assign ||
                                    function (e) {
                                        for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                        return e;
                                    }),
                                n.apply(this, arguments)
                            );
                        },
                    o =
                        (this && this.__awaiter) ||
                        function (e, t, r, n) {
                            return new (r || (r = Promise))(function (o, i) {
                                function a(e) {
                                    try {
                                        u(n.next(e));
                                    } catch (e) {
                                        i(e);
                                    }
                                }
                                function s(e) {
                                    try {
                                        u(n.throw(e));
                                    } catch (e) {
                                        i(e);
                                    }
                                }
                                function u(e) {
                                    var t;
                                    e.done
                                        ? o(e.value)
                                        : ((t = e.value),
                                          t instanceof r
                                              ? t
                                              : new r(function (e) {
                                                    e(t);
                                                })).then(a, s);
                                }
                                u((n = n.apply(e, t || [])).next());
                            });
                        },
                    i =
                        (this && this.__generator) ||
                        function (e, t) {
                            var r,
                                n,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (r) throw new TypeError("Generator is already executing.");
                                        for (; a; )
                                            try {
                                                if (((r = 1), n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done)) return o;
                                                switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return a.label++, { value: i[1], done: !1 };
                                                    case 5:
                                                        a.label++, (n = i[1]), (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()), a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || (6 !== i[0] && 2 !== i[0]))) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (6 === i[0] && a.label < o[1]) {
                                                            (a.label = o[1]), (o = i);
                                                            break;
                                                        }
                                                        if (o && a.label < o[2]) {
                                                            (a.label = o[2]), a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(), a.trys.pop();
                                                        continue;
                                                }
                                                i = t.call(e, a);
                                            } catch (e) {
                                                (i = [6, e]), (n = 0);
                                            } finally {
                                                r = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return { value: i[0] ? i[1] : void 0, done: !0 };
                                    })([i, s]);
                                };
                            }
                        },
                    a =
                        (this && this.__rest) ||
                        function (e, t) {
                            var r = {};
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
                            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                                var o = 0;
                                for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
                            }
                            return r;
                        };
                Object.defineProperty(t, "__esModule", { value: !0 }), (t.logspot = void 0);
                var s,
                    u,
                    c,
                    l,
                    p,
                    d,
                    f,
                    h,
                    g,
                    v,
                    m,
                    y = r(844),
                    b = r(381),
                    O = r(952),
                    _ = r(222),
                    P = r(743),
                    w = r(983),
                    k = r(873),
                    C = { cookiesDisabled: !1, enableAutoPageviews: !0, enableAutoClicks: !1 };
                (t.logspot =
                    ((v = function (e) {
                        return o(void 0, void 0, void 0, function () {
                            return i(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return !s || u ? [2] : [4, g({ event: "Pageview", userId: null == e ? void 0 : e.userId, metadata: null == e ? void 0 : e.metadata })];
                                    case 1:
                                        return t.sent(), [2];
                                }
                            });
                        });
                    }),
                    (m = function () {
                        document.addEventListener(
                            "click",
                            function (e) {
                                var t,
                                    r = e.target;
                                if ((e.stopPropagation(), !((null == r ? void 0 : r.innerText) && (null == r ? void 0 : r.innerText) > 500))) {
                                    var n = null === (t = null == r ? void 0 : r.innerText) || void 0 === t ? void 0 : t.slice(0, 500).trim();
                                    g({ event: "Click", metadata: { id: r.id, tag: r.tagName, className: r.className, text: n, href: r.href } });
                                }
                            },
                            !1
                        );
                    }),
                    {
                        init: function (e) {
                            return o(void 0, void 0, void 0, function () {
                                var t, r, o, a, g, y, k, S, x, D, I, L;
                                return i(this, function (i) {
                                    switch (i.label) {
                                        case 0:
                                            if ("undefined" == typeof window) throw new Error("Logspot - script needs access to window object");
                                            return (u = (0, _.shouldDisableTracking)())
                                                ? [2]
                                                : ((s = n(n({}, C), e)),
                                                  (f = new P.SuperProperties(s)),
                                                  (h = new b.Campaign(s)),
                                                  (t = window.screen),
                                                  (r = t.width),
                                                  (o = t.height),
                                                  (a = window.navigator.language),
                                                  (g = window.location),
                                                  (y = g.hostname),
                                                  (k = g.pathname),
                                                  (S = g.search),
                                                  (x = window.document),
                                                  (D = "".concat(r, "x").concat(o)),
                                                  (l = "".concat(k).concat(S)),
                                                  (p = x.referrer),
                                                  e.cookiesDisabled || u
                                                      ? ((0, O.eraseCookie)(O.LOGSPOT_COOKIE_ID), (d = (0, w.getUid)()))
                                                      : ((I = (0, O.getCookie)(O.LOGSPOT_COOKIE_ID)), (d = null != I ? I : (0, w.getUid)()), I || (0, O.setCookie)(O.LOGSPOT_COOKIE_ID, d, 1800, s.cookieDomain)),
                                                  (c = function () {
                                                      return { hostname: y, screen: D, language: a };
                                                  }),
                                                  s.onLoad ? [4, s.onLoad()] : [3, 2]);
                                        case 1:
                                            i.sent(), (i.label = 2);
                                        case 2:
                                            return (
                                                (L = function () {
                                                    if ("complete" === x.readyState) {
                                                        s.enableAutoPageviews && v();
                                                        var e = x.querySelector("body");
                                                        new MutationObserver(function (e) {
                                                            e.forEach(function (e) {
                                                                if (l != x.location.href) {
                                                                    var t = x.location.href;
                                                                    (p = l), (l = "http" === t.substring(0, 4) ? "/" + t.split("/").splice(3).join("/") : t) !== p && s.enableAutoPageviews && v();
                                                                }
                                                            });
                                                        }).observe(e, { childList: !0, subtree: !0 });
                                                    }
                                                }),
                                                x.addEventListener("readystatechange", L, !0),
                                                L(),
                                                e.enableAutoClicks && m(),
                                                [2]
                                            );
                                    }
                                });
                            });
                        },
                        track: (g = function (e) {
                            return o(void 0, void 0, void 0, function () {
                                var t, r, o, g, v, m, O, _, P;
                                return i(this, function (i) {
                                    switch (i.label) {
                                        case 0:
                                            return !s || u
                                                ? [2]
                                                : s && (s.externalApiUrl || s.publicKey)
                                                ? ((t = c()),
                                                  (r = f.getProperties()),
                                                  (o = r.userId),
                                                  (g = a(r, ["userId"])),
                                                  (v = h.getCampagingParams()),
                                                  (m = (0, k.removeQueryParamsFromUrl)(l, b.CAMPAIGN_KEYWORDS)),
                                                  [
                                                      4,
                                                      (0, y.trackEvent)(s, {
                                                          event: e.event,
                                                          message: e.message,
                                                          notify: e.notify,
                                                          userId: null !== (_ = null !== (O = e.userId) && void 0 !== O ? O : o ? "".concat(o) : null) && void 0 !== _ ? _ : d,
                                                          hostname: t.hostname,
                                                          language: t.language,
                                                          referrer: p,
                                                          screen: t.screen,
                                                          url: m,
                                                          metadata: n(n(n({}, v), g), null !== (P = e.metadata) && void 0 !== P ? P : {}),
                                                      }),
                                                  ])
                                                : (console.error("Logspot - SDK not configured. You need to call: Logspot.init({publicKey: 'YOUR_PUBLIC_KEY'})"), [2]);
                                        case 1:
                                            return i.sent(), [2];
                                    }
                                });
                            });
                        }),
                        pageview: v,
                        register: function (e) {
                            return !(s && !u) || f.register(e);
                        },
                        unregister: function (e) {
                            s && !u && f.unregister(e);
                        },
                        reset: function () {
                            s && !u && ((0, O.eraseCookie)(O.LOGSPOT_COOKIE_ID), f.clear(), (d = (0, w.getUid)()), s.cookiesDisabled || u || (0, O.setCookie)(O.LOGSPOT_COOKIE_ID, d, 1800, s.cookieDomain));
                        },
                        getProperties: function () {
                            return !s || u ? {} : f.getProperties();
                        },
                    })),
                    (t.default = t.logspot);
            },
            743: function (e, t, r) {
                "use strict";
                var n =
                    (this && this.__assign) ||
                    function () {
                        return (
                            (n =
                                Object.assign ||
                                function (e) {
                                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                    return e;
                                }),
                            n.apply(this, arguments)
                        );
                    };
                Object.defineProperty(t, "__esModule", { value: !0 }), (t.SuperProperties = void 0);
                var o = r(952),
                    i = (function () {
                        function e(e) {
                            (this.sdkConfig = e), (this.LOGSPOT_PROPS = "lgspt_p"), (this.expiryDays = 30);
                            var t = (0, o.getCookie)(this.LOGSPOT_PROPS),
                                r = t ? JSON.parse(this.UnicodeDecodeB64(t)) : {};
                            this.properties = r;
                        }
                        return (
                            (e.prototype.register = function (e, t) {
                                (this.properties = n(n({}, this.properties), e)), void 0 !== t && (this.expiryDays = t), this._save();
                            }),
                            (e.prototype.unregister = function (e) {
                                delete this.properties[e], this._save();
                            }),
                            (e.prototype.clear = function () {
                                (this.properties = {}), (0, o.eraseCookie)(this.LOGSPOT_PROPS);
                            }),
                            (e.prototype.getProperties = function () {
                                return this.properties;
                            }),
                            (e.prototype._save = function () {
                                this.sdkConfig.cookiesDisabled || (0, o.setCookie)(this.LOGSPOT_PROPS, this.b64EncodeUnicode(JSON.stringify(this.properties)), this.expiryDays, this.sdkConfig.cookieDomain);
                            }),
                            (e.prototype.b64EncodeUnicode = function (e) {
                                return btoa(encodeURIComponent(e));
                            }),
                            (e.prototype.UnicodeDecodeB64 = function (e) {
                                return decodeURIComponent(atob(e));
                            }),
                            e
                        );
                    })();
                t.SuperProperties = i;
            },
            983: (e, t) => {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.getUid = void 0),
                    (t.getUid = function () {
                        return String.fromCharCode(Math.floor(26 * Math.random()) + 97) + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(4);
                    });
            },
            873: function (e, t) {
                "use strict";
                var r =
                    (this && this.__assign) ||
                    function () {
                        return (
                            (r =
                                Object.assign ||
                                function (e) {
                                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                    return e;
                                }),
                            r.apply(this, arguments)
                        );
                    };
                Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.removeQueryParamsFromUrl = void 0),
                    (t.removeQueryParamsFromUrl = function (e, t) {
                        try {
                            var n = e.split("?"),
                                o = n[0],
                                i = n[1],
                                a = new URLSearchParams(i).entries(),
                                s = Array.from(a).filter(function (e) {
                                    var r = e[0];
                                    return !t.includes(r);
                                }),
                                u = s.reduce(function (e, t) {
                                    var n,
                                        o = t[0],
                                        i = t[1];
                                    return r(r({}, e), (((n = {})[o] = i), n));
                                }, {});
                            if (!s.length) return o;
                            var c = new URLSearchParams(u);
                            return "".concat(o, "?").concat(c);
                        } catch (t) {
                            return e;
                        }
                    });
            },
            461: function (e, t, r) {
                var n,
                    o,
                    i =
                        (this && this.__importDefault) ||
                        function (e) {
                            return e && e.__esModule ? e : { default: e };
                        };
                (n = [r, t, r(964)]),
                    (o = function (e, t, r) {
                        "use strict";
                        Object.defineProperty(t, "__esModule", { value: !0 }),
                            (r = i(r)),
                            (function (e) {
                                var t = document.querySelector("script[data-logspot-pk]"),
                                    n = null == t ? void 0 : t.getAttribute("data-logspot-pk"),
                                    o = null == t ? void 0 : t.getAttribute("data-cookies-disabled"),
                                    i = null == t ? void 0 : t.getAttribute("data-domain");
                                if (!n) throw new Error("Missing data-logspot-pk in Logspot script");
                                r.default.init({
                                    enableAutoPageviews: !0,
                                    publicKey: n,
                                    cookiesDisabled: !!o,
                                    stickyCampaigns: !0,
                                    cookieDomain: null != i ? i : void 0,
                                    onLoad: function () {
                                        var t,
                                            n = null === (t = e) || void 0 === t ? void 0 : t.LogspotProps;
                                        n && r.default.register(n);
                                    },
                                }),
                                    (e.Logspot = r.default);
                            })(window);
                    }.apply(t, n)),
                    void 0 === o || (e.exports = o);
            },
        },
        t = {};
    !(function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = (t[n] = { exports: {} });
        return e[n].call(i.exports, i, i.exports, r), i.exports;
    })(461);
})();
