{
	let a = 3;

	const f = () => {
		let a = 5;
		K: {
			break K;
			console.log(37); // 이 console.log 는 실행되지 안흥ㅁ
		}
	};
}
