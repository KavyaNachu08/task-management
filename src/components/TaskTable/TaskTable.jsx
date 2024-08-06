import TaskCard from "../TaskCard/TaskCard";
import "./TaskTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";

function TaskTable(props) {
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });
  const [searchPhrase, setSearchPhrase] = useContext(SearchContext);
  const [filterValue, setFilterValue] = useState('all');

  const sortByName = () => {
    setSorted({ sorted: "taskName", reversed: !sorted.reversed });
    const task = [...props.tasks];
    task.sort((taskA, taskB) => {
      const task1 = `${taskA.taskname}`;
      const task2 = `${taskB.taskname}`;
      if (sorted.reversed) {
        return task2.localeCompare(task1);
      }
      return task1.localeCompare(task2);
    });
    props.addTasks(task);
  };

  const sortByDate = () => {
    setSorted({ sorted: "taskdate", reversed: !sorted.reversed });
    const task = [...props.tasks];
    task.sort((taskA, taskB) => {
      const task1 = new Date(`${taskA.taskdate}`);
      const task2 = new Date(`${taskB.taskdate}`);
      if (sorted.reversed) {
        return task2 - task1;
      }
      return task1 - task2;
    });
    props.addTasks(task);
  };

  const sortByStatus = () => {
    setSorted({ sorted: "status", reversed: !sorted.reversed });
    const task = [...props.tasks];
    task.sort((taskA, taskB) => {
      const task1 = `${taskA.status}`;
      const task2 = `${taskB.status}`;
      if (sorted.reversed) {
        return task2.localeCompare(task1);
      }
      return task1.localeCompare(task2);
    });
    props.addTasks(task);
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FontAwesomeIcon icon={faArrowUp} />;
    }
    return <FontAwesomeIcon icon={faArrowDown} />;
  };

  let onFilterValue = (e) => {
      setFilterValue(e.target.value);
  }

  return (
    <div className="task-container">
      <form className="filters">
        <div className="filters__search">
          <label className="filters__search__label" htmlFor="search">
            Search Task
          </label>
          <input
            className="filters__search__input"
            type="search"
            id="search"
            name="search"
            autoComplete="off"
            aria-label="search"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </div>
        <div className="filters__search">
          <label className="filters__search__label" htmlFor="priority">
            Filter By
          </label>
          <select
            className="filters__search__input"
            id="priority"
            name="priority"
            onChange={onFilterValue}
            >
            <option className="option-value" value="all">
              All
            </option>
            <option className="option-value" value="high">
              High
            </option>
            <option className="option-value" value="medium">
              Medium
            </option>
            <option className="option-value" value="low">
              Low
            </option>
          </select>
        </div>
      </form>
      <ul className="task">
        <li className="task__title-list table-header">
          <span onClick={sortByName} className="task__title-list__listitem">
            Task Name {sorted.sorted === "taskName" ? renderArrow() : null}
          </span>
          <span onClick={sortByDate} className="task__title-list__listitem">
            Due Date {sorted.sorted === "taskdate" ? renderArrow() : null}
          </span>
          <span onClick={sortByStatus} className="task__title-list__listitem">
            Status {sorted.sorted === "status" ? renderArrow() : null}
          </span>
          <span className="task__title-list__listitem">Priority</span>
          <span className="task__title-list__listitem">Actions</span>
        </li>
        <TaskCard
          setRowToEdit={props.setRowToEdit}
          setOpen={props.setOpen}
          tasks={props.tasks}
          addTasks={props.addTasks}
          setFilterValue={setFilterValue} 
          filterValue={filterValue}
        />
      </ul>
    </div>
  );
}

export default TaskTable;
