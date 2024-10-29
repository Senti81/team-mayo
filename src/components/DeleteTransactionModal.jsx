const ConfirmDeleteModal = ({ transaction, onDeleteTransaction }) => {
  return (
    <div className="modal fade" id="confirmDelete" tabIndex="-1" aria-labelledby="confirmDelete" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Löschen?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <p>Betrag {transaction?.amount.toFixed(2)} € vom {transaction?.createdAt.toDate().toLocaleDateString()} löschen</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" data-bs-dismiss="modal">
              <i className="bi bi-x-lg"></i> Abbrechen
            </button>
            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => onDeleteTransaction(transaction.id)}>
              <i className="bi bi-check-lg"></i> Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
