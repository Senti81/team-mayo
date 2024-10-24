import { useLocation, Link } from "react-router-dom"
import useShoppingList from "../../hooks/useShoppingList";
import { useEffect } from "react";

export const Receipt = () => {
  const location = useLocation()
  const receipt = location.state?.receipt
  const isIngredientAvailable = (ingredient, items) => items.some(item => item.name === ingredient && item.done);
  const { items, fetchItems } = useShoppingList()

  useEffect(() => {
    fetchItems();
  }, [])

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title mb-0 display-3 text-center">{receipt.name}</h1>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h3 className="h5">Zutaten</h3>
            <ul className="list-group list-group-flush">
              {receipt.ingredients.map((ingredient, index) => {
                const available = isIngredientAvailable(ingredient, items);
                return (
                  <li 
                    key={index} 
                    className={`list-group-item d-flex justify-content-between align-items-center ${available ? 'bg-success-subtle' : 'bg-danger-subtle'}`}
                  >
                    {ingredient}
                  <span className={`badge ${available ? 'bg-success' : 'bg-danger'}`}>
                    {available ? 'Verfügbar' : 'Fehlt'}
                  </span>
                </li>
              )})}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="h5">Zubereitung</h3>
            <p className="small">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta consectetur repellat blanditiis iure optio laudantium eveniet nostrum vel doloribus nobis nemo, dolores expedita eum quis excepturi fuga minima consequuntur totam debitis, quod ipsam repellendus? Quaerat aut odit beatae! Et, deleniti.
            </p>
          </div>
        </div>
        <div className="card-footer text-center">
          <Link className="btn btn-outline-secondary" to={'/receipts'}>Zurück</Link>
        </div>
      </div>
    </div>



    // <div className="container">
    //   <div className="display-6">{receipt.name}</div>      
    //   {receipt.ingredients.map((ingredient, index) => 
    //     <span
    //       className={`badge rounded-pill ${isIngredientAvailable(ingredient, items) ? 'bg-success-subtle' : 'bg-danger-subtle'} text-dark m-1`}
    //       key={index}>
    //       <small>{ingredient}</small>
    //     </span>        
    //   )}
    //   <Link className="btn btn-secondary" to={'/receipts'}>Zurück</Link>
    // </div>
  )
}