import React from 'react';
import PessoaServico from './PessoaServico';
import PessoaLista from './PessoaLista';
import PessoaItem from './PessoaItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import AddIcon from 'material-ui-icons/Add';

export default class PessoaPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirPessoaItem: false,
            pessoa: {nome: "teste"}
        }

        this.pessoaServico = new PessoaServico();
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
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual = numero;
        this.pessoaServico.listarPaginado(numero,
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
                    <h2>Pessoas</h2>
                    <PessoaLista
                        apagar={(pessoa) => {
                            this.pessoaServico.apagar(pessoa.id,
                                () => {
                                    alert("Apagado com sucesso!!!");
                                    this.mudarPagina(this.paginaAtual);

                                },
                                (erro) => console.log(erro));
                        }}
                        editar={(pessoa) => {
                            this.setState({exibirPessoaItem: true, pessoa: pessoa});
                        }  }
                        mudaPagina={(numero) => this.mudarPagina(numero)}
                        pagina={this.state.pagina}
                    />
                    <PessoaItem
                        cancelar={() => {
                            this.setState({exibirPessoaItem: false});
                        }}
                        abrir={this.state.exibirPessoaItem}
                        inserir={(pessoa) => {
                            this.pessoaServico.inserir(pessoa,
                                (item) => {
                                    alert("Pessoa  cadastrada com sucesso!");
                                    this.setState({exibirPessoaItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        editar={(id, pessoa) => {
                            this.pessoaServico.editar(id, pessoa,
                                (item) => {
                                    alert("Pessoa  alterada com sucesso!");
                                    this.setState({exibirPessoaItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        pessoa={this.state.pessoa}/>
                    <Button fab style={{background: '#51B0FF', color: '#ffffff'}} onClick={(evento) => this.novoItem()}>
                        <AddIcon />
                    </Button>
                </Paper>
            </Grid>
        </Grid>;
    }
}