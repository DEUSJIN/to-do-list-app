const taskInput = document.getElementById("taskInput")
const searchBtn = document.getElementById("searchBtn")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")
const displayBtn = document.getElementById("displayBtn")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks(tasks)

//从tasks数组提取task并显示在taskList中
function renderTasks(tasksArray) {
    //清空taskList
    taskList.innerHTML = ""
    //遍历tasks中每一个task，添加到taskList
    tasksArray.forEach((task, idx) => {
        const li = document.createElement("li")//
        li.innerHTML = `
        <span class="task">${task}</span>
        <button class="edit_btn" data-index="${idx}">Edit</button>
        <button class="delete_btn" data-index="${idx}" data-edit="true">Delete</button>
        `
        taskList.append(li)
    })
}

//添加task到taskList
function addTask() {
    //获取taskInput中的值
    const task = taskInput.value
    if(task === ""){
        return
    }
    //把task添加到tasks
    tasks.push(task)
    //保存到本地
    localStorage.setItem("tasks", JSON.stringify(tasks))
    //清空taskInput
    taskInput.value=""
    //使用renderTasks显示出来
    renderTasks(tasks)
}

//匹配指定task
function searchTask() {
    //获取taskInput中的值
    const targetTask = taskInput.value
    //清空taskInput
    taskInput.value=""
    //在tasks中匹配相符的元素
    let newTasks = tasks.filter((task) => {
        return task === targetTask
    })
    //renderTask显示
    renderTasks(newTasks)
}

//显示全部列表
function displayAllTasks() {
    renderTasks(tasks)
}

//delete操作
function deleteTask(idx) {
    //删除
    tasks.splice(idx, 1)
    //保存到本地
    localStorage.setItem("tasks", JSON.stringify(tasks))
    //显示
    renderTasks(tasks)
}

//edit操作
function editTask(idx) {
//输入修改后的元素
    const userInput = prompt("Input：")
    if (userInput != null) {
        //保存到tasks
        tasks.splice(idx, 1, userInput)
        //保存到本地
        localStorage.setItem("tasks", JSON.stringify(tasks))
        //renderTask
        renderTasks(tasks)
    }
}

//添加addTaskBtn的监听器
addTaskBtn.addEventListener("click", addTask)
//添加searchBtn的监听器
searchBtn.addEventListener("click", searchTask)
//添加displayBtn的监听器
displayBtn.addEventListener("click", displayAllTasks)
//添加taskList监听器
taskList.addEventListener("click", function (event) {
    const idx = event.target.getAttribute("data-index")
    if (event.target.classList.contains("delete_btn")) {
        console.log("delete")

        deleteTask(idx)
    } else if (event.target.classList.contains("edit_btn")) {
        console.log("edit")
        editTask(idx)
    }
})