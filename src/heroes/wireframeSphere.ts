import * as THREE from 'three';

export function createWireframeSphere(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 25;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Main wireframe sphere
  const sphereGeo = new THREE.IcosahedronGeometry(8, 3);
  const edgesGeo = new THREE.EdgesGeometry(sphereGeo);

  const edgesMat = new THREE.LineBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.25,
  });

  const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
  scene.add(wireframe);

  // Inner glow sphere
  const glowGeo = new THREE.IcosahedronGeometry(7.5, 2);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x4c1d95,
    transparent: true,
    opacity: 0.03,
    side: THREE.BackSide,
  });
  const glowSphere = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glowSphere);

  // Outer ring
  const ringGeo = new THREE.TorusGeometry(10, 0.02, 8, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.2,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.5;
  scene.add(ring);

  // Second ring (tilted)
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(11, 0.015, 8, 100),
    new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.1,
    })
  );
  ring2.rotation.x = Math.PI * 0.35;
  ring2.rotation.z = Math.PI * 0.15;
  scene.add(ring2);

  // Data stream particles flowing on sphere surface
  const streamCount = 600;
  const streamGeo = new THREE.BufferGeometry();
  const streamPositions = new Float32Array(streamCount * 3);
  const streamSpeeds: number[] = [];
  const streamPhis: number[] = [];
  const streamThetas: number[] = [];

  for (let i = 0; i < streamCount; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(2 * Math.random() - 1);
    const r = 8.2;

    streamPositions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
    streamPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    streamPositions[i * 3 + 2] = r * Math.cos(theta);

    streamSpeeds.push(0.002 + Math.random() * 0.006);
    streamPhis.push(phi);
    streamThetas.push(theta);
  }

  streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));

  const streamMat = new THREE.PointsMaterial({
    color: 0xe879f9,
    size: 0.08,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const streams = new THREE.Points(streamGeo, streamMat);
  scene.add(streams);

  // Background particles
  const bgCount = 400;
  const bgGeo = new THREE.BufferGeometry();
  const bgPositions = new Float32Array(bgCount * 3);

  for (let i = 0; i < bgCount; i++) {
    bgPositions[i * 3] = (Math.random() - 0.5) * 60;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
  }

  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

  const bgMat = new THREE.PointsMaterial({
    color: 0x7c3aed,
    size: 0.06,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const bgParticles = new THREE.Points(bgGeo, bgMat);
  scene.add(bgParticles);

  // Vertex pulse markers
  const vertexPositions = sphereGeo.attributes.position;
  const pulseGroup = new THREE.Group();
  const uniqueVertices = new Set<string>();

  for (let i = 0; i < vertexPositions.count; i++) {
    const x = vertexPositions.getX(i);
    const y = vertexPositions.getY(i);
    const z = vertexPositions.getZ(i);
    const key = `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;

    if (!uniqueVertices.has(key) && uniqueVertices.size < 30) {
      uniqueVertices.add(key);
      const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.6,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      pulseGroup.add(dot);
    }
  }
  scene.add(pulseGroup);

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

  let animationId: number;

  function animate() {
    animationId = requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    // Smooth mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Camera with mouse interaction
    camera.position.x = mouse.x * 4;
    camera.position.y = -mouse.y * 3;
    camera.lookAt(0, 0, 0);

    // Rotate wireframe
    wireframe.rotation.y += 0.002;
    wireframe.rotation.x += 0.0005;

    // Rotate inner glow
    glowSphere.rotation.y += 0.002;
    glowSphere.rotation.x += 0.0005;

    // Pulse vertex dots
    pulseGroup.rotation.y = wireframe.rotation.y;
    pulseGroup.rotation.x = wireframe.rotation.x;
    pulseGroup.children.forEach((dot, i) => {
      const scale = 0.8 + Math.sin(time * 2 + i * 0.5) * 0.4;
      dot.scale.setScalar(scale);
      ((dot as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(time * 2 + i * 0.5) * 0.3;
    });

    // Rings
    ring.rotation.z = time * 0.1;
    ring2.rotation.z = Math.PI * 0.15 + time * 0.08;

    // Wireframe edge pulse
    edgesMat.opacity = 0.2 + Math.sin(time * 0.8) * 0.08;

    // Animate data stream particles
    const positions = streamGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < streamCount; i++) {
      streamPhis[i] += streamSpeeds[i];
      const r = 8.2;
      const theta = streamThetas[i];
      const phi = streamPhis[i];

      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }
    streamGeo.attributes.position.needsUpdate = true;

    // Rotate streams with wireframe
    streams.rotation.y = wireframe.rotation.y;
    streams.rotation.x = wireframe.rotation.x;

    // Background particles
    bgParticles.rotation.y += 0.0002;

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
