import { gl } from "./../canvas.js"
import { generateProgram } from "./../shader/shader.js"

export default class Shape {
    
    constructor() {
	this._vertices = [];
	this._indices = [];
    }

    get vertices() { return this._vertices; }
    get inidices() { return this._indices; }

    set vertices(vertices) { this._vertices = vertices; }
    set indices(indices) { this._indices = indices; }

    generateBuffers() {
	this._VBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);
    }

    draw() {
	gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	if(this._indices.length > 0)
	    gl.drawElements(gl.TRIANGLES, this._indices.length, gl.UNSIGNED_INT, 0);
	else
	    gl.drawArrays(gl.TRIANGLES, 0, this._vertices.length);
    }
    
}
