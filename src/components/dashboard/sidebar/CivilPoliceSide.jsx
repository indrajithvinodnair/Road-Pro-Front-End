import React from 'react'
import {Link} from 'react-router-dom'

const AdminSide = () => {
    return (
        <>
         <li>
            <Link id="a" to="/civil/vehicletheft">
            <i className="fas fa-car"></i>
             Motor Vehicle Theft
            </Link>
          </li>
          <li>
            <Link id="a" to="/civil/vehicleaccident">
            <i class="fas fa-car-crash"></i>
            Motor Vehicle Accident
            </Link>
          </li>
      </>
    )
}

export default AdminSide
