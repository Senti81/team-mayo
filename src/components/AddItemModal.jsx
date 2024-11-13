import React, { useState } from 'react';
import useItemList from '../hooks/useItemList';
import InfoToast from './InfoToast';

const ShoppingListForm = () => {
  const [item, setItem] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const { addItem } = useItemList()

  const trigger = 'addItem'

  const handleAddItem = async () => {
    const result = await addItem(item)
    result.success ? setError(false) : setError(true)
    setMessage(`${result.message}`)      
    setItem('')
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
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" id={trigger} onClick={handleAddItem}>
                <i className="bi bi-check-circle"></i> Eintragen
              </button>
            </div>
          </div>
        </div>
      </div>

      <InfoToast 
        message={message}
        trigger={trigger}
      />

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