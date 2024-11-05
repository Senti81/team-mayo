import React, { useEffect, useState } from 'react'
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'

import AddItemModal from '../../components/AddItemModal'
import FilteredItemList from '../../components/FilteredItemList'
import ItemSearchBar from '../../components/ItemSearchBar'

import useItemList from '../../hooks/useItemList'

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { items, fetchItems, updateItem, error } = useItemList()

  const handleToggle = async(id, currentItemStatus) => await updateItem(id, currentItemStatus)
  const handleResetFilter = () => setSearchTerm('')

  useEffect(() => { fetchItems()}, [])
  
  if (error) signOut(auth)

  return (
    <div className="container">
      <AddItemModal />
      <div className="row mx-1">
        <ItemSearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleResetFilter={handleResetFilter}
        />
        <FilteredItemList
          items={items}
          handleToggle={handleToggle}
          searchTerm={searchTerm}
          status={2}
        />
        <FilteredItemList
          items={items}
          handleToggle={handleToggle}
          searchTerm={searchTerm}
          status={1}
        />
        <FilteredItemList
          items={items}
          handleToggle={handleToggle}
          searchTerm={searchTerm}
          status={0}
        />
      </div>
    </div>
  )
}

export default ShoppingList