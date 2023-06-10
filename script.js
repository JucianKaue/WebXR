import * as THREE from './libs/three/three.module.js';
import { GLTFLoader } from './libs/three/jsm/GLTFLoader.js';
import { OrbitControls } from './libs/three/jsm/OrbitControls.js';
import { ARButton } from './libs/three/jsm/ARButton.js'

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x505050 );

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 5);

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// const light = new THREE.DirectionalLight( 0xffffff );
// light.position.set( 1, 1, 1 ).normalize();
// scene.add( light );

console.log('selected');

    const loader = new GLTFLoader();

    loader.load(
        'cat.glb',
        function (gltf) {
            let cat = gltf.scene;

            cat.scale.set(4, 4, 4);
            cat.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
            scene.add(cat);
            renderer.render(scene, camera);

        }, undefined, undefined
    );

function onSelect() {
    console.log('selected');

    const loader = new GLTFLoader();

    loader.load(
        'cat.glb',
        function (gltf) {
            let cat = gltf.scene;

            cat.scale.set(4, 4, 4);
            cat.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
            scene.add(cat);
            renderer.render(scene, camera);

        }, undefined, undefined
    );
}

let controller = renderer.xr.getController(0);
controller.addEventListener('select', onSelect)
scene.add( controller );

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 3, 0);
scene.add(box);

renderer.xr.enabled = true;
document.body.appendChild(ARButton.createButton(renderer));

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.render(scene, camera);