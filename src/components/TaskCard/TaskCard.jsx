import "./TaskCard.scss";
import Delete from "../Delete/Delete";
import { useState, useContext, useEffect } from "react";
import { saveToLocalStorage } from "../../services/StorageService";
import { SearchContext } from "../../Context/SearchContext";

function TaskCard(props) {
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const [searchPhrase, setSearchPhrase] = useContext(SearchContext);
  const [filterTasks, setFilterTasks] = useState([]);
  function deleteTask(id) {
    setDelId(id);
    setOpen(true);
  }

  function deleteHandler(value) {
    if (value) {
      const newTask = props.tasks.filter((task) => task.id !== delId);
      props.addTasks(newTask);
      saveToLocalStorage(newTask);
    }
  }

  function editTask(id) {
    props.setRowToEdit(id);
    props.setOpen(true);
  }

  useEffect(() => {
    setFilterTasks(filterBy(props.tasks));
  }, [props.filterValue, searchPhrase, props.tasks]);

  function filterBy(list) {
    const filterData = list.filter((task) => {
      if(props.filterValue === "all") {
        return true;
      }
      else {
        return  task.priority.toLowerCase() === props.filterValue.toLowerCase();
      }
    });
    const searchData = filterData.filter((task) =>
      searchPhrase && searchPhrase.toLowerCase() === ""
        ? task
        : task.taskname.toLowerCase().includes(searchPhrase)
    );
    return searchData;
  }

  return (
    <>
      {filterTasks.length > 0 &&
        filterTasks.map((task) => {
          return (
            <li className="task__title-list" id={task.id}>
              <span className="task__title-list__listitem">
                {task.taskname}
              </span>
              <span className="task__title-list__listitem">
                {new Date(task.taskdate).toLocaleDateString([], {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="task__title-list__listitem">{task.status}</span>
              <span className="task__title-list__listitem">
                {task.priority}
              </span>
              <span className="task__title-list__listitem">
                <button
                  onClick={() => editTask(task.id)}
                  className="task-button edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="task-button delete"
                >
                  Delete
                </button>
                <Delete
                  open={open}
                  setOpen={setOpen}
                  deleteHandler={deleteHandler}
                />
              </span>
            </li>
          );
        })}
    </>
  );
}

export default TaskCard;
