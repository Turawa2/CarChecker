import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalCars() {
  const [totalCars, setTotalCars] = useState(null);

  useEffect(() => {
    // Fetch total cars from the backend
    axios
      .get("http://localhost:7000/api/totalCars")
      .then((response) => {
        setTotalCars(response.data.totalCars);
      })
      .catch((error) => {
        console.error("Error fetching total cars:", error.message);
      });
  }, []);

  return (
    <div className="col-sm-4 grid-margin">
      <div className="card">
        <div className="card-body">
          <h5>Total Cars In/Out</h5>
          <div className="row">
            <div className="col-8 col-sm-12 col-xl-8 my-auto">
              <div className="d-flex d-sm-block d-md-flex align-items-center">
                <h2 className="mb-0 text-center">
                  {totalCars !== null ? totalCars : "Loading..."}
                </h2>
              </div>
            </div>
            <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i className="icon-lg mdi mdi-car text-warning ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCars;
