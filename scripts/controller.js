import {taskOperations} from './models/task_operations.js';

window.addEventListener('load', eventbinder);

function eventbinder(){
    document.querySelector('#add').addEventListener('click', add);
    document.querySelector('#delete').addEventListener('click',deleteTask);
}

function deleteTask(){

    const allTasks = taskOperations.deleteTask();
    printTasks(allTasks);
}

function printTasks(allTasks)
{
    const tBody  = document.querySelector('#body');
    tBody.innerHTML = " ";
    console.log(allTasks);
    for(var idx=0 ; idx<allTasks.length ; idx++)
    {
        printTask(allTasks[idx]);
    }
}

function countOperations()
{
    document.querySelector("#total").innerText=taskOperations.tasksArray.length;
    document.querySelector("#marked").innerText=taskOperations.countMarked();
    document.querySelector("#unmarked").innerText=taskOperations.countUnmarked();

}

function toggleDel()
{
    const icon = this;
    const id = this.getAttribute("task-id");
    const tr = icon.parentNode.parentNode;
    tr.classList.toggle("alert-danger");
    taskOperations.markDelete(id);
    countOperations();
}

function edit()
{
    console.log("edit...");
}

function createIcon(className,fn, id){
    const iTag = document.createElement('i');
   
    iTag.className = ` ${className} me-3 hand`;
    iTag.addEventListener('click',fn);
    iTag.setAttribute("task-id",id);
    return iTag;
}

function add(){
    var id = document.querySelector('#id').value;
    var name = document.querySelector('#name').value;
    var date = document.querySelector('#date').value;
    var desc = document.querySelector('#desc').value;
    var url = document.querySelector('#url').value;

    const task = taskOperations.addTask(id,name,date,desc,url);

    printTask(task);
    countOperations();
   
}

function printTask(task){
    const tBody  = document.querySelector('#body');
    const tr = tBody.insertRow();
    
    let idx = 0;
    for(let key in task)
    {
        if(key=="marked")
        {
            continue;
        }
        let value = task[key];
        let td = tr.insertCell(idx);
        td.innerText = value;
        idx++;
    }

    let td = tr.insertCell(idx);
    td.appendChild(createIcon("fa fa-trash" , toggleDel,task.id));
    td.appendChild(createIcon("fa fa-pencil-square-o" , edit,task.id));
  
}