import { useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import useItemList from "../../hooks/useItemList"
import useReceipts from "../../hooks/useReceipts"

const ReceiptDetails = () => {
  const location = useLocation()
  const receipt = location.state?.receipt
  const isIngredientAvailable = (ingredient, items) => items.some(item => item?.name === ingredient && item.status === 0);
  const { items, fetchItems } = useItemList()
  const { fetchReceipts } = useReceipts()

  useEffect(() => {
    fetchReceipts();
    fetchItems();
  }, [])

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title mb-0 display-3 text-center">{receipt?.name}</h1>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h3 className="h5">Zutaten</h3>
            <ul className="list-group">
              {receipt?.ingredients.map((ingredient, index) => {
                const available = isIngredientAvailable(ingredient, items);
                return (
                  <li 
                    key={index} 
                    className={`list-group-item d-flex justify-content-between align-items-center ${available ? 'bg-success-subtle' : 'bg-danger-subtle'}`}
                  >
                    {ingredient}
                  <i className={available ? 'bi bi-check-lg' : 'bi bi-ban'}/>
                  {/* <span className={`badge ${available ? 'bg-success' : 'bg-danger'}`}>
                    {available ? 'Verfügbar' : 'Fehlt'}
                  </span> */}
                </li>
              )})}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="h5">Beschreibung</h3>
            <p className="small">
              {receipt?.description}
            </p>
          </div>
        </div>
        <div className="card-footer text-center d-flex justify-content-sm-start justify-content-between">
          <Link 
            to={'..'}
            relative="path"
            className="btn btn-outline-secondary me-sm-5" 
          >
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Zurück
          </Link>
          <Link 
            to={`/receipts/${receipt.id}/edit`} 
            state={{ receipt }}
            className="btn btn-primary"
          >
            <i className="bi bi-pencil me-2"></i>
            Bearbeiten
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReceiptDetails