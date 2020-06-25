export const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {

	const attrKey = v[0];
	const attrValue = v[1];

	// innerHtml 은 property 니까 value 를 할당하고
	// appendChild 는 function 이니까 value 를 인자로 전달해서 실행시켜준다.

	typeof el[attrKey] == 'function' ? el[attrKey](attrValue) : (el[attrKey] = attrValue);
	return el;
}, document.createElement(tag));
