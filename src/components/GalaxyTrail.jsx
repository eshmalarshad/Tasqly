import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#7F77DD",
  "#D85A30",
  "#1D9E75",
  "#D4537E",
  "#378ADD",
  "#BA7517",
];

export default function ColorfulMouseTrail({ children }) {
  const [trails, setTrails] = useState([]);
  const [ring, setRing] = useState(null);
  const posRef = useRef({ x: -100, y: -100 });
  const colorIndexRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const color = COLORS[colorIndexRef.current % COLORS.length];
      colorIndexRef.current++;
      const id = idRef.current++;

      setTrails((prev) => [
        ...prev.slice(-30),
        { id, x: e.clientX, y: e.clientY, color, opacity: 1, size: 10 },
      ]);

      setTimeout(() => {
        setTrails((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, opacity: 0, size: 4 } : t
          )
        );
      }, 80);

      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 400);
    };

    const onClick = (e) => {
      const color = COLORS[colorIndexRef.current % COLORS.length];
      const ringId = idRef.current++;
      setRing({ id: ringId, x: e.clientX, y: e.clientY, color, scale: 0.2, opacity: 1 });

      requestAnimationFrame(() => {
        setTimeout(() => {
          setRing((r) => r?.id === ringId ? { ...r, scale: 2.2, opacity: 0 } : r);
        }, 16);
      });

      setTimeout(() => setRing(null), 500);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
        {trails.map((t) => (
          <div
            key={t.id}
            style={{
              position: "fixed",
              left: t.x - t.size / 2,
              top: t.y - t.size / 2,
              width: t.size,
              height: t.size,
              borderRadius: "50%",
              background: t.color,
              opacity: t.opacity,
              transform: `scale(${t.opacity > 0.5 ? 1 : 0.4})`,
              transition: "opacity 0.35s ease-out, transform 0.35s ease-out, width 0.35s, height 0.35s",
              pointerEvents: "none",
            }}
          />
        ))}

        {ring && (
          <div
            style={{
              position: "fixed",
              left: ring.x - 18,
              top: ring.y - 18,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `2.5px solid ${ring.color}`,
              opacity: ring.opacity,
              transform: `scale(${ring.scale})`,
              transition: "transform 0.45s ease-out, opacity 0.45s ease-out",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {children}
    </>
  );
}