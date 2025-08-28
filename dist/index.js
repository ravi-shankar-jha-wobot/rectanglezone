(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".rectangle_zone_wrapper{position:relative;display:inline-block;width:100%;height:100%}.rectangle_zone_image{display:block;width:100%;height:100%;object-fit:cover}.rectangle_zone_canvas{position:absolute;left:0;top:0;pointer-events:auto;width:100%;height:100%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { useRef as f, useCallback as g, useEffect as z } from "react";
import { jsxs as A, jsx as k } from "react/jsx-runtime";
const C = ({
  canvas: o,
  e: n
}) => {
  if (!o) return { x: 0, y: 0 };
  const e = o.getBoundingClientRect(), a = o.width / e.width, c = o.height / e.height, t = (n.clientX - e.left) * a, r = (n.clientY - e.top) * c;
  return { x: t, y: r };
}, v = ({
  canvasRef: o,
  imgRef: n,
  rectangle: e
}) => {
  const a = o.current, c = n.current;
  if (!a || !c) return;
  const t = a.getContext("2d");
  if (t && e.coordinates.length >= 4) {
    const [r, , i] = e.coordinates, d = e.color || "#3766E8", x = i.x - r.x, m = i.y - r.y;
    t.save(), t.globalAlpha = 0.2, t.fillStyle = d, t.fillRect(r.x, r.y, x, m), t.globalAlpha = 1, t.strokeStyle = d, t.lineWidth = 2, t.strokeRect(r.x, r.y, x, m), t.restore();
  }
}, E = ({
  ctx: o,
  canvas: n,
  img: e
}) => {
  o.clearRect(0, 0, n.width, n.height), o.drawImage(e, 0, 0, n.width, n.height);
}, D = ({
  canvasRef: o,
  imgRef: n,
  drawnRectangle: e,
  savedRectangles: a,
  setDrawnRectangle: c,
  drawSavedRectangles: t,
  onChange: r
}) => {
  const i = f(!1), d = f({ x: 0, y: 0 }), x = g(
    (u) => {
      u.preventDefault();
      const s = C({
        canvas: o.current,
        e: u
      });
      i.current = !0, d.current = s, c({
        name: `Rectangle ${a.length + 1}`,
        color: "#3766E8",
        coordinates: [s, s, s, s]
      });
    },
    [c, a.length, o]
  ), m = g(
    (u) => {
      if (!i.current || typeof c != "function" || !e)
        return;
      const s = o.current, L = n.current;
      if (!s || !L) return;
      const _ = s.getContext("2d");
      if (!_) return;
      const l = C({
        canvas: o.current,
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
      c((S) => ({
        ...S,
        coordinates: [y, M, p, w]
      })), typeof r == "function" && r({ coordinates: [y, M, p, w] }), E({
        ctx: _,
        canvas: s,
        img: L
      }), t(), v({
        canvasRef: o,
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
      t,
      o,
      c,
      n,
      r
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
function I({
  canvasRef: o,
  imgRef: n,
  rectangles: e,
  scale: a
}) {
  const c = g(() => {
    e.forEach((t) => {
      v({
        canvasRef: o,
        imgRef: n,
        rectangle: t
      });
    });
  }, [e, o, n]);
  return z(() => {
    const t = o?.current, r = t?.getContext("2d"), i = n.current;
    !t || !r || !i || (E({ ctx: r, canvas: t, img: i }), c());
  }, [o, n, e, a, c]), { drawSavedRectangles: c };
}
const U = ({
  imageSrc: o,
  rectangles: n,
  drawnRectangle: e,
  setDrawnRectangle: a,
  onChange: c
}) => {
  const t = f(null), r = f(null), { drawSavedRectangles: i } = I({
    canvasRef: r,
    imgRef: t,
    rectangles: n,
    scale: 1
  }), { handleMouseDown: d, handleMouseMove: x, handleMouseUp: m } = D({
    canvasRef: r,
    imgRef: t,
    drawnRectangle: e,
    savedRectangles: n,
    setDrawnRectangle: a,
    drawSavedRectangles: i,
    onChange: c
  });
  return /* @__PURE__ */ A("div", { className: "rectangle_zone_wrapper", children: [
    /* @__PURE__ */ k(
      "img",
      {
        ref: t,
        src: o,
        alt: "rect-background",
        className: "rectangle_zone_image",
        onLoad: () => {
          const u = t.current, s = r.current;
          u && s && (s.width = u.naturalWidth, s.height = u.naturalHeight);
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
  U as RectangleZone,
  E as clearAndDrawBackground,
  v as drawRectangle,
  C as getCanvasCoordinates,
  D as useHandlers
};
