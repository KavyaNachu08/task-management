import "./TaskDetails.scss";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { saveToLocalStorage } from "../../services/StorageService";

function TaskDetails(props) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("null");
  const [error, setError] = useState(false);

  const editData = useRef(null);
  const index = useRef(null);

  useEffect(() => {
    if (props.defaultValue !== null) {
      editData.current = props.tasks.find((task, i) => {
        index.current = task.id === props.defaultValue ? i : null;
        return task.id === props.defaultValue;
      });
      setPriority(editData.current.priority);
      setTaskName(editData.current.taskname);
      setTaskDate(editData.current.taskdate); 
      setStatus(editData.current.status);
      console.log(editData.current.priority);
      props.setRowToEdit(null);
    }
  }, [props.defaultValue]);

  function getUID() {
    // Get the timestamp and convert
    // it into alphanumeric input
    return Date.now().toString(36);
  }

  function close() {
    setTaskName("");
    setTaskDate("");
    setPriority("");
    setStatus("null");
    props.setOpen(!props.open);
  }

  function save(e) {
    e.preventDefault();
    let formData = {
      id: editData.current !== null ? editData.current.id : getUID(),
      taskname: taskName,
      taskdate: taskDate,
      priority: priority,
      status: status,
    };
    if (editData.current) {
      if (taskName.length == 0) {
        setError(true);
      } else {
        const newTask = props.tasks.filter((task) => {
          return task.id !== editData.current.id;
        });
        newTask.splice(index.current, 0, formData);
        props.addTasks((prev) => {
          saveToLocalStorage([...newTask]);
          return [...newTask];
        });
        editData.current=null;
        index.current=null;
        close();
      }
    } else {
      if (taskName.length == 0) {
        setError(true);
      } else {
        props.addTasks((prev) => {
          saveToLocalStorage([...prev, formData]);
          return [...prev, formData];
        });
        close();
      }
    }
  }

  return (
    <div className={`form-container ${props.open ? "show" : ""}`}>
      <form className="details">
        <div className="details__head">
          <h2 className="details__head__title">Task Details</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className="details__head__icon"
            onClick={close}
          />
        </div>
        <div className="details__name">
          <label className="details__name__label" htmlFor="task-name">
            Task Name
          </label>
          <input
            type="text"
            name="task-name"
            id="task-name"
            aria-label="task-name"
            aria-required="true"
            className="details__name__input"
            autoComplete="off"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {error && taskName.length <= 0 ? (
            <span className="details__name__error">*Task Name required </span>
          ) : (
            ""
          )}
        </div>
        <div className="details__name">
          <label className="details__name__label" htmlFor="priority">
            Priority
          </label>
          <div>
            <input
              type="radio"
              id="high"
              name="priority"
              defaultChecked={priority === "High" ? true : false}
              value="High"
              onChange={(e) => setPriority(e.target.value)}
            />
            <label htmlFor="high">High</label>
            <input
              type="radio"
              id="medium"
              name="priority"
              defaultChecked={priority === "Medium" ? true : false}
              value="Medium"
              onChange={(e) => setPriority(e.target.value)}
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              id="low"
              name="priority"
              defaultChecked={priority === "Low" ? true : false}
              value="Low"
              onChange={(e) => setPriority(e.target.value)}
            />
            <label htmlFor="low">Low</label>
          </div>
        </div>
        <div className="details__name">
          <label className="details__name__label" htmlFor="status">
            Status
          </label>
          <select
            className="details__name__option"
            id="status"
            value={status}
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="option-value" value="none" hidden>
              Select Status
            </option>
            <option className="option-value" value="Pending">
              Pending
            </option>
            <option className="option-value" value="Completed ">
              Completed
            </option>
          </select>
        </div>
        <div className="details__name">
          <label className="details__name__label" htmlFor="end-date">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            name="end-date"
            aria-label="end-date"
            aria-required="false"
            className="details__name__input"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>
        <div className="details__save" onClick={save}>
          <label htmlFor="submit"></label>
          <input
            className="details__save__input"
            type="submit"
            id="submit"
            value="Save"
            aria-label="save"
          />
        </div>
      </form>
    </div>
  );
}

export default TaskDetails;
