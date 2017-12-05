import React from 'react';
import AreaServico from './AreaServico';
import AreaLista from './AreaLista';
import AreaItem from './AreaItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import AddIcon from 'material-ui-icons/Add';

export default class AreaPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirAreaItem: false,
            area: {nome: "teste"}
        }

        this.areaServico = new AreaServico();
        this.mudarPagina(0);

    }

    novoItem() {
        this.setState({
            exibirAreaItem: true,
            area: {}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual = numero;
        this.areaServico.listarPaginado(numero,
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
                    <h2>Áreas de Interesse</h2>
                    <AreaLista
                        apagar={(area) => {
                            this.areaServico.apagar(area.id,
                                () => {
                                    alert("Apagado com sucesso!!!");
                                    this.mudarPagina(this.paginaAtual);

                                },
                                (erro) => console.log(erro));
                        }}
                        editar={(area) => {
                            this.setState({exibirAreaItem: true, area: area});
                        }  }
                        mudaPagina={(numero) => this.mudarPagina(numero)}
                        pagina={this.state.pagina}
                    />
                    <AreaItem
                        cancelar={() => {
                            this.setState({exibirAreaItem: false});
                        }}
                        abrir={this.state.exibirAreaItem}
                        inserir={(area) => {
                            this.areaServico.inserir(area,
                                (item) => {
                                    alert("Área de interesse cadastrada com sucesso!");
                                    this.setState({exibirAreaItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        editar={(id, area) => {
                            this.areaServico.editar(id, area,
                                (item) => {
                                    alert("Área de interesse alterada com sucesso!");
                                    this.setState({exibirAreaItem: false});
                                    this.mudarPagina(this.paginaAtual);
                                },
                                (erro) => {
                                    console.log("Erro!");
                                    console.log(erro);
                                }
                            );
                        }}
                        area={this.state.area}/>
                    <Button fab style={{background: '#51B0FF', color: '#ffffff'}} onClick={(evento) => this.novoItem()}>
                        <AddIcon />
                    </Button>
                </Paper>
            </Grid>
        </Grid>;
    }
}