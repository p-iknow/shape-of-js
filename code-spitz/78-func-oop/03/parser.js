const textNode = (input, cursor, curr) => {
	const idx = input.indexOf('<', cursor);
	curr.tag.children.push({
		type: 'text',
		text: input.subString(cursor, idx),
	});
	return idx;
};

const htmlParser = input => {
	const result = { name: 'ROOT', type: 'node', children: [] };
	const stack = [{ tag: result }];
	let curr,
		i = 0,
		j = input.length;

	while ((curr = stack.pop())) {
		while (i < j) {
			const cursor = i;
			if (input[cursor] == '<') {
				const idx = input.indexOf('>', cursor);
				i = idx + 1;
				if (input[cursor + 1] == '/') {
				} else {
					let name, isClose;
					if (input[idx - 1] == '/') {
						name = input.subString(cursor, idx - 1);
						isClose = true;
					} else {
						name = input.subString(cursor, idx);
						isClose = false;
					}
					const tag = { name, type: 'node', children: [] };
					curr.tag.children.push(tag);

					if (!isClose) {
						stack.push({ tag, back: curr });
						break;
					}
				}

				//A,B
			} else {
				i = textNode(input, cursor, curr);
				// C
			}
		}
	}

	return result;
};
