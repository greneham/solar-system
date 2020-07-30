import React, { Component } from "react";
import "./Planet.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

class Planet extends Component {
  ref = React.createRef();

  componentDidMount() {
    const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader")
      .GLTFLoader;
    const DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader")
      .DRACOLoader;

    const { current } = this.ref;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    var headerH = document.getElementById("header").clientHeight;

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight - headerH);
    current.appendChild(renderer.domElement);

    // Instantiate a loader
    var loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    var pScale = 5;

    // make saturn smaller because of the rings
    if (this.props.gltf.indexOf("saturn") !== -1) {
      pScale = 4.4;
    }

    // Load a glTF resource
    loader.load(
      // resource URL
      this.props.gltf,
      // '/gltf/sun.gltf',
      // called when the resource is loaded
      function (gltf) {
        gltf.scene.scale.x = pScale;
        gltf.scene.scale.y = pScale;
        gltf.scene.scale.z = pScale;

        gltf.scene.rotation.x = Math.PI * 0.02;

        scene.add(gltf.scene);

        var animate = function () {
          requestAnimationFrame(animate);
          // gltf.scene.rotation.x += 0.01;
          gltf.scene.rotation.y += 0.005;
          renderer.render(scene, camera);
        };
        animate();
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.render(scene, camera);
    }
  }
  render() {
    return (
      <div
        data-testid="Planet"
        ref={this.ref}
        className="planet overflow-x-hidden"
      />
    );
  }
}

export default Planet;
