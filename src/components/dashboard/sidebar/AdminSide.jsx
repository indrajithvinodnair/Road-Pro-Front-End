import React from "react";
import { Link } from "react-router-dom";

const AdminSide = () => {
  return (
    <>
      <li>
        <Link id="a" to="/admin/usermanagement">
          <i className="fas fa-users"></i>
          User Management
        </Link>
      </li>
      <li>
        <Link id="a" to="/admin/vehiclemanagement">
          <i className="fas fa-car"></i>
          Vehicle Management
        </Link>
      </li>
      <li>
        <Link id="a" to="/admin/licencemanagement">
          <i className="fas fa-id-badge"></i>
          Licence Managment
        </Link>
      </li>
      <li>
        <Link
          className="drop-dn"
          to="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseLayouts"
          aria-expanded="false"
        >
          <i className="fas fa-shield"></i>
          Crime Management
        </Link>
        <ul id="collapseLayouts" className="drop-dn-item">
         <li> <Link  to="/admin/crimemanagement/civilcrime"   className="drop-dn">
         <i class="fas fa-star"></i>
           Civil Crime
          </Link> </li>
          <li><Link to="/admin/dashboard"   className="drop-dn">
          <i className="fas fa-traffic-light"></i>
        Traffic Crime
          </Link></li>
        </ul>
      </li>
    </>
  );
};

export default AdminSide;
