import { err } from './util.js';

const Table = (_ => {
	const Private = Symbol();
	return class {
		constructor(parent) {
			if (typeof parent != 'string' || !parent) {
				return err('invalild param in Table Constructor');
			} else {
				// 심볼 여러개 만들기 번거로워서 privat 공간을 객체로 설정함, 여러개의 키를 넣을 수 있도록
				this[Private] = { parent }
			}
		}
		async load(url) {
			const res = await fetch(url);
			if (!res.ok) err('invalid response');

			const { title, header, items } = await res.json();
			if (!items.length) err('no items');

			Object.assign(this[Private], { title, header, items });
			this.render()
		}

		render() {
			// 부모 데이터 체크
			const { parent, header, items } = this[Private];
			const $parent = document.querySelector(parent);
			if (!$parent) err('Invalid Parent Element');
			if (!items || !items.length) {
				$parent.innerHTML = 'no data';
				return;
			} else {
				// parent 를 초기화
				$parent.innerHTML = '';
			}

			// 테이블 생성
			const $table = document.createElement('table');

			// title 을 캡션으로
			const $caption = document.createElement('caption');
			$caption.innerHTML = title;
			$table.appendChild(caption);

			//header를 thead 로
			$table.appendChild(
				header.reduce(($thead, data) => {
					const $th = document.createElement('th');
					$th.innerHTML = data;
					$thead.appendChild($th);
					return $thead;
				}, document.createElement('thead'))
			)

			// items 를 tr로 부모에 삽입
			$table.appendChild(...items.map(
				item => item.reduce(($tr, data) => {
					const $td = document.createElement('td');
					$td.innerHTML = data;
					$tr.appendChild(td);
					return $tr;
				}, document.createElement('tr'))
			))

			// 부모에 table 삽입
			$parent.appendChild($table);


		}
	};
})();
