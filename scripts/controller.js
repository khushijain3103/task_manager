import {taskOperations} from './models/task_operations.js';

window.addEventListener('load', eventbinder);

function eventbinder(){
    document.querySelector('#add').addEventListener('click', add);
}

function createIcon(){
    const iTag = document.createElement('i');
    console.log(iTag);
    iTag.className= "fa fa-pencil-square-o";
    return iTag;
}

function add(){
    console.log ("add function called");
    var id = document.querySelector('#id').value;
    var name = document.querySelector('#name').value;
    var date = document.querySelector('#date').value;
    var desc = document.querySelector('#desc').value;
    var url = document.querySelector('#url').value;

    const task = taskOperations.addTask(id,name,date,desc,url);
    console.log(task);

    printTask(task);
   
}

function printTask(task){
    const tBody  = document.querySelector('#body');
    const tr = tBody.insertRow();
    
    console.log(tr);
    let idx = 0;
    for(let key in task)
    {
        let value = task[key];
        let td = tr.insertCell(idx);
        td.innerText = value;
        idx++;
    }
    console.log(idx);

    let td = tr.insertCell(idx);
    td.appendChild(createIcon());
  
}