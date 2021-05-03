import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl'


class Webgl{
    constructor(){
        this.scene = new THREE.Scene();
        
        this.container = document.querySelector('main');
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
     
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          0.001,
          4000
        );
        this.camera.position.set(0, 0, 400);
        this.perspective = 400;
    
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.addObject();
        this.resize();
        this.setupResize();
        
        this.render();
    }

    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
      }
    
      resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.fov = 2 * Math.atan(this.width / this.camera.aspect / (2 * this.perspective)) * (180 / Math.PI); // in degrees
        this.plane.scale.set(this.width, this.height, this.width/2)
        this.camera.updateProjectionMatrix();
      }

      addObject(){

        this.geometry = new THREE.PlaneGeometry(1,1,100,100);
        this.uniforms = {
            uTexture: {value: null},
            uTime: {value: 0.0}
        }
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: this.uniforms,
            transparent: true,
            wireframe: true
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.scale.set(this.width, this.height, this.width/2)
        this.scene.add(this.plane);
      }
    

      render() {
        this.uniforms.uTime.value += 0.1
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
      }
}

new Webgl();

