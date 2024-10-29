import { useState } from "react";
import { db } from "../config/firebase";
import { query, addDoc, collection, onSnapshot, doc, updateDoc, orderBy, where, getDocs } from "firebase/firestore";

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
        return { success: false, message: 'Das haben wir bereits im Vorrat!' };
      }
      const itemData = { name, done: false }
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
      await updateDoc(itemRef, {done : !currentItemStatus})
      setLoading(false);
      return { success: true, message: 'Item erfolgreich aktualisiert!' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  }

  const fetchItems = () => {
    setLoading(true);
    const q = query(
      collection(db, 'shoppingList'),
      orderBy('name')
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
  return { items, addItem, fetchItems, updateItem, loading, error };
}

export default useItemList