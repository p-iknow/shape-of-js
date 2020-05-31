const backRun = (f, end, ...arg) => {
	const blob = new Blob([`onmessage = e => postMessage((${f})(e.data));`], {
		type: 'text/javascript',
	});
	const url = URL.createObjectURL(blob);
	const worker = new Worker(url); // new Worker('some/js');
	worker.onmessage = e => end(e.data);
	worker.onerror = e => end(null);
	worker.postMessage(arg);
};
