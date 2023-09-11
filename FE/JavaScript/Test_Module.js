/* eslint-disable import/no-absolute-path, import/no-absolute-path */
import * as THREE from 'three';
import { MMDLoader } from '/FE/install-public/three/examples/jsm/loaders/MMDLoader.js';
import { MMDAnimationHelper } from '/FE/install-public/three/examples/jsm/animation/MMDAnimationHelper.js';
import { LightProbeGenerator } from '/FE/install-public/three/examples/jsm/lights/LightProbeGenerator.js';
/* eslint-enable import/no-absolute-path, import/no-absolute-path */

const three_box = document.getElementById('three_box');
const box_W = three_box.clientWidth;
const box_H = three_box.clientHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(box_W, box_H);
three_box.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(45, box_W / box_H, 1, 1000);
camera.position.set(0, 10, 30);
scene.add(camera);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(0, 10, 0);
scene.add(light);

renderer.render(scene, camera);

let cube = null;

// Instantiate a loader
const loader = new MMDLoader();

// Load a MMD model
loader.load(
    // path to PMD/PMX file
    '../Assets/奇怪的丘丘人/奇怪的丘丘人.pmx',
    // called when the resource is loaded
    function (mesh) {
        cube = mesh;
        cube.position.x = 10;

        scene.add(mesh);
        console.log('mesh', mesh);
    },
    // called when loading is in progresses
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

// Instantiate a helper
const helper = new MMDAnimationHelper();

function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (cube) {
        // cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
}
animate();
