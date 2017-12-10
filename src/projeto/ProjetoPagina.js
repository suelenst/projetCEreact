import React from 'react';
import ProjetoServico from './ProjetoServico';
import ProjetoLista from './ProjetoLista';
import Grid from "material-ui/Grid";

export default class ProjetoPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirProjetoItem: false,
            projeto: {nome: "teste"}
        };

        let url = "/api/projetos/" + this.props.id;
        this.projetoServico = new ProjetoServico(url);
        this.mudarPagina(0);
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
                <h2>{this.props.id === "" ? `Projetos` : `Meus Projetos`}</h2>
                <ProjetoLista
                    pagina={this.state.pagina}
                />
            </Grid>
        </Grid>;
    }
}