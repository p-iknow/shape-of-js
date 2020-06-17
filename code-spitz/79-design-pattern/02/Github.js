
import { err } from './util.js';

const Github = class {
	constructor(id, repo) {
		this._base = `https://api.github.com/repo/${id}/${repo}/contents/`;
	}
	load(path) {
		const id = 'callback' + Github._id++;
		const f = Github[id] = ({ data: { content } }) => {
			delete Github[id];
			document.head.removeChild(s);
			this._loaded(content);
		};

		const script = document.createElement('script');
		script.src = `${this._base + path}?callback=Github.${id}`;
		document.head.appendChild(script);
	}
	_loaded(v) {
		return err('overrided')
	}
}

Github._id = 0;
