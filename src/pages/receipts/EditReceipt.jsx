import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import useReceipts from "../../hooks/useReceipts"

const EditReceipt = () => {
  const location = useLocation()
  const receipt = location.state?.receipt

  const [description, setDescription] = useState()
  const navigate = useNavigate()

  const { updateReceipt } = useReceipts()

  const handleSubmit = async() => {
    const result = await updateReceipt(receipt.id, description)
    console.log(result.message)
    if (result.success) navigate('/receipts')
    
  }

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title mb-0 display-3 text-center">{receipt.name}</h1>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h3 className="h5 mb-3">Beschreibung</h3>
            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={description}
                style={{ height: '50vh'}}
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={receipt.description}>
                
                </textarea>
            </div>              
          </div>
        </div>
        <div className="card-footer d-flex justify-content-sm-start justify-content-between">
          <Link
            className="btn btn-outline-secondary me-sm-5"
            to={`/receipts/${receipt.id}`} 
            state={{ receipt }}
          >
            Abbrechen
          </Link>
          <button className="btn btn-primary" onClick={handleSubmit}>Speichern</button>
        </div>
      </div>
    </div>
  )
}

export default EditReceipt