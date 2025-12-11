/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Cylinder, Stars, Environment, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- Improved Molecule Component ---
const BenzeneMolecule = React.memo(({ position = [0,0,0], scale = 1, rotationSpeed = 0.2 }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = Math.sin(t * rotationSpeed * 0.5) * 0.3;
      groupRef.current.rotation.y = t * rotationSpeed;
      groupRef.current.rotation.z = Math.cos(t * rotationSpeed * 0.3) * 0.1;
    }
  });

  const bondLength = 1.4;
  const hDist = 2.4;

  const moleculeParts = useMemo(() => {
    const parts: any[] = [];
    const atomRadiusC = 0.4;
    const atomRadiusH = 0.25;
    const bondRadius = 0.08;

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const xC = Math.cos(angle) * bondLength;
        const yC = Math.sin(angle) * bondLength;
        
        const xH = Math.cos(angle) * hDist;
        const yH = Math.sin(angle) * hDist;

        // Carbon Atom
        parts.push({ 
            key: `c-${i}`,
            type: 'atom',
            pos: [xC, yC, 0], 
            radius: atomRadiusC, 
            color: '#2D46B9'
        });
        
        // Hydrogen Atom
        parts.push({ 
            key: `h-${i}`,
            type: 'atom',
            pos: [xH, yH, 0], 
            radius: atomRadiusH, 
            color: '#FFFFFF' 
        });

        // Bond C-H
        {
            const start = new THREE.Vector3(xC, yC, 0);
            const end = new THREE.Vector3(xH, yH, 0);
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
            const euler = new THREE.Euler().setFromQuaternion(quaternion);

            parts.push({
                key: `bond-ch-${i}`,
                type: 'bond',
                // Convert to arrays to be safe for R3F props
                position: [mid.x, mid.y, mid.z],
                rotation: [euler.x, euler.y, euler.z],
                args: [bondRadius, bondRadius, length, 8],
                color: '#888'
            });
        }

        // Bond C-C
        {
            const nextAngle = ((i + 1) / 6) * Math.PI * 2;
            const nextXC = Math.cos(nextAngle) * bondLength;
            const nextYC = Math.sin(nextAngle) * bondLength;

            const start = new THREE.Vector3(xC, yC, 0);
            const end = new THREE.Vector3(nextXC, nextYC, 0);
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            
            const up = new THREE.Vector3(0, 1, 0);
            let quaternion = new THREE.Quaternion();
            if (Math.abs(direction.clone().normalize().dot(up)) > 0.9999) {
                 quaternion.set(0,0,0,1); 
            } else {
                 quaternion.setFromUnitVectors(up, direction.clone().normalize());
            }
            const euler = new THREE.Euler().setFromQuaternion(quaternion);

            parts.push({
                key: `bond-cc-${i}`,
                type: 'bond',
                position: [mid.x, mid.y, mid.z],
                rotation: [euler.x, euler.y, euler.z],
                args: [bondRadius, bondRadius, length, 8],
                color: '#1DB954'
            });
        }
    }
    return parts;
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {moleculeParts.map((item) => {
        if (item.type === 'bond') {
            return (
                <group position={item.position} rotation={item.rotation} key={item.key}>
                     <Cylinder args={item.args}>
                        <meshPhysicalMaterial 
                            color={item.color} 
                            roughness={0.2} 
                            metalness={0.5} 
                            transparent 
                            opacity={0.8}
                        />
                     </Cylinder>
                </group>
            )
        } else {
            return (
                <Sphere args={[item.radius, 32, 32]} position={item.pos} key={item.key}>
                    <meshPhysicalMaterial 
                        color={item.color === '#FFFFFF' ? '#eee' : item.color} 
                        emissive={item.color === '#FFFFFF' ? '#111' : item.color}
                        emissiveIntensity={item.color === '#FFFFFF' ? 0 : 0.5}
                        roughness={0.1}
                        metalness={0.1}
                        clearcoat={1}
                    />
                </Sphere>
            );
        }
      })}
    </group>
  );
});

// --- Floating Icons ---
const DigitalFloatingItem = React.memo(({ position = [0,0,0], text, color, delay = 0 }: any) => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime + delay;
            // Ensure array access is safe
            const baseX = position?.[0] ?? 0;
            const baseY = position?.[1] ?? 0;
            const baseZ = position?.[2] ?? 0;
            
            ref.current.position.set(
                baseX,
                baseY + Math.sin(t * 2) * 0.1,
                baseZ
            );
            ref.current.rotation.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={ref}>
            <Text
                fontSize={0.35}
                color={color}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.9}
            >
                {text}
            </Text>
        </group>
    );
});

// --- Hero Scene ---
export const HeroScene: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a1a1a] to-black">
      <Canvas>
        {/* Adjusted Camera Position to 12 to push scene back */}
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#1DB954" distance={20} />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color="#8C37D8" distance={20} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
           <BenzeneMolecule position={[0, 0.5, 0]} scale={1.3} rotationSpeed={0.5} />
        </Float>

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
             <DigitalFloatingItem position={[-3.5, 2.5, -1]} text="Copilot" color="#fff" delay={0} />
             <DigitalFloatingItem position={[3.5, -2, 0]} text="One Microsoft" color="#1DB954" delay={2} />
             {/* Centered bottom for longer text */}
             <DigitalFloatingItem position={[0, -3.5, 1]} text="Agentic Transformation" color="#8C37D8" delay={4} />
        </Float>

        <Stars radius={50} depth={20} count={1000} factor={3} saturation={0} fade speed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
});

// --- Wave Scene ---
const SoundWave = React.memo(() => {
    // Create geometry manually to avoid declarative attribute binding issues
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const count = 1500;
        const positions = new Float32Array(count * 3);
        
        let i = 0;
        for(let x = -15; x < 15; x += 0.8) {
            for(let z = -5; z < 5; z += 0.8) {
                if (i < count) {
                    positions[i * 3] = x;
                    positions[i * 3 + 1] = 0;
                    positions[i * 3 + 2] = z;
                    i++;
                }
            }
        }
        
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        const attr = geometry.attributes.position;
        if (attr) {
            const array = attr.array as Float32Array;
            const t = state.clock.getElapsedTime();
            // We know count is 1500 from initialization
            const count = 1500; 
            
            for(let i = 0; i < count; i++) {
                const x = array[i * 3];
                const z = array[i * 3 + 2];
                // Update Y
                array[i * 3 + 1] = Math.sin(x * 0.4 + t * 0.8) * Math.cos(z * 0.3 + t * 0.5) * 1.5;
            }
            attr.needsUpdate = true;
        }
    });

    return (
        <points position={[0, -1, 0]} geometry={geometry}>
            <pointsMaterial 
                size={0.08} 
                color="#1DB954" 
                transparent 
                opacity={0.4} 
                sizeAttenuation 
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
});

export const WaveScene: React.FC = React.memo(() => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
        <fog attach="fog" args={['#121212', 2, 15]} />
        <SoundWave />
      </Canvas>
    </div>
  );
});