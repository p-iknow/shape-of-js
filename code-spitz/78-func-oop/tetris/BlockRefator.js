import { prop } from './util.js';

const Block = class {
	constructor(color, ...blocks) {
		// block 의 color 와 rotate 회전값을 초기화
		prop(this, { color, rotate: 0, blocks, count: blocks.length - 1 });
	}
	// count clock wise 로 시계방향을 돌 수 있는 개 4번 이기 때문에 다 돌면 최대 값 3으로 초기화
	left() {
		if (--this.rotate < 0) {
			this.rotate = this.count;
		}
	}
	// clock wise 로 시계방향을 돌 수 있는 개 4번 이기 때문에 다 돌면 최소값 0으로 초기화
	right() {
		if (++this.rotate > this.count) {
			this.rotate = 0;
		}
	}
	getBlock() {
		return this.blocks[this.rotate];
	}
};

const blocks = [
	// L block
	class extends Block {
		constructor() {
			super('#f8cbad', [[1], [1], [1], [1]], [[1, 1, 1, 1]]);
		}
	},
	// ㅗ block
	class extends Block {
		constructor() {
			super(
				'#ffe699',
				[
					[0, 1, 0],
					[1, 1, 1],
				],
				[
					[1, 0],
					[1, 1],
					[1, 0],
				],
				[
					[1, 1, 1],
					[0, 1, 0],
				],
				[
					[0, 1],
					[1, 1],
					[0, 1],
				]
			);
		}
	},

	class extends Block {
		constructor() {
			super(
				'#FD0100',
				[
					[0, 0, 1],
					[1, 1, 1],
				],
				[
					[1, 0],
					[1, 0],
					[1, 1],
				],
				[
					[1, 1, 1],
					[1, 0, 0],
				],
				[
					[1, 1],
					[0, 1],
					[0, 1],
				]
			);
		}
	},

	class extends Block {
		constructor() {
			super('#7C5F01', [
				[1, 1],
				[1, 1],
			]);
		}
	},

	class extends Block {
		constructor() {
			super(
				'#00B04E',
				[
					[0, 1, 1],
					[1, 1, 0],
				],
				[
					[1, 0],
					[1, 1],
					[0, 1],
				]
			);
		}
	},
	class extends Block {
		constructor() {
			super(
				'#6E2E9C',
				[
					[1, 0, 0],
					[1, 1, 1],
				],
				[
					[1, 1],
					[1, 0],
					[1, 0],
				],
				[
					[1, 1, 1],
					[0, 0, 1],
				],
				[
					[1, 1],
					[1, 0],
					[1, 0],
				]
			);
		}
	},
	class extends Block {
		constructor() {
			super(
				'#0FABE8',
				[
					[1, 1, 0],
					[0, 1, 1],
				],
				[
					[0, 1],
					[1, 1],
					[1, 0],
				]
			);
		}
	},
];
