// array
let taskslist=[];
const addtodo =document.getElementById('user-input');
const task_box =document.getElementById('task-box');
const tasksCounter = document.getElementById('tasks-counter');
// function for adding task to the list
function addtask(task)
{
    if(task)
    {
        taskslist.push(task);
        renderList();
        return
    }
}
// function for delete selected items
function deltetask(taskId)
{
     const newtasklist=taskslist.filter(function(task)
    {
        return task.id !== taskId;
    })
    taskslist=newtasklist;
    renderList()


}
// function to add list  in DOM
function addtasktoDOM(task)
{
    const li=document.createElement('li');
    li.innerHTML =`
           
            
            <input type="checkbox" class="check-box"id="${task.id}"${task.completed ? 'checked' : ''} >
            <label for="${task.id}">${task.title}</label>
            <div class="setting">
            <i class="fa-sharp fa-solid fa-trash" data-id="${task.id}"></i>
            </div>

    `
    task_box.append(li);
}
// to render list
function renderList()
{
    task_box.innerHTML=''
    for (let i=0;i<taskslist.length;i++)
    {
        addtasktoDOM(taskslist[i]);
    }
    tasksCounter.innerHTML = taskslist.length;

}
// function for marking the task  as completed or uncompleted
function toogletask(taskId)
{

    const task= taskslist.filter(function(task){
        return task.id === taskId ;
    })
    if (task.length>0)
    {
        const currenttask=task[0];
        currenttask.completed =! currenttask.completed;
        renderList();
        return 
    }
     
}

// function for mark as all compelted in list
function allcomplete()
{
    for(let j=0;j<taskslist.length;j++)
    {
        taskslist[j].completed=true;

    }
    renderList();
}
// function for handling all the event of mouse click
function handleclick(event)
{
    const target= event.target
    if (target.className === 'fa-solid fa-circle-plus')// handling the mouse envent of adding the item 
    {
       const title=addtodo.value
       console.log(title)
       if(!title)
       {
        return;
       }
       const task={
        title,
        id:Date.now().toString(),
        completed:false
       }
      addtodo.value= null;
      addtask(task)
    }
    else if(target.className ==='check-box') //handling the mouse envent for toogle the list

    {
        taskId =target.id
        toogletask(taskId)
        console.log("check box clicked",taskId)
        
    }
    else if(target.className ==='fa-sharp fa-solid fa-trash')//handling the mouse event of delete selected item
    {
        taskId= target.dataset.id
        deltetask(taskId)

        console.log("delete button clicked")
        return
    }
    else if(target.className ==='clear-button') //handling the mouse event of clear all to do list

    {
       taskslist=[]
       console.log('all delted sucesfuuly')
       renderList()

        return
    }   
    else if (target.className=='fa-solid fa-check-double') // handling the mouse event of mark as all complete
    {
        allcomplete();
        console.log('all compelted')
        renderList()
    }

}
document.addEventListener('click',handleclick)