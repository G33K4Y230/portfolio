import Shape from "./shape.js"

export default class Triangle extends Shape {

    constructor(size) {
	super();
	this._vertices = this.generateVertices(size);
	this.generateBuffers();
    }

    generateVertices(size) {
	const vertices = [
	    -size / 2.0, -size / 2.0, 0.0,      0.0, 0.0,
	     size / 2.0, -size / 2.0, 0.0,      1.0, 0.0,
 	     0.0       ,  size / 2.0, 0.0,      0.5, 1.0
	]

	return vertices;
    }
   
}
