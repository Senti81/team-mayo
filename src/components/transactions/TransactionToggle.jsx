const TransactionToggle = ({ transactions, toggle }) => (
  <div className="form-check form-switch m-2">
    <input 
      className="form-check-input"
      type="checkbox"
      role="switch"
      checked={transactions}
      onChange={toggle}
    />
    <label className="form-check-label" >Zeige Alle</label>
  </div>
)

export default TransactionToggle