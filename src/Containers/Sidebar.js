import React, { useGlobal } from 'reactn';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText, MenuItem } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import SettingIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
// import RegisterView from './RegisterView';
// import LoginView from './LoginView';
import { MySwitch } from '../Components';
import DriverSetting from './DriverView/settings';

const renderRoute = [
  {
    path: user => '/',
    main: user =>
      user.role === 'Customer' ? (
        <Redirect to="/customer" />
      ) : (
        <Redirect to="/driver" />
      ),
    name: 'Home',
    sidebarName: 'Home',
    icon: <HomeIcon />
  },
  {
    path: user => `/${user.role}/setting`,
    component: user => (user.role === 'Driver' ? <DriverSetting /> : null),
    name: 'Setting',
    sidebarName: 'Setting',
    icon: <SettingIcon />
  }
];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: {
    fontSize: 16,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

function Routes(props) {
  const classes = useStyles();

  const [user, setUser] = useGlobal('user');
  const [isAuthenticated, setIsAuthenticated] = useGlobal('isAuthenticated');

  const userHasDriverRole = user.driverDetails !== undefined;

  const activeRoute = routeName => {
    return props.location.pathname.indexOf(routeName) > -1;
  };

  const switchUserMode = () => {
    if (user.role === 'Customer') {
      setUser({ ...user, role: 'Driver' });
      props.history.push('/driver');
    } else {
      setUser({ ...user, role: 'Customer' });
      props.history.push('/customer');
    }
  };

  const Sidebar = () => (
    <div className={classes}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Community Logistics
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div style={{ marginTop: 10 }} className={classes.toolbar}>
          {user.name}
        </div>
        <Divider />
        <List>
          <MenuItem button key="SwitchMode">
            <MySwitch
              checked={user.role !== 'Customer'}
              label={`${user.role} view`}
              onChange={switchUserMode}
              visible={userHasDriverRole}
            />
          </MenuItem>
          {renderRoute.map(route => (
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={route.path(user)}
              key={route.name}
            >
              <MenuItem selected={activeRoute(route.path(user))}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.sidebarName} />
              </MenuItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <MenuItem
            button
            key="logout"
            onClick={() => setIsAuthenticated(false)}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );

  return <div>{isAuthenticated && <Sidebar />}</div>;
}

export default withRouter(Routes);
