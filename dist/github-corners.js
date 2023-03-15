function bn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function jt(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = X(s) ? xr(s) : jt(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else {
    if (X(e))
      return e;
    if (J(e))
      return e;
  }
}
const _r = /;(?![^(]*\))/g, mr = /:([^]+)/, br = new RegExp("\\/\\*.*?\\*\\/", "gs");
function xr(e) {
  const t = {};
  return e.replace(br, "").split(_r).forEach((n) => {
    if (n) {
      const s = n.split(mr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function xn(e) {
  let t = "";
  if (X(e))
    t = e;
  else if (I(e))
    for (let n = 0; n < e.length; n++) {
      const s = xn(e[n]);
      s && (t += s + " ");
    }
  else if (J(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Cr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yr = /* @__PURE__ */ bn(Cr);
function Es(e) {
  return !!e || e === "";
}
const D = {}, Ge = [], _e = () => {
}, wr = () => !1, Er = /^on[^a-z]/, Ht = (e) => Er.test(e), Cn = (e) => e.startsWith("onUpdate:"), Z = Object.assign, yn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, vr = Object.prototype.hasOwnProperty, L = (e, t) => vr.call(e, t), I = Array.isArray, ct = (e) => Bt(e) === "[object Map]", Tr = (e) => Bt(e) === "[object Set]", M = (e) => typeof e == "function", X = (e) => typeof e == "string", wn = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", vs = (e) => J(e) && M(e.then) && M(e.catch), Or = Object.prototype.toString, Bt = (e) => Or.call(e), Pr = (e) => Bt(e).slice(8, -1), Ar = (e) => Bt(e) === "[object Object]", En = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ bn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), St = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ir = /-(\w)/g, Pe = St((e) => e.replace(Ir, (t, n) => n ? n.toUpperCase() : "")), Fr = /\B([A-Z])/g, de = St((e) => e.replace(Fr, "-$1").toLowerCase()), Ts = St((e) => e.charAt(0).toUpperCase() + e.slice(1)), Jt = St((e) => e ? `on${Ts(e)}` : ""), Mt = (e, t) => !Object.is(e, t), Yt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Nt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Mr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, kn = (e) => {
  const t = X(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let qn;
const Nr = () => qn || (qn = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let ae;
class Rr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ae, !t && ae && (this.index = (ae.scopes || (ae.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ae;
      try {
        return ae = this, t();
      } finally {
        ae = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ae = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ae = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Lr(e, t = ae) {
  t && t.active && t.effects.push(e);
}
function jr() {
  return ae;
}
const vn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Os = (e) => (e.w & Be) > 0, Ps = (e) => (e.n & Be) > 0, Hr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Be;
}, Br = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Os(r) && !Ps(r) ? r.delete(e) : t[n++] = r, r.w &= ~Be, r.n &= ~Be;
    }
    t.length = n;
  }
}, sn = /* @__PURE__ */ new WeakMap();
let lt = 0, Be = 1;
const rn = 30;
let he;
const qe = Symbol(""), on = Symbol("");
class Tn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Lr(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = he, n = Le;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = he, he = this, Le = !0, Be = 1 << ++lt, lt <= rn ? Hr(this) : Jn(this), this.fn();
    } finally {
      lt <= rn && Br(this), Be = 1 << --lt, he = this.parent, Le = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    he === this ? this.deferStop = !0 : this.active && (Jn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Jn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Le = !0;
const As = [];
function st() {
  As.push(Le), Le = !1;
}
function rt() {
  const e = As.pop();
  Le = e === void 0 ? !0 : e;
}
function re(e, t, n) {
  if (Le && he) {
    let s = sn.get(e);
    s || sn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = vn()), Is(r);
  }
}
function Is(e, t) {
  let n = !1;
  lt <= rn ? Ps(e) || (e.n |= Be, n = !Os(e)) : n = !e.has(he), n && (e.add(he), he.deps.push(e));
}
function Ie(e, t, n, s, r, i) {
  const o = sn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && I(e)) {
    const u = Number(s);
    o.forEach((d, g) => {
      (g === "length" || g >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        I(e) ? En(n) && c.push(o.get("length")) : (c.push(o.get(qe)), ct(e) && c.push(o.get(on)));
        break;
      case "delete":
        I(e) || (c.push(o.get(qe)), ct(e) && c.push(o.get(on)));
        break;
      case "set":
        ct(e) && c.push(o.get(qe));
        break;
    }
  if (c.length === 1)
    c[0] && ln(c[0]);
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    ln(vn(u));
  }
}
function ln(e, t) {
  const n = I(e) ? e : [...e];
  for (const s of n)
    s.computed && Yn(s);
  for (const s of n)
    s.computed || Yn(s);
}
function Yn(e, t) {
  (e !== he || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Sr = /* @__PURE__ */ bn("__proto__,__v_isRef,__isVue"), Fs = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(wn)
), Ur = /* @__PURE__ */ On(), Kr = /* @__PURE__ */ On(!1, !0), Dr = /* @__PURE__ */ On(!0), Zn = /* @__PURE__ */ $r();
function $r() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = j(this);
      for (let i = 0, o = this.length; i < o; i++)
        re(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(j)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      st();
      const s = j(this)[t].apply(this, n);
      return rt(), s;
    };
  }), e;
}
function Wr(e) {
  const t = j(this);
  return re(t, "has", e), t.hasOwnProperty(e);
}
function On(e = !1, t = !1) {
  return function(s, r, i) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && i === (e ? t ? ii : js : t ? Ls : Rs).get(s))
      return s;
    const o = I(s);
    if (!e) {
      if (o && L(Zn, r))
        return Reflect.get(Zn, r, i);
      if (r === "hasOwnProperty")
        return Wr;
    }
    const c = Reflect.get(s, r, i);
    return (wn(r) ? Fs.has(r) : Sr(r)) || (e || re(s, "get", r), t) ? c : ne(c) ? o && En(r) ? c : c.value : J(c) ? e ? Hs(c) : In(c) : c;
  };
}
const zr = /* @__PURE__ */ Ms(), Vr = /* @__PURE__ */ Ms(!0);
function Ms(e = !1) {
  return function(n, s, r, i) {
    let o = n[s];
    if (at(o) && ne(o) && !ne(r))
      return !1;
    if (!e && (!cn(r) && !at(r) && (o = j(o), r = j(r)), !I(n) && ne(o) && !ne(r)))
      return o.value = r, !0;
    const c = I(n) && En(s) ? Number(s) < n.length : L(n, s), u = Reflect.set(n, s, r, i);
    return n === j(i) && (c ? Mt(r, o) && Ie(n, "set", s, r) : Ie(n, "add", s, r)), u;
  };
}
function kr(e, t) {
  const n = L(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ie(e, "delete", t, void 0), s;
}
function qr(e, t) {
  const n = Reflect.has(e, t);
  return (!wn(t) || !Fs.has(t)) && re(e, "has", t), n;
}
function Jr(e) {
  return re(e, "iterate", I(e) ? "length" : qe), Reflect.ownKeys(e);
}
const Ns = {
  get: Ur,
  set: zr,
  deleteProperty: kr,
  has: qr,
  ownKeys: Jr
}, Yr = {
  get: Dr,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Zr = /* @__PURE__ */ Z({}, Ns, {
  get: Kr,
  set: Vr
}), Pn = (e) => e, Ut = (e) => Reflect.getPrototypeOf(e);
function xt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = j(e), i = j(t);
  n || (t !== i && re(r, "get", t), re(r, "get", i));
  const { has: o } = Ut(r), c = s ? Pn : n ? Nn : Mn;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function Ct(e, t = !1) {
  const n = this.__v_raw, s = j(n), r = j(e);
  return t || (e !== r && re(s, "has", e), re(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function yt(e, t = !1) {
  return e = e.__v_raw, !t && re(j(e), "iterate", qe), Reflect.get(e, "size", e);
}
function Xn(e) {
  e = j(e);
  const t = j(this);
  return Ut(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function Qn(e, t) {
  t = j(t);
  const n = j(this), { has: s, get: r } = Ut(n);
  let i = s.call(n, e);
  i || (e = j(e), i = s.call(n, e));
  const o = r.call(n, e);
  return n.set(e, t), i ? Mt(t, o) && Ie(n, "set", e, t) : Ie(n, "add", e, t), this;
}
function Gn(e) {
  const t = j(this), { has: n, get: s } = Ut(t);
  let r = n.call(t, e);
  r || (e = j(e), r = n.call(t, e)), s && s.call(t, e);
  const i = t.delete(e);
  return r && Ie(t, "delete", e, void 0), i;
}
function es() {
  const e = j(this), t = e.size !== 0, n = e.clear();
  return t && Ie(e, "clear", void 0, void 0), n;
}
function wt(e, t) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = j(o), u = t ? Pn : e ? Nn : Mn;
    return !e && re(c, "iterate", qe), o.forEach((d, g) => s.call(r, u(d), u(g), i));
  };
}
function Et(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = j(r), o = ct(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, d = r[e](...s), g = n ? Pn : t ? Nn : Mn;
    return !t && re(i, "iterate", u ? on : qe), {
      // iterator protocol
      next() {
        const { value: C, done: w } = d.next();
        return w ? { value: C, done: w } : {
          value: c ? [g(C[0]), g(C[1])] : g(C),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ne(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Xr() {
  const e = {
    get(i) {
      return xt(this, i);
    },
    get size() {
      return yt(this);
    },
    has: Ct,
    add: Xn,
    set: Qn,
    delete: Gn,
    clear: es,
    forEach: wt(!1, !1)
  }, t = {
    get(i) {
      return xt(this, i, !1, !0);
    },
    get size() {
      return yt(this);
    },
    has: Ct,
    add: Xn,
    set: Qn,
    delete: Gn,
    clear: es,
    forEach: wt(!1, !0)
  }, n = {
    get(i) {
      return xt(this, i, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(i) {
      return Ct.call(this, i, !0);
    },
    add: Ne(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ne(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ne(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ne(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: wt(!0, !1)
  }, s = {
    get(i) {
      return xt(this, i, !0, !0);
    },
    get size() {
      return yt(this, !0);
    },
    has(i) {
      return Ct.call(this, i, !0);
    },
    add: Ne(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ne(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ne(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ne(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: wt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = Et(i, !1, !1), n[i] = Et(i, !0, !1), t[i] = Et(i, !1, !0), s[i] = Et(i, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Qr, Gr, ei, ti] = /* @__PURE__ */ Xr();
function An(e, t) {
  const n = t ? e ? ti : ei : e ? Gr : Qr;
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(L(n, r) && r in s ? n : s, r, i);
}
const ni = {
  get: /* @__PURE__ */ An(!1, !1)
}, si = {
  get: /* @__PURE__ */ An(!1, !0)
}, ri = {
  get: /* @__PURE__ */ An(!0, !1)
}, Rs = /* @__PURE__ */ new WeakMap(), Ls = /* @__PURE__ */ new WeakMap(), js = /* @__PURE__ */ new WeakMap(), ii = /* @__PURE__ */ new WeakMap();
function oi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function li(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Pr(e));
}
function In(e) {
  return at(e) ? e : Fn(e, !1, Ns, ni, Rs);
}
function ci(e) {
  return Fn(e, !1, Zr, si, Ls);
}
function Hs(e) {
  return Fn(e, !0, Yr, ri, js);
}
function Fn(e, t, n, s, r) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = li(e);
  if (o === 0)
    return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return r.set(e, c), c;
}
function et(e) {
  return at(e) ? et(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function cn(e) {
  return !!(e && e.__v_isShallow);
}
function Bs(e) {
  return et(e) || at(e);
}
function j(e) {
  const t = e && e.__v_raw;
  return t ? j(t) : e;
}
function Ss(e) {
  return Nt(e, "__v_skip", !0), e;
}
const Mn = (e) => J(e) ? In(e) : e, Nn = (e) => J(e) ? Hs(e) : e;
function fi(e) {
  Le && he && (e = j(e), Is(e.dep || (e.dep = vn())));
}
function ui(e, t) {
  e = j(e);
  const n = e.dep;
  n && ln(n);
}
function ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ot(e) {
  return ne(e) ? e.value : e;
}
const ai = {
  get: (e, t, n) => Ot(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ne(r) && !ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Us(e) {
  return et(e) ? e : new Proxy(e, ai);
}
var Ks;
class di {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ks] = !1, this._dirty = !0, this.effect = new Tn(t, () => {
      this._dirty || (this._dirty = !0, ui(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = j(this);
    return fi(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Ks = "__v_isReadonly";
function hi(e, t, n = !1) {
  let s, r;
  const i = M(e);
  return i ? (s = e, r = _e) : (s = e.get, r = e.set), new di(s, r, i || !r, n);
}
function je(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    Kt(i, t, n);
  }
  return r;
}
function fe(e, t, n, s) {
  if (M(e)) {
    const i = je(e, t, n, s);
    return i && vs(i) && i.catch((o) => {
      Kt(o, t, n);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(fe(e[i], t, n, s));
  return r;
}
function Kt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy, c = n;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let g = 0; g < d.length; g++)
          if (d[g](e, o, c) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      je(u, null, 10, [e, o, c]);
      return;
    }
  }
  pi(e, n, r, s);
}
function pi(e, t, n, s = !0) {
  console.error(e);
}
let dt = !1, fn = !1;
const G = [];
let Ee = 0;
const tt = [];
let Oe = null, ze = 0;
const Ds = /* @__PURE__ */ Promise.resolve();
let Rn = null;
function $s(e) {
  const t = Rn || Ds;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gi(e) {
  let t = Ee + 1, n = G.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ht(G[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Ln(e) {
  (!G.length || !G.includes(e, dt && e.allowRecurse ? Ee + 1 : Ee)) && (e.id == null ? G.push(e) : G.splice(gi(e.id), 0, e), Ws());
}
function Ws() {
  !dt && !fn && (fn = !0, Rn = Ds.then(Vs));
}
function _i(e) {
  const t = G.indexOf(e);
  t > Ee && G.splice(t, 1);
}
function mi(e) {
  I(e) ? tt.push(...e) : (!Oe || !Oe.includes(e, e.allowRecurse ? ze + 1 : ze)) && tt.push(e), Ws();
}
function ts(e, t = dt ? Ee + 1 : 0) {
  for (; t < G.length; t++) {
    const n = G[t];
    n && n.pre && (G.splice(t, 1), t--, n());
  }
}
function zs(e) {
  if (tt.length) {
    const t = [...new Set(tt)];
    if (tt.length = 0, Oe) {
      Oe.push(...t);
      return;
    }
    for (Oe = t, Oe.sort((n, s) => ht(n) - ht(s)), ze = 0; ze < Oe.length; ze++)
      Oe[ze]();
    Oe = null, ze = 0;
  }
}
const ht = (e) => e.id == null ? 1 / 0 : e.id, bi = (e, t) => {
  const n = ht(e) - ht(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Vs(e) {
  fn = !1, dt = !0, G.sort(bi);
  const t = _e;
  try {
    for (Ee = 0; Ee < G.length; Ee++) {
      const n = G[Ee];
      n && n.active !== !1 && je(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    Ee = 0, G.length = 0, zs(), dt = !1, Rn = null, (G.length || tt.length) && Vs();
  }
}
function xi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || D;
  let r = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in s) {
    const g = `${o === "modelValue" ? "model" : o}Modifiers`, { number: C, trim: w } = s[g] || D;
    w && (r = n.map((A) => X(A) ? A.trim() : A)), C && (r = n.map(Mr));
  }
  let c, u = s[c = Jt(t)] || // also try camelCase event handler (#2249)
  s[c = Jt(Pe(t))];
  !u && i && (u = s[c = Jt(de(t))]), u && fe(u, e, 6, r);
  const d = s[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, fe(d, e, 6, r);
  }
}
function ks(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, c = !1;
  if (!M(e)) {
    const u = (d) => {
      const g = ks(d, t, !0);
      g && (c = !0, Z(o, g));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (J(e) && s.set(e, null), null) : (I(i) ? i.forEach((u) => o[u] = null) : Z(o, i), J(e) && s.set(e, o), o);
}
function Dt(e, t) {
  return !e || !Ht(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, de(t)) || L(e, t));
}
let pe = null, qs = null;
function Rt(e) {
  const t = pe;
  return pe = e, qs = e && e.type.__scopeId || null, t;
}
function Ci(e, t = pe, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && as(-1);
    const i = Rt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Rt(i), s._d && as(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Zt(e) {
  const { type: t, vnode: n, proxy: s, withProxy: r, props: i, propsOptions: [o], slots: c, attrs: u, emit: d, render: g, renderCache: C, data: w, setupState: A, ctx: H, inheritAttrs: O } = e;
  let V, S;
  const le = Rt(e);
  try {
    if (n.shapeFlag & 4) {
      const $ = r || s;
      V = we(g.call($, $, C, i, A, w, H)), S = u;
    } else {
      const $ = t;
      V = we($.length > 1 ? $(i, { attrs: u, slots: c, emit: d }) : $(
        i,
        null
        /* we know it doesn't need it */
      )), S = t.props ? u : yi(u);
    }
  } catch ($) {
    ut.length = 0, Kt(
      $,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), V = He(Ae);
  }
  let F = V;
  if (S && O !== !1) {
    const $ = Object.keys(S), { shapeFlag: Q } = F;
    $.length && Q & 7 && (o && $.some(Cn) && (S = wi(S, o)), F = Se(F, S));
  }
  return n.dirs && (F = Se(F), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition && (F.transition = n.transition), V = F, Rt(le), V;
}
const yi = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ht(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, wi = (e, t) => {
  const n = {};
  for (const s in e)
    (!Cn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ei(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: c, patchFlag: u } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? ns(s, o, d) : !!o;
    if (u & 8) {
      const g = t.dynamicProps;
      for (let C = 0; C < g.length; C++) {
        const w = g[C];
        if (o[w] !== s[w] && !Dt(d, w))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? ns(s, o, d) : !0 : !!o;
  return !1;
}
function ns(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Dt(n, i))
      return !0;
  }
  return !1;
}
function vi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ti = (e) => e.__isSuspense;
function Oi(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : mi(e);
}
function Pi(e, t) {
  if (q) {
    let n = q.provides;
    const s = q.parent && q.parent.provides;
    s === n && (n = q.provides = Object.create(s)), n[e] = t;
  }
}
function Pt(e, t, n = !1) {
  const s = q || pe;
  if (s) {
    const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(s.proxy) : t;
  }
}
const vt = {};
function Xt(e, t, n) {
  return Js(e, t, n);
}
function Js(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = D) {
  const c = jr() === (q == null ? void 0 : q.scope) ? q : null;
  let u, d = !1, g = !1;
  if (ne(e) ? (u = () => e.value, d = cn(e)) : et(e) ? (u = () => e, s = !0) : I(e) ? (g = !0, d = e.some((F) => et(F) || cn(F)), u = () => e.map((F) => {
    if (ne(F))
      return F.value;
    if (et(F))
      return Qe(F);
    if (M(F))
      return je(
        F,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : M(e) ? t ? u = () => je(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(c && c.isUnmounted))
      return C && C(), fe(e, c, 3, [w]);
  } : u = _e, t && s) {
    const F = u;
    u = () => Qe(F());
  }
  let C, w = (F) => {
    C = S.onStop = () => {
      je(
        F,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, A;
  if (gt)
    if (w = _e, t ? n && fe(t, c, 3, [
      u(),
      g ? [] : void 0,
      w
    ]) : u(), r === "sync") {
      const F = vo();
      A = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return _e;
  let H = g ? new Array(e.length).fill(vt) : vt;
  const O = () => {
    if (S.active)
      if (t) {
        const F = S.run();
        (s || d || (g ? F.some(($, Q) => Mt($, H[Q])) : Mt(F, H))) && (C && C(), fe(t, c, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          H === vt ? void 0 : g && H[0] === vt ? [] : H,
          w
        ]), H = F);
      } else
        S.run();
  };
  O.allowRecurse = !!t;
  let V;
  r === "sync" ? V = O : r === "post" ? V = () => se(O, c && c.suspense) : (O.pre = !0, c && (O.id = c.uid), V = () => Ln(O));
  const S = new Tn(u, V);
  t ? n ? O() : H = S.run() : r === "post" ? se(S.run.bind(S), c && c.suspense) : S.run();
  const le = () => {
    S.stop(), c && c.scope && yn(c.scope.effects, S);
  };
  return A && A.push(le), le;
}
function Ai(e, t, n) {
  const s = this.proxy, r = X(e) ? e.includes(".") ? Ys(s, e) : () => s[e] : e.bind(s, s);
  let i;
  M(t) ? i = t : (i = t.handler, n = t);
  const o = q;
  nt(this);
  const c = Js(r, i.bind(s), n);
  return o ? nt(o) : Je(), c;
}
function Ys(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Qe(e, t) {
  if (!J(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), ne(e))
    Qe(e.value, t);
  else if (I(e))
    for (let n = 0; n < e.length; n++)
      Qe(e[n], t);
  else if (Tr(e) || ct(e))
    e.forEach((n) => {
      Qe(n, t);
    });
  else if (Ar(e))
    for (const n in e)
      Qe(e[n], t);
  return e;
}
function Ii() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return er(() => {
    e.isMounted = !0;
  }), tr(() => {
    e.isUnmounting = !0;
  }), e;
}
const ce = [Function, Array], Fi = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: ce,
    onEnter: ce,
    onAfterEnter: ce,
    onEnterCancelled: ce,
    // leave
    onBeforeLeave: ce,
    onLeave: ce,
    onAfterLeave: ce,
    onLeaveCancelled: ce,
    // appear
    onBeforeAppear: ce,
    onAppear: ce,
    onAfterAppear: ce,
    onAppearCancelled: ce
  },
  setup(e, { slots: t }) {
    const n = mo(), s = Ii();
    let r;
    return () => {
      const i = t.default && Xs(t.default(), !0);
      if (!i || !i.length)
        return;
      let o = i[0];
      if (i.length > 1) {
        for (const O of i)
          if (O.type !== Ae) {
            o = O;
            break;
          }
      }
      const c = j(e), { mode: u } = c;
      if (s.isLeaving)
        return Qt(o);
      const d = ss(o);
      if (!d)
        return Qt(o);
      const g = un(d, c, s, n);
      an(d, g);
      const C = n.subTree, w = C && ss(C);
      let A = !1;
      const { getTransitionKey: H } = d.type;
      if (H) {
        const O = H();
        r === void 0 ? r = O : O !== r && (r = O, A = !0);
      }
      if (w && w.type !== Ae && (!Ve(d, w) || A)) {
        const O = un(w, c, s, n);
        if (an(w, O), u === "out-in")
          return s.isLeaving = !0, O.afterLeave = () => {
            s.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Qt(o);
        u === "in-out" && d.type !== Ae && (O.delayLeave = (V, S, le) => {
          const F = Zs(s, w);
          F[String(w.key)] = w, V._leaveCb = () => {
            S(), V._leaveCb = void 0, delete g.delayedLeave;
          }, g.delayedLeave = le;
        });
      }
      return o;
    };
  }
}, Mi = Fi;
function Zs(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function un(e, t, n, s) {
  const { appear: r, mode: i, persisted: o = !1, onBeforeEnter: c, onEnter: u, onAfterEnter: d, onEnterCancelled: g, onBeforeLeave: C, onLeave: w, onAfterLeave: A, onLeaveCancelled: H, onBeforeAppear: O, onAppear: V, onAfterAppear: S, onAppearCancelled: le } = t, F = String(e.key), $ = Zs(n, e), Q = (N, Y) => {
    N && fe(N, s, 9, Y);
  }, Ye = (N, Y) => {
    const W = Y[1];
    Q(N, Y), I(N) ? N.every((ie) => ie.length <= 1) && W() : N.length <= 1 && W();
  }, Me = {
    mode: i,
    persisted: o,
    beforeEnter(N) {
      let Y = c;
      if (!n.isMounted)
        if (r)
          Y = O || c;
        else
          return;
      N._leaveCb && N._leaveCb(
        !0
        /* cancelled */
      );
      const W = $[F];
      W && Ve(e, W) && W.el._leaveCb && W.el._leaveCb(), Q(Y, [N]);
    },
    enter(N) {
      let Y = u, W = d, ie = g;
      if (!n.isMounted)
        if (r)
          Y = V || u, W = S || d, ie = le || g;
        else
          return;
      let me = !1;
      const ve = N._enterCb = (it) => {
        me || (me = !0, it ? Q(ie, [N]) : Q(W, [N]), Me.delayedLeave && Me.delayedLeave(), N._enterCb = void 0);
      };
      Y ? Ye(Y, [N, ve]) : ve();
    },
    leave(N, Y) {
      const W = String(e.key);
      if (N._enterCb && N._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return Y();
      Q(C, [N]);
      let ie = !1;
      const me = N._leaveCb = (ve) => {
        ie || (ie = !0, Y(), ve ? Q(H, [N]) : Q(A, [N]), N._leaveCb = void 0, $[W] === e && delete $[W]);
      };
      $[W] = e, w ? Ye(w, [N, me]) : me();
    },
    clone(N) {
      return un(N, t, n, s);
    }
  };
  return Me;
}
function Qt(e) {
  if ($t(e))
    return e = Se(e), e.children = null, e;
}
function ss(e) {
  return $t(e) ? e.children ? e.children[0] : void 0 : e;
}
function an(e, t) {
  e.shapeFlag & 6 && e.component ? an(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Xs(e, t = !1, n) {
  let s = [], r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === ye ? (o.patchFlag & 128 && r++, s = s.concat(Xs(o.children, t, c))) : (t || o.type !== Ae) && s.push(c != null ? Se(o, { key: c }) : o);
  }
  if (r > 1)
    for (let i = 0; i < s.length; i++)
      s[i].patchFlag = -2;
  return s;
}
function Qs(e) {
  return M(e) ? { setup: e, name: e.name } : e;
}
const At = (e) => !!e.type.__asyncLoader, $t = (e) => e.type.__isKeepAlive;
function Ni(e, t) {
  Gs(e, "a", t);
}
function Ri(e, t) {
  Gs(e, "da", t);
}
function Gs(e, t, n = q) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Wt(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      $t(r.parent.vnode) && Li(s, t, n, r), r = r.parent;
  }
}
function Li(e, t, n, s) {
  const r = Wt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  nr(() => {
    yn(s[t], r);
  }, n);
}
function Wt(e, t, n = q, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      st(), nt(n);
      const c = fe(t, n, e, o);
      return Je(), rt(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Fe = (e) => (t, n = q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!gt || e === "sp") && Wt(e, (...s) => t(...s), n)
), ji = Fe(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), er = Fe(
  "m"
  /* LifecycleHooks.MOUNTED */
), Hi = Fe(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Bi = Fe(
  "u"
  /* LifecycleHooks.UPDATED */
), tr = Fe(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), nr = Fe(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Si = Fe(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Ui = Fe(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Ki = Fe(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Di(e, t = q) {
  Wt("ec", e, t);
}
function De(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    i && (c.oldValue = i[o].value);
    let u = c.dir[s];
    u && (st(), fe(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), rt());
  }
}
const $i = Symbol(), dn = (e) => e ? dr(e) ? Sn(e) || e.proxy : dn(e.parent) : null, ft = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => dn(e.parent),
    $root: (e) => dn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => jn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ln(e.update)),
    $nextTick: (e) => e.n || (e.n = $s.bind(e.proxy)),
    $watch: (e) => Ai.bind(e)
  })
), Gt = (e, t) => e !== D && !e.__isScriptSetup && L(e, t), Wi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let d;
    if (t[0] !== "$") {
      const A = o[t];
      if (A !== void 0)
        switch (A) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Gt(s, t))
          return o[t] = 1, s[t];
        if (r !== D && L(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && L(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== D && L(n, t))
          return o[t] = 4, n[t];
        hn && (o[t] = 0);
      }
    }
    const g = ft[t];
    let C, w;
    if (g)
      return t === "$attrs" && re(e, "get", t), g(e);
    if (
      // css module (injected by vue-loader)
      (C = c.__cssModules) && (C = C[t])
    )
      return C;
    if (n !== D && L(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = u.config.globalProperties, L(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Gt(r, t) ? (r[t] = n, !0) : s !== D && L(s, t) ? (s[t] = n, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) {
    let c;
    return !!n[o] || e !== D && L(e, o) || Gt(t, o) || (c = i[0]) && L(c, o) || L(s, o) || L(ft, o) || L(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : L(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let hn = !0;
function zi(e) {
  const t = jn(e), n = e.proxy, s = e.ctx;
  hn = !1, t.beforeCreate && rs(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: u,
    inject: d,
    // lifecycle
    created: g,
    beforeMount: C,
    mounted: w,
    beforeUpdate: A,
    updated: H,
    activated: O,
    deactivated: V,
    beforeDestroy: S,
    beforeUnmount: le,
    destroyed: F,
    unmounted: $,
    render: Q,
    renderTracked: Ye,
    renderTriggered: Me,
    errorCaptured: N,
    serverPrefetch: Y,
    // public API
    expose: W,
    inheritAttrs: ie,
    // assets
    components: me,
    directives: ve,
    filters: it
  } = t;
  if (d && Vi(d, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const z in o) {
      const U = o[z];
      M(U) && (s[z] = U.bind(n));
    }
  if (r) {
    const z = r.call(n, n);
    J(z) && (e.data = In(z));
  }
  if (hn = !0, i)
    for (const z in i) {
      const U = i[z], Ue = M(U) ? U.bind(n, n) : M(U.get) ? U.get.bind(n, n) : _e, mt = !M(U) && M(U.set) ? U.set.bind(n) : _e, Ke = Ft({
        get: Ue,
        set: mt
      });
      Object.defineProperty(s, z, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (be) => Ke.value = be
      });
    }
  if (c)
    for (const z in c)
      sr(c[z], s, n, z);
  if (u) {
    const z = M(u) ? u.call(n) : u;
    Reflect.ownKeys(z).forEach((U) => {
      Pi(U, z[U]);
    });
  }
  g && rs(
    g,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ee(z, U) {
    I(U) ? U.forEach((Ue) => z(Ue.bind(n))) : U && z(U.bind(n));
  }
  if (ee(ji, C), ee(er, w), ee(Hi, A), ee(Bi, H), ee(Ni, O), ee(Ri, V), ee(Di, N), ee(Ki, Ye), ee(Ui, Me), ee(tr, le), ee(nr, $), ee(Si, Y), I(W))
    if (W.length) {
      const z = e.exposed || (e.exposed = {});
      W.forEach((U) => {
        Object.defineProperty(z, U, {
          get: () => n[U],
          set: (Ue) => n[U] = Ue
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Q && e.render === _e && (e.render = Q), ie != null && (e.inheritAttrs = ie), me && (e.components = me), ve && (e.directives = ve);
}
function Vi(e, t, n = _e, s = !1) {
  I(e) && (e = pn(e));
  for (const r in e) {
    const i = e[r];
    let o;
    J(i) ? "default" in i ? o = Pt(
      i.from || r,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = Pt(i.from || r) : o = Pt(i), ne(o) && s ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : t[r] = o;
  }
}
function rs(e, t, n) {
  fe(I(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function sr(e, t, n, s) {
  const r = s.includes(".") ? Ys(n, s) : () => n[s];
  if (X(e)) {
    const i = t[e];
    M(i) && Xt(r, i);
  } else if (M(e))
    Xt(r, e.bind(n));
  else if (J(e))
    if (I(e))
      e.forEach((i) => sr(i, t, n, s));
    else {
      const i = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(i) && Xt(r, i, e);
    }
}
function jn(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, c = i.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((d) => Lt(u, d, o, !0)), Lt(u, t, o)), J(t) && i.set(t, u), u;
}
function Lt(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Lt(e, i, n, !0), r && r.forEach((o) => Lt(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = ki[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const ki = {
  data: is,
  props: We,
  emits: We,
  // objects
  methods: We,
  computed: We,
  // lifecycle
  beforeCreate: te,
  created: te,
  beforeMount: te,
  mounted: te,
  beforeUpdate: te,
  updated: te,
  beforeDestroy: te,
  beforeUnmount: te,
  destroyed: te,
  unmounted: te,
  activated: te,
  deactivated: te,
  errorCaptured: te,
  serverPrefetch: te,
  // assets
  components: We,
  directives: We,
  // watch
  watch: Ji,
  // provide / inject
  provide: is,
  inject: qi
};
function is(e, t) {
  return t ? e ? function() {
    return Z(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
  } : t : e;
}
function qi(e, t) {
  return We(pn(e), pn(t));
}
function pn(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function We(e, t) {
  return e ? Z(Z(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Ji(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Z(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = te(e[s], t[s]);
  return n;
}
function Yi(e, t, n, s = !1) {
  const r = {}, i = {};
  Nt(i, Vt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), rr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ci(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Zi(e, t, n, s) {
  const { props: r, attrs: i, vnode: { patchFlag: o } } = e, c = j(r), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const g = e.vnode.dynamicProps;
      for (let C = 0; C < g.length; C++) {
        let w = g[C];
        if (Dt(e.emitsOptions, w))
          continue;
        const A = t[w];
        if (u)
          if (L(i, w))
            A !== i[w] && (i[w] = A, d = !0);
          else {
            const H = Pe(w);
            r[H] = gn(
              u,
              c,
              H,
              A,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          A !== i[w] && (i[w] = A, d = !0);
      }
    }
  } else {
    rr(e, t, r, i) && (d = !0);
    let g;
    for (const C in c)
      (!t || // for camelCase
      !L(t, C) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((g = de(C)) === C || !L(t, g))) && (u ? n && // for camelCase
      (n[C] !== void 0 || // for kebab-case
      n[g] !== void 0) && (r[C] = gn(
        u,
        c,
        C,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[C]);
    if (i !== c)
      for (const C in i)
        (!t || !L(t, C)) && (delete i[C], d = !0);
  }
  d && Ie(e, "set", "$attrs");
}
function rr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const d = t[u];
      let g;
      r && L(r, g = Pe(u)) ? !i || !i.includes(g) ? n[g] = d : (c || (c = {}))[g] = d : Dt(e.emitsOptions, u) || (!(u in s) || d !== s[u]) && (s[u] = d, o = !0);
    }
  if (i) {
    const u = j(n), d = c || D;
    for (let g = 0; g < i.length; g++) {
      const C = i[g];
      n[C] = gn(r, u, C, d[C], e, !L(d, C));
    }
  }
  return o;
}
function gn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = L(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && M(u)) {
        const { propsDefaults: d } = r;
        n in d ? s = d[n] : (nt(r), s = d[n] = u.call(null, t), Je());
      } else
        s = u;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (i && !c ? s = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === de(n)) && (s = !0));
  }
  return s;
}
function ir(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!M(e)) {
    const g = (C) => {
      u = !0;
      const [w, A] = ir(C, t, !0);
      Z(o, w), A && c.push(...A);
    };
    !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g);
  }
  if (!i && !u)
    return J(e) && s.set(e, Ge), Ge;
  if (I(i))
    for (let g = 0; g < i.length; g++) {
      const C = Pe(i[g]);
      os(C) && (o[C] = D);
    }
  else if (i)
    for (const g in i) {
      const C = Pe(g);
      if (os(C)) {
        const w = i[g], A = o[C] = I(w) || M(w) ? { type: w } : Object.assign({}, w);
        if (A) {
          const H = fs(Boolean, A.type), O = fs(String, A.type);
          A[
            0
            /* BooleanFlags.shouldCast */
          ] = H > -1, A[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = O < 0 || H < O, (H > -1 || L(A, "default")) && c.push(C);
        }
      }
    }
  const d = [o, c];
  return J(e) && s.set(e, d), d;
}
function os(e) {
  return e[0] !== "$";
}
function ls(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cs(e, t) {
  return ls(e) === ls(t);
}
function fs(e, t) {
  return I(t) ? t.findIndex((n) => cs(n, e)) : M(t) && cs(t, e) ? 0 : -1;
}
const or = (e) => e[0] === "_" || e === "$stable", Hn = (e) => I(e) ? e.map(we) : [we(e)], Xi = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ci((...r) => Hn(t(...r)), n);
  return s._c = !1, s;
}, lr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (or(r))
      continue;
    const i = e[r];
    if (M(i))
      t[r] = Xi(r, i, s);
    else if (i != null) {
      const o = Hn(i);
      t[r] = () => o;
    }
  }
}, cr = (e, t) => {
  const n = Hn(t);
  e.slots.default = () => n;
}, Qi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = j(t), Nt(t, "_", n)) : lr(t, e.slots = {});
  } else
    e.slots = {}, t && cr(e, t);
  Nt(e.slots, Vt, 1);
}, Gi = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = D;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = !1 : (Z(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, lr(t, r)), o = t;
  } else
    t && (cr(e, t), o = { default: 1 });
  if (i)
    for (const c in r)
      !or(c) && !(c in o) && delete r[c];
};
function fr() {
  return {
    app: null,
    config: {
      isNativeTag: wr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let eo = 0;
function to(e, t) {
  return function(s, r = null) {
    M(s) || (s = Object.assign({}, s)), r != null && !J(r) && (r = null);
    const i = fr(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const u = i.app = {
      _uid: eo++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: To,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...g) {
        return o.has(d) || (d && M(d.install) ? (o.add(d), d.install(u, ...g)) : M(d) && (o.add(d), d(u, ...g))), u;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), u;
      },
      component(d, g) {
        return g ? (i.components[d] = g, u) : i.components[d];
      },
      directive(d, g) {
        return g ? (i.directives[d] = g, u) : i.directives[d];
      },
      mount(d, g, C) {
        if (!c) {
          const w = He(s, r);
          return w.appContext = i, g && t ? t(w, d) : e(w, d, C), c = !0, u._container = d, d.__vue_app__ = u, Sn(w.component) || w.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(d, g) {
        return i.provides[d] = g, u;
      }
    };
    return u;
  };
}
function _n(e, t, n, s, r = !1) {
  if (I(e)) {
    e.forEach((w, A) => _n(w, t && (I(t) ? t[A] : t), n, s, r));
    return;
  }
  if (At(s) && !r)
    return;
  const i = s.shapeFlag & 4 ? Sn(s.component) || s.component.proxy : s.el, o = r ? null : i, { i: c, r: u } = e, d = t && t.r, g = c.refs === D ? c.refs = {} : c.refs, C = c.setupState;
  if (d != null && d !== u && (X(d) ? (g[d] = null, L(C, d) && (C[d] = null)) : ne(d) && (d.value = null)), M(u))
    je(u, c, 12, [o, g]);
  else {
    const w = X(u), A = ne(u);
    if (w || A) {
      const H = () => {
        if (e.f) {
          const O = w ? L(C, u) ? C[u] : g[u] : u.value;
          r ? I(O) && yn(O, i) : I(O) ? O.includes(i) || O.push(i) : w ? (g[u] = [i], L(C, u) && (C[u] = g[u])) : (u.value = [i], e.k && (g[e.k] = u.value));
        } else
          w ? (g[u] = o, L(C, u) && (C[u] = o)) : A && (u.value = o, e.k && (g[e.k] = o));
      };
      o ? (H.id = -1, se(H, n)) : H();
    }
  }
}
const se = Oi;
function no(e) {
  return so(e);
}
function so(e, t) {
  const n = Nr();
  n.__VUE__ = !0;
  const { insert: s, remove: r, patchProp: i, createElement: o, createText: c, createComment: u, setText: d, setElementText: g, parentNode: C, nextSibling: w, setScopeId: A = _e, insertStaticContent: H } = e, O = (l, f, a, p = null, h = null, b = null, y = !1, m = null, x = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !Ve(l, f) && (p = bt(l), be(l, h, b, !0), l = null), f.patchFlag === -2 && (x = !1, f.dynamicChildren = null);
    const { type: _, ref: v, shapeFlag: E } = f;
    switch (_) {
      case zt:
        V(l, f, a, p);
        break;
      case Ae:
        S(l, f, a, p);
        break;
      case en:
        l == null && le(f, a, p, y);
        break;
      case ye:
        me(l, f, a, p, h, b, y, m, x);
        break;
      default:
        E & 1 ? Q(l, f, a, p, h, b, y, m, x) : E & 6 ? ve(l, f, a, p, h, b, y, m, x) : (E & 64 || E & 128) && _.process(l, f, a, p, h, b, y, m, x, Ze);
    }
    v != null && h && _n(v, l && l.ref, b, f || l, !f);
  }, V = (l, f, a, p) => {
    if (l == null)
      s(f.el = c(f.children), a, p);
    else {
      const h = f.el = l.el;
      f.children !== l.children && d(h, f.children);
    }
  }, S = (l, f, a, p) => {
    l == null ? s(f.el = u(f.children || ""), a, p) : f.el = l.el;
  }, le = (l, f, a, p) => {
    [l.el, l.anchor] = H(l.children, f, a, p, l.el, l.anchor);
  }, F = ({ el: l, anchor: f }, a, p) => {
    let h;
    for (; l && l !== f; )
      h = w(l), s(l, a, p), l = h;
    s(f, a, p);
  }, $ = ({ el: l, anchor: f }) => {
    let a;
    for (; l && l !== f; )
      a = w(l), r(l), l = a;
    r(f);
  }, Q = (l, f, a, p, h, b, y, m, x) => {
    y = y || f.type === "svg", l == null ? Ye(f, a, p, h, b, y, m, x) : Y(l, f, h, b, y, m, x);
  }, Ye = (l, f, a, p, h, b, y, m) => {
    let x, _;
    const { type: v, props: E, shapeFlag: T, transition: P, dirs: R } = l;
    if (x = l.el = o(l.type, b, E && E.is, E), T & 8 ? g(x, l.children) : T & 16 && N(l.children, x, null, p, h, b && v !== "foreignObject", y, m), R && De(l, null, p, "created"), Me(x, l, l.scopeId, y, p), E) {
      for (const B in E)
        B !== "value" && !Tt(B) && i(x, B, null, E[B], b, l.children, p, h, Te);
      "value" in E && i(x, "value", null, E.value), (_ = E.onVnodeBeforeMount) && Ce(_, p, l);
    }
    R && De(l, null, p, "beforeMount");
    const K = (!h || h && !h.pendingBranch) && P && !P.persisted;
    K && P.beforeEnter(x), s(x, f, a), ((_ = E && E.onVnodeMounted) || K || R) && se(() => {
      _ && Ce(_, p, l), K && P.enter(x), R && De(l, null, p, "mounted");
    }, h);
  }, Me = (l, f, a, p, h) => {
    if (a && A(l, a), p)
      for (let b = 0; b < p.length; b++)
        A(l, p[b]);
    if (h) {
      let b = h.subTree;
      if (f === b) {
        const y = h.vnode;
        Me(l, y, y.scopeId, y.slotScopeIds, h.parent);
      }
    }
  }, N = (l, f, a, p, h, b, y, m, x = 0) => {
    for (let _ = x; _ < l.length; _++) {
      const v = l[_] = m ? Re(l[_]) : we(l[_]);
      O(null, v, f, a, p, h, b, y, m);
    }
  }, Y = (l, f, a, p, h, b, y) => {
    const m = f.el = l.el;
    let { patchFlag: x, dynamicChildren: _, dirs: v } = f;
    x |= l.patchFlag & 16;
    const E = l.props || D, T = f.props || D;
    let P;
    a && $e(a, !1), (P = T.onVnodeBeforeUpdate) && Ce(P, a, f, l), v && De(f, l, a, "beforeUpdate"), a && $e(a, !0);
    const R = h && f.type !== "foreignObject";
    if (_ ? W(l.dynamicChildren, _, m, a, p, R, b) : y || U(l, f, m, null, a, p, R, b, !1), x > 0) {
      if (x & 16)
        ie(m, f, E, T, a, p, h);
      else if (x & 2 && E.class !== T.class && i(m, "class", null, T.class, h), x & 4 && i(m, "style", E.style, T.style, h), x & 8) {
        const K = f.dynamicProps;
        for (let B = 0; B < K.length; B++) {
          const k = K[B], ue = E[k], Xe = T[k];
          (Xe !== ue || k === "value") && i(m, k, ue, Xe, h, l.children, a, p, Te);
        }
      }
      x & 1 && l.children !== f.children && g(m, f.children);
    } else
      !y && _ == null && ie(m, f, E, T, a, p, h);
    ((P = T.onVnodeUpdated) || v) && se(() => {
      P && Ce(P, a, f, l), v && De(f, l, a, "updated");
    }, p);
  }, W = (l, f, a, p, h, b, y) => {
    for (let m = 0; m < f.length; m++) {
      const x = l[m], _ = f[m], v = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === ye || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ve(x, _) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? C(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          a
        )
      );
      O(x, _, v, null, p, h, b, y, !0);
    }
  }, ie = (l, f, a, p, h, b, y) => {
    if (a !== p) {
      if (a !== D)
        for (const m in a)
          !Tt(m) && !(m in p) && i(l, m, a[m], null, y, f.children, h, b, Te);
      for (const m in p) {
        if (Tt(m))
          continue;
        const x = p[m], _ = a[m];
        x !== _ && m !== "value" && i(l, m, _, x, y, f.children, h, b, Te);
      }
      "value" in p && i(l, "value", a.value, p.value);
    }
  }, me = (l, f, a, p, h, b, y, m, x) => {
    const _ = f.el = l ? l.el : c(""), v = f.anchor = l ? l.anchor : c("");
    let { patchFlag: E, dynamicChildren: T, slotScopeIds: P } = f;
    P && (m = m ? m.concat(P) : P), l == null ? (s(_, a, p), s(v, a, p), N(f.children, a, v, h, b, y, m, x)) : E > 0 && E & 64 && T && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (W(l.dynamicChildren, T, a, h, b, y, m), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || h && f === h.subTree) && ur(
      l,
      f,
      !0
      /* shallow */
    )) : U(l, f, a, v, h, b, y, m, x);
  }, ve = (l, f, a, p, h, b, y, m, x) => {
    f.slotScopeIds = m, l == null ? f.shapeFlag & 512 ? h.ctx.activate(f, a, p, y, x) : it(f, a, p, h, b, y, x) : Kn(l, f, x);
  }, it = (l, f, a, p, h, b, y) => {
    const m = l.component = _o(l, p, h);
    if ($t(l) && (m.ctx.renderer = Ze), bo(m), m.asyncDep) {
      if (h && h.registerDep(m, ee), !l.el) {
        const x = m.subTree = He(Ae);
        S(null, x, f, a);
      }
      return;
    }
    ee(m, l, f, a, h, b, y);
  }, Kn = (l, f, a) => {
    const p = f.component = l.component;
    if (Ei(l, f, a))
      if (p.asyncDep && !p.asyncResolved) {
        z(p, f, a);
        return;
      } else
        p.next = f, _i(p.update), p.update();
    else
      f.el = l.el, p.vnode = f;
  }, ee = (l, f, a, p, h, b, y) => {
    const m = () => {
      if (l.isMounted) {
        let { next: v, bu: E, u: T, parent: P, vnode: R } = l, K = v, B;
        $e(l, !1), v ? (v.el = R.el, z(l, v, y)) : v = R, E && Yt(E), (B = v.props && v.props.onVnodeBeforeUpdate) && Ce(B, P, v, R), $e(l, !0);
        const k = Zt(l), ue = l.subTree;
        l.subTree = k, O(
          ue,
          k,
          // parent may have changed if it's in a teleport
          C(ue.el),
          // anchor may have changed if it's in a fragment
          bt(ue),
          l,
          h,
          b
        ), v.el = k.el, K === null && vi(l, k.el), T && se(T, h), (B = v.props && v.props.onVnodeUpdated) && se(() => Ce(B, P, v, R), h);
      } else {
        let v;
        const { el: E, props: T } = f, { bm: P, m: R, parent: K } = l, B = At(f);
        if ($e(l, !1), P && Yt(P), !B && (v = T && T.onVnodeBeforeMount) && Ce(v, K, f), $e(l, !0), E && qt) {
          const k = () => {
            l.subTree = Zt(l), qt(E, l.subTree, l, h, null);
          };
          B ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && k()
          ) : k();
        } else {
          const k = l.subTree = Zt(l);
          O(null, k, a, p, l, h, b), f.el = k.el;
        }
        if (R && se(R, h), !B && (v = T && T.onVnodeMounted)) {
          const k = f;
          se(() => Ce(v, K, k), h);
        }
        (f.shapeFlag & 256 || K && At(K.vnode) && K.vnode.shapeFlag & 256) && l.a && se(l.a, h), l.isMounted = !0, f = a = p = null;
      }
    }, x = l.effect = new Tn(
      m,
      () => Ln(_),
      l.scope
      // track it in component's effect scope
    ), _ = l.update = () => x.run();
    _.id = l.uid, $e(l, !0), _();
  }, z = (l, f, a) => {
    f.component = l;
    const p = l.vnode.props;
    l.vnode = f, l.next = null, Zi(l, f.props, p, a), Gi(l, f.children, a), st(), ts(), rt();
  }, U = (l, f, a, p, h, b, y, m, x = !1) => {
    const _ = l && l.children, v = l ? l.shapeFlag : 0, E = f.children, { patchFlag: T, shapeFlag: P } = f;
    if (T > 0) {
      if (T & 128) {
        mt(_, E, a, p, h, b, y, m, x);
        return;
      } else if (T & 256) {
        Ue(_, E, a, p, h, b, y, m, x);
        return;
      }
    }
    P & 8 ? (v & 16 && Te(_, h, b), E !== _ && g(a, E)) : v & 16 ? P & 16 ? mt(_, E, a, p, h, b, y, m, x) : Te(_, h, b, !0) : (v & 8 && g(a, ""), P & 16 && N(E, a, p, h, b, y, m, x));
  }, Ue = (l, f, a, p, h, b, y, m, x) => {
    l = l || Ge, f = f || Ge;
    const _ = l.length, v = f.length, E = Math.min(_, v);
    let T;
    for (T = 0; T < E; T++) {
      const P = f[T] = x ? Re(f[T]) : we(f[T]);
      O(l[T], P, a, null, h, b, y, m, x);
    }
    _ > v ? Te(l, h, b, !0, !1, E) : N(f, a, p, h, b, y, m, x, E);
  }, mt = (l, f, a, p, h, b, y, m, x) => {
    let _ = 0;
    const v = f.length;
    let E = l.length - 1, T = v - 1;
    for (; _ <= E && _ <= T; ) {
      const P = l[_], R = f[_] = x ? Re(f[_]) : we(f[_]);
      if (Ve(P, R))
        O(P, R, a, null, h, b, y, m, x);
      else
        break;
      _++;
    }
    for (; _ <= E && _ <= T; ) {
      const P = l[E], R = f[T] = x ? Re(f[T]) : we(f[T]);
      if (Ve(P, R))
        O(P, R, a, null, h, b, y, m, x);
      else
        break;
      E--, T--;
    }
    if (_ > E) {
      if (_ <= T) {
        const P = T + 1, R = P < v ? f[P].el : p;
        for (; _ <= T; )
          O(null, f[_] = x ? Re(f[_]) : we(f[_]), a, R, h, b, y, m, x), _++;
      }
    } else if (_ > T)
      for (; _ <= E; )
        be(l[_], h, b, !0), _++;
    else {
      const P = _, R = _, K = /* @__PURE__ */ new Map();
      for (_ = R; _ <= T; _++) {
        const oe = f[_] = x ? Re(f[_]) : we(f[_]);
        oe.key != null && K.set(oe.key, _);
      }
      let B, k = 0;
      const ue = T - R + 1;
      let Xe = !1, Wn = 0;
      const ot = new Array(ue);
      for (_ = 0; _ < ue; _++)
        ot[_] = 0;
      for (_ = P; _ <= E; _++) {
        const oe = l[_];
        if (k >= ue) {
          be(oe, h, b, !0);
          continue;
        }
        let xe;
        if (oe.key != null)
          xe = K.get(oe.key);
        else
          for (B = R; B <= T; B++)
            if (ot[B - R] === 0 && Ve(oe, f[B])) {
              xe = B;
              break;
            }
        xe === void 0 ? be(oe, h, b, !0) : (ot[xe - R] = _ + 1, xe >= Wn ? Wn = xe : Xe = !0, O(oe, f[xe], a, null, h, b, y, m, x), k++);
      }
      const zn = Xe ? ro(ot) : Ge;
      for (B = zn.length - 1, _ = ue - 1; _ >= 0; _--) {
        const oe = R + _, xe = f[oe], Vn = oe + 1 < v ? f[oe + 1].el : p;
        ot[_] === 0 ? O(null, xe, a, Vn, h, b, y, m, x) : Xe && (B < 0 || _ !== zn[B] ? Ke(
          xe,
          a,
          Vn,
          2
          /* MoveType.REORDER */
        ) : B--);
      }
    }
  }, Ke = (l, f, a, p, h = null) => {
    const { el: b, type: y, transition: m, children: x, shapeFlag: _ } = l;
    if (_ & 6) {
      Ke(l.component.subTree, f, a, p);
      return;
    }
    if (_ & 128) {
      l.suspense.move(f, a, p);
      return;
    }
    if (_ & 64) {
      y.move(l, f, a, Ze);
      return;
    }
    if (y === ye) {
      s(b, f, a);
      for (let E = 0; E < x.length; E++)
        Ke(x[E], f, a, p);
      s(l.anchor, f, a);
      return;
    }
    if (y === en) {
      F(l, f, a);
      return;
    }
    if (p !== 2 && _ & 1 && m)
      if (p === 0)
        m.beforeEnter(b), s(b, f, a), se(() => m.enter(b), h);
      else {
        const { leave: E, delayLeave: T, afterLeave: P } = m, R = () => s(b, f, a), K = () => {
          E(b, () => {
            R(), P && P();
          });
        };
        T ? T(b, R, K) : K();
      }
    else
      s(b, f, a);
  }, be = (l, f, a, p = !1, h = !1) => {
    const { type: b, props: y, ref: m, children: x, dynamicChildren: _, shapeFlag: v, patchFlag: E, dirs: T } = l;
    if (m != null && _n(m, null, a, l, !0), v & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const P = v & 1 && T, R = !At(l);
    let K;
    if (R && (K = y && y.onVnodeBeforeUnmount) && Ce(K, f, l), v & 6)
      gr(l.component, a, p);
    else {
      if (v & 128) {
        l.suspense.unmount(a, p);
        return;
      }
      P && De(l, null, f, "beforeUnmount"), v & 64 ? l.type.remove(l, f, a, h, Ze, p) : _ && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== ye || E > 0 && E & 64) ? Te(_, f, a, !1, !0) : (b === ye && E & 384 || !h && v & 16) && Te(x, f, a), p && Dn(l);
    }
    (R && (K = y && y.onVnodeUnmounted) || P) && se(() => {
      K && Ce(K, f, l), P && De(l, null, f, "unmounted");
    }, a);
  }, Dn = (l) => {
    const { type: f, el: a, anchor: p, transition: h } = l;
    if (f === ye) {
      pr(a, p);
      return;
    }
    if (f === en) {
      $(l);
      return;
    }
    const b = () => {
      r(a), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (l.shapeFlag & 1 && h && !h.persisted) {
      const { leave: y, delayLeave: m } = h, x = () => y(a, b);
      m ? m(l.el, b, x) : x();
    } else
      b();
  }, pr = (l, f) => {
    let a;
    for (; l !== f; )
      a = w(l), r(l), l = a;
    r(f);
  }, gr = (l, f, a) => {
    const { bum: p, scope: h, update: b, subTree: y, um: m } = l;
    p && Yt(p), h.stop(), b && (b.active = !1, be(y, l, f, a)), m && se(m, f), se(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Te = (l, f, a, p = !1, h = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      be(l[y], f, a, p, h);
  }, bt = (l) => l.shapeFlag & 6 ? bt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : w(l.anchor || l.el), $n = (l, f, a) => {
    l == null ? f._vnode && be(f._vnode, null, null, !0) : O(f._vnode || null, l, f, null, null, null, a), ts(), zs(), f._vnode = l;
  }, Ze = {
    p: O,
    um: be,
    m: Ke,
    r: Dn,
    mt: it,
    mc: N,
    pc: U,
    pbc: W,
    n: bt,
    o: e
  };
  let kt, qt;
  return t && ([kt, qt] = t(Ze)), {
    render: $n,
    hydrate: kt,
    createApp: to($n, kt)
  };
}
function $e({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ur(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (I(s) && I(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Re(r[i]), c.el = o.el), n || ur(o, c)), c.type === zt && (c.el = o.el);
    }
}
function ro(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        c = i + o >> 1, e[n[c]] < d ? i = c + 1 : o = c;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
const io = (e) => e.__isTeleport, ye = Symbol(void 0), zt = Symbol(void 0), Ae = Symbol(void 0), en = Symbol(void 0), ut = [];
let ge = null;
function us(e = !1) {
  ut.push(ge = e ? null : []);
}
function oo() {
  ut.pop(), ge = ut[ut.length - 1] || null;
}
let pt = 1;
function as(e) {
  pt += e;
}
function lo(e) {
  return e.dynamicChildren = pt > 0 ? ge || Ge : null, oo(), pt > 0 && ge && ge.push(e), e;
}
function ds(e, t, n, s, r, i) {
  return lo(_t(
    e,
    t,
    n,
    s,
    r,
    i,
    !0
    /* isBlock */
  ));
}
function co(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ve(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vt = "__vInternal", ar = ({ key: e }) => e != null ? e : null, It = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? X(e) || ne(e) || M(e) ? { i: pe, r: e, k: t, f: !!n } : e : null;
function _t(e, t = null, n = null, s = 0, r = null, i = e === ye ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ar(t),
    ref: t && It(t),
    scopeId: qs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: pe
  };
  return c ? (Bn(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= X(n) ? 8 : 16), pt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ge && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ge.push(u), u;
}
const He = fo;
function fo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === $i) && (e = Ae), co(e)) {
    const c = Se(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bn(c, n), pt > 0 && !i && ge && (c.shapeFlag & 6 ? ge[ge.indexOf(e)] = c : ge.push(c)), c.patchFlag |= -2, c;
  }
  if (wo(e) && (e = e.__vccOpts), t) {
    t = uo(t);
    let { class: c, style: u } = t;
    c && !X(c) && (t.class = xn(c)), J(u) && (Bs(u) && !I(u) && (u = Z({}, u)), t.style = jt(u));
  }
  const o = X(e) ? 1 : Ti(e) ? 128 : io(e) ? 64 : J(e) ? 4 : M(e) ? 2 : 0;
  return _t(e, t, n, s, r, o, i, !0);
}
function uo(e) {
  return e ? Bs(e) || Vt in e ? Z({}, e) : e : null;
}
function Se(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e, c = t ? ho(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && ar(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? I(r) ? r.concat(It(t)) : [r, It(t)] : It(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ye ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Se(e.ssContent),
    ssFallback: e.ssFallback && Se(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ao(e = " ", t = 0) {
  return He(zt, null, e, t);
}
function we(e) {
  return e == null || typeof e == "boolean" ? He(Ae) : I(e) ? He(
    ye,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Re(e) : He(zt, null, String(e));
}
function Re(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Se(e);
}
function Bn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (I(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Bn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Vt in t) ? t._ctx = pe : r === 3 && pe && (pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    M(t) ? (t = { default: t, _ctx: pe }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ao(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ho(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = xn([t.class, s.class]));
      else if (r === "style")
        t.style = jt([t.style, s.style]);
      else if (Ht(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(I(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ce(e, t, n, s = null) {
  fe(e, t, 7, [
    n,
    s
  ]);
}
const po = fr();
let go = 0;
function _o(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || po, i = {
    uid: go++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Rr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ir(s, r),
    emitsOptions: ks(s, r),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: D,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: D,
    data: D,
    props: D,
    attrs: D,
    slots: D,
    refs: D,
    setupState: D,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = xi.bind(null, i), e.ce && e.ce(i), i;
}
let q = null;
const mo = () => q || pe, nt = (e) => {
  q = e, e.scope.on();
}, Je = () => {
  q && q.scope.off(), q = null;
};
function dr(e) {
  return e.vnode.shapeFlag & 4;
}
let gt = !1;
function bo(e, t = !1) {
  gt = t;
  const { props: n, children: s } = e.vnode, r = dr(e);
  Yi(e, n, r, t), Qi(e, s);
  const i = r ? xo(e, t) : void 0;
  return gt = !1, i;
}
function xo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ss(new Proxy(e.ctx, Wi));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? yo(e) : null;
    nt(e), st();
    const i = je(s, e, 0, [e.props, r]);
    if (rt(), Je(), vs(i)) {
      if (i.then(Je, Je), t)
        return i.then((o) => {
          hs(e, o, t);
        }).catch((o) => {
          Kt(
            o,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = i;
    } else
      hs(e, i, t);
  } else
    hr(e, t);
}
function hs(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Us(t)), hr(e, n);
}
let ps;
function hr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ps && !s.render) {
      const r = s.template || jn(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: u } = s, d = Z(Z({
          isCustomElement: i,
          delimiters: c
        }, o), u);
        s.render = ps(r, d);
      }
    }
    e.render = s.render || _e;
  }
  nt(e), st(), zi(e), rt(), Je();
}
function Co(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return re(e, "get", "$attrs"), t[n];
    }
  });
}
function yo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Co(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Sn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Us(Ss(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ft)
          return ft[n](e);
      },
      has(t, n) {
        return n in t || n in ft;
      }
    }));
}
function wo(e) {
  return M(e) && "__vccOpts" in e;
}
const Ft = (e, t) => hi(e, t, gt), Eo = Symbol(""), vo = () => Pt(Eo), To = "3.2.47", Oo = "http://www.w3.org/2000/svg", ke = typeof document != "undefined" ? document : null, gs = ke && /* @__PURE__ */ ke.createElement("template"), Po = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? ke.createElementNS(Oo, e) : ke.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => ke.createTextNode(e),
  createComment: (e) => ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ke.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      gs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = gs.content;
      if (s) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Ao(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Io(e, t, n) {
  const s = e.style, r = X(n);
  if (n && !r) {
    if (t && !X(t))
      for (const i in t)
        n[i] == null && mn(s, i, "");
    for (const i in n)
      mn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = i);
  }
}
const _s = /\s*!important$/;
function mn(e, t, n) {
  if (I(n))
    n.forEach((s) => mn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Fo(e, t);
    _s.test(n) ? e.setProperty(de(s), n.replace(_s, ""), "important") : e[s] = n;
  }
}
const ms = ["Webkit", "Moz", "ms"], tn = {};
function Fo(e, t) {
  const n = tn[t];
  if (n)
    return n;
  let s = Pe(t);
  if (s !== "filter" && s in e)
    return tn[t] = s;
  s = Ts(s);
  for (let r = 0; r < ms.length; r++) {
    const i = ms[r] + s;
    if (i in e)
      return tn[t] = i;
  }
  return t;
}
const bs = "http://www.w3.org/1999/xlink";
function Mo(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(bs, t.slice(6, t.length)) : e.setAttributeNS(bs, t, n);
  else {
    const i = yr(t);
    n == null || i && !Es(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function No(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), e[t] = n == null ? "" : n;
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const u = n == null ? "" : n;
    (e.value !== u || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = Es(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
  }
  c && e.removeAttribute(t);
}
function Ro(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Lo(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function jo(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [c, u] = Ho(t);
    if (s) {
      const d = i[t] = Uo(s, r);
      Ro(e, c, d, u);
    } else
      o && (Lo(e, c, o, u), i[t] = void 0);
  }
}
const xs = /(?:Once|Passive|Capture)$/;
function Ho(e) {
  let t;
  if (xs.test(e)) {
    t = {};
    let s;
    for (; s = e.match(xs); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : de(e.slice(2)), t];
}
let nn = 0;
const Bo = /* @__PURE__ */ Promise.resolve(), So = () => nn || (Bo.then(() => nn = 0), nn = Date.now());
function Uo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    fe(Ko(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = So(), n;
}
function Ko(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const Cs = /^on[a-z]/, Do = (e, t, n, s, r = !1, i, o, c, u) => {
  t === "class" ? Ao(e, s, r) : t === "style" ? Io(e, n, s) : Ht(t) ? Cn(t) || jo(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : $o(e, t, s, r)) ? No(e, t, s, i, o, c, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Mo(e, t, s, r));
};
function $o(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Cs.test(t) && M(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Cs.test(t) && X(n) ? !1 : t in e;
}
function Wo(e, t) {
  const n = Qs(e);
  class s extends Un {
    constructor(i) {
      super(n, i, t);
    }
  }
  return s.def = n, s;
}
const zo = typeof HTMLElement != "undefined" ? HTMLElement : class {
};
class Un extends zo {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, $s(() => {
      this._connected || (ws(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const r of s)
        this._setAttr(r.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, r = !1) => {
      const { props: i, styles: o } = s;
      let c;
      if (i && !I(i))
        for (const u in i) {
          const d = i[u];
          (d === Number || d && d.type === Number) && (u in this._props && (this._props[u] = kn(this._props[u])), (c || (c = /* @__PURE__ */ Object.create(null)))[Pe(u)] = !0);
        }
      this._numberProps = c, r && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = I(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && s.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of s.map(Pe))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = Pe(t);
    this._numberProps && this._numberProps[s] && (n = kn(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, r = !0) {
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), s && (n === !0 ? this.setAttribute(de(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(de(t), n + "") : n || this.removeAttribute(de(t))));
  }
  _update() {
    ws(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = He(this._def, Z({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (i, o) => {
        this.dispatchEvent(new CustomEvent(i, {
          detail: o
        }));
      };
      n.emit = (i, ...o) => {
        s(i, o), de(i) !== i && s(de(i), o);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof Un) {
          n.parent = r._instance, n.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const Vo = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Mi.props;
const ko = /* @__PURE__ */ Z({ patchProp: Do }, Po);
let ys;
function qo() {
  return ys || (ys = no(ko));
}
const ws = (...e) => {
  qo().render(...e);
}, Jo = ["href", "target", "rel"], Yo = /* @__PURE__ */ _t("path", { d: "M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" }, null, -1), Zo = /* @__PURE__ */ _t("path", {
  d: "M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",
  fill: "currentColor",
  style: { "transform-origin": "130px 106px" },
  class: "octo-arm"
}, null, -1), Xo = /* @__PURE__ */ _t("path", {
  d: "M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",
  fill: "currentColor",
  class: "octo-body"
}, null, -1), Qo = [
  Yo,
  Zo,
  Xo
], Go = /* @__PURE__ */ Qs({
  __name: "GithubCorners.ce",
  props: {
    repo: null,
    blank: { type: Boolean, default: !0 },
    bgColor: { default: "#151513" },
    color: { default: "#fff" },
    position: { default: "right" }
  },
  setup(e) {
    const t = e, n = "https://github.com", s = Ft(() => `${n}/${t.repo}`), r = Ft(() => t.blank ? "noopener noreferrer" : void 0), i = Ft(() => ({
      fill: t.bgColor,
      color: t.color,
      position: "absolute",
      border: 0,
      top: 0,
      [t.position]: 0,
      transform: t.position === "left" ? "scale(-1, 1)" : void 0
    }));
    return (o, c) => (us(), ds("a", {
      href: Ot(s),
      target: t.blank ? "_blank" : void 0,
      rel: Ot(r),
      class: "github-corner",
      "aria-label": "View source on GitHub"
    }, [
      (us(), ds("svg", {
        width: "80",
        height: "80",
        viewBox: "0 0 250 250",
        style: jt(Ot(i)),
        "aria-hidden": "true"
      }, Qo, 4))
    ], 8, Jo));
  }
}), el = `.github-corner:hover .octo-arm{animation:octocat-wave .56s ease-in-out}@keyframes octocat-wave{0%,to{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width: 500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave .56s ease-in-out}}
`, tl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, nl = /* @__PURE__ */ tl(Go, [["styles", [el]]]), sl = Wo(nl);
customElements.define("wc-github-corners", sl);
