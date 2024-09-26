import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry (in this case, an icosahedron)
const geometry = new THREE.IcosahedronGeometry(5, 0);
const material = new THREE.MeshBasicMaterial({
  color: 0xff3333,
  wireframe: true,
});
const icosahedron = new THREE.Mesh(geometry, material);

scene.add(icosahedron);

camera.position.z = 10;

// Set initial position (left side)
icosahedron.position.x = -5;

// Animation function
function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.x += 0.005;
  icosahedron.rotation.y += 0.005;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle scroll
function handleScroll() {
  const scrollPosition = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollPosition / documentHeight;

  // Move the icosahedron from left to center based on scroll progress
  icosahedron.position.x = -5 + scrollProgress * 5;

  // Optional: adjust size based on scroll position
  const scale = 1 + scrollProgress * 0.5; // Increase size by up to 50%
  icosahedron.scale.set(scale, scale, scale);
}

window.addEventListener("scroll", handleScroll);

// Start the animation
animate();
