import { gl } from "./../canvas.js"
import { SHADER_DEFAULT } from "./../shader/shader.js"

export default class Shape {
    
    constructor() {
	this._vertices = [];
	this._indices = [];
	this._shader = SHADER_DEFAULT;
    }

    get vertices() { return this._vertices; }
    get inidices() { return this._indices; }
    get shader() { return this._shader; }

    set vertices(vertices) { this._vertices = vertices; }
    set indices(indices) { this._indices = indices; }
    set shader(shader) { this._shader = shader; }

    generateBuffers() {
	this._VBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);
    }

    draw() {

	if(this._shader.program !== null) {
	    this._shader.use();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	    if(this._indices.length > 0)
		gl.drawElements(gl.TRIANGLES, this._indices.length, gl.UNSIGNED_INT, 0);
	    else
		gl.drawArrays(gl.TRIANGLES, 0, this._vertices.length);
	}
    }
    
}
