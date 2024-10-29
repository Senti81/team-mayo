import React, { useState } from 'react';
import useItemList from '../hooks/useItemList';
import { Toast } from 'bootstrap'

const ShoppingListForm = () => {
  const [item, setItem] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const { addItem } = useItemList()

  const handleAddItem = async () => {
    const result = await addItem(item)
    result.success ? setError(false) : setError(true)
    setMessage(`${result.message}`)      
    setItem('')
  }

  const toastTrigger = document.getElementById('liveToastBtn')
  const toast = document.getElementById('liveToast')

  if (toastTrigger) {
    const toastBootstrap = Toast.getOrCreateInstance(toast)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
      setError(false)
    })
  }

  return (
    <div className="container">
      <div className="modal fade" id="addTransaction" tabIndex="-1" aria-labelledby="addTransaction" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body">              
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={item}
                  placeholder="Was brauchen wir?"
                  onChange={(e) => setItem(e.target.value)}
                />
                <label htmlFor="floatingInput">Was brauchen wir?</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setItem('')}>
                <i className="bi bi-x-circle"></i> Abbrechen
              </button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" id="liveToastBtn" onClick={handleAddItem}>
                <i className="bi bi-check-circle"></i> Eintragen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`toast-header ${error ? 'text-bg-danger' : 'text-bg-success'}`}>
            <i className={`bi ${error ? 'bi-exclamation-triangle-fill' : 'bi-check-circle'}`}></i>
            <strong className="ms-2 me-auto">Team MaYo</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <section>
        <button 
          type="button" 
          className="btn btn-success px-3 floating-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#addTransaction"
          >
          <i className="bi bi-plus-lg"></i>
        </button>
      </section>
    </div>
  )
}

export default ShoppingListForm;