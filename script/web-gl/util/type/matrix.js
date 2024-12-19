export default class Matrix4x4 {
    
    constructor() {
	this._values = new Float32Array(16);
	this._values[0] = this._values[5] = this._values[10] = this._values[15] = 1;
    }

    get values() { return this._values; }
    
    set values(values) { this._values = values; }

    print() {

	var contents = "";
	
	for(var y = 0; y < 4; y++) {
	    for(var x = 0; x < 4; x++) {
		contents += this._values[x * 4 + y] + " ";
	    }
	    contents += '\n';
	}

	console.log(contents);
    }
    
    getRows() {
	var rows = []	
 	for(var y = 0; y < 4; y++) {
	    var row = []
	    for(var x = 0; x < 4; x++) {
		row.push(this._values[x * 4 + y])
	    }
	    rows.push(row)
	}
	return rows;
    }

    getColumns() {
	var columns = [];
	for(var x = 0; x < 4; x++) {
	    var column = [];
	    for(var y = 0; y < 4; y++) {
		column.push(this._values[x * 4 + y]);
	    }
	    columns.push(column);
	}
	return columns;
    }
    
    multiply(matrix) {

	var m = new Matrix4x4();
	var rows = this.getRows();
	var columns = matrix.getColumns();
	
	for(var y = 0; y < 4; y++) {
	    for(var x = 0; x < 4; x++) {
		var value = 0;
		for(var i = 0; i < 4; i++)
		    value += rows[y][i] * columns[x][i];
		m.values[x * 4 + y] = value;
	    }
	}

	return m;
    }
}
