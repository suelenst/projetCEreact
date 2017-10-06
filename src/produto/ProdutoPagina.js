/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import ProdutoServico from './ProdutoServico';
import ProdutoLista from './ProdutoLista';
import ProdutoItem from './ProdutoItem';

export default class ProdutoPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            produto:{nome:"teste"}
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
        this.paginaAtual=numero;
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

        return <div><ProdutoLista
            apagar={(produto) => {
                this.produtoServico.apagar(produto.id,
                ()=>{
                    alert("Apagado com sucesso!!!");
                    this.mudarPagina(this.paginaAtual);
                    
                },
                (erro)=>console.log(erro));
                }}
            editar={(produto) => console.log(produto)}
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />
            <ProdutoItem 
                inserir ={(produto)=>{ 
                    this.produtoServico.inserir(produto, 
                            (item)=>{
                                alert("Item cadastrado com sucesso!");
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                produto={this.state.produto} />
            </div>;

    }

}
