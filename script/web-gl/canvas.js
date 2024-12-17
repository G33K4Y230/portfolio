import { generateShaders } from "./shader/shader.js"

export var gl;

const initializeWebGL = () => {    
    const canvas = document.getElementById("web-gl-canvas");
    gl = canvas.getContext("webgl2");
    if(!gl) {
	console.error("Error! Failed to initialize WebGL2 Context!",
		      "\nYour browser does not support GLES3.0!");
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
}

initializeWebGL();
generateShaders();
