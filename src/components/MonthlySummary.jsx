import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useTransaction from "../hooks/useTransaction"
import { calculateBalanceBetweenUsers, calculateTotalAmount } from "../utils/transactionUtils"

const MonthlySummary = ({ monthIndex }) => {
  const { user } = useAuth()
  const { transactions, fetchTransactions } = useTransaction()

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
      <div className="card mb-4 rounded-3 shadow-sm">
        <div className="card-header py-3">
          <h4 className="my-0 fw-normal">{new Date(2024, monthIndex).toLocaleString('de-DE', {month: 'long'})}</h4>
        </div>
        {userTotalAmount !== 0 &&
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{balanceInfo?.totalAmount} €</h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>{balanceInfo?.message}</li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default MonthlySummary