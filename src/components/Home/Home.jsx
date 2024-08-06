import { useState, useEffect } from "react";
import AddNew from "../AddNew/AddNew";
import TaskDetails from "../TaskDetails/TaskDetails";
import Header from '../Header/Header';
import TaskTable from "../TaskTable/TaskTable";

function Home() {
    const [open, setOpen] = useState(false);
    const [tasks, addTasks] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("TasksData")) {
          addTasks(JSON.parse(localStorage.getItem("TasksData")));
        }
      }, []);
      

    return(
        <>
        <Header />
        <TaskTable setRowToEdit= {setRowToEdit} tasks={tasks} addTasks={addTasks} setOpen={setOpen} />
        <TaskDetails open={open} setOpen={setOpen} addTasks = {addTasks} tasks = {tasks} defaultValue= {rowToEdit} setRowToEdit={setRowToEdit}/>
        <AddNew setOpen = {setOpen}/>
        </>
    );
}

export default Home;