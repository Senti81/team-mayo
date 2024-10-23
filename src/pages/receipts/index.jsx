import React from "react";

export const Receipts = () => {

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Card 1 */}
        <div className="col-6 col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sosse Nr.1 </h5>
              <span class="badge rounded-pill text-bg-primary m-1">Nudeln</span>
              <span class="badge rounded-pill text-bg-primary m-1">Zwiebeln</span>
              <span class="badge rounded-pill text-bg-primary m-1">Tomaten</span>
              <span class="badge rounded-pill text-bg-primary m-1">Thunfisch</span>
              <span class="badge rounded-pill text-bg-primary m-1">Creme Fraiche</span>
              <span class="badge rounded-pill text-bg-primary m-1">Oliven</span>
              <span class="badge rounded-pill text-bg-primary m-1">Kapern</span>
              <span class="badge rounded-pill text-bg-primary m-1">Thymian</span>
              <span class="badge rounded-pill text-bg-primary m-1">Oregano</span>
              <span class="badge rounded-pill text-bg-primary m-1">Paprikapulver</span>

            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-6 col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card Title 2</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col-6 col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card Title 3</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="col-6 col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card Title 4</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};