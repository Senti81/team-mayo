import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AddTransactionModal from '../../components/AddTransactionModal.jsx'
import useAuth from '../../hooks/useAuth.js';
import useTransaction from '../../hooks/useTransaction.js';
import DeleteModal from '../../components/DeleteModal.jsx';
import TransactionTable from '../../components/transactions/TransactionTable.jsx';
import TransactionToggle from '../../components/transactions/TransactionToggle.jsx';
import ErrorDialog from '../../components/ErrorDialog.jsx'
import Placeholder from '../../components/Placeholder.jsx';

const TransactionList = () => {
  const { user } = useAuth()
  const { transactions, loading, fetchTransactions, deleteTransaction, error } = useTransaction()
  const [transaction, setTransaction] = useState(null);
  const [allTransactions, setAllTransactions] = useState(false)

  useEffect(() => { if (!user) return }, [user])
  useEffect(() => { fetchTransactions() }, [user])
  
  const toggleAllTransactions = useCallback(() => setAllTransactions((checked) => !checked), [])
  
  const currentMonthTransactions = useMemo(() => {
    const now = new Date()
    return transactions.filter((transaction) => {
      const transactionDate = transaction.createdAt.toDate()
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear() &&
        (allTransactions || transaction.userId === user?.uid)
      )
    })
  }, [transactions, allTransactions, user]);

  if (error) return <ErrorDialog error={error}/>

  return (
    <>
      <div className="container-fluid">
        <div className='container table-responsive'> 
          <h4 className='text-start my-1 display-6'>{new Date().toLocaleString('de-DE', { month: 'long', year: 'numeric' })}</h4>
          <TransactionToggle transactions={allTransactions} toggle={toggleAllTransactions}/>
          {loading ? <Placeholder/> :
            <TransactionTable transactions={currentMonthTransactions} setTransaction={setTransaction} user={user}/>
          }
        </div>
      </div>      
      <AddTransactionModal />
      <DeleteModal entity={transaction} onDeleteHandle={deleteTransaction}/>
    </>
  )
}

export default TransactionList