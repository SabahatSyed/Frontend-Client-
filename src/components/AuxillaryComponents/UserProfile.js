import React, { useState, useEffect } from "react";
import "../css/styles.css";
export default function Profile() {
  return (
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card">
            <div
              class="rounded-top text-white d-flex flex-row"
              style={{ backgroundColor: "#0054a6", height: "200px" }}
            >
              <div
                class="ms-4 mt-5 d-flex justify-content-center"
                style={{ textAlign: "center" }}
              ></div>
              <div class="ms-3" style={{ marginTop: "130px" }}>
                <h2>Tanveer Ahmad</h2>
                <p>Admin</p>
              </div>
            </div>
            <div
              class="p-4 text-black"
              style={{ backgroundColor: "#f8f9fa" }}
            ></div>
            <div class="card-body p-4 text-black">
              <div class="mb-5">
                <p class="lead fw-normal mb-1">About</p>
                <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                  <p class="font-italic mb-1">
                    <b>Email:</b> tanveerahmad@gmail.com
                  </p>
                  <p class="font-italic mb-1">
                    <b>Phone Number: </b> 03334836788
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
