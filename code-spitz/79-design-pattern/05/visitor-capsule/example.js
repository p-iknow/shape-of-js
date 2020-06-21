const Search = class {
	search(v) { }
};

const File = class extends Search {
	search(v) {
		return this.content.includes(v) ? [this] : [];
	}
};

const Folder = class extends Search {
	search(v) {
		return this.children.filter(f => f.search(v).length); //length 가 0 이면 falsy;
	}
}
