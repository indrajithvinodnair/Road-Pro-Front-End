import React from 'react'
//import custom components
import ViewVechicle from './ViewVechicle'
import ViewNonRegisteredVehicle from './ViewNonRegisteredVehicle';
import OfficialVehicles from './OfficialVehicles';


const VechicleManagement = () => {
    return (
        <div className="container mt-5">
        <h2 className="mt-4">Vehicle Management</h2>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li>
            <button
              className="nav-link"
              id="my-tab"
              data-bs-toggle="tab"
              data-bs-target="#registered-vechicle"
              type="button"
              role="tab"
              aria-controls="registered-vechicle"
              aria-selected="true"
            >
                Registered Vechicles
            </button>
            </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="civilian-tab"
              data-bs-toggle="tab"
              data-bs-target="#non-reg-vehicle"
              type="button"
              role="tab"
              aria-controls="non-reg-vehicle"
              aria-selected="false"
            >
              Non Registerd Vehicle
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="civilian-tab"
              data-bs-toggle="tab"
              data-bs-target="#offical-vehicle"
              type="button"
              role="tab"
              aria-controls="offical-vehicle"
              aria-selected="false"
            >
              Official Vehicle
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        <div
            className="tab-pane fade"
            id="registered-vechicle"
            role="tabpanel"
            aria-labelledby="registered-vechicle"
          >
           <ViewVechicle/>
          </div>
          <div
            className="tab-pane fade"
            id="non-reg-vehicle"
            role="tabpanel"
            aria-labelledby="rto-tab"
          >
             <ViewNonRegisteredVehicle />
          </div>
          <div
            className="tab-pane fade"
            id="offical-vehicle"
            role="tabpanel"
            aria-labelledby="rto-tab"
          >
            <OfficialVehicles />
          </div>
        </div>
      </div>
    )
}

export default VechicleManagement
