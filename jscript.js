let input = document.querySelector('input');
let submit = document.querySelector('.add');
let tasksdiv = document.querySelector('.tasks');
// empty array
let bigarray = [];
// check if there is tasks in local storage
if (localStorage.getItem("tasks"))
{
    bigarray = JSON.parse(localStorage.getItem("tasks"));
}
// trigger local storage
getfromlocal();
// add task
submit.onclick = function ()
{
    if (input.value !== "")
    {
        addtasktoarr(input.value);
        input.value = ""; 
    }
}
// Click on task element
tasksdiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      // remove from local storage
      deleteTaskwith(e.target.parentElement.getAttribute("data-id"));
      // remove from page
      e.target.parentElement.remove();
    }
// task itself
    if (e.target.classList.contains("task"))
    {
        toogletaskbyid(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
}
);

function addtasktoarr(text)
{
    const task = {
        id: Date.now(),
        title: text,
        completed: false
    }
    // push it to arr
    bigarray.push(task);
    // add tasks to page
    addelementstopage(bigarray);
    // add tasks to local storage
    addtolocal(bigarray);

}
function addelementstopage(bigarray)
{tasksdiv.innerHTML = "";
bigarray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check it task is done
    if (task.completed)
    {
 div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksdiv.appendChild(div);
});


}
function addtolocal(bigarray)
{
    // key,values
    window.localStorage.setItem("tasks", JSON.stringify(bigarray));
}
function getfromlocal()
{let data = window.localStorage.getItem("tasks");
    if (data)
    {
        let tasks = JSON.parse(data);
        addelementstopage(tasks);
    }
}
function deleteTaskwith(taskid)
{
    
    bigarray = bigarray.filter((task) => task.id != taskid)
    {
        addtolocal(bigarray);
    }


}
function toogletaskbyid(taskid)
{
    for (let i = 0; i < bigarray.length; i++)
    {
if(taskid == bigarray[i].id)
{
    bigarray[i].completed == false
      ? (bigarray[i].completed = true)
      : (bigarray[i].completed = false);
}
    }
     addtolocal(bigarray);

}
