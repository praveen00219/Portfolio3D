import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import { scrollState } from "./scroll";

// Camera travels from z=10 down to z=-90 as the page scrolls.
const START_Z = 10;
const END_Z = -90;

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    const cam = state.camera;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);
    const p = scrollState.progress;
    const targetZ = START_Z + (END_Z - START_Z) * p;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 4, delta);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, mouse.current.x * 1.2 + Math.sin(p * Math.PI * 2) * 1.5, 4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, mouse.current.y * 0.8, 4, delta);
    cam.rotation.z = Math.sin(p * Math.PI) * 0.08;
  });
  return null;
}

function Planet({ position, color, emissive, ringColor = "#c4b5fd", ringColor2 = "#5eead4", size = 2.2, ring = true, speed = 1.5, scale = 1 }) {
  const group = useRef();
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.15;
  });
  return (
    <group position={position} ref={group} scale={scale}>
      <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh>
          <sphereGeometry args={[size, 96, 96]} />
          <MeshDistortMaterial color={color} emissive={emissive} emissiveIntensity={0.55} roughness={0.25} metalness={0.6} distort={0.28} speed={1.6} />
        </mesh>
        <mesh scale={1.18}>
          <icosahedronGeometry args={[size, 2]} />
          <meshBasicMaterial color={emissive} wireframe transparent opacity={0.12} />
        </mesh>
        {ring && (
          <mesh rotation={[1.15, 0.25, 0.35]}>
            <torusGeometry args={[size * 1.75, 0.035, 16, 200]} />
            <meshBasicMaterial color={ringColor} transparent opacity={0.7} />
          </mesh>
        )}
        {ring && (
          <mesh rotation={[1.15, 0.25, 0.35]}>
            <torusGeometry args={[size * 2.05, 0.015, 16, 200]} />
            <meshBasicMaterial color={ringColor2} transparent opacity={0.45} />
          </mesh>
        )}
      </Float>
    </group>
  );
}

function Galaxy({ position, count = 9000, radius = 9, colors: cols = ["#f0abfc", "#22d3ee"], additive = true }) {
  const ref = useRef();
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const inside = new THREE.Color(cols[0]);
    const outside = new THREE.Color(cols[1]);
    const branches = 4;
    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const branch = ((i % branches) / branches) * Math.PI * 2;
      const spin = r * 0.9;
      const rnd = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6 * r * 0.4;
      pos[i * 3] = Math.cos(branch + spin) * r + rnd();
      pos[i * 3 + 1] = rnd() * 0.5;
      pos[i * 3 + 2] = Math.sin(branch + spin) * r + rnd();
      const c = inside.clone().lerp(outside, r / radius);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, radius, cols[0], cols[1]]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.08;
  });

  return (
    <points ref={ref} position={position} rotation={[0.9, 0, 0.3]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} sizeAttenuation depthWrite={false} vertexColors blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending} />
    </points>
  );
}

const shapes = ["octa", "torusKnot", "ico", "torus", "box", "dodeca"];

function Shape({ kind }) {
  switch (kind) {
    case "octa":
      return <octahedronGeometry args={[0.7, 0]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.5, 0.16, 120, 16]} />;
    case "ico":
      return <icosahedronGeometry args={[0.7, 0]} />;
    case "torus":
      return <torusGeometry args={[0.55, 0.2, 24, 64]} />;
    case "box":
      return <boxGeometry args={[0.9, 0.9, 0.9]} />;
    default:
      return <dodecahedronGeometry args={[0.65, 0]} />;
  }
}

// Floating crystals spread along the camera path, kept to the sides so text stays readable.
function Crystals({ palette }) {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 26; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      arr.push({
        kind: shapes[i % shapes.length],
        ci: i,
        pos: [side * (7 + Math.random() * 4), (Math.random() - 0.5) * 7, -16 - i * 3.6],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.6 + Math.random() * 0.8,
        wire: i % 3 === 0,
      });
    }
    return arr;
  }, []);
  return items.map((it, i) => (
    <Float key={i} speed={1 + (i % 4) * 0.4} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh position={it.pos} rotation={it.rot} scale={it.scale}>
        <Shape kind={it.kind} />
        {it.wire ? (
          <meshBasicMaterial color={palette[it.ci % palette.length]} wireframe />
        ) : (
          <meshStandardMaterial color={palette[it.ci % palette.length]} emissive={palette[it.ci % palette.length]} emissiveIntensity={0.35} metalness={0.7} roughness={0.2} />
        )}
      </mesh>
    </Float>
  ));
}

function Universe({ theme }) {
  const stars = useRef();
  const { size } = useThree();
  const mobile = size.width < 760;
  const t = theme.scene;
  useFrame((_, d) => {
    if (stars.current) stars.current.rotation.y += d * 0.01;
  });
  return (
    <>
      <color attach="background" args={[t.bg]} />
      <fog attach="fog" args={[t.bg, 10, 32]} />
      <ambientLight intensity={theme.dark ? 0.35 : 0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color={t.keyLight} />
      <pointLight position={[-6, -3, 2]} intensity={theme.dark ? 30 : 12} color={t.fillLight} />

      {t.stars && (
        <group ref={stars}>
          <Stars radius={140} depth={80} count={7000} factor={4} saturation={0} fade speed={1} />
        </group>
      )}
      <Sparkles key={t.sparkle} count={160} scale={[20, 12, 110]} position={[0, 0, -40]} size={theme.dark ? 2.5 : 3.5} speed={0.4} color={t.sparkle} />

      {/* Hero planet */}
      <Planet position={mobile ? [5, 9, -20] : [16, 8, -24]} scale={mobile ? 0.5 : 0.8} color={t.planet.color} emissive={t.planet.emissive} ringColor={t.ring} ringColor2={t.ring2} />
      {/* Experience → Projects: spiral galaxy */}
      <Galaxy position={[mobile ? -4 : -9, -1, -26]} colors={t.galaxy} additive={theme.dark} />
      {/* Skills: second planet */}
      <Planet position={[6, -1, -52]} color={t.planet2.color} emissive={t.planet2.emissive} ringColor={t.ring} ringColor2={t.ring2} size={1.8} speed={2} />

      <Crystals palette={t.crystals} />
      <CameraRig />
    </>
  );
}

export default function Scene({ theme }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, START_Z], fov: 60, near: 0.1, far: 300 }} dpr={[1, 1.75]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Universe theme={theme} />
      </Canvas>
    </div>
  );
}
