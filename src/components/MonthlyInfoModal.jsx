import React from 'react'

const MonthlyInfoModal = ({ balanceInfo, modalId }) => {

  return (
    <div className="container">
      <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="info" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className='modal-title'>Details</h5>
              <button type='button' className='btn-close' data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">

            <table className="table table-lg table-responsive">
              <tbody>
                <tr>
                  <td className='text-start'>Ausgaben von dir:</td>
                  <td className='text-end'>
                    <strong>{balanceInfo?.userTotal} €</strong></td>
                </tr>
                <tr>
                  <td className='text-start'>Andere Ausgaben:</td>
                  <td className='text-end'>
                    <strong>{balanceInfo?.otherUserTotal} €</strong></td>
                </tr>
                <tr className='table-group-divider'>
                  <td className='text-start border border-0'>Gesamtausgaben:</td>
                  <td className='text-end border border-0'>
                    <strong>{balanceInfo?.totalAmount} €</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className='fs-6 text-start'>Anteil pro Person: {balanceInfo.perUserShare} €</p>
            <div className="alert alert-primary d-flex align-items-center mt-5" role="alert">
              <i className="bi bi-info-circle-fill"></i>
              <strong className='fs-6 ms-2'>{balanceInfo?.message}</strong>
            </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                <i className="bi bi-x-circle"></i> Schliessen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyInfoModal;
