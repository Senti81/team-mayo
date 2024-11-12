import React, { useEffect } from "react"

import useReceipts from "../../hooks/useReceipts"
import useItemList from "../../hooks/useItemList"
import ReceiptCard from "../../components/ReceiptCard"
import { Link } from "react-router-dom"

const ReceiptList = () => {
  const { receipts, fetchReceipts } = useReceipts()
  const { items, fetchItems } = useItemList()

  useEffect(() => {
    fetchReceipts();
    fetchItems();
  }, [])

  return (
    <div className="container mt-2">
      <h6 className="display-6 text-center mb-2">Rezepte</h6>
      <div className="row">
        {receipts.map((receipt) => (
          <ReceiptCard key={receipt.id} receipt={receipt} items={items} />   
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Link
          to={'/receipts/add'}
          className="btn btn-primary"
        >
          Hinzufügen
        </Link>
      </div>
    </div>
  )
}

export default ReceiptList