import React from 'react';
import ProjetoServico from './ProjetoServico';
import ProjetoLista from './ProjetoLista';
import ProjetoItem from './ProjetoItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import AddIcon from 'material-ui-icons/Add';

export default class ProjetoPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirProjetoItem: false,
            projeto: {nome: "teste"}
        }

        this.projetoServico = new ProjetoServico();
        this.mudarPagina(0);

    }

    novoItem() {
        this.setState({
            exibirProjetoItem: true,
            projeto: {}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual = numero;
        this.projetoServico.listarPaginado(numero,
            (resultado) => {
                console.log(resultado);
                this.setPagina(resultado);
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
                    <h2>Projetos</h2>
                    <ProjetoLista
                        apagar={(projeto) => {
                            this.projetoServico.apagar(projeto.id,
                                () => {
                                    alert("Apagado com sucesso!!!");
                                    this.mudarPagina(this.paginaAtual);

                                },
                                (erro) => console.log(erro));
                        }}
                        editar={(projeto) => {
                            this.setState({exibirProjetoItem: true, projeto: projeto});
                        }  }
                        mudaPagina={(numero) => this.mudarPagina(numero)}
                        pagina={this.state.pagina}
                    />
                    <ProjetoItem
                        cancelar={() => {
                            this.setState({exibirProjetoItem: false});
                        }}
                        abrir={this.state.exibirProjetoItem}
                        inserir={(projeto) => {
                            this.projetoServico.inserir(projeto,
                                (item) => {
                                    alert("Projeto cadastrado com sucesso!");
                                    this.setState({exibirProjetoItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        editar={(id, projeto) => {
                            this.projetoServico.editar(id, projeto,
                                (item) => {
                                    alert("Projeto alterado com sucesso!");
                                    this.setState({exibirProjetoItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        projeto={this.state.projeto}/>
                    <Button fab style={{background: '#51B0FF', color: '#ffffff'}} onClick={(evento) => this.novoItem()}>
                        <AddIcon />
                    </Button>
                </Paper>
            </Grid>
        </Grid>;
    }
}