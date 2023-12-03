import React from "react";
import IncomingCarsTable from "./IncomingCarsTable";
import TotalCars from "./TotalCars";
import TimeComp from "./TimeComp";
import DateComp from "./DateComp";

function IncomingCars() {
  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <TotalCars />
            <TimeComp />
            <DateComp />
          </div>

          <IncomingCarsTable />
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

export default IncomingCars;
