import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import {Redirect} from 'react-router';
import Switch from 'material-ui/Switch';
import {FormControlLabel, FormGroup} from 'material-ui/Form';
import servicoLogin from "./ServicoLogin";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avisoLogin: "",
            login: {
                usuario: "",
                senha: ""
            }
        };
    }

    setValor(atributo, valor) {

        this.setState(
            (estado) => estado.login[atributo] = valor
        );
    }

    login() {
        this.setState({texto: ""});

        servicoLogin.login(
            this.state.login.usuario,
            this.state.login.senha,
            (sucesso) => {
                this.props.onLogin();
            },
            (erro) => {
                console.log(erro);
                this.setState({
                    avisoLogin: erro.message
                });
            }
        );

    }

    render() {
        return (
            <div style={{boxSizing: "border-box", width: "99vw", height: "99vh"}}>
                <Grid container alignItems="center"
                      justify="center" style={{height: "100%"}}>


                    <Grid item xs={12} sm={8} md={4} lg={3} alignItems="center">
                        <Paper style={{padding: "15px"}}>

                            <AppBar position="static" color="primary">
                                <Toolbar style={{backgroundColor: '#51B0FF', color: '#FFFFFF'}}>
                                    Login
                                </Toolbar>
                            </AppBar>

                            <form onSubmit={(event) => {
                                event.preventDefault();
                                this.login()
                            }}>
                                <TextField
                                    value={this.state.login.usuario}
                                    onChange={(e) => this.setValor("usuario", e.target.value)}
                                    style={{width: "100%"}}
                                    label="Nome"
                                    type="text"
                                    margin="normal" required focused
                                />
                                <br/><br/>
                                <TextField
                                    value={this.state.login.senha}
                                    onChange={(e) => this.setValor("senha", e.target.value)}
                                    style={{width: "100%"}}
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal" required
                                />
                                <br/>
                                <br/>

                                <div style={{
                                    visibility: this.state.avisoLogin ? "" : "hidden",
                                    width: "100%",
                                    textAlign: "center"
                                }}>

                                    <Typography color="error">{this.state.avisoLogin} <br/> </Typography></div>
                                <br/>
                                <Button
                                    type="submit"
                                    style={{width: "100%", backgroundColor: '#51B0FF', color: '#FFFFFF'}}
                                    raised
                                    color="primary">
                                    Confirmar
                                </Button>
                                <br/><br/>
                                <Button style={{width: "100%"}} raised color="accent">Cadastrar</Button>
                            </form>
                        </Paper>
                    </Grid></Grid>
            </div>
        );
    }
}