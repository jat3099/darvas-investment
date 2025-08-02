import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DataStreamCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
        console.error("Failed to initialize WebGLRenderer", e);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particleCount = 200;
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const R_BOUNDS = 100;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * R_BOUNDS * 2 - R_BOUNDS;
        const y = Math.random() * R_BOUNDS * 2 - R_BOUNDS;
        const z = Math.random() * R_BOUNDS * 2 - R_BOUNDS;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        particlesData.push({
            velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).multiplyScalar(0.1),
            numConnections: 0
        });
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pMaterial = new THREE.PointsMaterial({
        color: 0x84E46E,
        size: 2,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true
    });
    const particles = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particles);

    // Lines
    const maxConnectionsPerParticle = 5;
    const connectionDistance = 25;
    const lineGeometry = new THREE.BufferGeometry();
    const maxLineVertices = particleCount * maxConnectionsPerParticle;
    const linePositions = new Float32Array(maxLineVertices * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        transparent: true,
        opacity: 0.1
    });
    const lines = new THREE.LineSegments(lineGeometry, lMaterial);
    scene.add(lines);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
    };
    document.addEventListener('mousemove', onMouseMove, false);

    const resizeObserver = new ResizeObserver(entries => {
        if (!entries || entries.length === 0) return;
        const { width, height } = entries[0].contentRect;
        if(width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    resizeObserver.observe(currentMount);

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        let vertexpos = 0;
        let numConnected = 0;

        for (let i = 0; i < particleCount; i++)
            particlesData[i].numConnections = 0;

        const pPositions = particles.geometry.attributes.position.array as Float32Array;
        const lPositions = lines.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const particleData = particlesData[i];
            pPositions[i * 3] += particleData.velocity.x;
            pPositions[i * 3 + 1] += particleData.velocity.y;
            pPositions[i * 3 + 2] += particleData.velocity.z;

            if (pPositions[i * 3 + 1] < -R_BOUNDS || pPositions[i * 3 + 1] > R_BOUNDS)
                particleData.velocity.y = -particleData.velocity.y;

            if (pPositions[i * 3] < -R_BOUNDS || pPositions[i * 3] > R_BOUNDS)
                particleData.velocity.x = -particleData.velocity.x;

            if (pPositions[i * 3 + 2] < -R_BOUNDS || pPositions[i * 3 + 2] > R_BOUNDS)
                particleData.velocity.z = -particleData.velocity.z;

            // Check connections
            for (let j = i + 1; j < particleCount; j++) {
                const particleDataB = particlesData[j];
                if (particleData.numConnections >= maxConnectionsPerParticle || particleDataB.numConnections >= maxConnectionsPerParticle) continue;

                const dx = pPositions[i * 3] - pPositions[j * 3];
                const dy = pPositions[i * 3 + 1] - pPositions[j * 3 + 1];
                const dz = pPositions[i * 3 + 2] - pPositions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < connectionDistance) {
                    particleData.numConnections++;
                    particleDataB.numConnections++;
                    
                    if (vertexpos >= maxLineVertices*3) continue;

                    lPositions[vertexpos++] = pPositions[i * 3];
                    lPositions[vertexpos++] = pPositions[i * 3 + 1];
                    lPositions[vertexpos++] = pPositions[i * 3 + 2];

                    lPositions[vertexpos++] = pPositions[j * 3];
                    lPositions[vertexpos++] = pPositions[j * 3 + 1];
                    lPositions[vertexpos++] = pPositions[j * 3 + 2];
                    
                    numConnected++;
                }
            }
        }
        
        lines.geometry.setDrawRange(0, numConnected * 2);
        lines.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.position.needsUpdate = true;
        
        camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        document.removeEventListener('mousemove', onMouseMove);
        
        scene.traverse(object => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    const mat = object.material as THREE.Material | THREE.Material[];
                    if (Array.isArray(mat)) {
                        mat.forEach(material => material.dispose());
                    } else {
                        mat.dispose();
                    }
                }
            }
        });
        
        renderer.dispose();
        if (currentMount && renderer.domElement.parentNode === currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default DataStreamCanvas;