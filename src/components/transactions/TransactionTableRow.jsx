const TransactionTableRow = ({ transaction, index, setTransaction, user}) => (
  <tr key={transaction.id}
    className={transaction.userId === user?.uid ? 'table-primary' : 'table-secondary'}>
    <td className='text-start'>{index +1}</td>
    <td className='text-end'>{transaction.amount.toFixed(2)} €</td>
    <td className='text-end'>{transaction.createdAt.toDate().toLocaleString()}</td>
    <td className='text-end'>
      {transaction.userId === user?.uid &&
        <i
          className="bi bi-trash"
          data-bs-toggle="modal"
          data-bs-target="#confirmDelete"
          onClick={() => setTransaction(transaction)}
        />                  
      }
    </td>
  </tr>
)

export default TransactionTableRow