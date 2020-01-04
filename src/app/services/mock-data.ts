import {ModelUtils} from '@src/app/model/model-utils';
import {TaskStatus, Todolist} from '@src/app/model/todolist';


export const TODO_LIST_ID = ModelUtils.generateRandomId();
export const ROOT_ID = ModelUtils.generateRandomId();
export const TASK_1_ID = ModelUtils.generateRandomId();
export const TASK_2_ID = ModelUtils.generateRandomId();
export const TASK_3_ID = ModelUtils.generateRandomId();
export const TASK_3_A_ID = ModelUtils.generateRandomId();
export const TASK_3_B_ID = ModelUtils.generateRandomId();

export const MOCK_TODO_LIST: Todolist = {
    id: TODO_LIST_ID,
    name: 'Adulting',
    rootTaskId: ROOT_ID
};

export const MOCK_TODO_TASKS = [{
        id: ROOT_ID,
        name: '',
        subTasks: [TASK_1_ID, TASK_2_ID, TASK_3_ID]
    }, {
        id: TASK_1_ID,
        name: 'Go to Safeway',
        parentId: ROOT_ID,
        status: TaskStatus.COMPLETED
    }, {
        id: TASK_2_ID,
        name: 'Do laundry',
        parentId: ROOT_ID,
        status: TaskStatus.IN_PROGRESS,
    }, {
        id: TASK_3_ID,
        name: 'Hang up picture',
        parentId: ROOT_ID,
        subTasks: [TASK_3_A_ID, TASK_3_B_ID]
    }, {
        id: TASK_3_A_ID,
        name: 'Go to HomeDepot to get hooks',
        parentId: TASK_3_ID,
        status: TaskStatus.IN_PROGRESS
    }, {
        id: TASK_3_B_ID,
        name: 'Pick up new frame',
        parentId: TASK_3_ID,
        status: TaskStatus.IN_PROGRESS,
    }
];
