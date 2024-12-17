import { gl } from "./../canvas.js"
import { printFile, readFile } from "./../util/file.js"

export let SHADER_DEFAULT;

async function generateProgram(vertexShaderName, fragmentShaderName) {

    const vertexPath = "script/web-gl/shader/vertex/" + vertexShaderName + ".shader";
    const vertexContents = await readFile(vertexPath);
    const vertexShader = generateGLShader(vertexContents, "vertex");

    const fragmentPath = "script/web-gl/shader/fragment/" + fragmentShaderName  + ".shader"
    const fragmentContents = await readFile(fragmentPath);
    const fragmentShader = generateGLShader(fragmentContents, "fragment");
}

const generateGLShader = (contents, type) => {
    const shader = gl.createShader(type == "vertex" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, contents);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	console.error("Error! Failed to compile", type, "shader!\n", gl.getShaderInfoLog(shader));
	return;
    }
}


export async function generateShaders () {
    SHADER_DEFAULT = new Shader("default", "default");
}

class Shader {
    constructor(vertexShaderName, fragmentShaderName) {
	this._program = generateProgram(vertexShaderName, fragmentShaderName);
    }
}
