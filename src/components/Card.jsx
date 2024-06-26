import React from 'react'

function Card({image, description, price, }) {
    return (
        <div className="card text-white bg-dark border border-info ">
          <div className="card-header lead">A photo from pexels</div>
          <div className="card-body">
            <div className="rounded border border-success p-2">
              <img
                src={image}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
              />
            </div>
            <p className="lead bg-success font-weight-normal text-wrap">
              {description}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">{`$${price}`}</p>
            <div className="row">
              <div className="col-12">
                <button
                  onClick={() => {}}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                  Add to Cart
                </button>
              </div>
              <div className="col-12">
                <button
                  onClick={() => {}}
                  className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Card