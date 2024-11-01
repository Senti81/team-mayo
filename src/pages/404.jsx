import { Link } from "react-router-dom"

const NoPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">Oops! Looks like you took a wrong turn.</p>
      <p>This page has gone on an epic quest and hasn’t returned. Maybe it got distracted by a dragon? 🐉</p>
      <Link to="/" className="btn btn-success btn-lg">
        🏠 Return to the quest hub!
      </Link>
    </div>
  )
}

export default NoPage