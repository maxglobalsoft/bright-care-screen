import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader } from "../shaders/gradient.vert";
import { fragmentShader } from "../shaders/gradient.frag";

export function GradientCanvas({ animate = true }: { animate?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uSage: { value: new THREE.Color("#567257") },
      uOrange: { value: new THREE.Color("#E8912D") },
      uCream: { value: new THREE.Color("#FBF7EE") },
      uDeep: { value: new THREE.Color("#2F4A38") },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      if (animate) raf = requestAnimationFrame(render);
    };
    render();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
      renderer.render(scene, camera);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [animate]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 90% at 30% 30%, #567257 0%, #2F4A38 55%, #1F3327 100%)",
      }}
      aria-hidden
    />
  );
}
