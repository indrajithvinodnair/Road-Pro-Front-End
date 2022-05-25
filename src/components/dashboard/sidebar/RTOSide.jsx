import React from 'react'
import {Link} from 'react-router-dom'

const AdminSide = () => {
    return (
        <>
         <li>
            <Link id="a" to="/rto/dashboard">
            <i className="fas fa-users"></i>
              RTO link 1
            </Link>
          </li>
          <li>
            <Link id="a" to="/rto/dashboard">
            <i className="fas fa-car"></i>
            RTO link 2
            </Link>
          </li>
          <li>
            <Link id="a" to="/rto/dashboard">
           <i className="fas fa-id-badge"></i>
           RTO link 3
            </Link>
          </li>
      </>
    )
}

export default AdminSide
