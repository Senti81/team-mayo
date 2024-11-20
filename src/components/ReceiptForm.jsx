import { useEffect, useState } from "react"
import useItemList from "../hooks/useItemList"
import useReceipts from "../hooks/useReceipts"
import { Link, useNavigate } from "react-router-dom"
import ItemSearchBar from './ItemSearchBar'

const ReceiptForm = ({ receipt = {} }) => {

  const [name, setName] = useState(receipt.name || '')
  const [description, setDescription] = useState(receipt.description || '')
  const [searchTerm, setSearchTerm] = useState('')
  const [clickedItems, setClickedItems] = useState({})

  const { items, fetchItems } = useItemList()
  const { addReceipt, updateReceipt, deleteReceipt } = useReceipts()

  const navigate = useNavigate()

  const handleResetFilter = () => setSearchTerm('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedItems = items.filter(item => clickedItems[item.id])
    const payload = {
      name,
      description,
      ingredients: selectedItems.map(item => item.name)
    }

    if (receipt.id) {
      await updateReceipt(receipt.id, payload)
    } else {
      const result = await addReceipt(payload)
      console.log(result.message)
    }    
    navigate('/receipts')
  }

  const handleDelete = async () => {
    await deleteReceipt(receipt.id)
    navigate('/receipts')
  }

  const handleClick = (itemId) => {
    setClickedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }

  useEffect(() => fetchItems(true), [])

  useEffect(() => {
    // Set the clicked items state based on receipt ingredients
    if (receipt.ingredients) {
      const initialClickedItems = items.reduce((acc, item) => {
        acc[item.id] = receipt.ingredients.includes(item.name)
        return acc
      }, {})
      setClickedItems(initialClickedItems)
    }
  }, [items, receipt.ingredients])

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

      <div className="mb-3">
        <h6 className="mb-3 ps-1">Zutaten</h6>
        <ItemSearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleResetFilter={handleResetFilter}
        />
        <div className="mx-2 row row-cols-2 row-cols-md-3 row-cols-lg-4">
          {items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
            <div key={item.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={item.id}
                id={`item-${item.id}`}
                checked={!!clickedItems[item.id]}
                onChange={() => handleClick(item.id)}
                />
              <label className="form-check-label small" htmlFor={`item-${item.id}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <h6 className="mb-3 ps-1">Beschreibung</h6>
      <div className="input-group">
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div> 

      <div className="d-flex justify-content-between mt-3 py-4">
        <Link
          to={'..'}
          relative="path"
          className="btn btn-outline-secondary rounded"
          state={{receipt}}
        >
          <i className="bi bi-x-lg me-2"></i>
          Abbrechen
        </Link>
        <button className="btn btn-primary rounded" type="submit">
          <i className="bi bi-check-lg me-2"></i>
          Speichern
        </button>
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