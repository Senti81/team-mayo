import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

const useReceipts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receipts, setReceipts] = useState([])
  
  const addReceipt = async (payload) => {
    setError(null)
    setLoading(true)
    try {
      await addDoc(collection(db, 'receipts'), payload)
      return { success : true, message: 'Rezept erfolgreich angelegt'}
    } catch (error) {
      setError(error)
      return { success : false, message: error.message}
    } finally {
      setLoading(false)
    }
  }

  const fetchReceipts = () => {
    const q = query(collection(db, 'receipts'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReceipts(items);
      setLoading(false);      
    }, (error) => {
      setLoading(false);
      setError(error.message)
    });
    return () => unsubscribe();
  }

  const updateReceipt = async (id, description) => {
    setError(null)
    setLoading(true)
    try {
      const receiptRef = doc(db, 'receipts', id)
      await updateDoc(receiptRef, { description })
      return { success : true, message: 'Rezept erfolgreich aktualisiert'}
    } catch (error) {
      setError(error)
      return { success : false, message: error.message}
    } finally {
      setLoading(false)
    }
  }

  const deleteReceipt = async (id) => {
    setError(null)
    setLoading(true)
    try {
      await deleteDoc(doc(db, 'receipts', id))
      return { success : true, message: 'Rezept erfolgreich gelöscht'}
    } catch (error) {
      setError(error)
      return { success : false, message: error.message}
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, receipts, addReceipt, fetchReceipts, updateReceipt, deleteReceipt }
}

export default useReceipts