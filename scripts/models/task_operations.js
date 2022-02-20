import {tasks} from './tasks.js';

export const taskOperations = {
    tasksArray : [],

    addTask(id,name,date,desc,url,marked=false){
        const newTask = new tasks (id,name,date,desc , url,marked=false);
        this.tasksArray.push(newTask);

        return newTask;
    },

    markDelete(id){
        for(var idx = 0 ; idx<this.tasksArray.length ; idx++)
        {
            if(this.tasksArray[idx].id == id)
            {
                this.tasksArray[idx].marked = !this.tasksArray[idx].marked;
            }
        }


    },

    countMarked(){
        var count = 0;
        for(var idx = 0 ; idx<this.tasksArray.length ; idx++)
        {
            if(this.tasksArray[idx].marked===true)
            {
                count++;
            }
        }

        return count;
    },

    countUnmarked()
    {
        return this.tasksArray.length - this.countMarked();
    },

    deleteTask()
    {
        this.tasksArray = this.tasksArray.filter((tasksArray)=>!tasksArray.marked);
        return this.tasksArray;
    }

}