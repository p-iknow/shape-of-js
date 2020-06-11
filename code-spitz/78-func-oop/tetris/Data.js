import { prop } from './util.js';

const Data = class extends Array {
	constructor(row, col) {
		// 생성자에서 this를 사용하려면 무조건 그 위에 super가 나와야 한다
		// this 키워드가 없으면 생정자 호출한다음 자동으로 super를 호출해준다.
		super();
		prop(this, { row, col });
	}
	cell(row, col, color, test) {
		// 테트리스는 바깥에서부터 그리기 때문에 화면을 벗어난 값은 무시하도록 세팅
		// color 0 은 그리지 않는 영역

		if (
			row > this.row ||
			col > this.col ||
			row < 0 ||
			col < 0 ||
			color == '0'
		) {
			return this;
		}
		const _row = this[row] || (this[row] = []);
		// 내가 그리려는 셀에 이미 값이 있다는 것을 알리기 위해 테스트 객체를 받아 그 객에에 써줌
		if (color && _row[col]) test.isInterested = true;
		_row[col] = color;
		return this;
	}
	row(row, ...color) {
		// , 연산자는 우선순위가 가장 낮음, 지연 연산자라고 불림
		return color.forEach((v, i) => this.cell(row, i, v)), this;
	}
	all(...rows) {
		return rows.forEach((v, i) => this.row(i, ...v)), this;
	}
	// 함수형에서 합성성 조합성이라고 부르는 내용, 분해할 수 있고, 겹해서도 같은 결과가 나온다.
	// cell 만이 row를 검사하는 권하는 가지고 있다.
};

export default Data;
