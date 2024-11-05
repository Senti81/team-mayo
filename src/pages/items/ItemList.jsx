import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import AddItemModal from '../../components/AddItemModal'
import { auth } from '../../config/firebase'
import useItemList from '../../hooks/useItemList'
import ItemsOutOfStock from '../../components/ItemsOutOfStock'
import ItemsInStock from '../../components/ItemsInStock'

const ShoppingList = () => {
  const { items, fetchItems, updateItem, error } = useItemList()
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
    <>
      <div className="container">
        <div className="row mx-1">
          <ItemsOutOfStock
            items={items}
            handleToggle={handleToggle}
            status={2}
          />
          <ItemsOutOfStock
            items={items}
            handleToggle={handleToggle}
            status={1}
          />
          <ItemsInStock 
            items={items}
            handleToggle={handleToggle}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleResetFilter={handleResetFilter}
          />
        </div>
      </div>
      <AddItemModal />
    </>
  )
}

export default ShoppingList