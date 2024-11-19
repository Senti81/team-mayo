import React, { useEffect, useState } from 'react';
import AddTransactionModal from '../../components/AddTransactionModal.jsx'
import useAuth from '../../hooks/useAuth.js';
import useTransaction from '../../hooks/useTransaction.js';
import Spinner from '../../components/Spinner.jsx';
import DeleteModal from '../../components/DeleteModal.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.js'

const TransactionList = () => {
  const { user } = useAuth()
  const { transactions, fetchTransactions, deleteTransaction, loading, error } = useTransaction()
  const [transaction, setTransaction] = useState(null);
  const [ownTransactions, setOwnTransactions] = useState(true)

  useEffect(() => { fetchTransactions() }, [user])

  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = transaction.createdAt.toDate();
    const now = new Date()
    return (
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear() &&
      (!ownTransactions || transaction.userId === user.uid)
    )
  })

  if (error) signOut(auth)
  if (loading) return <Spinner />

  return (
    <>
      <div className="container-fluid">
        <div className='container table-responsive'> 
          <h4 className='text-start my-1 display-6'>{new Date().toLocaleString('de-DE', { month: 'long', year: 'numeric' })}</h4>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" checked={ownTransactions} onChange={(e) => setOwnTransactions(!ownTransactions)}/>
            <label className="form-check-label" >Zeige nur eigene</label>
          </div>

          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope="col" className='text-start'>#</th>
                <th scope="col" className='text-end'>Betrag</th>
                <th scope="col" className='text-end'>Zeitpunkt</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {currentMonthTransactions.map((transaction, index) => (
                <tr key={transaction.id}
                  className={transaction.userId === user.uid ? 'table-primary' : 'table-secondary'}
                >
                  <td className='text-start'>{index +1}</td>
                  <td className='text-end'>{transaction.amount.toFixed(2)} €</td>
                  <td className='text-end'>{transaction.createdAt.toDate().toLocaleString()}</td>
                  <td className='text-end'>
                    {transaction.userId === user.uid &&
                      <i
                        className="bi bi-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDelete"
                        onClick={() => setTransaction(transaction)}
                      />                  
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <AddTransactionModal />
      <DeleteModal 
        entity={transaction} 
        onDeleteHandle={deleteTransaction}
      />
    </>
  )
}

export default TransactionList