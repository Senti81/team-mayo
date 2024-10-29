import GoogleSignIn from './components/GoogleSignIn';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './pages/Main.jsx'
import Receipts from './pages/Receipts.jsx'
import Receipt from './pages/Receipt.jsx'
import EditReceipt from './pages/EditReceipt.jsx'
import List from './pages/List.jsx';
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
            <Route path='/receipts' element={<Receipts />} />
            <Route path='/receipts/:id/edit' element={<EditReceipt />} />
            <Route path='/receipts/:id' element={<Receipt />} />
            <Route path='/list' element={<List />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
