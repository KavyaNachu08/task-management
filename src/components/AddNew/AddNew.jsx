import "./AddNew.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNew(props) {

  return (
      <div className="add-new">
       <FontAwesomeIcon className="add-new__icon" icon={faPlus} onClick={() => props.setOpen(true)}/>
      </div>
  );
}

export default AddNew;
