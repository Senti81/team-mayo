import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useTransaction from "../hooks/useTransaction"
import { calculateBalanceBetweenUsers, calculateTotalAmount } from "../utils/transactionUtils"
import MonthlyInfoModal from "./MonthlyInfoModal"
import Placeholder from "./Placeholder"

const MonthlySummary = ({ monthIndex }) => {
  const { user } = useAuth()
  const { transactions, loading, fetchTransactions } = useTransaction()

  useEffect(() => fetchTransactions(), [user])

  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = transaction.createdAt.toDate();
    const now = new Date();
    return transactionDate.getMonth() === monthIndex && transactionDate.getFullYear() === now.getFullYear();
  });

  const userTotalAmount = calculateTotalAmount(monthlyTransactions, user?.uid, true);
  const otherUserTotalAmount = calculateTotalAmount(monthlyTransactions, user?.uid, false);
  const balanceInfo = calculateBalanceBetweenUsers(userTotalAmount, otherUserTotalAmount, user?.displayName);

  return (
    <div className="col">
      <div className="card mb-4 rounded-3 shadow-sm"
        data-bs-toggle="modal" 
        data-bs-target={`#info-${monthIndex}`}
      >
        <div className="card-header py-3">
          <h4 className="my-0 fw-normal">{new Date(1970, monthIndex).toLocaleString('de-DE', {month: 'long'})}</h4>
        </div>
          {balanceInfo.totalAmount !== '0.00' &&
            <div className="card-body">
              {loading ? <Placeholder /> : <h1 className="card-title pricing-card-title">{balanceInfo?.totalAmount} €</h1>}
            </div>
          }
        </div>
      <MonthlyInfoModal balanceInfo={balanceInfo} modalId={`info-${monthIndex}`} />
    </div>
  )
}

export default MonthlySummary