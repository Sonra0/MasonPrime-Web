import * as THREE from 'three';

export function createSpaceNebula(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Star field (distant)
  const starCount = 2000;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const r = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = r * Math.cos(phi);

    const t = Math.random();
    if (t > 0.7) {
      starColors[i * 3] = 0.8; starColors[i * 3 + 1] = 0.6; starColors[i * 3 + 2] = 1.0;
    } else if (t > 0.4) {
      starColors[i * 3] = 0.9; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 1.0;
    } else {
      starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 0.9;
    }
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // Nebula clouds using shader material
  const nebulaVertexShader = `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      vOpacity = 1.0 / (-mvPosition.z * 0.1 + 1.0);
    }
  `;

  const nebulaFragmentShader = `
    varying vec3 vColor;
    varying float vOpacity;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, dist) * 0.15 * vOpacity;
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  // Nebula particles
  const nebulaCount = 300;
  const nebulaGeo = new THREE.BufferGeometry();
  const nebulaPositions = new Float32Array(nebulaCount * 3);
  const nebulaSizes = new Float32Array(nebulaCount);
  const nebulaColors = new Float32Array(nebulaCount * 3);

  const colors = [
    [0.486, 0.227, 0.929],
    [0.659, 0.333, 0.968],
    [0.910, 0.474, 0.976],
    [0.753, 0.518, 0.988],
  ];

  for (let i = 0; i < nebulaCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 18;
    const ySpread = (Math.random() - 0.5) * 12;

    nebulaPositions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
    nebulaPositions[i * 3 + 1] = ySpread + Math.sin(angle * 0.5) * 3;
    nebulaPositions[i * 3 + 2] = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 8;

    nebulaSizes[i] = 8 + Math.random() * 20;

    const c = colors[Math.floor(Math.random() * colors.length)];
    nebulaColors[i * 3] = c[0];
    nebulaColors[i * 3 + 1] = c[1];
    nebulaColors[i * 3 + 2] = c[2];
  }

  nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
  nebulaGeo.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));
  nebulaGeo.setAttribute('customColor', new THREE.BufferAttribute(nebulaColors, 3));

  const nebulaMat = new THREE.ShaderMaterial({
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const nebula = new THREE.Points(nebulaGeo, nebulaMat);
  scene.add(nebula);

  // Close floating particles (glowing dust)
  const dustCount = 800;
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  const dustVelocities: THREE.Vector3[] = [];

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 30;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    dustVelocities.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      )
    );
  }

  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

  const dustMat = new THREE.PointsMaterial({
    color: 0xc084fc,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

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
    mouse.x += (mouse.targetX - mouse.x) * 0.03;
    mouse.y += (mouse.targetY - mouse.y) * 0.03;

    // Gentle orbital camera
    camera.position.x = Math.sin(time * 0.1) * 2 + mouse.x * 3;
    camera.position.y = Math.cos(time * 0.08) * 1.5 - mouse.y * 2;
    camera.lookAt(0, 0, 0);

    // Rotate star field slowly
    stars.rotation.y += 0.0001;
    stars.rotation.x += 0.00005;

    // Nebula gentle rotation
    nebula.rotation.y += 0.0002;

    // Animate dust particles
    const positions = dustGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] += dustVelocities[i].x;
      positions[i * 3 + 1] += dustVelocities[i].y;
      positions[i * 3 + 2] += dustVelocities[i].z;

      if (Math.abs(positions[i * 3]) > 15) dustVelocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 15) dustVelocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 10) dustVelocities[i].z *= -1;
    }
    dustGeo.attributes.position.needsUpdate = true;

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
