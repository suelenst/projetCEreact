import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';

import ProdutoPagina from './produto/ProdutoPagina';
import Carrinho from './carrinho/Carrinho';
import Home from './home/Home';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

function Principal(props) {
  const { classes } = props;

  return (
     <Router>      
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              Aplicação
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader} />
<List>
        <ListItem button>
          <ListItemIcon>
            <Icon>note_add</Icon>
          </ListItemIcon>
          <ListItemText primary="Produtos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText primary="Carinho" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>


        </Drawer>
        <main className={classes.content}>
        <Route exact path="/" component={Home}/>
        <Route path="/produto" component={ProdutoPagina}/>
        <Route path="/carrinho" component={Carrinho}/>
        </main>
      </div>
    </div>
    </Router>
  );
}

Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Principal);