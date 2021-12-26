import React from "react";
import showcase from "../showcase.svg";
const Home = () => {
  return (
    <div>
      <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Organise your Work Flow With{" "}
                <span className="text-warning"> Trackify </span>
              </h1>
              <p className="lead my-4">
                We focus on Organising your Work Flow to make you in a
                confortable environement
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={showcase}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
