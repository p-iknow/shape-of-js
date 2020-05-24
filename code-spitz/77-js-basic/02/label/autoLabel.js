//abc: {
//	console.log('a');

//  // SyntaxError: Illegal break statement
//	break;
//	console.log('b');
//}

//console.log('c');

abc: {
	console.log('a');
	break abc;
	console.log('b');
}

// a , c
