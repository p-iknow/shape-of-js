let limit = 0;
for (let i = 0, j = arr.length, limit = 50000; limit-- > 0 && i < j; i++) {}
if (limit < 0) {
	// limit 이 0 보다 작은 경우는 block 가드에 걸렸다는 뜻이다.
}
