// 여기서 r은 api 호출에 넘기는 rawId 값이라고 해두자
const profile = function*(end, next, r) {
	const userId = yield $.post('member.php', { r }, next);
	let added = yield $.post('detil.php', { userId }, next);
	added = added.split(',');
	end({ userId, nick: added[0], thumb: added[2] });
};

const executor = (end, gene, ...arg) => {
	const next = v => {
		// 여기서 iter 는 free variable 로 next 함수는 클로저 공간이다
		// iter 가 선언 되기 이전에 사용되었지만, 값을 쓰거나, 인자로 전달되지 않았기 때문에 사용이 가능하다.
		iter.next(v); // next 함수에 인자를 넘기면 yield 공간에 전달되어 할당된다.
	};
	const iter = gene(end, next, ...arg);
	iter.next();
};
