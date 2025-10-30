"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

type Direction = "forward" | "reverse" | "pingpong";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: Direction;
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  /** 质量系数(0.4–1)，通过 DPR 缩放实现 */
  quality?: number;
  /** FPS 上限(12–120) */
  maxFPS?: number;
  /** 最大 DPR 上限(1–2) */
  maxDpr?: number;
  /** 着色器迭代次数(8–60) */
  iterations?: number;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 0.5, 0.2];
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position; in vec2 uv; out vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,0.0,1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution; uniform float iTime;
uniform vec3 uCustomColor; uniform float uUseCustomColor;
uniform float uSpeed; uniform float uDirection; uniform float uScale; uniform float uOpacity;
uniform vec2 uMouse; uniform float uMouseInteractive; uniform int uIterations;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C){
  vec2 center=iResolution*0.5;
  C=(C-center)/uScale+center;
  vec2 mouseOffset=(uMouse-center)*0.0002;
  C+=mouseOffset*length(C-center)*step(0.5,uMouseInteractive);

  float d,z,T=iTime*uSpeed*uDirection;
  vec3 O=vec3(0.0),p,S; vec4 tmp=vec4(0.0);

  for(int it=0; it<60; it++){
    if(it>=uIterations) break;
    vec2 r=iResolution, Q;
    p=z*normalize(vec3(C-.5*r,r.y));
    p.z-=4.; S=p; d=p.y-T;
    p.x+=.4*(1.+p.y)*sin(d+p.x*0.1)*cos(.34*d+p.x*0.05);
    Q=(p.xz*=mat2(cos(p.y+vec4(0,11,33,0)-T)));
    z+= d=abs(sqrt(length(Q*Q))-.25*(5.+S.y))/3.+8e-4;
    tmp=1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
    O+= tmp.w/max(d,1e-4)*tmp.xyz;
  }
  o=vec4(tanh(O/1e4),1.0);
}

bool finite1(float x){ return !(isnan(x)||isinf(x)); }
vec3 sanitize(vec3 c){ return vec3(finite1(c.r)?c.r:0.0, finite1(c.g)?c.g:0.0, finite1(c.b)?c.b:0.0); }

void main(){
  vec4 o=vec4(0.0); mainImage(o, gl_FragCoord.xy);
  vec3 rgb=sanitize(o.rgb);
  float intensity=(rgb.r+rgb.g+rgb.b)/3.0;
  vec3 finalColor=mix(rgb, intensity*uCustomColor, step(0.5,uUseCustomColor));
  float alpha=clamp(length(rgb)*uOpacity,0.0,1.0);
  fragColor=vec4(finalColor,alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = false,
  quality = 0.8, // 用 DPR 缩放画质，不改 CSS 大小
  maxFPS = 30,
  maxDpr = 1.75,
  iterations = 36,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const runningRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 计算有效 DPR：quality 仅影响 DPR，不动 CSS 尺寸
    const baseDpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const effectiveDpr = Math.max(0.3, Math.min(2, baseDpr * quality));

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const dirMul = direction === "reverse" ? -1.0 : 1.0;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: effectiveDpr,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance", // 顶层支持
    });

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;

    // 让 canvas CSS 尺寸始终 = 100vw/100vh
    Object.assign(canvas.style, {
      display: "block",
      width: "100vw",
      height: "100vh",
      contain: "strict",
    });
    el.appendChild(canvas);

    const geometry = new Triangle(gl);

    // 复用数组，避免 per-frame 分配
    const iResolution = new Float32Array(2);
    const uMouse = new Float32Array(2);
    const uCustomColor = new Float32Array(customColorRgb);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: iResolution },
        uCustomColor: { value: uCustomColor },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: dirMul },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: uMouse },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
        uIterations: {
          value: Math.max(8, Math.min(60, Math.floor(iterations))),
        },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const updateMouse = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      uMouse[0] = (x - r.left) * effectiveDpr;
      uMouse[1] = (r.height - (y - r.top)) * effectiveDpr; // flip Y
    };
    const onMove = (e: MouseEvent) => {
      if (mouseInteractive) updateMouse(e.clientX, e.clientY);
    };
    if (mouseInteractive)
      el.addEventListener("mousemove", onMove, { passive: true });

    // 只用真实尺寸，不乘 quality；禁止 OGL 改 CSS 尺寸
    let pending = false;
    const setSize = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const r = el.getBoundingClientRect();
        renderer.dpr = effectiveDpr; // 可热更新
        renderer.setSize(r.width, r.height); // false: 不写入 style
        iResolution[0] = gl.drawingBufferWidth;
        iResolution[1] = gl.drawingBufferHeight;
      });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(el);
    setSize();

    // 不可见/隐藏时暂停
    runningRef.current = true;
    ioRef.current?.disconnect();
    ioRef.current = new IntersectionObserver((entries) => {
      const inView = entries[0]?.isIntersecting ?? true;
      runningRef.current = inView && !document.hidden;
    });
    ioRef.current.observe(el);
    const onVis = () => {
      runningRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    // FPS 限制
    const minFPS = Math.max(12, Math.min(120, maxFPS));
    const frameInterval = 1000 / minFPS;

    let last = 0;
    const t0 = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!runningRef.current) return;
      if (t - last < frameInterval) return;
      last = t;

      const timeValue = (t - t0) * 0.001;
      if (direction === "pingpong") {
        (program.uniforms.uDirection as any).value =
          Math.sin(timeValue * 0.5) * (dirMul < 0 ? -1 : 1);
      }
      (program.uniforms.iTime as any).value = timeValue;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ioRef.current?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (mouseInteractive) el.removeEventListener("mousemove", onMove);
      try {
        el.removeChild(canvas);
      } catch {}
    };
  }, [
    color,
    speed,
    direction,
    scale,
    opacity,
    mouseInteractive,
    quality,
    maxFPS,
    maxDpr,
    iterations,
  ]);

  // 容器 100vw/100vh（固定铺满视口）
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
};

export default Plasma;
