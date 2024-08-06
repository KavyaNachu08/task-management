import './Delete.scss';

function Delete(props) {
    function close() {
      props.setOpen(!props.open);
    }

    function deleteRecord(e) {
        props.deleteHandler(true);
        close();
    }

    return(
        <div className={`delete-container ${props.open ? "show" : ""}`} >
        <div className="delete-task">
            <h3 className='delete-task__title'>Are you sure?</h3>
            <div className='delete-task__options'>
                <button onClick={ deleteRecord } >Yes</button>
                <button onClick={ close }>No</button>
            </div>
        </div>
        </div>
    );
}

export default Delete;