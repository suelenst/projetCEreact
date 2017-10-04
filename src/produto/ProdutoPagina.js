/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import ProdutoServico from './ProdutoServico';
import ProdutoLista from './ProdutoLista';

export default class ProdutoPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {}
        }

        this.produtoServico = new ProdutoServico();
        this.mudarPagina(0);

    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.produtoServico.listarPaginado(numero,
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

        return <ProdutoLista
            apagar={(produto) => console.log(produto)}
            editar={(produto) => console.log(produto)}
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />;

    }

}
