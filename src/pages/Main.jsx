import React, { useEffect, useState } from 'react';
import AddTransactionModal from '../components/AddTransactionModal.jsx'
import useAuth from '../hooks/useAuth';
import useTransaction from '../hooks/useTransaction';
import Spinner from '../components/Spinner';
import DeleteTransactionModal from '../components/DeleteTransactionModal.jsx';
import { calculateTotalAmount, calculateBalanceBetweenUsers } from '../utils/transactionUtils'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import MonthDisplay from '../components/MonthDisplay.jsx';

const Main = () => {
  const { user } = useAuth()
  const { transactions, fetchTransactions, deleteTransaction, loading, error } = useTransaction()

  const [showInfo, setShowInfo ] = useState(false)
  const [transaction, setTransaction] = useState(null);

  useEffect(() => { fetchTransactions() }, [user])

  // Filtere Transaktionen des aktuellen Monats
  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = transaction.createdAt.toDate();
    const now = new Date();
    return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
  });

  // Filtere Transaktionen des vorherigen Monats
  const previousMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = transaction.createdAt.toDate();
    const now = new Date();
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return transactionDate.getMonth() === previousMonth.getMonth() && transactionDate.getFullYear() === previousMonth.getFullYear();
  });

  // Berechnung der Differenz vom vorherigen Monat
  const userTotalAmount = calculateTotalAmount(previousMonthTransactions, user?.uid, true);
  const otherUserTotalAmount = calculateTotalAmount(previousMonthTransactions, user?.uid, false);
  const balanceInfo = calculateBalanceBetweenUsers(userTotalAmount, otherUserTotalAmount, user?.displayName);

  if (error) signOut(auth)
  if (loading) return <Spinner />
  return (
    <>
      <DeleteTransactionModal transaction={transaction} onDeleteTransaction={deleteTransaction} />
      <div className="container-fluid">
        <div className='container table-responsive'>
          <div className='my-3 text-center'>
          <button type='button' className='btn btn-outline-info btn-sm' onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? 'Ausblenden' : 'Info Vormonat'}
          </button>
          </div>
            {showInfo && (
              <div className='alert alert-primary' role='alert'>
                <MonthDisplay />
                <div className='d-flex row'>
                  <div className='d-flex'>
                    <div className='p-2 small'>Ausgaben von {user?.displayName}:</div>
                    <div className='p-2 small ms-auto'>{balanceInfo.userTotal} €</div>
                  </div>
                  <div className='d-flex'>
                    <div className='p-2 small'>Andere Ausgaben:</div>
                    <div className='p-2 small ms-auto'>{balanceInfo.otherUserTotal} €</div>
                  </div>
                  <hr/>
                  <div className='d-flex'>
                    <div className='p-2 small'>Alle Ausgaben:</div>
                    <div className='p-2 small ms-auto'>{balanceInfo.totalAmount} €</div>
                  </div>
                </div>
                <hr />
                <p>{balanceInfo.message}</p>
              </div>
            )}

          <h4 className='text-start my-1 display-6'>{new Date().toLocaleString('de-DE', { month: 'long', year: 'numeric' })}</h4>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope="col" className='text-start'>#</th>
                <th scope="col" className='text-end'>Betrag</th>
                <th scope="col" className='text-center'>Zeitpunkt</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
            {currentMonthTransactions
              .filter((transaction) => transaction.userId === user.uid)
              .map((transaction, index) => (
              <tr key={transaction.id}
                className='table-primary'>
                <td className='text-start'>
                  {index +1}
                </td>
                <td className='text-end'>
                  {transaction.amount.toFixed(2)} €
                </td>
                <td className='text-center'>
                  {transaction.createdAt.toDate().toLocaleString()}
                </td>
                <td className='text-end'>
                  <i
                    className="bi bi-trash"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDelete"
                    onClick={() => setTransaction(transaction)}
                  />                  
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddTransactionModal />
    </>
  )
}

export default Main