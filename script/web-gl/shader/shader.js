import { gl } from "./../canvas.js"
import { printFile, readFile } from "./../util/file.js"

export let SHADER_DEFAULT;

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

export async function generateShaders() {
    SHADER_DEFAULT = new Shader("default", "default");
}

class Shader {

    constructor(vertexShaderName, fragmentShaderName) {
	this._vertexShaderName = vertexShaderName;
	this._fragmentShaderName = fragmentShaderName;
	this._program = null;
	this.generate();
    }

    get program() {
	return this._program;
    }

    async generate() {

	const vertexPath = "script/web-gl/shader/vertex/" + this._vertexShaderName + ".shader";
	const vertexContents = await readFile(vertexPath);
	const vertexShader = generateGLShader(vertexContents, "vertex");

	const fragmentPath = "script/web-gl/shader/fragment/" + this._fragmentShaderName + ".shader"
	const fragmentContents = await readFile(fragmentPath);
	const fragmentShader = generateGLShader(fragmentContents, "fragment");

	this._program = gl.createProgram();
	gl.attachShader(this._program, vertexShader);
	gl.attachShader(this._program, fragmentShader);
	gl.linkProgram(this._program);
	if(!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
	    console.error("Error! Failed to link shader program!\n", glGetProgramInfoLog(program));
	    return;
	}
	
	this.generateProgramAttributes();	
    }

    generateProgramAttributes() {

	var positionAttribLocation = gl.getAttribLocation(this._program, "aPosition");
	gl.vertexAttribPointer(
	    positionAttribLocation,
	    3,
	    gl.FLOAT,
	    gl.FALSE,
	    5 * Float32Array.BYTES_PER_ELEMENT,
	    0
	);
	
	var uvAttribLocation = gl.getAttribLocation(this._program, "aUV");
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
    }

    use() {
	gl.useProgram(this._program);
    }
    
}
