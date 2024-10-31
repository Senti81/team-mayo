import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import useTransaction from '../hooks/useTransaction.js';
import Spinner from '../components/Spinner.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import MonthlySummary from '../components/MonthlySummary.jsx';

const Main = () => {
  const { user } = useAuth()
  const { fetchTransactions, loading, error } = useTransaction()

  useEffect(() => { fetchTransactions() }, [user])

  if (error) signOut(auth)
  if (loading) return <Spinner />
  return (
    <>      
      <div className="container py-3">
        <div className="display-3 text-center mb-5">Jahresübersicht</div>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 mb-3 text-center">
          {[...Array(12)].map((_, index) => (
            <MonthlySummary key={index} monthIndex={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Main