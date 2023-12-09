import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TotalCars from "./TotalCars";
import TimeComp from "./TimeComp";
import DateComp from "./DateComp";

function AddCarForm() {
  const [number, setNumber] = useState("");
  const [tally, setTally] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [documenter, setDocumenter] = useState("");

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    if (!number || !tally || !gender || !date || !time || !documenter) {
      alert("Please fill in all fields!");
    } else {
      // checking data input is  === current date
      const isToday = new Date(date).toDateString() === new Date().toDateString();
  
      // Send the data to the backend
      axios
        .post("http://localhost:7000/api/post/incomingCars", {
          number,
          tally,
          gender,
          date,
          time,
          documenter,
          today: isToday ? 1 : 0,  // Insert 1 if today, otherwise insert 0 but i am not using it thus is old idea
        })
        .then((response) => {
          if (response.data === "Data inserted into both tables successfully!") {
            alert("Registration Successful!");
            navigate("/");
            setNumber("");
            setTally("");
            setGender("");
            setDate("");
            setTime("");
            setDocumenter("");
          } else {
            alert("Registration Failed");
          }
        })
        .catch((err) => alert("Registration Failed: " + err.response.data));
    }
  };
  

  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <TotalCars />
            <TimeComp />
            <DateComp />
          </div>
        </div>
        <div class="content-wrapper">
          <div class="col-12 grid-margin">
            <div class="card ">
              <div class="card-body">
                <h4 class="card-title">Add Car </h4>
                <form class="form-sample">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Car Number
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control text-light"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Tally Number
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control  text-light"
                            onChange={(e) => setTally(e.target.value)}
                            value={tally}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Gender</label>
                        <div class="col-sm-9">
                          <select
                            class="form-control  text-light"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                          >
                            <option></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Date of Entry
                        </label>
                        <div class="col-sm-9">
                          <input
                            class="form-control  text-light"
                            type="date"
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Time of Entry
                        </label>
                        <div class="col-sm-9">
                          <input
                            class="form-control  text-light"
                            type="time"
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Documenter
                        </label>
                        <div class="col-sm-9">
                          <input
                            class="form-control  text-light"
                            type="text"
                            onChange={(e) => setDocumenter(e.target.value)}
                            value={documenter}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <button class="btn btn-danger mb-2 mr-2" onClick={handleCancel}>
                  Cancel
                </button>
                <button class="btn btn-primary mb-2 " onClick={handleSubmit}>
                  Submit
                </button>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCarForm;
