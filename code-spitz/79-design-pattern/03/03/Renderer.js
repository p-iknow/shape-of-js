const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {

	const attrKey = v[0];
	const attrValue = v[1];

	// innerHtml 은 property 니까 value 를 할당하고
	// appendChild 는 function 이니까 value 를 인자로 전달해서 실행시켜준다.

	typeof el[attrKey] == 'function' ? el[attrKey](attrValue) : (el[attrKey] = attrValue);
	return el;
}, document.createElement(tag));

const DomRenderer = class {
	constructor(parent) {
		this._parent = parent;
	}
	render(data) {
		// lsit 메소드가 리턴하는 형태가 data 로 들어온다
		const { task: { _title: title }, list } = data;
		const parent = document.querySelector(this._parent);
		parent.innerHTML = '';
		// 자료구조가 recursive 하면 그것을 소비하는 형태도 recusive 즉 컴포지트 패턴을 따라야 한다.
		// 진입점에 대한 예외
		parent.appendChild(el('h1', { innerHTML: title }));
		parent.appendChild(this._render(el('ul'), list));
		// 결과는 h1 과 list
	}

	_render(parent, list) {

		list.forEach(({ task, list }) => {
			const li = parent.appendChild(el('li'));
			li.appendChild(el('div', { innerHTML: task._title }));
			li.appendChild(this._render(el('ul'), list));
		})

		return parent;
	}
}
export default DomRenderer;
