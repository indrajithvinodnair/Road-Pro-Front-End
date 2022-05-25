import React from 'react'
import {Link} from 'react-router-dom'

const AdminSide = () => {
    return (
        <>
         <li>
            <Link id="a" to="/traffic/managecrimes">
            <i className="fas fa-users"></i>
              Manage Crimes and Penalities
            </Link>
          </li>
          <li>
            <Link id="a" to="/traffic/logcase">
            <i className="fas fa-car"></i>
            Log traffic infraction
            </Link>
          </li>
      </>
    )
}

export default AdminSide
