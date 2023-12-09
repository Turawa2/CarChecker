import React, { useState, useEffect } from "react";

function TotalCarsInToday() {
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    const fetchTotalCars = async () => {
      try {
        // Fetch the total cars for the last 24 hours
        const totalResponse = await fetch("http://localhost:7000/api/carsCountLast24Hours");
        const totalData = await totalResponse.json();

        // Update  the total cars count for the last 24 hours
        setTotalCars(totalData.carCount);
      } catch (error) {
        console.error("Error fetching total cars for the last 24 hours:", error);
      }
    };

    fetchTotalCars(); // Call the fetch function for total cars
  }, []); 

  const countdown = () => {
    // Define the time of the day when the count should reset 12:00 AM
    const resetTime = new Date();
    resetTime.setHours(0, 0, 0, 0);

    // Calculate the remaining time until the reset time
    const currentTime = new Date();
    const timeUntilReset = resetTime.getTime() - currentTime.getTime();

    //break d time for calling
    const hours = Math.floor(timeUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeUntilReset % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="col-sm-4 grid-margin">
      <div className="card">
        <div className="card-body">
          <h5>Total Cars in Today</h5>
          <div className="row">
            <div className="col-8 col-sm-12 col-xl-8 my-auto">
              <div className="d-flex d-sm-block d-md-flex align-items-center">
                <h2 className="mb-0">{totalCars}</h2>
               
              </div>
            </div>
            <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i className="icon-lg mdi mdi-car text-success ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalCarsInToday;
