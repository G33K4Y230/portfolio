import Shape from "./shape.js"
import Vector3D from "./../util/type/vector.js"
import { cross, add, multiply } from "./../util/type/vector.js"

export default class Sphere extends Shape {
    
    constructor(radius, resolution) {
	super();
	this.generateVertices(radius, resolution);
	this.generateIndices(resolution);
	this.generateBuffers();
    }

    generateVertices(radius, resolution) {

	var axes = [
	    [new Vector3D(1, 0, 0), new Vector3D(0, 1, 0)],
	    [new Vector3D(-1, 0, 0), new Vector3D(0, 1, 0)],
	    [new Vector3D(1, 0, 0), new Vector3D(0, 0, 1)],
	    [new Vector3D(-1, 0, 0), new Vector3D(0, 0, 1)],
	    [new Vector3D(0, 0, 1), new Vector3D(0, 1, 0)],
	    [new Vector3D(0, 0, -1), new Vector3D(0, 1, 0)]
	];

	var index = 0;
	
	axes.forEach((a) => {
	    for(var i = 0; i <= resolution; i++) {
		const xRatio = i / resolution;
		for(var j = 0; j <= resolution; j++) {
		    const yRatio = j / resolution;
		    const x = multiply(a[0], xRatio);
		    const y = multiply(a[1], yRatio);
		    const z = cross(a[0], a[1]);
		    let position = add(x, y);
		    position = add(position, z);
		    position = multiply(position, radius);
		    console.log(index++, position.x, position.y, position.z);
		    this._vertices.push(position.x);
		    this._vertices.push(position.y);
		    this._vertices.push(position.z);

		    const uvX = ( (x + 1) / 2 ) / radius;
		    const uvY = ( (y + 1) / 2 ) / radius;

		    this._vertices.push(uvX);
		    this._vertices.push(uvY);
		}
	    }
	});
    }

    generateIndices(resolution) {
	
	for(var y = 0; y < resolution; y++) {
	    for(var x = 0; x < resolution; x++) {
		var a = y * (resolution * resolution + 1) + x;
		var b = a + 1;
		var c = a + (resolution * resolution - 1);
		var d = c + 1;
		this._indices.push(a);
		this._indices.push(b);
		this._indices.push(d);
		this._indices.push(a);
		this._indices.push(d);
		this._indices.push(c);

		console.log(a, b, c, d);
	    }
	}
    }
}
