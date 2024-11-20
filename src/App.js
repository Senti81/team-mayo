import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import useAuth from './hooks/useAuth'
import TransactionList from './pages/transactions/TransactionList'
import ReceiptList from './pages/receipts/ReceiptList'
import ReceiptDetails from './pages/receipts/ReceiptDetails'
import EditReceipt from './pages/receipts/EditReceipt'
import ItemList from './pages/items/ItemList'
import Spinner from './components/Spinner'
import './App.css'
import Main from './pages/Main'
import NoPage from './pages/404'
import AddReceipt from './pages/receipts/AddReceipt'
import Profile from './pages/profile/Profile'

function App() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Login />

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Main />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/transactions' element={<TransactionList />} />
            <Route path='/items' element={<ItemList />} />
            <Route path='/receipts' element={<ReceiptList />} />
            <Route path='/receipts/add' element={<AddReceipt />} />
            <Route path='/receipts/:id/edit' element={<EditReceipt />} />
            <Route path='/receipts/:id' element={<ReceiptDetails />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
