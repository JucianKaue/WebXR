import * as THREE from '../../libs/three/three.module.js';
import { GLTFLoader } from '../../libs/three/jsm/GLTFLoader.js';
import { DRACOLoader} from '../../libs/three/jsm/DRACOLoader.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';
import { ARButton } from '../../libs/three/jsm/ARButton.js';
import { LoadingBar } from '../../libs/LoadingBar.js';
import { Stats } from '../../libs/stats.module.js';


class App {
    constructor() {
        // Configurações do renderizador
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(this.renderer.domElement);

        // Configurações do cenario
        this.scene = new THREE.Scene();

        // Adiciona camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 5);

        // const axesHelper = new THREE.AxesHelper(3);
        // scene.add(axesHelper);

        // Adiciona luz ambiente
        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(ambientLight);

        // const light = new THREE.DirectionalLight( 0xffffff );
        // light.position.set( 1, 1, 1 ).normalize();
        // scene.add( light );

        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);

        this.clock = new THREE.Clock();
       
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./libs/three/jsm/draco/');
        this.loadingBar = new LoadingBar();

        const self = this;

        loader.load(
            'cat.glb',
            function(gltf) {
                self.cat = gltf.scene;
                self.cat.scale.set(5, 5, 5)
                self.cat.position.set(0, -1, -3)
                console.log(gltf.animations[0])
                
                self.mixer = new THREE.AnimationMixer(self.cat);
                self.action = self.mixer.clipAction(gltf.animations[0]);

                self.action.enabled = true;
                self.action.play();

                self.scene.add(self.cat);

                self.loadingBar.visible = false;
                self.renderer.setAnimationLoop(self.render.bind(self));
            }, function(xhr) {
                self.loadingBar.progress = (xhr.loaded / xhr.total);
            }, function(err) {
                console.log('An error accured')
            }
        )

        let controller = this.renderer.xr.getController(0);
        this.scene.add(controller);

        this.renderer.xr.enabled = true;
        this.button = ARButton.createButton(this.renderer);
        this.button.style.backgroundImage = 'url("horto_resized.png")';
        this.button.style.height = '32px';
        this.button.style.width = '29px';
        this.button.style.color = 'black';
        this.button.style.fontWeight = '900';
        this.button.textContent = 'INICIAR';
        this.button.addEventListener('click', this.runAudio);
        
        document.body.appendChild(this.button);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.render();
    }

    runAudio() {
        let myAudio = new Audio();
        myAudio.src = 'Serelepe.mp3';
        myAudio.autoplay = true;
    }
    

    render() {
        let dt = this.clock.getDelta();
        this.stats.update();
        this.mixer.update(dt);
        this.renderer.render(this.scene, this.camera);
    }

}

export { App };