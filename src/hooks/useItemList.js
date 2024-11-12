import { useState } from "react";
import { db } from "../config/firebase";
import { query, addDoc, collection, onSnapshot, doc, updateDoc, orderBy, where, getDocs, Timestamp, deleteDoc } from "firebase/firestore";

const useItemList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const addItem = async (name) => {
    try {

      // Check if the item already exists
      const q = query(collection(db, "shoppingList"), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return { success: false, message: 'Das haben wir bereits!' };
      }
      const itemData = { name, status: 1, updatedAt: Timestamp.now() }
      await addDoc(collection(db, "shoppingList"), itemData)
      return { success: true, message: 'Item erfolgreich hinzugefügt!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  const updateItem = async (id, currentItemStatus) => {
    try {
      setLoading(true);
      const itemRef = doc(db, "shoppingList", id)

      let newItemStatus = 0
      if (currentItemStatus !== 2) 
        newItemStatus = currentItemStatus +1     

      await updateDoc(itemRef, {status: newItemStatus, updatedAt: Timestamp.now()})
      setLoading(false);
      return { success: true, message: 'Item erfolgreich aktualisiert!' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  }

  const deleteItem = async (id) => {
    if  (!id) return
    try {
      await deleteDoc(doc(db, 'shoppingList', id))
      console.log(`Item mit Id ${id} erfolgreich gelöscht`)
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  }

  const fetchItems = (isSortedAlphabetical = false) => {
    setLoading(true);
    const q = query(
      collection(db, 'shoppingList'),
      orderBy(isSortedAlphabetical ? 'name' : 'updatedAt', isSortedAlphabetical ? 'asc' : 'desc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(userItems)
      setLoading(false);
      },  (error) => {
        setLoading(false);
        setError(error.message)
      });
    return () => unsubscribe();
  }
  return { items, addItem, fetchItems, updateItem, deleteItem, loading, error };
}

export default useItemList