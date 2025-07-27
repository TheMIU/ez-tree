import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import fragmentShader from './shaders/skybox.frag?raw';
import vertexShader from './shaders/skybox.vert?raw';

export class SkyboxOptions {
  constructor() {
    /**
     * Color of the sky in the lower part of the sky
     */
    this.skyColorLow = new THREE.Color(0x6fa2ef).convertLinearToSRGB();

    /**
     * Color of the sun in the higher part of the sky
     */
    this.skyColorHigh = new THREE.Color(0x2053ff).convertLinearToSRGB();
  }
}

/**
 * Configurable skybox with sun and built-in lighting
 */
export class Skybox extends THREE.Mesh {
  /**
   * 
   * @param {SkyboxOptions} options 
   */
  constructor(options = new SkyboxOptions()) {
    super();

    this.name = 'Skybox';

    // Create a box geometry and apply the skybox material
    this.geometry = new THREE.SphereGeometry(900, 900, 900);

    // Create the skybox material with the shaders
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uSkyColorLow: { value: options.skyColorLow },
        uSkyColorHigh: { value: options.skyColorHigh },
      },
      side: THREE.BackSide
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.add(ambientLight);
  }

  /**
   * @returns {THREE.Color}
   */
  get skyColorLow() {
    return this.material.uniforms.uSkyColorLow.value;
  }

  set skyColorLow(color) {
    this.material.uniforms.uSkyColorLow.value = color;
  }

  /**
    * @returns {THREE.Color}
    */
  get skyColorHigh() {
    return this.material.uniforms.uSkyColorHigh.value;
  }

  set skyColorHigh(color) {
    this.material.uniforms.uSkyColorHigh.value = color;
  }
}