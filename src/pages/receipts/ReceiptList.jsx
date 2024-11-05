import React, { useEffect } from "react"

import AddReceiptModal from "../../components/AddReceiptModal"
import useReceipts from "../../hooks/useReceipts"
import useItemList from "../../hooks/useItemList"
import ReceiptCard from "../../components/ReceiptCard"

const ReceiptList = () => {
  const { receipts, fetchReceipts } = useReceipts()
  const { items, fetchItems } = useItemList()

  useEffect(() => {
    fetchReceipts();
    fetchItems();
  }, [])

  return (
    <div className="container mt-4">
      <div className="row">
        {receipts.map((receipt) => (
          <ReceiptCard key={receipt.id} receipt={receipt} items={items} />
        ))}
      </div>
      <AddReceiptModal />
    </div>
  )
}

export default ReceiptList