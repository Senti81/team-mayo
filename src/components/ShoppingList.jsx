import React, { useEffect, useState } from 'react'
import useShoppingList from '../hooks/useShoppingList'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const ShoppingList = () => {
  const { items, fetchItems, updateItem, error } = useShoppingList()
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggle = async(id, currentItemStatus) => {
    await updateItem(id, currentItemStatus)
  };

  const handleResetFilter = () => {
    setSearchTerm('')
  }
  useEffect(() => { fetchItems()}, [])
  
  if (error) signOut(auth)

  return (    
    <div className="container">
      <div className="row mx-1">
        <div className="col-12 col-md-6 mt-3">
          <div className="h4 pb-2 mb-4 border-bottom border-danger">
            <h6 className='display-6'>Einkaufsliste:</h6>
          </div>
            {items.filter((item) => item.done === false).map((item) => (
              <span 
                key={item.id}
                className="badge text-bg-danger m-1 px-2 py-1"
                onClick={() => handleToggle(item.id, item.done)}
                >
              {item.name}
              </span>
            ))}
        </div>
        <div className="col-12 col-md-6 mt-3">
          <div className="h4 pb-2 mb-4 border-bottom border-success">
            <h6 className='display-6'>Im Vorrat:</h6>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Suche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleResetFilter}
              >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
            {items.filter((item) => item.done === true && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
              <span 
                key={item.id}
                className="badge text-bg-success m-1 px-2 py-1"
                onClick={() => handleToggle(item.id, item.done)}
                >
              {item.name}
              </span>
            ))}
        </div>
      </div>
    </div>  
  )
}

export default ShoppingList;