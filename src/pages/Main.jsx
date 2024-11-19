import React from 'react';
import MonthlySummary from '../components/MonthlySummary.jsx';

const Main = () => {
  return (
    <div className="container py-3">
      <div className="display-3 text-center mb-5">Jahresübersicht</div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 mb-3 text-center">
        {[...Array(12)].map((_, index) => (
          <MonthlySummary key={index} monthIndex={index} />
        ))}
      </div>
    </div>
  )
}

export default Main