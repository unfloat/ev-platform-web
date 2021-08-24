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
import { useLocation, Route, Switch } from 'react-router-dom';

import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';
import routes from 'routes.js';

import GuestFooter from 'components/Footer/GuestFooter';
import GuestNavbar from 'components/Navbars/GuestNavbar';

import { connect } from 'react-redux';

function Guest({ isAuthenticated }) {
  const [color, setColor] = React.useState('black');
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/guest') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainPanel.current.scrollTop = 0;
  //   if (
  //     window.innerWidth < 993 &&
  //     document.documentElement.className.indexOf('nav-open') !== -1
  //   ) {
  //     document.documentElement.classList.toggle('nav-open');
  //     let element = document.getElementById('bodyClick');
  //     element.parentNode.removeChild(element);
  //   }
  // }, [location]);
  return (
    <>
      <div className='wrapper'>
        <div className='main-panel' style={{ width: '100%' }} ref={mainPanel}>
          <GuestNavbar />
          <div className='content' style={{ marginTop: -20 }}>
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <GuestFooter />
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Guest);
