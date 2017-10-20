/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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
            return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.produto.id?`Editar item ${this.state.produto.nome}`:"Novo Produto"}</DialogTitle>
            <DialogContent>
            
            <TextField label="Nome"
                value={this.state.produto.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>
            <TextField type="number" label="Valor"
                value={this.state.produto.valor}
                onChange={(evento)=>this.setValor(evento.target.value)}
            /><br/><br/>
            </DialogContent>
            
             <DialogActions>
            <Button onClick={()=>{this.props.cancelar()}} color="primary">
              Cancelar
            </Button>
            <Button onClick={(evento)=>{this.confirmar()}} color="primary">
              Confirmar
            </Button>
          </DialogActions>
            </Dialog >;
            
        }
} 