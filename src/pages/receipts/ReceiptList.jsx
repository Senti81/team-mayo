import React, { useEffect } from "react"
import { Link } from 'react-router-dom'

import AddReceiptModal from "../../components/AddReceiptModal"
import useReceipts from "../../hooks/useReceipts"
import useItemList from "../../hooks/useItemList"


const ReceiptList = () => {
  const { receipts, fetchReceipts } = useReceipts()
  const { items, fetchItems } = useItemList()

  const areAllIngredientsAvailable = (ingredients, items) => 
    ingredients.every(ingredient => items.some(item => item.name === ingredient && item.done))

  useEffect(() => {
    fetchReceipts();
    fetchItems();
  }, [])

  return (
    <div className="container mt-4">
      <div className="row">
        {receipts.map((receipt) => (
          <Link 
            className="col-6 col-lg-3 mb-4"
            key={receipt.id}
            to={`/receipts/${receipt.id}`}
            state={{ receipt }}
            style={{textDecoration: 'none'}}
          >
            <div className="card">
              <div className="card-body shadow-lg">
                <h5 className="card-title">{receipt.name}</h5>
                {areAllIngredientsAvailable(receipt.ingredients, items) ?
                  <span className='badge rounded-pill bg-success-subtle text-dark m1'>
                    <small>Verfügbar</small>
                    <span className="vr mx-2" />
                    <i className='bi bi-check-circle-fill' />
                  </span>
                  :
                  <span className='badge rounded-pill bg-danger-subtle text-dark m1'>
                    <small>Zutaten fehlen</small>
                    <span className="vr mx-2" />
                    <i className='bi bi-x-circle-fill' />
                  </span>
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AddReceiptModal />
    </div>
  )
}

export default ReceiptList