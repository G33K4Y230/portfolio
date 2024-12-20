import { generateShaders } from "./shader/shader.js" 
import Triangle from "./shape/triangle.js"
import Sphere from "./shape/sphere.js"
import Matrix4x4 from "./util/type/matrix.js"
import Vector3D from "./util/type/vector.js"

export var gl;

const updateFrame = () => {

    const canvas = document.getElementById("web-gl-canvas");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);
}

const initializeWebGL = () => {    
    const canvas = document.getElementById("web-gl-canvas");
    gl = canvas.getContext("webgl");
    if(!gl) {
	console.error("Error! Failed to initialize WebGL2 Context!",
		      "\nYour browser does not support GLES3.0!");
    }

    window.addEventListener("resize", (event) => {
	updateFrame();
    })

    updateFrame();
    
}

initializeWebGL();
generateShaders();

const scale = 0.75;
const triangle = new Triangle(scale);
//const sphere = new Sphere(0.25, 2);

var positionDelta = new Vector3D(
    Math.random() * 0.01 * (Math.random() > 0.5 ? -1 : 1),
    Math.random() * 0.01 * (Math.random() > 0.5 ? -1 : 1),
    0
);
var rotationDelta = Math.random() * (Math.random() > 0.5 ? -1 : 1);

const animateTriangle = () => {

    if(Math.abs(triangle.position.x) > 1 - scale / 4.0) {
	positionDelta.x *= -1;
//	triangle.position.x -= Math.abs(delta.x) * (delta.x < 0 ? 1 : -1)
    }

    if(Math.abs(triangle.position.y) > 1 - scale / 4.0) {
	positionDelta.y *= -1;
//	triangle.position.y -= Math.abs(delta.y) * (delta.y < 0 ? 1 : -1);
    }

    triangle.position.x += positionDelta.x;
    triangle.position.y += positionDelta.y;
    triangle.rotation.z += 0.5;

    triangle.generateModelMatrix();
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
    animateTriangle();
    triangle.draw();
//    sphere.draw();
    requestAnimationFrame(draw);    
}

draw();
