import React from "react";
import IncomingCars from "../component/IncomingCars";
import AddCarForm from "../component/AddCarForm";
import { useNavigate } from "react-router-dom";
import Checker from "../component/Checker";
import Profile from "../component/Profile";

function FormPage() {
  Checker();

  const navigate = useNavigate();

  const handleAddCar = () => {
    navigate("/form");
  };
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleHistory = (e) => {
    e.preventDefault();
    navigate("/history");
  };
  const handleAdmin = (e) => {
    e.preventDefault();
    navigate("/admin");
  };
  return (
    <>
      <div class="container-scroller">
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a class="sidebar-brand brand-logo" href="/">
              <h1
                style={{
                  fontSize: "25px",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Car Checker
              </h1>
            </a>
            <a class="sidebar-brand brand-logo-mini" href="/">
              <img src="assets/images/logo-mini.svg" alt="logo" />
            </a>
          </div>
          <ul class="nav">
            <Profile />
            
            <li class="nav-item nav-category" >
              <span class="nav-link">Navigation</span>
            </li>
            <li class="nav-item menu-items " >
              <a class="nav-link" href="/">
                <span class="menu-icon">
                  <i class="mdi mdi-speedometer"></i>
                </span>
                <span class="menu-title">Dashboard</span>
              </a>
            </li>

            <li class="nav-item menu-items" >
              <a class="nav-link" href="/history">
                <span class="menu-icon">
                  <i class="mdi mdi-table-large"></i>
                </span>
                <span class="menu-title">History</span>
              </a>
            </li>

            <li class="nav-item menu-items" >
              <a class="nav-link" href="/admin">
                <span class="menu-icon">
                  <i class="mdi mdi-security"></i>
                </span>
                <span class="menu-title">Admin</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="container-fluid page-body-wrapper">
          <nav class="navbar p-0 fixed-top d-flex flex-row">
            <div class="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
              <a class="navbar-brand brand-logo-mini" href="index.html">
                <img src="assets/images/logo-mini.svg" alt="logo" />
              </a>
            </div>
            <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
              <button
                class="navbar-toggler navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span class="mdi mdi-menu"></span>
              </button>
              <ul class="navbar-nav w-100">
                <li class="nav-item w-100">
                 
                </li>
              </ul>

              <button
                class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="offcanvas"
              >
                <span class="mdi mdi-format-line-spacing"></span>
              </button>
            </div>
          </nav>

          <br />
          <AddCarForm />
        </div>
      </div>
    </>
  );
}

export default FormPage;
