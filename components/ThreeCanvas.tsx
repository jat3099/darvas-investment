import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let animationFrameId: number;

    // Check if WebGL is available
    const isWebGLAvailable = () => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    };

    if (!isWebGLAvailable()) {
        console.error("WebGL is not supported or available on this browser.");
        return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
        console.error("Failed to create WebGLRenderer:", error);
        return;
    }
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    
    // Particle creation
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const radius = 4 + Math.random() * 4;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.025,
        color: 0x84E46E,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 10;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) / 1000;
        mouseY = (event.clientY - window.innerHeight / 2) / 1000;
    };
    document.addEventListener('mousemove', onMouseMove);

    // ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
        if (!entries || entries.length === 0) return;
        const { width, height } = entries[0].contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(currentMount);


    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particles.rotation.y = elapsedTime * 0.1;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };
    animate();

    // Cleanup logic
    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        document.removeEventListener('mousemove', onMouseMove);
        
        // Clean up Three.js resources
        scene.remove(particles);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        
        // Remove canvas from DOM
        if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    };
  }, []); // Empty dependency array ensures this runs only once

  // The ref is attached to this div, which contains the canvas
  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;};

export default ThreeCanvas;