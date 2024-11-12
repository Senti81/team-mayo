import {  useLocation } from "react-router-dom"
import ReceiptForm from "../../components/ReceiptForm"

const EditReceipt = () => {
  const location = useLocation()
  const receipt = location.state?.receipt

  return (
    <div className="container">
      <div className="display-6 mb-3 text-center">Rezept bearbeiten</div>
      <ReceiptForm receipt={receipt} />
    </div>
  )
}

export default EditReceipt