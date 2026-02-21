import * as THREE from 'three';

interface CrystalNode {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  origin: THREE.Vector3;
}

export function createCrystalConstellation(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Crystal shard geometry
  const crystalGeo = new THREE.OctahedronGeometry(0.3, 0);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
  });

  const smallCrystalGeo = new THREE.TetrahedronGeometry(0.15, 0);
  const smallCrystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xa855f7,
    emissive: 0x7c3aed,
    emissiveIntensity: 0.4,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.5,
  });

  // Create crystal nodes
  const nodeCount = 60;
  const nodes: CrystalNode[] = [];
  const spread = 25;

  for (let i = 0; i < nodeCount; i++) {
    const geo = Math.random() > 0.4 ? crystalGeo : smallCrystalGeo;
    const mat = Math.random() > 0.4 ? crystalMat.clone() : smallCrystalMat.clone();
    const mesh = new THREE.Mesh(geo, mat);

    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread;
    const z = (Math.random() - 0.5) * 15;

    mesh.position.set(x, y, z);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    const scale = 0.5 + Math.random() * 1.5;
    mesh.scale.setScalar(scale);

    scene.add(mesh);
    nodes.push({
      mesh,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001
      ),
      origin: new THREE.Vector3(x, y, z),
    });
  }

  // Connection lines between nearby nodes
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.15,
  });

  const lineGroup = new THREE.Group();
  scene.add(lineGroup);

  // Particle field
  const particleCount = 500;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 40;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xc084fc,
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x1a0a2e, 0.5);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x7c3aed, 2, 50);
  pointLight1.position.set(10, 10, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xe879f9, 1.5, 50);
  pointLight2.position.set(-10, -5, 5);
  scene.add(pointLight2);

  // Mouse tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const onMouseMove = (e: MouseEvent) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouseMove);

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  // Update connections
  function updateConnections() {
    while (lineGroup.children.length) {
      const child = lineGroup.children[0];
      lineGroup.remove(child);
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
      }
    }

    const maxDist = 6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.12;
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[j].mesh.position,
          ]);
          const mat = lineMaterial.clone();
          mat.opacity = opacity;
          const line = new THREE.Line(lineGeo, mat);
          lineGroup.add(line);
        }
      }
    }
  }

  let frameCount = 0;
  let animationId: number;

  function animate() {
    animationId = requestAnimationFrame(animate);
    frameCount++;

    // Smooth mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Camera parallax
    camera.position.x = mouse.x * 3;
    camera.position.y = -mouse.y * 2;
    camera.lookAt(0, 0, 0);

    // Animate crystal nodes
    const time = Date.now() * 0.001;
    for (const node of nodes) {
      node.mesh.rotation.x += 0.003;
      node.mesh.rotation.y += 0.002;

      // Gentle floating motion
      node.mesh.position.x = node.origin.x + Math.sin(time * 0.5 + node.origin.x) * 0.5;
      node.mesh.position.y = node.origin.y + Math.cos(time * 0.3 + node.origin.y) * 0.3;
    }

    // Update connections every 3 frames
    if (frameCount % 3 === 0) {
      updateConnections();
    }

    // Animate particles
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    // Light animation
    pointLight1.position.x = Math.sin(time * 0.7) * 12;
    pointLight1.position.y = Math.cos(time * 0.5) * 8;
    pointLight2.position.x = Math.cos(time * 0.3) * 10;
    pointLight2.position.y = Math.sin(time * 0.4) * 6;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    scene.clear();
  };
}
