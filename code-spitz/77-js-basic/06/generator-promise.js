const profie = function*(end, r) {
	const userId = yield new Promise(res => $.post('member.php', { r }, res));
	let added = yield new Promise(res => $.post('detail.php', { userId }, res));
	added = added.split(',');
	end({ userId, nick: added[0], thumb: added[1] });
};

const executor = (gene, end, ...arg) => {
	const iter = gene(end, ...arg);
	const next = ({ value, done }) => {
		if (!done) value.then(v => next(iter.next(v)));
	};
	next(iter.next());
};
