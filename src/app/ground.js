import * as THREE from 'three';

export class Ground extends THREE.Mesh {
  constructor() {
    // Simple large plane geometry
    const geometry = new THREE.PlaneGeometry(50,50);

    // Basic flat color material
    const material = new THREE.MeshStandardMaterial({
      color: 0x887E6F, // olive green
      roughness: 1,
      metalness: 0
    });

    super(geometry, material);

    this.rotation.x = -Math.PI / 2;
    /* this.receiveShadow = true; */
  }
}
