/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import ProdutoServico from './ProdutoServico';
 
export default class ProdutoPagina extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            nome:props.nome
        };
        
        this.produtoServico = new ProdutoServico();
        this.produtoServico.listarPaginado(0,
            (resultado)=>{console.log(resultado);},
            (erro)=>{
                console.log("Erro:");
                console.log(erro);
            }
            );
    }
    
    setNome(nomeParm){
        this.setState({
            nome:nomeParm
        });
    }
    
    render(){
        //React.createElement('span', null, "Aqui !" )
        return <div style={{color:"red"}}>
            <input value={this.state.nome} 
            onChange={(evento)=>this.setNome(evento.target.value)}/>
            {this.state.nome.length}
                        <br/>Olá, {this.state.nome?this.state.nome:"pessoa"}!
                        <br/>{this.state.nome}
                        <br/>{this.state.nome}
                        <br/>{this.state.nome}
                        <br/>{this.state.nome}</div>;
        
    }
    
}
