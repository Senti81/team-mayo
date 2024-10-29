import React, { useEffect, useState } from 'react';
import useItemList from '../hooks/useItemList';
import useReceipts from '../hooks/useReceipts';

const AddReceipt = () => {
  const [name, setName] = useState('');
  const [clickedItems, setClickedItems] = useState({});

  const { items, fetchItems, error, loading} = useItemList()
  const { addReceipt } = useReceipts()

  const handleClick = (itemId) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  useEffect(() => { fetchItems()}, [])

  const handleSubmit = async () => {
    const selectedItems = items.filter(item => clickedItems[item.id]);
    
    const payload = {
      name,
      ingredients: selectedItems.map(item => item.name)
    }

    const result = await addReceipt(payload)
    resetForm()
  };

  const resetForm = () => {
    setName('')
    setClickedItems({})
  };

  return (
    <div className="container">
      <div className="modal fade" id="addReceipt" tabIndex="-1" aria-labelledby="addReceipt" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Neues Rezept</div>
            </div>
            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto'}}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <label htmlFor="floatingInput">Name</label>
              <div className="fs-5 text-start m-2">Zutaten auswählen:</div>

                {items.map((item) =>  (
                  <span
                  key={item.id}
                  className={`badge rounded-pill ${clickedItems[item.id] ? 'bg-success-subtle text-primary-emphasis' : 'bg-secondary-subtle text-dark' } m-1`}
                  onClick={() => handleClick(item.id)}
                >
                  {item.name}
                  <span className="vr mx-2" />
                    <i className={clickedItems[item.id] ? 'bi bi-x-circle-fill' : 'bi bi-check-circle-fill'}></i>
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={resetForm}>
                <i className="bi bi-x-circle"></i> Abbrechen
              </button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" disabled={loading} onClick={handleSubmit}>
                <i className="bi bi-check-circle"></i> Eintragen
              </button>
            </div>
          </div>
        </div>
      </div>      
      {error &&
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          <strong>{error}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }   

      {/* Floating Action Button */}
      <section>
        <button 
          type="button" 
          className="btn btn-success px-3 floating-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#addReceipt"
          >
          <i className="bi bi-plus-lg"></i>
        </button>
      </section>
    </div>
  );
};

export default AddReceipt;
