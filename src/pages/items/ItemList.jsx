import React, { useEffect, useState } from 'react'

import AddItemModal from '../../components/AddItemModal'
import FilteredItemList from '../../components/FilteredItemList'
import ItemSearchBar from '../../components/ItemSearchBar'

import useItemList from '../../hooks/useItemList'
import ErrorDialog from '../../components/ErrorDialog'

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { items, loading, fetchItems, updateItem, error } = useItemList()

  const handleToggle = async(id, currentItemStatus) => await updateItem(id, currentItemStatus)
  const handleResetFilter = () => setSearchTerm('')

  useEffect(() => fetchItems(), [])

  if (error) return <ErrorDialog error={error}/>
  
  return (
    <div className="container">
      <AddItemModal />
      <div className="row mx-1">
        <ItemSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleResetFilter={handleResetFilter} />
        <FilteredItemList items={items} loading={loading} handleToggle={handleToggle} searchTerm={searchTerm} status={2} />
        <FilteredItemList items={items} loading={loading} handleToggle={handleToggle} searchTerm={searchTerm} status={1} />
        <FilteredItemList items={items} loading={loading} handleToggle={handleToggle} searchTerm={searchTerm} status={0}/>
      </div>
    </div>
  )
}

export default ShoppingList