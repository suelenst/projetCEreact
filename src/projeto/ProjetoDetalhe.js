import React from "react";
import Card from "../../node_modules/material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import CardActions from "material-ui/es/Card/CardActions";
import Button from "material-ui/es/Button/Button";
import Typography from "material-ui/es/Typography/Typography";
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import servicoLogin from "../login/ServicoLogin";
import ProjetoServico from "./ProjetoServico";
import {Link} from "react-router-dom";

import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from 'material-ui/Table';


import Redirect from "react-router-dom/es/Redirect";

import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    tagAreas: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    button: {
        background: '#51B0FF',
        color: '#ffffff',
    },
    avatar: {
        color: '#51B0FF',
        backgroundColor: '#ffffff',
        marginLeft: -12,
        marginRight: 20,
    },
    img: {
        width: "300px",
    }
});

class ProjetoDetalhe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sucesso: ""
        };
        this.projetoServico = new ProjetoServico("/api/projetos");
        this.setProjeto(this.props.projeto);
    }

    setProjeto(projeto) {
        this.setState({projeto: projeto});
    }

    apagar() {
        this.projetoServico.apagar(this.props.projeto.id,
            () => {
                alert("Apagado com sucesso!!!");
                this.setState({sucesso: <Redirect to="/meusProjetos"/>})
            },
            (erro) => console.log(erro));
    }

    editar() {
        this.props.setProjeto(this.props.projeto);
        console.log(this.props.projeto);
        this.setState({sucesso: <Redirect to="/editarProjeto"/>})
    }

    render() {
        const {classes} = this.props;
        const projeto = this.props.projeto;
        const idUsuario = this.props.id;
        let participar = null;
        let solicitantes = null;
        let botoes = null;

        function reformatDate(dateStr) {
            var dArr = dateStr.split("-");  // ex input "2010-01-18"
            return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/10"
        }

        // ja tem o id do usuario autenticado, falta comparar com os do projeto para saber se e integrante ou coordenador
        function pedidoPart(arr, idu) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === idu) {
                    return true;
                }
            }
            return false;
        }

        if (this.state.sucesso)
            return this.state.sucesso;
        else if (!projeto) {
            return <div>Projeto não encontrado.<br/><br/><br/></div>;
        } else {
            if (projeto.coordenadorProjeto.id === idUsuario) {
                botoes =
                    <div>
                        <Button onClick={() => {
                            this.editar()
                        }} style={{backgroundColor: '#51B0FF', color: '#FFFFFF', marginRight: 10}}>
                            Editar
                        </Button>

                        <Button onClick={() => {
                            this.apagar()
                        }} style={{backgroundColor: '#51B0FF', color: '#FFFFFF'}}>
                            Apagar
                        </Button>
                    </div>;
                solicitantes =
                    <div>
                        <Typography className={classes.title}>Solicitantes do Projeto</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projeto.solicitantesProjeto.map((solicitantes) => {
                                    return <TableRow hover="true" key={solicitantes.id}>
                                        <TableCell>
                                            {solicitantes.nome}
                                        </TableCell>

                                        <TableCell>
                                            <Button className={classes.button} onClick={(event) => {
                                                event.preventDefault();
                                                this.projetoServico.aceitarPart(projeto.id, solicitantes.id);
                                            }}>
                                                Aceitar
                                            </Button>
                                        </TableCell>

                                        <TableCell>
                                            <Button className={classes.button} onClick={(event) => {
                                                event.preventDefault();
                                                this.projetoServico.negarPart(projeto.id, solicitantes.id);
                                            }}>
                                                Negar
                                            </Button>
                                        </TableCell>
                                    </TableRow>;
                                })}
                            </TableBody>
                            <TableFooter>
                            </TableFooter>
                        </Table>
                    </div>
            } else {
                if (!pedidoPart(projeto.solicitantesProjeto, idUsuario) &&
                    !pedidoPart(projeto.integrantesProjeto, idUsuario)) {
                    participar =
                        <div>
                            <br/>
                            <Button className={classes.button} onClick={(event) => {
                                event.preventDefault();
                                this.projetoServico.solicitarPart(projeto.id, idUsuario);
                            }}>
                                Solicitar Participação
                            </Button>
                            <br/><br/><br/>
                        </div>
                }
            }

            return <div>
                <div>
                    <Card>
                        <CardContent>
                            <Typography className={classes.tagAreas}>{projeto.area.nome}</Typography>

                            <br/>
                            <Typography type="headline" component="h2">
                                {projeto.nome}
                            </Typography>
                            <br/>

                            <Typography className={classes.pos}>{reformatDate(projeto.dataInicio)}</Typography>
                            {participar}

                            <Typography className={classes.title}>Coordenador</Typography>
                            <Tooltip title={projeto.coordenadorProjeto.nome}>
                                <Avatar
                                    src={"/api/pessoas/" + projeto.coordenadorProjeto.id + "/foto?" + servicoLogin.getAuthorizationGet() }
                                    className={classes.avatar}>
                                </Avatar>
                            </Tooltip>

                            <br/>
                            <Typography className={classes.title}>Integrantes do Projeto</Typography>
                            {projeto.integrantesProjeto.map((integrantes) => {
                                return <div>
                                    <Tooltip title={integrantes.nome}>
                                        <Avatar
                                            src={"/api/pessoas/" + integrantes.id + "/foto?" + servicoLogin.getAuthorizationGet() }
                                            className={classes.avatar}>
                                        </Avatar>
                                    </Tooltip>
                                    <br/>
                                </div>
                            })}
                            <br/>
                            {solicitantes}
                            <br/>

                            <Typography
                                className={classes.title}>Resumo</Typography>
                            <Typography component="p">{projeto.resumo}</Typography>
                            <br/>

                            <Typography className={classes.title}>Descrição Detalhada</Typography>
                            <Typography component="p">
                                {projeto.descricao}
                            </Typography>
                            <br/><br/><br/>
                            <img
                                src={"/api/projetos/" + projeto.id + "/foto?" + servicoLogin.getAuthorizationGet() }
                                className={classes.img}></img>

                            <br/><br/><br/>
                        </CardContent>

                        <CardActions>
                            {botoes}
                        </CardActions>
                    </Card>
                    <br/>
                </div>
            </div>;
        }
    }
}

ProjetoDetalhe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoDetalhe);