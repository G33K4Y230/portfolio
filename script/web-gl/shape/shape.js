import { gl } from "./../canvas.js"
import { SHADER_DEFAULT } from "./../shader/shader.js"
import Vector3D from "./../util/type/vector.js"
import Matrix4x4 from "./../util/type/matrix.js"

export default class Shape {
    
    constructor() {
	this._vertices = [];
	this._indices = [];
	this._shader = SHADER_DEFAULT;
	this._position = new Vector3D(0, 0, 0);
	this._scale = new Vector3D(1, 1, 1);
	this._rotation = new Vector3D(0, 0, 0);
	this._modelMatrix = new Matrix4x4();
    }

    get vertices() { return this._vertices; }
    get inidices() { return this._indices; }
    get shader() { return this._shader; }
    get position() { return this._position; }
    get scale() { return this._scale; }
    get rotation() { return this._rotation; }

    set vertices(vertices) { this._vertices = vertices; }
    set indices(indices) { this._indices = indices; }
    set shader(shader) { this._shader = shader; }
    set position(position) { this._position = position; }
    set scale(scale) { this._scale = scale; }
    set rotation(rotation) { this._rotation = rotation; }

    generateBuffers() {
	this._VBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);

	if(this._indices.length > 0) {
	    this._EBO = gl.createBuffer();
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._EBO);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);
	}
    }

    generateModelMatrix() {
	var scaleMatrix = new Matrix4x4();
	scaleMatrix.values[0] = this._scale.x;
	scaleMatrix.values[5] = this._scale.y;
	scaleMatrix.values[10] = this._scale.z;

	var translationMatrix = new Matrix4x4();
	translationMatrix.values[12] = this._position.x;
	translationMatrix.values[13] = this._position.y;
	translationMatrix.values[14] = this._position.z;

	const rotation = this._rotation.z * (Math.PI / 180);
	var rotationMatrix = new Matrix4x4();
	rotationMatrix.values[0] = Math.cos(rotation);
	rotationMatrix.values[1] = Math.sin(rotation);
	rotationMatrix.values[4] = -Math.sin(rotation);
	rotationMatrix.values[5] = Math.cos(rotation);
	rotationMatrix.values[11] = 0;
	
	this._modelMatrix = new Matrix4x4();
	this._modelMatrix = this._modelMatrix.multiply(translationMatrix);
	this._modelMatrix = this._modelMatrix.multiply(rotationMatrix);
	this._modelMatrix = this._modelMatrix.multiply(scaleMatrix);
    }
    
    draw() {

	if(this._shader.program !== null) {

	    this._shader.use();
	    this._shader.setUniformMatrix4fv("uModelMatrix", this._modelMatrix.values);
	    gl.bindBuffer(gl.ARRAY_BUFFER, this._VBO);
	    
	    if(this._indices.length > 0) {
		gl.drawElements(gl.TRIANGLES, this._indices.length, gl.UNSIGNED_SHORT, 0);
	    }
	    else
		gl.drawArrays(gl.TRIANGLES, 0, this._vertices.length);
	}
    }
    
}
