import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import HomeIcon from '@material-ui/icons/Home';

// import routes from '../../routes.js';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button 
                  key={"somekey1"}
                  component={NavLink}
                  to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Inicio"} />
        </ListItem>
        <ListItem button 
                  key={"somekey4"}
                  component={NavLink}
                  to="/services">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={"Servicios"} />
        </ListItem>
        <ListItem button 
                  key={"somekey3"}
                  component={NavLink}
                  to="api/qrcodes">
            <ListItemIcon>
              <BlurOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Códigos QR"} />
        </ListItem>
        <ListItem button 
                  key={"somekey2"}
                  component={NavLink}
                  to="/otp">
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Ingresa"} />
        </ListItem>


      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  var drawerPosOpts = ['left', 'right', 'top', 'bottom'];
  var opt = drawerPosOpts[0]
  return (
    <div>
      <React.Fragment key={opt}>
        <Drawer anchor={opt} open={props.showDrawer} onClose={props.closeCallBack(false)}>
          {list(opt)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
