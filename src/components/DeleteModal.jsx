const DeleteModal = ({ entity, onDeleteHandle }) => {
  return (
    <div 
      className="modal fade"
      id="confirmDelete"
      tabIndex="-1"
      aria-labelledby="confirmDelete"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3" id="exampleModalLabel">⚠ Löschen?</h1>
          </div>
          <div className="modal-footer d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              <i className="bi bi-x-lg me-1"/>
              Abbrechen
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
              onClick={() => onDeleteHandle(entity.id)}
            >
              <i className="bi bi-check-lg me-1"/>
              Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
