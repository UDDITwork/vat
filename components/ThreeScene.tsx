import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeContext';

// ... (defined elements stay same)
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;
const Fog = 'fog' as any;

const NeuralCore = ({ theme }: { theme: 'dark' | 'light' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2} visible={theme === 'dark'}>
        <MeshDistortMaterial
          color={theme === 'dark' ? "#111111" : "#ffffff"}
          attach="material"
          distort={0.45}
          speed={4}
          roughness={theme === 'dark' ? 0.1 : 0.4}
          metalness={theme === 'dark' ? 1 : 0.1}
        />
      </Sphere>
      <Sphere args={[1.05, 64, 64]} scale={2}>
        <MeshStandardMaterial
          color={theme === 'dark' ? "#00ffff" : "#2563eb"}
          wireframe
          transparent
          opacity={theme === 'dark' ? 0.08 : 0.15}
        />
      </Sphere>
    </Float>
  );
};

const InteractiveParticles = ({ count = 3000, theme }: { count?: number, theme: 'dark' | 'light' }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initialPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // ... (generation logic same)
      const r = 10 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos.set([x, y, z], i * 3);
      initialPos.set([x, y, z], i * 3);
    }
    return [pos, initialPos];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;

    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      // ... (motion logic same)
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const speed = 0.02 + (i % 10) * 0.001;
      const angle = time * speed + (i * 0.1);

      const dx = posAttr.array[ix] - targetX;
      const dy = posAttr.array[iy] - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const force = Math.max(0, (5 - dist) * 0.01);

      posAttr.array[ix] += Math.cos(angle) * 0.01 - dx * force;
      posAttr.array[iy] += Math.sin(angle) * 0.01 - dy * force;

      const currentR = Math.sqrt(
        posAttr.array[ix] ** 2 + posAttr.array[iy] ** 2 + posAttr.array[iz] ** 2
      );
      if (currentR > 25) {
        posAttr.array[ix] *= 0.99;
        posAttr.array[iy] *= 0.99;
        posAttr.array[iz] *= 0.99;
      }
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <Points ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={0.03}
        color={theme === 'dark' ? "#7b61ff" : "#1e40af"}
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const TwinklingStars = ({ count = 2000, theme }: { count?: number, theme: 'dark' | 'light' }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, sizes] = useMemo(() => {
    // ... (logic same)
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // ...
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sz[i] = Math.random();
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const material = pointsRef.current.material as THREE.PointsMaterial;

    material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1;

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 2, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 2, 0.05);
  });

  return (
    <Points ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={0.1}
        color={theme === 'dark' ? "#ffffff" : "#475569"}
        transparent
        opacity={theme === 'dark' ? 0.3 : 0.6}
        sizeAttenuation={true}
      />
    </Points>
  );
};

const ThreeScene: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 bg-gradient-to-br from-slate-200 via-gray-200 to-zinc-200 dark:bg-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

        <AmbientLight intensity={theme === 'dark' ? 0.4 : 2.0} />
        <PointLight position={[15, 15, 15]} color={theme === 'dark' ? "#00ffff" : "#0ea5e9"} intensity={2.5} />
        <PointLight position={[-15, -15, -15]} color={theme === 'dark' ? "#7b61ff" : "#8b5cf6"} intensity={2.5} />

        <NeuralCore theme={theme} />
        <InteractiveParticles theme={theme} />
        <TwinklingStars theme={theme} />

        <Fog attach="fog" args={[theme === 'dark' ? '#050505' : '#e2e8f0', 5, 40]} />
      </Canvas>
    </div>
  );
};


export default ThreeScene;
