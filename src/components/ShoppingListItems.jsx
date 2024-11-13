import { useEffect, useState } from "react"
import useItemList from "../hooks/useItemList"
import DeleteModal from "../components/DeleteModal"

const ShoppingListItems = () => {
  const { items, fetchItems, deleteItem } = useItemList()
  const [ selectedItem, setSelectedItem]  = useState(null)

  useEffect(() => fetchItems(true), [])

  return (
    <>
      <div className="col-12 my-4">
        <h6 className="display-6">Einkaufsliste</h6>
        <small>Klicke auf ein Element, um es zu löschen</small>
        <div className="d-flex flex-wrap mt-3">
          {items.map((item) => (
            <span 
              key={item.id}
              className='badge rounded-pill text-primary-emphasis bg-success-subtle m-1 px-2 py-1'
              data-bs-toggle="modal"
              data-bs-target="#confirmDelete"
              onClick={() => setSelectedItem(item)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <DeleteModal entity={selectedItem} onDeleteHandle={deleteItem}/>
    </>
  )
}

export default ShoppingListItems