import { gl } from "./../canvas.js"
import { printFile, readFile } from "./../util/file.js"

let program;

const generateGLShader = (contents, type) => {
    const shader = gl.createShader(type == "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, contents);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	console.error("Error! Failed to compile", type, "shader!\n", gl.getShaderInfoLog(shader), "\n\n", contents);
	return;
    }

    return shader;
}

const generateShader 

export async function generateProgram() {

    const vertexShaderName = "default";
    const fragmentShaderName = "default";
    
    const vertexPath = "script/web-gl/shader/vertex/" + vertexShaderName + ".shader";
    const vertexContents = await readFile(vertexPath);
    const vertexShader = generateGLShader(vertexContents, "vertex");

    const fragmentPath = "script/web-gl/shader/fragment/" + fragmentShaderName + ".shader"
    const fragmentContents = await readFile(fragmentPath);
    const fragmentShader = generateGLShader(fragmentContents, "fragment");

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	console.error("Error! Failed to link shader program!\n", glGetProgramInfoLog(program));
	return;
    }
    
    var positionAttribLocation = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(
	positionAttribLocation,
	3,
	gl.FLOAT,
	gl.FALSE,
	5 * Float32Array.BYTES_PER_ELEMENT,
	0
    );
    var uvAttribLocation = gl.getAttribLocation(program, "aUV");
    gl.vertexAttribPointer(
	uvAttribLocation,
	2,
	gl.FLOAT,
	gl.FALSE,
	5 * Float32Array.BYTES_PER_ELEMENT,
	3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(uvAttribLocation);

    gl.useProgram(program);
}

class Shader {

    constructor(vertexShaderName, fragmentShaderName) {
	const vertexPath = "script/web-gl/shader/vertex/" + vertexShaderName + ".shader";
    const vertexContents = await readFile(vertexPath);
    const vertexShader = generateGLShader(vertexContents, "vertex");

    const fragmentPath = "script/web-gl/shader/fragment/" + fragmentShaderName + ".shader"
    const fragmentContents = await readFile(fragmentPath);
    const fragmentShader = generateGLShader(fragmentContents, "fragment");

    }
    
}
