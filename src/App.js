import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import useAuth from './hooks/useAuth'
import TransactionList from './pages/transactions/TransactionList'
import ReceiptList from './pages/receipts/ReceiptList'
import ReceiptDetails from './pages/receipts/ReceiptDetails'
import EditReceipt from './pages/receipts/EditReceipt'
import ItemList from './pages/items/ItemList'
import Spinner from './components/Spinner';
import './App.css'
import Main from './pages/Main'

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />
  if (!user) return <Login />

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ paddingTop: '75px' }}>
          <Routes>
            <Route path='/' exact element={<Main />} />
            <Route path='/transactions' exact element={<TransactionList />} />
            <Route path='/receipts' element={<ReceiptList />} />
            <Route path='/receipts/:id/edit' element={<EditReceipt />} />
            <Route path='/receipts/:id' element={<ReceiptDetails />} />
            <Route path='/items' element={<ItemList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
