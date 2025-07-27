import * as THREE from 'three';
import { Skybox } from './skybox';
import { Ground } from './ground';

export class Environment extends THREE.Object3D {
  constructor() {
    super();
    
    this.ground = new Ground();
    this.add(this.ground);

    this.skybox = new Skybox();
    this.add(this.skybox);
  }
}