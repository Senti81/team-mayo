import React, { useState } from 'react';
import useTransaction from '../hooks/useTransaction';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');

  const { addTransaction, loading, error } = useTransaction()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Bitte einen Betrag eingeben");
      return;
    }

    const result = await addTransaction(amount);

    if (result.success) {
      console.log(result.message)
      setAmount('')
    } else {
      console.log(`Fehler: ${result.message}`)
    }
  };

  return (
    <div className="container">
      <div className="modal fade" id="addTransaction" tabIndex="-1" aria-labelledby="addTransaction" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Betrag eingeben"
                  disabled={loading}
                />
                <label htmlFor="floatingInput">Betrag eingeben</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setAmount('')}>
                <i className="bi bi-x-circle"></i> Abbrechen
              </button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" disabled={loading} onClick={handleSubmit}>
                <i className="bi bi-check-circle"></i> Eintragen
              </button>
            </div>
          </div>
        </div>
      </div>      
      {error &&
        <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          <strong>{error}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }   

      {/* Floating Action Button */}
      <section>
        <button 
          type="button" 
          className="btn btn-success px-3 floating-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#addTransaction"
          >
          <i className="bi bi-plus-lg"></i>
        </button>
      </section>
    </div>
  );
};

export default TransactionForm;
