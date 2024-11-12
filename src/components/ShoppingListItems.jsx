import { useEffect } from "react"
import useItemList from "../hooks/useItemList"
import useAuth from "../hooks/useAuth"

const ShoppingListItems = () => {
  const { items, fetchItems, deleteItem } = useItemList()

  useEffect(() => fetchItems(true), [])
  
  const handleDelete = async (id) => {
    await deleteItem(id)
  }

  return (
    <div className="col-12 col-md-6 my-4">
      <h6 className="display-6">Einkaufsliste</h6>
      <small>Klicke auf ein Element, um es zu löschen</small>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <span 
          key={item.id}
          className='badge text-bg-dark p-2 m-1'
          onClick={() => handleDelete(item.id)}
          >
          {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ShoppingListItems