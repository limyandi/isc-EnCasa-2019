import React, { useGlobal } from 'reactn';
import { Link, withRouter, Redirect, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import {
  ListItemText,
  MenuItem,
  IconButton,
  useTheme,
  Hidden
} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import SettingIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import { Add as AddIcon, Schedule as ScheduleIcon } from '@material-ui/icons';
// import RegisterView from './RegisterView';
// import LoginView from './LoginView';
import { MySwitch } from '../Components';
import DriverSetting from './DriverView/settings';
import CustomerSetting from './CustomerView/settings';
import JobsList from './DriverView/jobsList';
import JobsHistory from './DriverView/JobsHistory';
import DeliveryPickupHistory from './CustomerView/DeliveryPickupHistory';
import AcceptedDeliveryPickupRequestView from './CustomerView/AcceptedDeliveryPickupRequestView';

const customerOnlyRoute = {
  path: () => '/Customer/acceptedRequest',
  main: () => <AcceptedDeliveryPickupRequestView />,
  name: 'Ongoing Request',
  sidebarName: 'Accepted Request',
  icon: <ScheduleIcon />
};

const driverOnlyRoute = {
  path: () => '/Driver/jobs',
  main: () => <JobsList />,
  name: 'Jobs',
  sidebarName: 'Jobs',
  icon: <AddIcon />
};

const renderRoute = user => {
  // console.log(...[...driverOnlyRoute]);
  return [
    {
      path: () => (user.role === 'Customer' ? '/customer' : '/driver'),
      main: () =>
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
      ...(user.role === 'Driver'
        ? {
            ...driverOnlyRoute
          }
        : { ...customerOnlyRoute })
    },
    {
      path: () => `/${user.role}/history`,
      component: () =>
        user.role === 'Driver' ? <JobsHistory /> : <DeliveryPickupHistory />,
      name: 'History',
      sidebarName: 'History',
      icon: <HistoryIcon />
    },
    {
      path: () => `/${user.role}/setting`,
      component: () =>
        user.role === 'Driver' ? <DriverSetting /> : <CustomerSetting />,
      name: 'Setting',
      sidebarName: 'Setting',
      icon: <SettingIcon />
    }
  ];
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#3F51B5',
    color: 'white'
  },
  toolbar: {
    fontSize: 16,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: 'white'
  },
  listItemIcon: {
    color: 'white'
  }
}));

function Routes(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [user, setUser] = useGlobal('user');
  const [isAuthenticated, setIsAuthenticated] = useGlobal('isAuthenticated');

  const userHasDriverRole = user.driverDetails !== undefined;

  const activeRoute = routeName => {
    return props.location.pathname.indexOf(routeName) > -1;
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

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
    <div>
      <div
        style={{ margin: 10, textAlign: 'center' }}
        className={classes.toolbar}
      >
        <div>{user.name}</div>
        <div>{user.email}</div>
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
        {renderRoute(user).map(
          route =>
            Object.keys(route).length !== 0 &&
            route.constructor === Object && (
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={route.path()}
                key={route.name}
              >
                <MenuItem selected={activeRoute(route.path())}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.sidebarName} />
                </MenuItem>
              </Link>
            )
        )}
        <Divider />
      </List>
      <List>
        <MenuItem button key="logout" onClick={() => setIsAuthenticated(false)}>
          <ListItemIcon className={classes.listItemIcon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </List>
    </div>
  );

  const Main = () => (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="logistics sidebar">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <Sidebar />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );

  return <div>{isAuthenticated && <Main />}</div>;
}

export default withRouter(Routes);
