/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";

export default class ProdutoItem extends React.Component {
        
        constructor(props){
            super(props);
            this.state={
                produto:this.props.produto
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({produto:proximoEstado.produto});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.produto.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setValor(valor) {
            this.setState(
                    (anterior) =>{
                        anterior.produto.valor=valor;
                        return valor;
                    }
                    
                    );
            
        }
        
        confirmar(){
            if(this.state.produto.nome&&
                  this.state.produto.valor){
                    if(this.state.produto.id){
                        this.props.editar(this.state.produto.id, this.state.produto);
                    }
                    else {
                        this.props.inserir(this.state.produto);
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }
                        
            
            
        }
        
        
        render(){
            return <div>
            <label>Nome: </label>
            <input 
                value={this.state.produto.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>
            <label>Valor: </label>
            <input type="number" 
                value={this.state.produto.valor}
                onChange={(evento)=>this.setValor(evento.target.value)}
            /><br/><br/>
            <button onClick={(evento)=>{this.confirmar()}}>Confirmar</button>
            </div>;
            
        }
} 