const MonthDisplay = () => {
  const now = new Date()
  const currentMonth = new Date(now.getFullYear(), now.getMonth() -1).toLocaleString('de-DE', { month: 'long', year: 'numeric'})
  return  (    
    <h4 className="alert-heading">{currentMonth}</h4>
  )
}

export default MonthDisplay
