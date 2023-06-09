import * as THREE from './libs/three/three.module.js';
import { GLTFLoader } from './libs/three/jsm/GLTFLoader.js';
import { OrbitControls } from './libs/three/jsm/OrbitControls.js';
import { ARButton } from './libs/three/jsm/ARButton.js'

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x505050 );

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(0, 2, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );


renderer.xr.enabled = true;

document.body.appendChild(ARButton.createButton(renderer));

const loader = new GLTFLoader();

loader.load(
    'cat.glb',
    function (gltf) {

        scene.add(gltf.scene);

    }
)

renderer.render(scene, camera);