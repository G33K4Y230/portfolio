export default class Vector3D {

    constructor(x, y, z) {
	this._x = x;
	this._y = y;
	this._z = z;
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    set x(x) { if(!isNaN(x)) this._x = x; }
    set y(y) { if(!isNaN(y)) this._y = y; }
    set z(z) { if(!isNaN(z)) this._z = z; }
    
}

export const cross = (a, b) => {
    const x = a.y * b.z - a.z * b.y;
    const y = a.z * b.x - a.x * b.z;
    const z = a.x * b.y - a.y * b.x;

    return new Vector3D(x, y, z);
}

export const add = (a, b) => {
    return new Vector3D(
	a.x + b.x,
	a.y + b.y,
	a.z + b.z
    );
}

export const multiply = (vector, scale) => {
    return new Vector3D(
	vector.x * scale,
	vector.y * scale,
	vector.z * scale
    );
}
