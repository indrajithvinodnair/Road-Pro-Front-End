// for admin
import DashPage from '../pages/dashboard/DashPage';
import UserManagement from '../pages/dashboard/UserManagement/UserManagement';
import VechicleManagement from '../pages/dashboard/VehicleManagement/VechicleManagement';
import LicenceManagement from '../pages/dashboard/LicenceManagement/LicenceManagement';
import CivilCrime from '../pages/dashboard/CrimeManagement/CivilCrime';

// for civilan
import UDashPage from "../pages/User/dashboard/DashPage";
import Viewvehicles from "../pages/User/dashboard/Viewvehicles"

// for rtos
import RDashPage from '../pages/RTO/dashboard/DashPage.jsx';

// for traffic police
import TDashPage from "../pages/Traffic/dashboard/DashPage";
import Managecrimes from '../pages/Traffic/dashboard/Managecrimes';
import Logcrime from '../pages/Traffic/dashboard/Logcrime';

// for civil police officer
import CDashPage from '../pages/CivilPolice/dashboard/DashPage';
import VehicleTheft from '../pages/CivilPolice/dashboard/VehicleTheft/VehicleTheft';
import VehicleAccident from '../pages/CivilPolice/dashboard/VehicleAccident/VehicleAccident';


// configured routes for admin user
export const admin_routes = [
    {name:'Admin', path: '/admin', exact: true},
    {name:'Dashboard' , path : '/admin/dashboard' , exact: true, component: DashPage},
    {name:'UserManagement' , path : '/admin/usermanagement' , exact: true, component: UserManagement},
    {name:'VehicleManagement' , path : '/admin/vehiclemanagement' , exact: true, component: VechicleManagement},
    {name:'LicenceManagement' , path : '/admin/licencemanagement' , exact: true, component: LicenceManagement},
    {name:'CrimeManagement' , path : '/admin/crimemanagement/civilcrime' , exact: true, component: CivilCrime},
    
]




// configured routes for user
export const user_routes = [
    {name:'User',path: '/user', exact: true},
    {name:'Dashboard',path:'/user/dashboard', exact:true, component: UDashPage},
    {name:'Viewvehicles',path:'/user/viewvehicles', exact: true, component:Viewvehicles},
]


// configured routes for rto
export const rto_routes = [
    {name:'Rto',path: '/rto', exact: true},
    {name:'Dashboard',path:'/rto/dashboard', exact:true, component: RDashPage},
]

// configured routes traffic
export const traffic_routes = [
    {name:'Traffic',path: '/traffic', exact: true},
    {name:'Dashboard',path:'/traffic/dashboard', exact:true, component: TDashPage},
    {name:'Managecrimes' , path :'/traffic/managecrimes', exact: true, component:Managecrimes},
    {name:'Logcase',path:'/traffic/logcase', exact: true, component:Logcrime},
]

// configured routes civl police
export const police_routes = [
    {name:'Civil',path: '/civil', exact: true},
    {name:'Dashboard',path:'/civil/dashboard', exact:true, component: CDashPage},
    {name:'VehicleTheft',path:'/civil/vehicletheft', exact:true, component: VehicleTheft},
    {name:'VehicleAccident',path:'/civil/vehicleaccident',exact:true, component: VehicleAccident},
]