import { useRef as f, useCallback as g, useEffect as D, useState as z } from "react";
import { jsxs as A, jsx as k } from "react/jsx-runtime";
import './assets/index.css';const C = ({
  canvas: t,
  e: n
}) => {
  if (!t) return { x: 0, y: 0 };
  const e = t.getBoundingClientRect(), s = t.width / e.width, r = t.height / e.height, o = (n.clientX - e.left) * s, c = (n.clientY - e.top) * r;
  return { x: o, y: c };
}, E = ({
  canvasRef: t,
  imgRef: n,
  rectangle: e
}) => {
  const s = t.current, r = n.current;
  if (!s || !r) return;
  const o = s.getContext("2d");
  if (o && e.coordinates.length >= 4) {
    const [c, , i] = e.coordinates, d = e.color || "#3766E8", x = i.x - c.x, m = i.y - c.y;
    o.save(), o.globalAlpha = 0.2, o.fillStyle = d, o.fillRect(c.x, c.y, x, m), o.globalAlpha = 1, o.strokeStyle = d, o.lineWidth = 2, o.strokeRect(c.x, c.y, x, m), o.restore();
  }
}, S = ({
  ctx: t,
  canvas: n,
  img: e
}) => {
  t.clearRect(0, 0, n.width, n.height), t.drawImage(e, 0, 0, n.width, n.height);
}, I = ({
  canvasRef: t,
  imgRef: n,
  drawnRectangle: e,
  savedRectangles: s,
  setDrawnRectangle: r,
  drawSavedRectangles: o,
  onChange: c
}) => {
  const i = f(!1), d = f({ x: 0, y: 0 }), x = g(
    (u) => {
      u.preventDefault();
      const a = C({
        canvas: t.current,
        e: u
      });
      i.current = !0, d.current = a, r({
        name: `Rectangle ${s.length + 1}`,
        color: "#3766E8",
        coordinates: [a, a, a, a]
      });
    },
    [r, s.length, t]
  ), m = g(
    (u) => {
      if (!i.current || typeof r != "function" || !e)
        return;
      const a = t.current, L = n.current;
      if (!a || !L) return;
      const _ = a.getContext("2d");
      if (!_) return;
      const l = C({
        canvas: t.current,
        e: u
      }), h = d.current, y = {
        x: Math.min(h.x, l.x),
        y: Math.min(h.y, l.y)
      }, M = {
        x: Math.max(h.x, l.x),
        y: Math.min(h.y, l.y)
      }, p = {
        x: Math.max(h.x, l.x),
        y: Math.max(h.y, l.y)
      }, w = {
        x: Math.min(h.x, l.x),
        y: Math.max(h.y, l.y)
      };
      r((v) => ({
        ...v,
        coordinates: [y, M, p, w]
      })), typeof c == "function" && c({ coordinates: [y, M, p, w] }), S({
        ctx: _,
        canvas: a,
        img: L
      }), o(), E({
        canvasRef: t,
        imgRef: n,
        rectangle: {
          name: e.name,
          color: e.color,
          coordinates: [y, M, p, w]
        }
      });
    },
    [
      e,
      o,
      t,
      r,
      n,
      c
    ]
  ), b = g(() => {
    i.current && (i.current = !1);
  }, []);
  return {
    handleMouseMove: m,
    handleMouseUp: b,
    handleMouseDown: x
  };
};
function N({
  canvasRef: t,
  imgRef: n,
  rectangles: e,
  scale: s
}) {
  const r = g(() => {
    e.forEach((o) => {
      E({
        canvasRef: t,
        imgRef: n,
        rectangle: o
      });
    });
  }, [e, t, n]);
  return D(() => {
    const o = t?.current, c = o?.getContext("2d"), i = n.current;
    !o || !c || !i || (S({ ctx: c, canvas: o, img: i }), r());
  }, [t, n, e, s, r]), { drawSavedRectangles: r };
}
const j = ({
  imageSrc: t,
  rectangles: n,
  onChange: e
}) => {
  const s = f(null), r = f(null), [o, c] = z({
    name: "",
    color: "#3766E8",
    coordinates: []
  }), { drawSavedRectangles: i } = N({
    canvasRef: r,
    imgRef: s,
    rectangles: n,
    scale: 1
  }), { handleMouseDown: d, handleMouseMove: x, handleMouseUp: m } = I({
    canvasRef: r,
    imgRef: s,
    drawnRectangle: o,
    savedRectangles: n,
    setDrawnRectangle: c,
    drawSavedRectangles: i,
    onChange: e
  });
  return /* @__PURE__ */ A("div", { className: "rectangle_zone_wrapper", children: [
    /* @__PURE__ */ k(
      "img",
      {
        ref: s,
        src: t,
        alt: "rect-background",
        className: "rectangle_zone_image",
        onLoad: () => {
          const u = s.current, a = r.current;
          u && a && (a.width = u.naturalWidth, a.height = u.naturalHeight);
        },
        crossOrigin: "anonymous"
      }
    ),
    /* @__PURE__ */ k(
      "canvas",
      {
        ref: r,
        className: "rectangle_zone_canvas",
        onMouseDown: d,
        onMouseMove: x,
        onMouseUp: m
      }
    )
  ] });
};
export {
  j as RectangleZone,
  S as clearAndDrawBackground,
  E as drawRectangle,
  C as getCanvasCoordinates,
  I as useHandlers
};
