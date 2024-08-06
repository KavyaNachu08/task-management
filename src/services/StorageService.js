export function saveToLocalStorage(tasks){
    localStorage.setItem("TasksData", JSON.stringify(tasks))
}

