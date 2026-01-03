// app.js - handles loading screen, Three.js background, smooth scroll, reveal animations, and scrollspy title updates

// === THREE.JS BACKGROUND SETUP ===
let scene, camera, renderer, particles;

function initThreeJS() {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'threejs-background';
  document.body.insertBefore(canvas, document.body.firstChild);
  
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  
  // Create particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 200;
    positions[i + 1] = (Math.random() - 0.5) * 200;
    positions[i + 2] = (Math.random() - 0.5) * 100;
    
    // White to light gray gradient colors
    const t = Math.random();
    colors[i] = 1;
    colors[i + 1] = 1;
    colors[i + 2] = 1;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.6
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight1 = new THREE.PointLight(0xffffff, 1, 200);
  pointLight1.position.set(50, 50, 50);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xcccccc, 0.8, 200);
  pointLight2.position.set(-50, -50, 50);
  scene.add(pointLight2);
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  
  // Rotate particles
  particles.rotation.x += 0.0001;
  particles.rotation.y += 0.0002;
  
  // Subtle scale pulse
  particles.scale.z = 0.95 + Math.sin(Date.now() * 0.001) * 0.05;
  
  // Add mouse interaction
  const time = Date.now() * 0.001;
  particles.rotation.x = time * 0.0005 + (mouseY - window.innerHeight / 2) * 0.00001;
  particles.rotation.y = time * 0.0008 + (mouseX - window.innerWidth / 2) * 0.00001;
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Initialize Three.js when page loads
document.addEventListener('DOMContentLoaded', initThreeJS);

// === Custom Animated Cursor ===
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorDot.textContent = '</>';
cursor.appendChild(cursorDot);
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let isMoving = false;
let moveTimeout;
let lastWaveTime = 0;
const waveInterval = 50; // ms between waves

// Trail text variables
const trailText = 'hello world;';
let lastTrailTime = 0;
const trailInterval = 100; // ms between trail texts

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Add movement class for animation effects
  if(!isMoving) {
    isMoving = true;
    cursorDot.style.animation = 'cursorPulse 1.5s ease-in-out infinite';
  }
  
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => {
    isMoving = false;
  }, 100);
  
  // Check hover over clickable elements
  const element = document.elementFromPoint(mouseX, mouseY);
  const isClickable = element && (
    element.tagName === 'A' || 
    element.tagName === 'BUTTON' || 
    element.classList.contains('btn') ||
    element.closest('a') ||
    element.closest('button') ||
    element.closest('.btn') ||
    element.onclick !== null
  );
  
  if(isClickable && !cursor.classList.contains('hover')) {
    cursor.classList.add('hover');
  } else if(!isClickable && cursor.classList.contains('hover')) {
    cursor.classList.remove('hover');
  }
  
  // Create wave effect
  const now = Date.now();
  if(now - lastWaveTime > waveInterval) {
    createWaveEffect(mouseX, mouseY);
    lastWaveTime = now;
  }
  
  // Create trailing particles on faster movement
  if(now - lastTrailTime > trailInterval) {
    createTrailingParticle(mouseX, mouseY);
    lastTrailTime = now;
  }
});

function createWaveEffect(x, y) {
  const wave = document.createElement('div');
  wave.style.position = 'fixed';
  wave.style.left = x + 'px';
  wave.style.top = y + 'px';
  wave.style.width = '10px';
  wave.style.height = '10px';
  wave.style.borderRadius = '50%';
  wave.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(200, 200, 200, 0.3) 50%, transparent 100%)';
  wave.style.pointerEvents = 'none';
  wave.style.zIndex = '9998';
  wave.style.animation = 'waveRipple 0.8s ease-out forwards';
  document.body.appendChild(wave);
  
  // Remove after animation completes
  setTimeout(() => {
    wave.remove();
  }, 800);
}

function createTrailingParticle(x, y) {
  const particle = document.createElement('div');
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 40;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  
  particle.style.position = 'fixed';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.borderRadius = '50%';
  particle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(150, 150, 150, 0.4))';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9997';
  particle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');
  particle.style.animation = 'particleFloat 0.8s ease-out forwards';
  document.body.appendChild(particle);
  
  // Remove after animation completes
  setTimeout(() => {
    particle.remove();
  }, 800);
}

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(updateCursor);
}
updateCursor();

document.addEventListener('mousedown', () => {
  cursor.classList.add('active');
  cursorDot.style.animation = 'cursorClick 0.4s ease-out, cursorPulse 1.5s ease-in-out 0.4s infinite';
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('active');
  cursorDot.style.animation = 'cursorPulse 1.5s ease-in-out infinite';
});

// Hide custom cursor when leaving window
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

// Simulate loading completion
window.addEventListener('load', function() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if(loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      loadingScreen.style.transition = 'opacity 0.6s ease, visibility 0.5s ease';
    }
  }, 10000);
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// === ENHANCED ANIMATIONS ===
// Add smooth fade-in animations to all elements
document.querySelectorAll('section, header').forEach((el, idx) => {
  el.style.animation = `fadeInDown 0.8s ease ${idx * 0.1}s both`;
});

// Animate buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Animate project cards
document.querySelectorAll('.project').forEach((card, idx) => {
  card.style.animation = `slideInUp 0.8s ease ${0.2 + idx * 0.1}s both`;
  
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 15px 40px rgba(0, 184, 148, 0.2)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  });
});

// Animate skill bars on view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.meter > i').forEach(bar => {
        bar.style.animation = 'progress 1.5s ease-out forwards';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill').forEach(skill => {
  skillObserver.observe(skill);
});

// Reveal on scroll with staggered effect
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e, idx)=>{ 
    if(e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
      }, idx * 50);
    }
  });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){ e.preventDefault(); const target = document.querySelector(id); if(target) target.scrollIntoView({behavior:'smooth',block:'start'}); }
  })
})

// Scrollspy -- update active nav link and document title
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('#mainNav a'));
const titleBase = 'Muhammad Naeemullah';
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      // update document title
      const link = navLinks.find(a => a.getAttribute('href') === '#'+id);
      const label = link ? link.dataset.title : id.charAt(0).toUpperCase()+id.slice(1);
      document.title = `${titleBase} — ${label}`;
      // active class
      navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    }
  })
},{threshold:0.5});
sections.forEach(s=>obs.observe(s));

// Contact form handler
window.handleContact = function(e){
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('contactStatus');
  const btn = form.querySelector('button');
  
  // Validate form
  if(!form.name.value || !form.email.value || !form.message.value) {
    status.textContent = 'Please fill all fields';
    status.style.color = '#ff6b6b';
    return;
  }
  
  btn.disabled = true;
  status.textContent = 'Sending...';
  status.style.color = 'var(--accent1)';
  
  setTimeout(()=>{ 
    status.textContent = '✓ Thanks — I will reply within 48 hours.';
    status.style.color = 'var(--accent1)';
    form.reset();
    btn.disabled = false;
  }, 900);
}

// Professional Three.js animated background with geometric shapes
function initThree(){
  const wrap = document.getElementById('threejs-canvas-wrap');
  if(!wrap) {
    console.log('Three.js canvas wrapper not found');
    return;
  }
  
  // Check if Three is loaded
  if(typeof THREE === 'undefined') {
    console.log('Waiting for Three.js to load...');
    setTimeout(initThree, 100);
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'threejs-canvas';
  wrap.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 1000);
  camera.position.z = 100;

  // Lighting
  const light1 = new THREE.PointLight(0xffffff, 1.5, 300);
  light1.position.set(50, 40, 60);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xcccccc, 1.2, 250);
  light2.position.set(-50, 30, 40);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0x333333, 0.6);
  scene.add(ambientLight);

  // Main rotating group
  const group = new THREE.Group();
  scene.add(group);

  // Create gradient canvas textures
  function createGradientTexture(color1, color2){
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }

  // Central rotating icosahedron
  const icoGeom = new THREE.IcosahedronGeometry(15, 3);
  const icoMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2
  });
  const ico = new THREE.Mesh(icoGeom, icoMat);
  group.add(ico);

  // Orbiting tetrahedrons
  const orbits = [];
  for(let i = 0; i < 3; i++){
    const tetGeom = new THREE.TetrahedronGeometry(6, 0);
    const tetMat = new THREE.MeshStandardMaterial({
      color: i === 0 ? 0xdddddd : i === 1 ? 0xbbbbbb : 0xffffff,
      emissive: i === 0 ? 0xdddddd : i === 1 ? 0xbbbbbb : 0xffffff,
      emissiveIntensity: 0.25,
      metalness: 0.7,
      roughness: 0.3
    });
    const tet = new THREE.Mesh(tetGeom, tetMat);
    const orbit = new THREE.Group();
    orbit.add(tet);
    tet.position.x = 35;
    orbit.rotation.z = (Math.PI * 2 / 3) * i;
    group.add(orbit);
    orbits.push({orbit, tet, index: i});
  }

  // Floating particles around the shapes
  const particleGeom = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for(let i = 0; i < particleCount; i++){
    positions[i*3] = (Math.random() - 0.5) * 120;
    positions[i*3+1] = (Math.random() - 0.5) * 120;
    positions[i*3+2] = (Math.random() - 0.5) * 80;
    
    velocities[i*3] = (Math.random() - 0.5) * 0.3;
    velocities[i*3+1] = (Math.random() - 0.5) * 0.3;
    velocities[i*3+2] = (Math.random() - 0.5) * 0.2;
  }
  
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 1.2,
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  group.add(particles);

  // Animation state
  let time = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function onResize(){
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  function animate(){
    time += 0.01;
    
    // Rotate main icosahedron
    ico.rotation.x += 0.003;
    ico.rotation.y += 0.004;
    
    // Orbit tetrahedrons
    orbits.forEach((o, idx) => {
      o.orbit.rotation.z += 0.008;
      o.tet.rotation.x += 0.015;
      o.tet.rotation.y -= 0.02;
      // Scale pulse
      const scale = 1 + Math.sin(time + idx) * 0.15;
      o.tet.scale.set(scale, scale, scale);
    });
    
    // Particle motion
    const posAttr = particleGeom.attributes.position.array;
    for(let i = 0; i < particleCount; i++){
      posAttr[i*3] += velocities[i*3];
      posAttr[i*3+1] += velocities[i*3+1];
      posAttr[i*3+2] += velocities[i*3+2];
      
      // Boundary wrap
      if(posAttr[i*3] > 60) posAttr[i*3] = -60;
      if(posAttr[i*3] < -60) posAttr[i*3] = 60;
      if(posAttr[i*3+1] > 60) posAttr[i*3+1] = -60;
      if(posAttr[i*3+1] < -60) posAttr[i*3+1] = 60;
    }
    particleGeom.attributes.position.needsUpdate = true;
    
    // Mouse-responsive group tilt
    group.rotation.x = mouseY * 0.3 + Math.sin(time * 0.2) * 0.1;
    group.rotation.y = mouseX * 0.3 + time * 0.1;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

// Initialize Three.js when ready
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThree);
} else {
  initThree();
}

}); // End DOMContentLoaded
