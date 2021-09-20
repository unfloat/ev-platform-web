/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AdminLayout from 'layouts/Admin';
import GuestLayout from 'layouts/Guest';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* <Route path='/login' render={props => <Login {...props} />} /> */}
          <Route exact path='/'>
            <Redirect to='/guest/carte' />
          </Route>
          <Route path='/guest' render={props => <GuestLayout {...props} />} />

          <PrivateRoute
            path='/admin'
            render={props => <AdminLayout {...props} />}
          />
          {/* <Route path='/register' render={props => <Register {...props} />} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
