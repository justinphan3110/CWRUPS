import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';

import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import OrderContent from './OrderContent'
import OrderNonTransitContent from './OrderNonTransitContent'
import CustomerContent from './CustomerContent'
import CustomerSingleTypeContent from './CustomerSingleTypeContent'
import AddressContent from './AddressContent';
import DistributionCenterContent from './DistributionCenterContent';
import TransitAssetContent from './TransitAssetContent'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
});

class Header extends Component {
  constructor(props) {
    super(props)
    const { classes, onDrawerToggle } = this.props;
    this.state = {
      classes,
      onDrawerToggle,
      section: 0
    }
  }

  pageContent() {
    const { section } = this.state;
    switch (section) {
      case 0:
        return <OrderContent />
      case 1:
        return <OrderNonTransitContent />
      case 2:
        return <CustomerContent />
      case 3:
        return <CustomerSingleTypeContent />
      case 4:
        return <AddressContent />
      case 5:
        return <DistributionCenterContent />
      case 6:
        return <TransitAssetContent />
      default:
        return <OrderContent />  
    }
  }
  render() {
    const { classes, onDrawerToggle } = this.state;
    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item xs />
              <Grid item>
                <Link className={classes.link} href="#" variant="body2">
                  Go to docs
              </Link>
              </Grid>
              <Grid item>
                <Tooltip title="Alerts • No alerts">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <IconButton color="inherit" className={classes.iconButtonAvatar}>
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  Database
              </Typography>
              </Grid>
              <Grid item>
                <Button className={classes.button} variant="outlined" color="inherit" size="small">
                  Web setup
              </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs onChange={(event, newValue) => {
            this.setState({
              section: newValue
            })
          }}
            value={this.state.section} textColor="inherit">
            <Tab textColor="inherit" label="All Orders" />
            <Tab textColor="inherit" label="Orders Awaiting Pickup" />
            <Tab textColor="inherit" label="Customer" />
            <Tab textColor="inherit" label="Customers who Order Only 1 Parcel Type" />
            <Tab textColor="inherit" label="Address" />
            <Tab textColor="inherit" label="Distribution Center"/>
            <Tab textColor="inherit" label="Transit Asset"/>
          </Tabs>
          <main className={classes.main}>
            {this.pageContent()}
          </main>
        </AppBar>
      </React.Fragment>
    );
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);