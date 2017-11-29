import React from 'react';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import PessoaItem from "./PessoaItem";
import UsuarioServico from "./UsuarioServico";
import PessoaLista from "./PessoaLista";
import Button from "material-ui/es/Button/Button";
import AddIcon from 'material-ui-icons/Add';
import AdminServico from "./AdminServico";

export default class PessoaPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            admin: {},
            exibirPessoaItem: false,
            pessoa: {nome: "teste"}
        };

        this.usuarioServico = new UsuarioServico();
        this.adminServico = new AdminServico();
        this.mudarPagina(0);

    }

    novoItem() {
        this.setState({
            exibirPessoaItem: true,
            pessoa: {}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            user: paginaResultado
        });
        console.log(paginaResultado);
    }

    setAdmin(paginaResultado) {
        this.setState({
            admin: paginaResultado
        });
        console.log(paginaResultado);
    }

    mudarPagina(numero) {
        this.paginaAtual = numero;
        this.usuarioServico.listarPaginado(numero,
            (resultado) => {
                this.setPagina(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
        this.adminServico.listarPaginado(numero,
            (resultado) => {
                this.setAdmin(resultado);
            },
            (erro) => {
                console.log("Erro:");
                console.log(erro);
            }
        );
    }

    render() {

        return <Grid container>
            <Grid item sm={0} md={1}/>
            <Grid item sm={12} md={10}>
                <Paper style={{padding: 10}}>
                    <h2>Pessoas</h2>
                    <PessoaLista
                        apagar={(pessoa) => {
                            if (pessoa.tipo === "usuario") {
                                this.usuarioServico.apagar(pessoa.id,
                                    () => {
                                        alert("Apagada com sucesso!!!");
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => console.log(erro));
                            } else {
                                this.adminServico.apagar(pessoa.id,
                                    () => {
                                        alert("Apagada com sucesso!!!");
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => console.log(erro));
                            }
                        }}
                        editar={(pessoa) => {
                            this.setState({exibirPessoaItem: true, pessoa: pessoa});
                        }}
                        mudaPagina={(numero) => this.mudarPagina(numero)}
                        user={this.state.user}
                        admin={this.state.admin}
                    />
                    <PessoaItem
                        cancelar={() => {
                            this.setState({exibirPessoaItem: false});
                        }}
                        abrir={this.state.exibirPessoaItem}
                        inserir={(pessoa) => {
                            if (pessoa.tipo === "usuario") {
                                this.usuarioServico.inserir(pessoa,
                                    (item) => {
                                        alert("Usuário cadastrado com sucesso!");
                                        this.setState({exibirPessoaItem: false});
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => {
                                        console.log("Erro!");
                                        console.log(erro);
                                    }
                                );
                            } else {
                                this.adminServico.inserir(pessoa,
                                    (item) => {
                                        alert("Administrador cadastrado com sucesso!");
                                        this.setState({exibirPessoaItem: false});
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => {
                                        console.log("Erro!");
                                        console.log(erro);
                                    }
                                );
                            }
                        }}
                        editar={(id, pessoa) => {
                            if (pessoa.tipo === "usuario") {
                                this.usuarioServico.editar(id, pessoa,
                                    (item) => {
                                        alert("Usuário alterado com sucesso!");
                                        this.setState({exibirPessoaItem: false});
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => {
                                        console.log("Erro!");
                                        console.log(erro);
                                    }
                                );
                            } else {
                                this.adminServico.editar(id, pessoa,
                                    (item) => {
                                        alert("Administrador alterado com sucesso!");
                                        this.setState({exibirPessoaItem: false});
                                        this.mudarPagina(this.paginaAtual);
                                    },
                                    (erro) => {
                                        console.log("Erro!");
                                        console.log(erro);
                                    }
                                );
                            }
                        }}
                        pessoa={this.state.pessoa}/>
                    <Button fab style={{background: '#51B0FF', color: '#ffffff'}} onClick={(evento) => this.novoItem()}><AddIcon/></Button>
                </Paper>
            </Grid>
        </Grid>;
    }
}









