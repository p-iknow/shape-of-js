import DomRenderer from './Renderer.js';
import Task from './Task.js'

const folder = new Task('s3-4');

folder.add("2강 교안작성");
folder.add("3강 교안작성");

const { list } = folder.list('title');
list[1].task.add('ppt 정리');
list[1].task.add('코드정리');

const { list: sublist } = list[1].task.list('title');
sublist[1].task.add('슬라이드마스터 정리');
sublist[1].task.add('디자인개선');

const todo = new DomRenderer('#root');
todo.render(folder.list('title'));
console.log(folder.list('title'))
