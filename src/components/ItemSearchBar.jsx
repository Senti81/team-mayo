const ItemSearchBar = ({ searchTerm, setSearchTerm, handleResetFilter}) => {
  return (
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
        <i className="bi bi-x-lg"/>
      </button>
    </div>
  )
}
export default ItemSearchBar