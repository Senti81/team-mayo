import GoogleSignIn from './components/GoogleSignIn';
import Navbar from './components/Navbar';
import useAuth from './hooks/useAuth';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from './pages/main/index.jsx'
import { Receipts } from './pages/receipts/index.jsx'
import { List } from './pages/shoppingList/index.jsx';
import Spinner from './components/Spinner.jsx';
import './App.css'

function App() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />
  if (!user) return <GoogleSignIn />

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '75px' }}>
          <Routes>
            <Route path='/' exact element={<Main />} />
            <Route path='/receipts' element={<Receipts />} />
            <Route path='/list' element={<List />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
