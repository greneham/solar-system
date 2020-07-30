import React, { Component } from "react";
import "./SolarSystem.css";
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
    camera.position.y = 5.0;
    camera.rotation.x = -0.8;

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

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);

    var loadBody = function (body) {
      loader.load(
        // resource URL
        body.path,
        // called when the resource is loaded
        function (gltf) {
          gltf.scene.scale.x = body.scale;
          gltf.scene.scale.y = body.scale;
          gltf.scene.scale.z = body.scale;

          scene.add(gltf.scene);

          body.gltf = gltf;
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
    };

    // all of our planets + the sun
    var bodies = [
      {
        name: "sun",
        path: "/gltf/sun.gltf",
        scale: 1,
        orbitRadius: 0,
        orbitOffset: 0,
        gltf: null,
        tooltip: document.getElementById("sun"),
        tooltipOffsetX: -16,
        tooltipOffsetY: 20,
      },
      {
        name: "mercury",
        path: "/gltf/mercury.gltf",
        scale: 0.1,
        orbitRadius: 0.8,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("mercury"),
        tooltipOffsetX: -26,
        tooltipOffsetY: 50,
      },
      {
        name: "venus",
        path: "/gltf/venus.gltf",
        scale: 0.2,
        orbitRadius: 1.2,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("venus"),
        tooltipOffsetX: -22,
        tooltipOffsetY: 45,
      },
      {
        name: "earth",
        path: "/gltf/earth.gltf",
        scale: 0.2,
        orbitRadius: 1.6,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("earth"),
        tooltipOffsetX: -20,
        tooltipOffsetY: 45,
      },
      {
        name: "mars",
        path: "/gltf/mars.gltf",
        scale: 0.15,
        orbitRadius: 1.9,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("mars"),
        tooltipOffsetX: -18,
        tooltipOffsetY: 45,
      },
      {
        name: "jupiter",
        path: "/gltf/jupiter.gltf",
        scale: 0.35,
        orbitRadius: 2.4,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("jupiter"),
        tooltipOffsetX: -24,
        tooltipOffsetY: 45,
      },
      {
        name: "saturn",
        path: "/gltf/saturn.gltf",
        scale: 0.2,
        orbitRadius: 2.9,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("saturn"),
        tooltipOffsetX: -24,
        tooltipOffsetY: 45,
      },
      {
        name: "uranus",
        path: "/gltf/uranus.gltf",
        scale: 0.27,
        orbitRadius: 3.7,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("uranus"),
        tooltipOffsetX: -24,
        tooltipOffsetY: 45,
      },
      {
        name: "neptune",
        path: "/gltf/neptune.gltf",
        scale: 0.27,
        orbitRadius: 4.2,
        orbitOffset: Math.random() * 2 * Math.PI, //start at random point of orbit
        gltf: null,
        tooltip: document.getElementById("neptune"),
        tooltipOffsetX: -24,
        tooltipOffsetY: 45,
      },
    ];

    // Load a glTF resource
    for (var i = 0; i < bodies.length; i++) {
      loadBody(bodies[i]);
    }

    var orbitDuration = 24000;

    // convert 3d pos to 2d screen pos
    var toScreenPosition = function (obj, camera) {
      var vector = new THREE.Vector3();

      var widthHalf = 0.5 * renderer.getContext().canvas.width;
      var heightHalf = 0.5 * renderer.getContext().canvas.height;

      obj.updateMatrixWorld();
      vector.setFromMatrixPosition(obj.matrixWorld);
      vector.project(camera);

      vector.x = vector.x * widthHalf + widthHalf;
      vector.y = -(vector.y * heightHalf) + heightHalf;

      return {
        x: vector.x,
        y: vector.y,
      };
    };

    var animate = function () {
      requestAnimationFrame(animate);
      // gltf.scene.rotation.x += 0.01;
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i]["gltf"] != null) {
          bodies[i]["gltf"].scene.rotation.y += 0.005;

          // orbit planet (circular motion)
          bodies[i]["gltf"].scene.position.x =
            Math.sin(
              ((Date.now() % orbitDuration) / orbitDuration) * Math.PI * 2 +
                bodies[i].orbitOffset
            ) * bodies[i].orbitRadius;
          bodies[i]["gltf"].scene.position.z =
            Math.cos(
              ((Date.now() % orbitDuration) / orbitDuration) * Math.PI * 2 +
                bodies[i].orbitOffset
            ) * bodies[i].orbitRadius;

          var screenPos = toScreenPosition(bodies[i]["gltf"].scene, camera);

          bodies[i].tooltip.style.left =
            screenPos.x + bodies[i].tooltipOffsetX + "px";
          bodies[i].tooltip.style.top =
            screenPos.y + bodies[i].tooltipOffsetY + "px";
        }
      }

      renderer.render(scene, camera);
    };
    animate();

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
      <div className="relative">
        <div
          data-testid="Planet"
          ref={this.ref}
          className="planet overflow-x-hidden"
        />
      </div>
    );
  }
}

export default Planet;
