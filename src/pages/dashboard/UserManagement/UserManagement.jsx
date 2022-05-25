import React from "react";

//importing css
import '../../../static/css/display.css';

//importing tab components
import CivilUsers from './CivilUsers';
import ViewUsers from './ViewUsers';

const UserManagement = () => {
  return (
    <div className="container mt-5">
      <h2 className="mt-4">User Management</h2>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li>
          <button
            className="nav-link "
            id="civilian-tab"
            data-bs-toggle="tab"
            data-bs-target="#admin-users"
            type="button"
            role="tab"
            aria-controls="admin-users"
            aria-selected="true"
          >
              Administrators
          </button>
          </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="civilian-tab"
            data-bs-toggle="tab"
            data-bs-target="#rto-users"
            type="button"
            role="tab"
            aria-controls="rto-users"
            aria-selected="false"
          >
            R T O Users
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="civilian-tab"
            data-bs-toggle="tab"
            data-bs-target="#traffic-users"
            type="button"
            role="tab"
            aria-controls="traffic-users"
            aria-selected="false"
          >
            Traffic Police Users
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="civilian-tab"
            data-bs-toggle="tab"
            data-bs-target="#civil-users"
            type="button"
            role="tab"
            aria-controls="civil-users"
            aria-selected="false"
          >
            Civil Police Users
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="civilian-tab"
            data-bs-toggle="tab"
            data-bs-target="#civilian-users"
            type="button"
            role="tab"
            aria-controls="civilian-users"
            aria-selected="false"
          >
            Civilian Users
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
      <div
          className="tab-pane fade"
          id="admin-users"
          role="tabpanel"
          aria-labelledby="admin-tab"
        >
            <ViewUsers role="Admin" value="0"/>
        </div>
        <div
          className="tab-pane fade"
          id="rto-users"
          role="tabpanel"
          aria-labelledby="rto-tab"
        >
            <ViewUsers role="RTO" value="1"/>
        </div>
        <div
          className="tab-pane fade"
          id="traffic-users"
          role="tabpanel"
          aria-labelledby="traffic-tab"
        >
            <ViewUsers role="Traffic Police" value="2"/>
        </div>
        <div
          className="tab-pane fade"
          id="civil-users"
          role="tabpanel"
          aria-labelledby="civil-tab"
        >
            <ViewUsers role="Civil Police" value="3"/>
        </div>
        <div
          className="tab-pane fade"
          id="civilian-users"
          role="tabpanel"
          aria-labelledby="civilian-tab"
        >
            <CivilUsers/>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
