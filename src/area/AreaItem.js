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

export default class AreaItem extends React.Component {
        
        constructor(props){
            super(props);
            this.state={
                area:this.props.area
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({area:proximoEstado.area});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.area.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        
        confirmar(){
            if(this.state.area.nome){
                    if(this.state.area.id){
                        this.props.editar(this.state.area.id, this.state.area);
                    }
                    else {
                        this.props.inserir(this.state.area);
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }
                        
            
            
        }
        
        
        render(){
            return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.area.id?`Editar item ${this.state.area.nome}`:"Nova Area de "}</DialogTitle>
            <DialogContent>
            
            <TextField label="Nome"
                value={this.state.area.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>

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