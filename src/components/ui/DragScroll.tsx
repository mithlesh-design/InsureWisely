"use client";
import { useRef, type ReactNode } from "react";

// Horizontal card rail: native scroll for touch, trackpad and keyboard, plus click-and-drag for a mouse
export function DragScroll({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  return <div className={className} tabIndex={0} role="region" aria-label={label}
    onPointerDown={e => { if (e.pointerType !== "mouse") return; drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft }; e.currentTarget.setPointerCapture(e.pointerId); }}
    onPointerMove={e => { if (drag.current) e.currentTarget.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x); }}
    onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
    {children}
  </div>;
}
