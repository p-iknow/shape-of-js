import { prop } from './util.js';

const Block = class {
	constructor(color) {
		// block 의 color 와 rotate 회전값을 초기화
		prop(this, { color, rotate: 0 });
	}
	// count clock wise 로 시계방향을 돌 수 있는 개 4번 이기 때문에 다 돌면 최대 값 3으로 초기화
	left() {
		if (--this.rotate < 0) {
			this.rotate = 3;
		}
	}
	// clock wise 로 시계방향을 돌 수 있는 개 4번 이기 때문에 다 돌면 최소값 0으로 초기화
	right() {
		if (++this.rotate > 3) {
			this.rotate = 0;
		}
	}
	getBlock() {
		throw 'override!';
	}
};

const blocks = [
	// L block
	class extends Block {
		constructor() {
			super('#f8cbad');
		}
		getBlock() {
			// L 블록은 방향이 2개 밖에 없음
			// 컬럼이 하나씩 있고, 로우가 4개짜리 배열,
			// 로우가 1개이고, 컬럼이 4개있는 배열
			// 문제점은 getBlock 할 때 마다 새로운 배열을 리턴하고 있음
			return this.rotate % 2 ? [[1], [1], [1], [1]] : [[1, 1, 1, 1]];
		}
	},
	// ㅗ block
	class extends Block {
		constructor() {
			super('#ffe699');
		}
		getBlock() {
			switch (this.rotate) {
				case 0:
					return [
						[0, 1, 0],
						[1, 1, 1],
					];
				case 1:
					return [
						[1, 0],
						[1, 1],
						[1, 0],
					];
				case 2:
					return [
						[1, 1, 1],
						[0, 1, 0],
					];
				case 3:
					return [
						[0, 1],
						[1, 1],
						[0, 1],
					];
			}
		}
	},
];
