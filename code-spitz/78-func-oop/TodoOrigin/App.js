import Folder from './Folder.js';
import { err } from './util.js';

const App = class {
	constructor() {
		this.folders = new Set();
	}

	addFolder(folder) {
		if (!(folder instanceof Folder)) err('invalid Folder');
		this.folders.add(folder);
	}

	removeTask(folder) {
		if (!(folder instanceof Folder)) err('invalid Folder');
		this.folders.delete(folder);
	}

	getFolders() {
		return [...this.folders.values()];
	}
}

export default App;
