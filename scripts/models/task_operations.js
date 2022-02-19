import {tasks} from './tasks.js';

export const taskOperations = {
    tasksArray : [],

    addTask(id,name,date,desc,url){
        const newTask = new tasks (id,name,date,desc , url);
        this.tasksArray.push(newTask);

        console.log("array" , this.tasksArray);

        return newTask;
    },

}