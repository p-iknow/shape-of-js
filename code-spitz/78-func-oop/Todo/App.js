import Folder from './Folder.js';
import { err } from './util.js';

// App이 Set을 상속받은 것만 봐도 App에는 중복된 폴더를 넣을 수 없겠구나를 바로 알 수 있다.
const App = class extends Set {
	static load(json) {
		const app = new App();
		json.forEach(folder => {
			app.addFolder(Folder.load(folder));
		})
		return app;
	}

	toJSON() {
		return this.getFolders();
	}

	constructor() {
		super()
	}

	addFolder(folder) {
		if (!(folder instanceof Folder)) err('invalid Folder');
		super.add(folder);
	}

	removeTask(folder) {
		if (!(folder instanceof Folder)) err('invalid Folder');
		super.delete(folder);
	}

	getFolders() {
		return [...super.values()];
	}

	add() {
		err('you can\'t use add, use app.addTask')
	}
	delete() {
		err('you can\'t use delete, use app.removeTaske')
	}
	clear() {
		err('you can\'t use clear')
	}
	values() {
		err('you can\'t use values, use app.getTasks')
	}
}

export default App;
