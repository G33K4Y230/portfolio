export const printFile = (path) => {
    try {
	fetch(path).then((x) => x.text()).then((y) => {
	    alert(y);
	})
    } catch(error) {
	console.log("Error! Failed to read file from path!", "\n", path);
    }
}

export async function readFile(path) {
    
    let object = await fetch(path);
    let text = await object.text();
    
    return text;
}
