import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(2, 2, 2);

// adding texture Loader
const loader = new THREE.TextureLoader();
const texture = loader.load(
  "../public/ganyu-lantern-rite-2023-official-desktop-wallpaper-genshin.jpg"
);
texture.colorSpace = THREE.SRGBColorSpace;
// const materials = [
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-1.jpg')}),
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-2.jpg')}),
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-3.jpg')}),
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-4.jpg')}),
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-5.jpg')}),
//   new THREE.MeshBasicMaterial({map: loadColorTexture('resources/images/flower-6.jpg')}),
// ];
// texture.minFilter = THREE.LinearMipMapLinearFilter;
texture.minFilter = THREE.NearestFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const material = new THREE.MeshBasicMaterial({ map: texture });

// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 50);
camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

const render = (time) => {
  time *= 0.001; // convert to seconds
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
};
render();
