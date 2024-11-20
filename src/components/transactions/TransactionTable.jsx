import TransactionTableHeader from "./TransactionTableHeader"
import TransactionTableRow from "./TransactionTableRow"

const TransactionTable = ({ transactions, setTransaction, user }) => (
  <table className='table table-sm'>
    <TransactionTableHeader />
    <tbody className='table-group-divider'>
      {transactions.map((transaction, index) => (
        <TransactionTableRow
          key={transaction.id}
          transaction={transaction}
          index={index}
          setTransaction={setTransaction}
          user={user}
        />
      ))}
    </tbody>
  </table>
)

export default TransactionTable