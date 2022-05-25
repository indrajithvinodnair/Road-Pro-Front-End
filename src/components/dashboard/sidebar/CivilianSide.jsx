import React from 'react'
import {Link} from 'react-router-dom'

const AdminSide = () => {
    return (
        <>
         <li>
            <Link id="a" to="/user/Viewvehicles">
            <i className="fas fa-users"></i>
              View vehicles owned
            </Link>
          </li>
          <li>
            <Link id="a" to="/user/dashboard">
            <i className="fas fa-car"></i>
            Fines and penalities
            </Link>
          </li>
          <li>
            <Link id="a" to="/user/dashboard">
           <i className="fas fa-id-badge"></i>
          Apply for services
            </Link>
          </li>
      </>
    )
}

export default AdminSide
