export const calculateTotalAmount = (transactions, userId, isCurrentUser) => {
  return transactions.reduce((total, transaction) => {
    if (isCurrentUser ? transaction.userId === userId : transaction.userId !== userId) {
      return total + transaction.amount;
    }
    return total;
  }, 0);
};

export const calculateBalanceBetweenUsers = (userTotal, otherUserTotal) => {
  const fix = 300
  const totalAmount = (userTotal + otherUserTotal).toFixed(2);
  const perUserShare = (totalAmount / 2).toFixed(2);
  const userDifference = userTotal - perUserShare;

  return {
    userTotal,
    otherUserTotal,
    totalAmount,
    perUserShare,
    message: userDifference < 0
      ? `Rückerstattung: ${Math.abs(fix + userDifference).toFixed(2)} €`
      : `Zu zahlen: ${Math.abs(fix - userDifference).toFixed(2)} €`
  };
};