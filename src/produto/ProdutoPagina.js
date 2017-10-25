/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import ProdutoServico from './ProdutoServico';
import ProdutoLista from './ProdutoLista';
import ProdutoItem from './ProdutoItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class ProdutoPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirProdutoItem:false,
            produto:{nome:"teste"}
        }

        this.produtoServico = new ProdutoServico();
        this.mudarPagina(0);

    }

    novoItem(){
        this.setState({
            exibirProdutoItem:true,
            produto:{}
        });
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

        return  <Grid container  >
            <Grid item sm={0}  md={1} />
            <Grid item sm={12} md={10} >
            <Paper style={{padding:10}}>
            
            <ProdutoLista
            apagar={(produto) => {
                this.produtoServico.apagar(produto.id,
                ()=>{
                    alert("Apagado com sucesso!!!");
                    this.mudarPagina(this.paginaAtual);
                    
                },
                (erro)=>console.log(erro));
                }}
            editar={(produto) => {this.setState({exibirProdutoItem:true, produto:produto});}  }
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />
            <ProdutoItem 
                cancelar={()=>{this.setState({exibirProdutoItem:false});}}
                abrir={this.state.exibirProdutoItem}
                inserir ={(produto)=>{ 
                    this.produtoServico.inserir(produto, 
                            (item)=>{
                                alert("Item cadastrado com sucesso!");
                                this.setState({exibirProdutoItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                editar = {(id,produto)=>{ 
                    this.produtoServico.editar(id, produto, 
                            (item)=>{
                                alert("Item cadastrado com sucesso!");
                                this.setState({exibirProdutoItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                produto={this.state.produto} />
            <Button raised color="primary" onClick={(evento)=>this.novoItem()} >
        Adicionar Item
      </Button>
            </Paper>
            </Grid>
            </Grid>;

    }

}
