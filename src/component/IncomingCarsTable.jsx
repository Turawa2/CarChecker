import axios from "axios";
import React, { useEffect, useState } from "react";

function IncomingCarsTable() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch cars data from the back
    axios
      .get("http://localhost:7000/api/getIncomingCars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => {
        console.error("Error fetching customer data: ", err);
      });
  }, []);

  // Function to delete a car by ID
  const handleCarOut = (car) => {
    // Post data to the carsout table
    axios
      .post("http://localhost:7000/api/post/carsout", {
        number: car.number,
        tally: car.tally,
        gender: car.gender,
        date: car.date,
        time: car.time,
        documenter: car.documenter,
      })
      .then(() => {
        // Delete the car from the cars table
        deleteCar(car.id);
      })
      .catch((err) => {
        console.error("Error posting data to carsout: ", err);
      });
  };

  // Function to delete a car by ID
  const deleteCar = (id) => {
    if (window.confirm("Are you sure this car is going out?")) {
      axios
        .delete(`http://localhost:7000/api/delete/car/${id}`)
        .then(() => {
          // Update the car list after succesfl delete
          const updatedCars = cars.filter((car) => car.id !== id);
          setCars(updatedCars);
        })
        .catch((err) => {
          console.error("Error removing car: ", err);
        });
    }
  };

  return (
    <>
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">CARS IN</h4>
            <div class="form-group row">
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control text-light"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th> S/N </th>
                    <th> Car Number </th>
                    <th> Tally Number</th>
                    <th> Gender </th>
                    <th> Date of Entry </th>
                    <th> Time of Entry </th>
                    <th> Documenter </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {cars
                    .filter((car) =>
                      car.number.toString().includes(searchQuery)
                    )
                    .map((car, index) => (
                      <tr key={car.id} style={{ textTransform: "upperCase" }}>
                        <td class="py-1"> {index + 1} </td>
                        <td> {car.number} </td>
                        <td> {car.tally} </td>
                        <td> {car.gender} </td>
                        <td> {car.date} </td>
                        <td> {car.time} </td>
                        <td> {car.documenter} </td>
                        <td>
                          <button
                            onClick={() => handleCarOut(car)}
                            type="button"
                            class="btn btn-inverse-success btn-fw"
                          >
                            Out
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncomingCarsTable;
