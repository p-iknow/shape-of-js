import { Renderer, Dom, Console } from './Renderer.js';

import Task from './Task.js'
import { Member, Priority } from './TaskView.js';

const folder = new Task('s3-4');
folder.add("2강교안작성");
folder.add("3강교안작성");

const { list } = folder.list('title');
list[1].task.add('@hika ppt정리');
list[1].task.add('@summer 코드정리');

const { list: sublist } = list[1].task.list('title');
sublist[1].task.add('[normal] 슬라이드마스터 정리');
sublist[1].task.add('[urgent] 디자인개선');


const dom = new Dom('#root')
dom.taskView(new Member('hika', 'summer'), new Priority());
const DomRenderer = new Renderer(dom);
DomRenderer.render(folder.list('title'));
