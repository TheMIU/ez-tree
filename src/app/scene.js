import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Tree, TreePreset } from '@dgreenheck/ez-tree';
import { Environment } from './environment';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function paintUI() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

/**
 * Creates a new instance of the Three.js scene
 * @param {THREE.WebGLRenderer} renderer 
 * @returns 
 */
export async function createScene(renderer) {
  const scene = new THREE.Scene();

  const environment = new Environment();
  scene.add(environment);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000,
  );
  camera.position.set(100, 20, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minPolarAngle = Math.PI / 2 - 0.2;
  controls.maxPolarAngle = Math.PI / 2 + 0.13;
  controls.minDistance = 10;
  controls.maxDistance = 150;
  controls.target.set(0, 25, 0);
  controls.update();

  const tree = new Tree();
  tree.loadPreset('Ash Medium');
  tree.generate();
  /* tree.castShadow = true;
  tree.receiveShadow = true; */
  scene.add(tree);

  return {
    scene,
    environment,
    tree,
    camera,
    controls
  }
}