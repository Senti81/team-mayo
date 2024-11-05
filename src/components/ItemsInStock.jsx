const ItemsInStock = ({ items, handleToggle, searchTerm, setSearchTerm, handleResetFilter }) => {

  return (
    <div className="col-12 col-md-6 mt-3">
      <div className="h4 pb-2 mb-4 border-bottom border-success">
        <h6 className='display-6'>Im Vorrat:</h6>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Suche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleResetFilter}
          >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
        {items.filter((item) => item.status === 0 && item.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
          <span 
          key={item.id}
          className="badge rounded-pill bg-success-subtle text-primary-emphasis m-1 px-2 py-1"
          onClick={() => handleToggle(item.id, item.status)}
          >
          {item.name}
          </span>
        ))}
    </div>
  )
}

export default ItemsInStock