import axios from "axios";
import React, { useEffect, useState } from "react";

function HistoryCars() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch history data from the server
    axios
      .get("http://localhost:7000/api/getHistoryCars")
      .then((response) => {
        setHistory(response.data);
      })
      .catch((err) => {
        console.error("Error fetching customer data: ", err);
      });
  }, []);
  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"> TOTAL CARS IN/OUT</h4>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control text-light"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
                      </tr>
                    </thead>
                    <tbody>
                      {history
                        .filter((car) =>
                          car.number.toString().includes(searchQuery)
                        )
                        .map((car, index) => (
                          <tr
                            key={car.id}
                            style={{ textTransform: "upperCase" }}
                          >
                            <td class="py-1"> {index + 1} </td>
                            <td> {car.number} </td>
                            <td> {car.tally} </td>
                            <td> {car.gender} </td>
                            <td> {car.date} </td>
                            <td> {car.time} </td>
                            <td> {car.documenter} </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">
              Copyright © DEV-LORD 2023
            </span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              {" "}
              <a href="https://dev-lord.netlify.app" target="_blank">
                DEV-LORDS
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HistoryCars;
