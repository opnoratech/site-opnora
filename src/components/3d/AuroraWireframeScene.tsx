import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const AuroraMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#38bdf8"), // Ciano
    uColor2: new THREE.Color("#0055ff"), // Azul elétrico
    uColor3: new THREE.Color("#a280ff"), // Violeta
    uColor4: new THREE.Color("#ff00ff"), // Magenta
  },
  // Vertex Shader
  `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // Função para gerar ruído orgânico e montanhoso
    void main() {
      vUv = uv;
      vec3 pos = position;

      // Escala e velocidade
      float scale = 0.15;
      float time = uTime * 0.2;

      // Ondas densas e altas (estilo topografia)
      float wave1 = sin(pos.x * scale + time) * cos(pos.y * scale + time) * 4.0;
      float wave2 = sin(pos.x * scale * 0.5 - time * 0.5) * 3.0;
      float wave3 = cos(pos.y * scale * 0.8 + time * 0.8) * 3.0;
      
      // Ridge noise effect (picos afiados, vales suaves)
      float combined = wave1 + wave2 + wave3;
      pos.z = combined;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    
    varying float vElevation;

    void main() {
      // Normalizando a elevação (-6.0 a 6.0) para 0.0 a 1.0
      float elevationNormalized = smoothstep(-6.0, 6.0, vElevation);

      // Cores vibrantes
      vec3 color = mix(uColor2, uColor1, smoothstep(0.0, 0.4, elevationNormalized));
      color = mix(color, uColor3, smoothstep(0.4, 0.7, elevationNormalized));
      color = mix(color, uColor4, smoothstep(0.8, 1.0, elevationNormalized));

      // Brilho intenso nas cristas (peaks) e sumindo nos vales
      float alpha = smoothstep(-4.0, 4.0, vElevation);
      
      // Multiplica a cor para forçar um "fake bloom" (mais claro e estourado)
      vec3 finalColor = color * (1.2 + alpha * 0.8);

      gl_FragColor = vec4(finalColor, alpha * 0.85);
    }
  `
);

// Extend para que o React Three Fiber reconheça o material
import { extend } from "@react-three/fiber";
extend({ AuroraMaterial });

function AuroraMesh() {
  const materialRef = useRef<any>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useFrame((state) => {
    if (materialRef.current && !prefersReducedMotion) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {/* Grid de fundo fixo (estética tecnológica igual a referência) */}
      <gridHelper args={[100, 50, "#a280ff", "#a280ff"]} position={[0, -5, -15]} rotation={[0, 0, 0]} material-opacity={0.15} material-transparent={true} />

      {/* Malha principal densa */}
      <Plane args={[80, 80, 200, 200]} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3, -15]}>
        {/* @ts-ignore */}
        <auroraMaterial
          ref={materialRef}
          wireframe={true}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Plane>
    </group>
  );
}

export function AuroraWireframeScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["#050507", 5, 25]} />
        <AuroraMesh />
      </Canvas>
    </div>
  );
}
