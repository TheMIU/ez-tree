import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { setupUI } from './ui';
import { createScene } from './scene';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('app')
  const pixelRatioSlider = document.getElementById('pixelRatioSlider');
  const pixelRatioValue = document.getElementById('pixelRatioValue');

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0);
  renderer.setSize(container.clientWidth, container.clientHeight);
  /* renderer.setPixelRatio(0.8); */
  // Update renderer pixel ratio and sizes on change
  const savedRatio = parseFloat(localStorage.getItem('pixelRatio')) || 0.8;
  renderer.setPixelRatio(savedRatio);
  pixelRatioSlider.value = savedRatio;
  pixelRatioValue.textContent = savedRatio.toFixed(2);

  pixelRatioSlider.addEventListener('input', () => {
    const ratio = parseFloat(pixelRatioSlider.value);
    pixelRatioValue.textContent = ratio.toFixed(2);
    renderer.setPixelRatio(ratio);
    localStorage.setItem('pixelRatio', ratio);
    resize();
  });


  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 2;
  container.appendChild(renderer.domElement);

  const { scene, environment, tree, camera, controls } = await createScene(renderer);

  const composer = new EffectComposer(renderer);

  composer.addPass(new RenderPass(scene, camera));

  const smaaPass = new SMAAPass(
    container.clientWidth * renderer.getPixelRatio(),
    container.clientHeight * renderer.getPixelRatio());
  composer.addPass(smaaPass);

  composer.addPass(new OutputPass());

  function animate() {
    controls.update();
    composer.render();
    requestAnimationFrame(animate);
  }

  function resize() {
    renderer.setSize(container.clientWidth, container.clientHeight);
    smaaPass.setSize(container.clientWidth, container.clientHeight);
    composer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);

  setupUI(tree, environment, renderer, scene, camera, controls, 'Ash Medium');
  animate();
  resize();
});
