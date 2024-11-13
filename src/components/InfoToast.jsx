import { Toast } from 'bootstrap'

const InfoToast = ({ message, trigger }) => {
  const toastTrigger = document.getElementById(trigger)
  const toast = document.getElementById('liveToast')

  if (toastTrigger) {
    const toastBootstrap = Toast.getOrCreateInstance(toast)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
    })
  }

  return (
    <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
      <div 
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className='toast-header text-bg-primary'>
          <i className='bi bi-info-circle'></i>
          <strong className="ms-2 me-auto">Info</strong>
          <button 
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"/>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  )
}
export default InfoToast