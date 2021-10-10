import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from 'react-auth-kit';
import { PrivateRoute } from 'react-auth-kit';
import Navbar from './pages/Navbar';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const App = () => {
  return (

    <div>
      <Navbar />
      
      <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}>
      <RecoilRoot>
        <Router>
          <Switch>
            <PrivateRoute
              component={Home}
              path={'/'}
              loginPath={'/login'}
              exact
            />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
        </RecoilRoot>
      </AuthProvider>
    </div>
  );
};

export default App;
