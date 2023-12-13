import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/home/Home";
import Topbar from "./Components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SinglePost from "./Components/singlePost/SinglePost";
import { useContext } from "react";
import { Context } from "./Context/Context";

const App = () => {
  const {user} = useContext(Context)
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact  path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home/> : <Register />}</Route>
        <Route path="/login">{user ? <Home/> : <Login />}</Route>
        <Route path="/write">{user ? <Write/> : <Register  />}</Route>
        <Route path="/settings">{user ? <Settings/> : <Register  />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;