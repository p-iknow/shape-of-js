const SEPERATOR = '--------------------------';

const ConsoleRenderer = class {
	render(data) {
		const { task: { _title: title }, list } = data;
		console.log(SEPERATOR);
		console.log(`Folder: ${title}`);
		this._render(' ', list);
	}
	_render(indent, list) {
		list.forEach(({ task: { _title: title }, list }) => {
			console.log(indent + title);
			this._render(indent + '-', list);
		})
	}
}

export default ConsoleRenderer;
