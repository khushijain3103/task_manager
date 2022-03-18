import {taskOperations} from './models/task_operations.js';
import {showAlert} from '../utils/dialogue.js';

window.addEventListener('load', eventbinder);

function eventbinder(){
    document.querySelector('#add').addEventListener('click', add);
    document.querySelector('#delete').addEventListener('click',deleteTask);
    document.querySelector("#clearAll").addEventListener('click',clearall);
    document.querySelector('#search').addEventListener('click',searchTask);
    document.querySelector('#clear').addEventListener('click',clearSearch);
    document.querySelector('#save').addEventListener('click',saveTask);
    document.querySelector('#load').addEventListener('click',loadTask);
}

function saveTask(){
    let tasks = taskOperations.tasksArray;
    console.log(JSON.stringify(tasks));
    if(window.localStorage)
    {
        localStorage.tasks = JSON.stringify(tasks);
        showAlert("Tasks Saved Successfully");
    }
    else{
        showAlert("Browser is outdated. Please update your browser");
    }
}
    

function loadTask(){

}

function clearSearch(){
    const tBody  = document.querySelector('#body');
    tBody.innerHTML = " ";

    printTasks(taskOperations.tasksArray);
}

function searchBox(){
    const div = document.createElement('div');
    div.classList = "searchDiv";
    const input = document.createElement('input');
    input.classList = "searchInput";
    div.append(input);
    console.log(div);
    document.querySelector('#dialogueBox').appendChild(div);

    const iTag = document.createElement('i');
    console.log(iTag);
    iTag.className = "fa fa-search hand";
    iTag.id="icon";
    div.appendChild(iTag);

}

function searchIcon()
{
    const name = document.querySelector('.searchInput').value;
    console.log(name);
    const task = taskOperations.searchTask(name);
    console.log(task);
    // const tr = name.parentNode.parentNode;
    // tr.classList = "alert-success";
    const tBody  = document.querySelector('#body');
    tBody.innerHTML = " ";
    printTask(task);

    
}

function searchTask(){
    // const task = taskOperations.searchTask();
    searchBox();
    document.querySelector("#icon").addEventListener('click',searchIcon);
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
    clearall();
   
}

function printTask(task){
    const tBody  = document.querySelector('#body');
    const tr = tBody.insertRow();
    
    let idx = 0;
    for(let key in task)
    {
        if(typeof(task[key])==="function")
        {
            continue;
        }
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

const clearall=()=>{
    document.querySelectorAll(".form-control").forEach((txtboxes)=>txtboxes.value=' ');
};
