import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CITIES = {
    'New York': { lat: 40.7128, lon: -74.0060 },
    'London': { lat: 51.5074, lon: -0.1278 },
    'Tokyo': { lat: 35.6895, lon: 139.6917 },
    'Hong Kong': { lat: 22.3193, lon: 114.1694 },
    'Frankfurt': { lat: 50.1109, lon: 8.6821 },
    'Sydney': { lat: -33.8688, lon: 151.2093 },
    'Singapore': { lat: 1.3521, lon: 103.8198 },
    'Zurich': { lat: 47.3769, lon: 8.5417 },
};

const GLOBE_RADIUS = 5;

const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
};

const NewsGlobe: React.FC = () => {
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
        const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 15;

        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 8;
        controls.maxDistance = 50;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;

        scene.add(new THREE.AmbientLight(0xffffff, 0.2));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_4096.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture, metalness: 0.3, roughness: 0.7 });
        const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64), earthMaterial);
        globeGroup.add(earthMesh);

        const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');
        const cloudMaterial = new THREE.MeshStandardMaterial({ map: cloudTexture, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
        const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS + 0.05, 64, 64), cloudMaterial);
        globeGroup.add(cloudMesh);
        
        const cityKeys = Object.keys(CITIES);
        cityKeys.forEach(cityKey => {
            const city = CITIES[cityKey as keyof typeof CITIES];
            const pos = latLonToVector3(city.lat, city.lon, GLOBE_RADIUS);
            const pointGeom = new THREE.SphereGeometry(0.05, 16, 16);
            const pointMat = new THREE.MeshBasicMaterial({ color: 0x84e46e });
            const pointMesh = new THREE.Mesh(pointGeom, pointMat);
            pointMesh.position.copy(pos);
            globeGroup.add(pointMesh);
        });

        const arcsGroup = new THREE.Group();
        globeGroup.add(arcsGroup);
        let activeArcs: THREE.Mesh[] = [];

        const createArc = () => {
            if (arcsGroup.children.length > 5) {
                 const oldArc = arcsGroup.children.shift() as THREE.Mesh;
                 oldArc.geometry.dispose();
                 (oldArc.material as THREE.Material).dispose();
            }
            
            const city1_key = cityKeys[Math.floor(Math.random() * cityKeys.length)];
            let city2_key = cityKeys[Math.floor(Math.random() * cityKeys.length)];
            while (city1_key === city2_key) {
                city2_key = cityKeys[Math.floor(Math.random() * cityKeys.length)];
            }
            
            const city1 = CITIES[city1_key as keyof typeof CITIES];
            const city2 = CITIES[city2_key as keyof typeof CITIES];

            const startVec = latLonToVector3(city1.lat, city1.lon, GLOBE_RADIUS);
            const endVec = latLonToVector3(city2.lat, city2.lon, GLOBE_RADIUS);

            const arcHeight = startVec.distanceTo(endVec) * 0.4;
            const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + arcHeight);
            
            const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            const material = new THREE.LineBasicMaterial({ color: 0x84e46e, transparent: true, opacity: 0.7, linewidth: 1 });
            const arc = new THREE.Line(geometry, material);
            arcsGroup.add(arc);
        };

        const arcInterval = setInterval(createArc, 2000);
        createArc(); 

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
        resizeObserver.observe(currentMount);

        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();

            controls.update();
            cloudMesh.rotation.y += delta * 0.05;
            
            arcsGroup.children.forEach(child => {
                const arc = child as THREE.Line;
                if ((arc.material as THREE.LineBasicMaterial).opacity > 0) {
                     (arc.material as THREE.LineBasicMaterial).opacity -= 0.005;
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(arcInterval);
            resizeObserver.disconnect();
            
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            
            controls.dispose();
            renderer.dispose();
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};

export default NewsGlobe;
