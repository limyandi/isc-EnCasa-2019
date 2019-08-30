import React, { useGlobal } from 'reactn';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, MenuItem } from '@material-ui/core';
import RegisterView from './RegisterView';
import LoginView from './LoginView';
import { MySwitch } from '../Components';

const renderRoute = [
  {
    path: '/login',
    component: <LoginView />,
    name: 'Login',
    sidebarName: 'Login'
  },
  {
    path: '/register',
    component: <RegisterView />,
    name: 'Register',
    sidebarName: 'Register'
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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

function Routes(props) {
  const classes = useStyles();

  const [user, setUser] = useGlobal('user');

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

  return (
    <div>
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
        <div className={classes.toolbar}>{user.email}</div>
        <Divider />
        <List>
          <ListItem button key="SwitchMode">
            <MySwitch
              label={user.role}
              onChange={switchUserMode}
              visible={userHasDriverRole}
            />
          </ListItem>
          {renderRoute.map(route => (
            <Link to={route.path} key={route.name}>
              <MenuItem selected={activeRoute(route.path)}>
                {/* <ListItemIcon>
                  <prop.icon />
                </ListItemIcon> */}
                <ListItemText primary={route.sidebarName} />
              </MenuItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default withRouter(Routes);
