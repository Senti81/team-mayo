import { useState } from "react";
import { db } from "../config/firebase";
import { query, addDoc, collection, Timestamp, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import useAuth from "./useAuth";

const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth()

  const addTransaction = async (amount) => {
    if (!user) return
    setLoading(true)
    setError(null)
    const transactionData = {
      userId: user.uid,
      amount: Number(amount),
      createdAt: Timestamp.now()
    }
    try {
      await addDoc(collection(db, "transactions"), transactionData)
      return { success: true, message: 'Transaktion erfolgreich hinzugefügt!' }
    } catch (error) {
      setError(error.message)
      return { success: false, message: error.message }
    } finally {
      setLoading(false)      
    }
  }

  const fetchTransactions = () => {
    if (!user) return
    setLoading(true)
    setError(null)
    const q = query(
      collection(db, 'transactions'),
      orderBy('createdAt')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTransactions = snapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      ))
      setTransactions(userTransactions)
      setLoading(false)
    }, (error) => {
      setLoading(false)
      setError(error.message)
    });
    return () => unsubscribe()
  };

  const deleteTransaction = async (id) => {
    if (!id) return
    try {
      await deleteDoc(doc(db, 'transactions', id))
      console.log(`Transaktion mit ID ${id} gelöscht`)
    } catch (error) {
      console.error("Fehler beim Löschen der Transaktion: ", error)
    }
  };
  
  return { transactions, fetchTransactions, addTransaction, deleteTransaction, loading, error }
}

export default useTransaction