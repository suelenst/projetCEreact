/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
Importa os componentes  

 */
import React from 'react';



export default class Exemplo extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            nome:props.nome
        };
        
        
        
        
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
