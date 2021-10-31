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
import Maps from 'views/Maps.js';
import MapsGuest from 'views/MapsGuest.js';
import Bornes from 'views/cpo/Bornes.js';

import Vehicule from 'views/Vehicule.js';
import Login from 'views/Login.js';
import Register from 'views/Register.js';
import Borne from 'views/Borne.js';
import TableList from 'views/TableList';
import Typography from 'views/Typography';
import Upgrade from 'views/Upgrade';

const dashboardRoutes = [
  {
    path: '/carte',
    name: 'Carte',
    icon: 'nc-icon nc-pin-3',
    component: Maps,
    layout: '/admin',
    role: 'msp',
  },
  {
    path: '/carte',
    name: 'Carte',
    icon: 'nc-icon nc-pin-3',
    component: MapsGuest,
    layout: '/guest',
  },
  {
    path: '/vehicule',
    name: 'Mon Vehicule',
    icon: 'nc-icon nc-paper-2',
    component: Vehicule,
    layout: '/admin',
    role: 'msp',
  },
  {
    path: '/carte',
    name: 'Carte',
    icon: 'nc-icon nc-paper-2',
    component: Bornes,
    layout: '/admin',
    role: 'cpo',
  },
  {
    path: '/bornes',
    name: 'Mes bornes',
    icon: 'nc-icon nc-paper-2',
    component: Borne,
    layout: '/admin',
    role: 'cpo',
  },
  {
    path: '/user',
    name: 'Mon profil',
    icon: 'nc-icon nc-circle-09',
    component: UserProfile,
    layout: '/admin',
    role: 'cpo',
  },
  {
    path: '/user',
    name: 'Mon profil',
    icon: 'nc-icon nc-circle-09',
    component: UserProfile,
    layout: '/admin',
    role: 'msp',
  },
  {
    path: '/reserver',
    name: 'Reserver',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/dashboard',
    name: 'Statistiques',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
    role: 'cpo',
  },
  {
    path: '/re',
    name: 'Sessions',
    icon: 'nc-icon nc-chart-pie-35',
    component: TableList,
    layout: '/admin',
    role: 'msp',
  },
  // {
  //   path: '/table',
  //   name: 'TableList',
  //   icon: 'nc-icon nc-chart-pie-35',
  //   component: TableList,
  //   layout: '/admin',
  //   role: 'cpo',
  // },
  // {
  //   path: '/typo',
  //   name: 'TableList',
  //   icon: 'nc-icon nc-chart-pie-35',
  //   component: Typography,
  //   layout: '/admin',
  //   role: 'cpo',
  // },
  // {
  //   path: '/up',
  //   name: 'TableList',
  //   icon: 'nc-icon nc-chart-pie-35',
  //   component: Upgrade,
  //   layout: '/admin',
  //   role: 'cpo',
  // },
  {
    path: '/login',
    name: 'Connexion',
    icon: 'nc-icon nc-bell-55',
    component: Login,
    layout: '/guest',
  },
  {
    path: '/register',
    name: 'Inscription',
    icon: 'nc-icon nc-bell-55',
    component: Register,
    layout: '/guest',
  },
];

export default dashboardRoutes;
