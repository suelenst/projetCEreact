import React from "react";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {withStyles} from "material-ui";
import Card from "../../node_modules/material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import CardActions from "material-ui/es/Card/CardActions";
import Typography from "material-ui/es/Typography/Typography";
import PropTypes from 'prop-types';
import Select from "material-ui/es/Select/Select";
import MenuItem from "material-ui/es/Menu/MenuItem";
import Input from "material-ui/es/Input/Input";
import InputLabel from "material-ui/es/Input/InputLabel";
import ProjetoServico from "./ProjetoServico";
import {Redirect} from "react-router-dom";


const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        color: theme.palette.text.primary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    date: {
        color: theme.palette.text.secondary,
    },
    link: {
        textDecoration: 'none',
    },
    textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
});

class ProjetoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sucesso: "",
            projeto: this.props.projeto,
        };
        this.projetoServico = new ProjetoServico("/api/projetos");
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({projeto: proximoEstado.projeto});
    }

    setValor(campo, valor) {
        this.setState(
            (anterior) => {
                anterior.projeto[campo] = valor;
                return anterior;
            }
        );
    }

    limparObjeto() {
        this.setState({
            projeto: {
                nome: "",
                resumo: "",
                descricao: "",
            }
        })
    }

    confirmar() {
        let projeto = this.state.projeto;

        if (projeto.nome) {
            if (projeto.resumo) {
                if (projeto.descricao) {
                    if (projeto.id) {
                        this.projetoServico.editar(projeto.id, projeto,
                            (item) => {
                                alert("Projeto alterado com sucesso!");
                                this.setState({sucesso: <Redirect to="/meusProjetos"/>});
                            },
                            (erro) => {
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                    } else {
                        this.setValor("coordenadorProjeto", this.props.usuario);
                        this.setValor("dataInicio", "2017-12-14");
                        this.projetoServico.inserir(projeto,
                            (item) => {
                                alert("Projeto cadastrado com sucesso!");
                                this.limparObjeto();
                                this.setState({sucesso: <Redirect to="/projetos"/>})
                            },
                            (erro) => {
                                console.log("Erro!");
                                console.log(erro);
                            }
                        );
                    }
                } else {
                    alert("Campo descricao é obrigatório!");
                }
            } else {
                alert("Campo resumo é obrigatório!");
            }
        } else {
            alert("Preencha todos os campos!");
        }
    }

    render() {
        const {classes} = this.props;

        if (this.state.sucesso)
            return this.state.sucesso;
        else
            return <div>
                <div>
                    <Typography type="headline" component="h2">Novo projeto</Typography>
                    <br/>
                    <Card>
                        <CardContent>

                            <form onSubmit={(event) => {
                                event.preventDefault();
                                this.confirmar()
                            }}>

                                <Typography className={classes.title}>Nome</Typography>
                                <TextField
                                    value={this.state.projeto.nome}
                                    onChange={(e) => this.setValor("nome", e.target.value)}
                                    style={{width: "100%"}}
                                    type="text"
                                    margin="normal" required focused
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.textFieldInput,
                                        },
                                    }}
                                />
                                <br/><br/>

                                <Typography className={classes.title}>Resumo</Typography>
                                <TextField
                                    value={this.state.projeto.resumo}
                                    onChange={(e) => this.setValor("resumo", e.target.value)}
                                    style={{width: "100%"}}
                                    type="text"
                                    margin="normal" required focused
                                    multiline={true}
                                    rows="5"
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.textFieldInput,
                                        },
                                    }}
                                />
                                <br/><br/>

                                <Typography className={classes.title}>Descrição</Typography>
                                <TextField
                                    value={this.state.projeto.descricao}
                                    onChange={(e) => this.setValor("descricao", e.target.value)}
                                    style={{width: "100%"}}
                                    type="text"
                                    margin="normal" required focused
                                    multiline={true}
                                    rows="12"
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.textFieldInput,
                                        },
                                    }}
                                />
                                <br/>

                                <div style={{
                                    visibility: this.state.texto ? "" : "hidden",
                                    width: "100%",
                                    textAlign: "center"
                                }}>

                                    <Typography color="error">{this.state.texto} <br/> </Typography></div>
                                <br/>

                            </form>

                        </CardContent>
                        <CardActions>
                            <Button onClick={() => {
                                this.confirmar()
                            }} style={{backgroundColor: '#51B0FF', color: '#FFFFFF'}}>
                                Confirmar
                            </Button>
                        </CardActions>
                    </Card>
                    <br/>
                </div>
            </div>;

    }
}

ProjetoItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoItem);