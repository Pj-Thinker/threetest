import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import * as dat from 'lil-gui';
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
// Debug
const gui = new dat.GUI();

// canvas
const canvas = document.querySelector('canvas.webgl');
// Scene
const scene = new THREE.Scene();
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
scene.add(camera);
// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Clock
const clock = new THREE.Clock();
const tick = () => {
  controls.update();
  const elapsedTime = clock.getElapsedTime();
  // Update object
  // mesh.rotation.y = (elapsedTime * Math.PI) / 2;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

// UI debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');
gui.add(material, 'wireframe');
gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
});
gui.add(parameters, 'spin');
