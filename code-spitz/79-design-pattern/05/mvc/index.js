import Router from './Router.js';
import { Index, Folder } from './Controller.js';

const router = new Router;
router
	.set('index', new Index(router))
	.set('folder', new Folder(router));
router.route('index');
