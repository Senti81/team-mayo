const FilteredItemList = ({ items, searchTerm, handleToggle, status }) => {

  const formatComponent = {
    0: {
      name: 'Im Vorrat:',
      border: 'border-success',
      badge: 'bg-success-subtle'
    },
    1: {
      name: '(Fast) Leer:',
      border: 'border-warning',
      badge: 'bg-warning-subtle'
    },
    2: {
      name: 'Einkaufsliste:',
      border: 'border-danger',
      badge: 'bg-danger-subtle'
    }
  }

  const currentFormat = formatComponent[status]

  return (
    <div className="col-12 col-md-6 mt-3">
      <div className={`h4 pb-2 mb-4 border-bottom ${currentFormat.border}`}>
        <h6 className='display-6'>{currentFormat.name}</h6>
      </div>
        {items.filter((item) => item.status === status && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
          <span 
          key={item.id}
          className={`badge rounded-pill text-primary-emphasis m-1 px-2 py-1 ${currentFormat.badge}`}
          onClick={() => handleToggle(item.id, item.status)}
          >
          {item.name}
          </span>
        ))}
    </div>
  )
}

export default FilteredItemList