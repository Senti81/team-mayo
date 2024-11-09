import { useEffect, useState } from "react"
import useItemList from "../hooks/useItemList"
import useReceipts from "../hooks/useReceipts"
import { Link, useNavigate } from "react-router-dom"
import ItemSearchBar from './ItemSearchBar'

const ReceiptForm = ({ receipt = {} }) => {

  const [name, setName] = useState(receipt.name || '')
  const [description, setDescription] = useState(receipt.description || '')
  const [searchTerm, setSearchTerm] = useState('');


  const [clickedItems, setClickedItems] = useState({})

  const { items, fetchItems } = useItemList()
  const { addReceipt, deleteReceipt } = useReceipts()

  const handleResetFilter = () => setSearchTerm('')


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedItems = items.filter(item => clickedItems[item.id])

    let result
    if (receipt.id) {
      // handle update
    } else {
      const payload = {
        name,
        description,
        ingredients: selectedItems.map(item => item.name)
      }

      result = await addReceipt(payload)

      if (result)
        navigate('/receipts')
    }
  }

  const handleDelete = async () => {
    await deleteReceipt(receipt.id)
    navigate('/receipts')
  }

  const handleClick = (itemId) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  useEffect(() => fetchItems(true), [])

  return (
    <form onSubmit={handleSubmit}>

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Name</span>
        <input 
          type="text" 
          className="form-control" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="fs-5 text-start m-2">Zutaten auswählen:</div>
      <ItemSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleResetFilter={handleResetFilter}
      />

      <div className="row mb-3">
        {items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <span
              className={`badge rounded-pill ${clickedItems[item.id] ? 'bg-success-subtle text-primary-emphasis' : 'bg-secondary-subtle text-dark' } m-1`}
              onClick={() => handleClick(item.id)}
            >
              {item.name}
              <span className="vr mx-2" />
              <i className={clickedItems[item.id] ? 'bi bi-x-circle-fill' : 'bi bi-check-circle-fill'}></i>
            </span>
          </div>
        ))}
      </div>

      <div className="input-group">
        <span className="input-group-text w-25">Beschreibung</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        >
          
        </textarea>
      </div> 

      <div className="d-flex justify-content-between mt-3 py-4">
        <button className="btn btn-outline-secondary rounded" type="submit">
          <i className="bi bi-check-lg me-2"></i>
          Speichern
        </button>
        <Link
          to={'..'}
          relative="path"
          className="btn btn-primary rounded"
        >
          <i className="bi bi-x-lg me-2"></i>
          Abbrechen
        </Link>
        { receipt.id &&
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          <i className="bi bi-trash me-2"></i>
          Löschen
        </button>
        }
      </div>
    </form>
  )
}

export default ReceiptForm