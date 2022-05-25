import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";


// importing custom components
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import RegisterUser from './pages/RegisterUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/RestPassword';

//import routes 
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';
import UserRoutes from './routes/UserRoutes';
import RtoRoutes from './routes/RtoRoutes';
import TrafficRoutes from './routes/TrafficRoutes';
import PoliceRoutes from './routes/PoliceRoutes';

// api handler of AJAX
import axios from "axios";

// setting up baseurl
axios.defaults.baseURL = "http://localhost:8000/";
// setting content type and accept type
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
// authenticating cors for generation of csrf tokens
axios.defaults.withCredentials = true;
// setting authorization bearer token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/403" component={PageNotFound}/>
          <Route exact path="/404" component={PageNotFound}/>

          {/* conditional rendering */}
          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <RegisterUser />
            )}
          </Route>

          <Route path="/forgot-password">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <ForgotPassword />
            )}
          </Route>

          <Route path="/reset-password/:id/:token">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <ResetPassword />
            )}
          </Route>

          <AdminPrivateRoutes path="/admin" name="Admin" />
          <UserRoutes path="/user" name="User"/>
          <RtoRoutes  path="/rto" name="Rto" />
          <TrafficRoutes path="/traffic" name="Traffic" />
          <PoliceRoutes path="/civil" name="Civil" />
       
          <Route path="" component={PageNotFound} />
          <Route path="*" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
