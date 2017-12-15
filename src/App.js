/* eslint-disable flowtype/require-valid-file-annotation */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';
import AreaPagina from './area/AreaPagina';
import PessoaPagina from './pessoa/PessoaPagina';
import Home from './home/Home';
import Login from "./login/Login";
import servicoLogin from "./login/ServicoLogin";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ProjetoPagina from "./projeto/ProjetoPagina";
import Divider from "material-ui/es/Divider";
import ProjetoDetalhe from "./projeto/ProjetoDetalhe";
import ProjetoItem from "./projeto/ProjetoItem";
import Redirect from "react-router-dom/es/Redirect";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        zIndex: 1,
        overflow: 'auto',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',

    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        background: '#51B0FF',
    },


    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {

        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    avatar: {
        color: '#51B0FF',
        backgroundColor: '#ffffff',
        marginLeft: -12,
        marginRight: 20,

    },
    typography: {
        color: '#ffffff',
        fontSize: '200%',
        flex: 1,
    },
    link: {
        textDecoration: 'none',

    },
    h1: {
        color: '#ffffff',
        fontSize: '70%',
    },

    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },


});

// Cores: BFD5E7, 51B0FF

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            logado: servicoLogin.logado(),
            mobileOpen: false,
            open: true,
            projeto: {
                nome: "",
                resumo: "",
                descricao: "",
            },
            projetoVazio: {
                nome: "",
                resumo: "",
                descricao: "",
            },
        };
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };


    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    setProjeto(projeto) {
        this.setState({projeto: projeto});
    }

    render() {
        const {classes, theme} = this.props;

        let isAdmin = servicoLogin.logado().tipo === "administrador";
        const id = servicoLogin.logado().id;
        const usuario = servicoLogin.logado();
        let drawer = null;
        let avatar = null;

        const adminDrawer = (
            <div>
                <List className={classes.list}>
                    <Link to="area" className={classes.link}>
                        <ListItem button>

                            <ListItemIcon>
                                <Icon>bubble_chart</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Áreas de Interesse"/>

                        </ListItem>
                    </Link>

                    <Link to="pessoa" className={classes.link}>
                        <ListItem button>

                            <ListItemIcon>
                                <Icon>people</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Pessoas"/>

                        </ListItem>

                    </Link>

                </List>
            </div>
        );
        const userDrawer = (
            <div>
                <List className={classes.list}>
                    <Link to="projetos" className={classes.link}>
                        <ListItem button>

                            <ListItemIcon>
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>

                        </ListItem>
                    </Link>
                    <Divider/>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <Icon>folder</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Projetos"/>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse component="li" in={this.state.open} transitionDuration="auto" unmountOnExit>
                        <List disablePadding>
                            <Link to="meusProjetos" className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Icon>folder_shared</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Meus Projetos"/>
                                </ListItem>
                            </Link>

                            <Link to="novoProjeto" className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Icon>create_new_folder</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Criar Novo Projeto"/>
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                </List>
            </div>
        );

        const visitDrawer = (
            <div>
                <List className={classes.list}>
                </List>
            </div>
        );

        const avatarUser = (
            <Link to="/" className={classes.link}>
                <Avatar src={"/api/pessoas/" + id + "/foto?" + servicoLogin.getAuthorizationGet() }
                        className={classes.avatar}>


                </Avatar>

            </Link>
        );

        const avatarVisit = (
            <Link to="/login" className={classes.link}>
                <Avatar className={classes.avatar}>
                    <Icon>person </Icon>
                </Avatar>
            </Link>
        );

        if (this.state.logado) {
            avatar = avatarUser;

            if (isAdmin) {
                drawer = adminDrawer;
            } else {
                drawer = userDrawer;
            }
        } else {
            drawer = visitDrawer;
            avatar = avatarVisit;
        }

        return (
            <Router>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="contrast"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Typography className={classes.typography} component="h1">
                                    <Link to="/" className={classes.link}>
                                        <h1 className={classes.h1}>ProjetCE</h1>
                                    </Link>
                                </Typography>
                                {avatar}
                            </Toolbar>

                        </AppBar>
                        <Hidden mdUp>
                            <Drawer
                                type="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={this.state.mobileOpen}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                onRequestClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden mdDown implementation="css">
                            <Drawer
                                type="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <main className={classes.content}>
                            <Route exact path="/" component={Home}/>
                            <Route path="/area" component={AreaPagina}/>
                            <Route path="/pessoa" component={PessoaPagina}/>

                            <Route path="/projetos"
                                   render={() => <ProjetoPagina
                                       id=""
                                       setProjeto={(projeto) => {
                                           this.setProjeto(projeto)
                                       }}/>}/>

                            <Route path="/meusProjetos"
                                   render={() => <ProjetoPagina
                                       id={"/coordenador/" + id}
                                       setProjeto={(projeto) => {
                                           this.setProjeto(projeto)
                                       }}/>}/>

                            <Route path="/login" render={() => this.state.logado ? <Redirect to="/projetos"/>
                                : <Login onLogin={() => this.setState({logado: true})}/>}/>

                            <Route path="/maisDetalhes"
                                   render={() => <ProjetoDetalhe
                                       id={id} projeto={this.state.projeto}
                                       setProjeto={(projeto) => {
                                           this.setProjeto(projeto)
                                       }}/>}/>

                            <Route path="/novoProjeto" render={() => <ProjetoItem id={id} usuario={usuario} projeto={this.state.projetoVazio}/>}/>
                            <Route path="/editarProjeto" render={() => <ProjetoItem projeto={this.state.projeto}/>}/>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);