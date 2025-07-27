import * as THREE from 'three';

export class Skybox extends THREE.Object3D {
  constructor(color = 0xC1E6F5) { //sky blue
    super();

    this.name = 'Skybox';

    // Create a large sphere with a basic color material
    const geometry = new THREE.SphereGeometry(300, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.BackSide
    });

    const sky = new THREE.Mesh(geometry, material);
    this.add(sky);

    // Add simple ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); 
    this.add(ambientLight);
  }
}
