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
import Dashboard from 'views/Dashboard.js';
import UserProfile from 'views/UserProfile.js';
import TableList from 'views/TableList.js';
import Typography from 'views/Typography.js';
import Maps from 'views/Maps.js';
import Upgrade from 'views/Upgrade.js';

import Vehicule from 'views/Vehicule.js';
import Login from 'views/Login.js';
import Register from 'views/Register.js';

const dashboardRoutes = [
  {
    path: '/maps',
    name: 'Carte',
    icon: 'nc-icon nc-pin-3',
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Carte',
    icon: 'nc-icon nc-pin-3',
    component: Maps,
    layout: '/guest',
  },
  {
    path: '/vehicule',
    name: 'Mon Vehicule',
    icon: 'nc-icon nc-paper-2',
    component: Vehicule,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Mon profil',
    icon: 'nc-icon nc-circle-09',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/dashboard',
    name: 'Statistiques',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Log in',
    icon: 'nc-icon nc-bell-55',
    component: Login,
    layout: '/guest',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'nc-icon nc-bell-55',
    component: Register,
    layout: '/guest',
  },
];

export default dashboardRoutes;
