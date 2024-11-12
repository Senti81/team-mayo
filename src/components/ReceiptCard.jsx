import { Link } from "react-router-dom"

const ReceiptCard = ({ receipt, items }) => {

  const areAllIngredientsAvailable = (ingredients, items) => 
    ingredients.every(ingredient => items.some(item => item.name === ingredient && item.status === 0))

  return (
    <Link 
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-sm-2 px-5 px-sm-1 my-2 my-sm-1"
      to={`/receipts/${receipt.id}`}
      state={{ receipt }}
      style={{textDecoration: 'none'}}
    >
      <div className={areAllIngredientsAvailable(receipt.ingredients, items) ? 'card border-success' : 'card border-danger'}>
        <div className="card-body shadow-lg">
          <div className="d-flex justify-content-between">
            <h5 className="card-title mb-0">{receipt.name}</h5>
            <i className={areAllIngredientsAvailable(receipt.ingredients, items) ? 'bi bi-check-lg' : 'bi bi-ban'}/>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default ReceiptCard