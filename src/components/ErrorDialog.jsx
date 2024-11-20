const ErrorDialog = ({ error }) => (
  <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
    <strong>{error}</strong>
  </div>
)

export default ErrorDialog