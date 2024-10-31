import { useState } from "react";
import { auth, db } from "../config/firebase";
import { query, addDoc, collection, Timestamp, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import useAuth from "./useAuth";

const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth()

  const addTransaction = async (amount) => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error("Bitte melde dich an.")
      }

      const names = user.displayName.split(' ');
      const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
      
      const transactionData = {
        userId: user.uid,
        initials,
        amount: Number(amount),
        createdAt: Timestamp.now()
      }

      await addDoc(collection(db, "transactions"), transactionData)

      setLoading(false);
      return { success: true, message: 'Transaktion erfolgreich hinzugefügt!' };
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, message: error.message };
    }
  }

  // READ: Alle Transaktionen abrufen
  const fetchTransactions = () => {
    if (!user) return;
    setLoading(true);
    setError(null);    
    const q = query(
      collection(db, 'transactions'),
      orderBy('createdAt')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTransactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(userTransactions);
      setLoading(false);      
    }, (error) => {
      setLoading(false);
      setError(error.message)
    });
    return () => unsubscribe();
  };

  // DELETE: Transaktion aus der Datenbank löschen
  const deleteTransaction = async (id) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, 'transactions', id));
      console.log(`Transaktion mit ID ${id} gelöscht`);
    } catch (error) {
      console.error("Fehler beim Löschen der Transaktion: ", error);
    }
  };
  
  return { transactions, fetchTransactions, addTransaction, deleteTransaction, loading, error };
}

export default useTransaction