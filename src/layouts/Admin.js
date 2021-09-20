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

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import routes from 'routes.js';

import sidebarImage from 'assets/img/ev-sidebar.jpg';

import { connect } from 'react-redux';

function Admin({ isAuthenticated, user }) {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState('black');
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      console.log('sidebar', user.role);
      if (prop.layout === '/admin' && prop.role === user.role.toLowerCase()) {
        // console.log(prop.layout);
        // const layout = prop.layout.concat(
        //   '/',
        //   user.role.toString().toLowerCase()
        // );
        // console.log(layout + prop.path);

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

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      let element = document.getElementById('bodyClick');
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className='wrapper'>
        <Sidebar
          color={color}
          image={hasImage ? image : ''}
          routes={routes}
          role={user.role}
        />
        <div className='main-panel' ref={mainPanel}>
          <AdminNavbar />
          <div className='content'>
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps)(Admin);
