import GoogleSignIn from './components/GoogleSignIn';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import ReceiptList from './pages/receipts/ReceiptList.jsx'
import ReceiptDetails from './pages/receipts/ReceiptDetails.jsx'
import EditReceipt from './pages/receipts/EditReceipt.jsx'
import ShoppingList from './pages/items/ShoppingList.jsx';
import Spinner from './components/Spinner.jsx';
import './App.css'

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />
  if (!user) return <GoogleSignIn />

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ paddingTop: '75px' }}>
          <Routes>
            <Route path='/' exact element={<Main />} />
            <Route path='/receipts' element={<ReceiptList />} />
            <Route path='/receipts/:id/edit' element={<EditReceipt />} />
            <Route path='/receipts/:id' element={<ReceiptDetails />} />
            <Route path='/list' element={<ShoppingList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
