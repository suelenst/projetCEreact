import React from "react";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default class ProjetoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projeto: this.props.projeto
        }
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({projeto: proximoEstado.projeto});
    }

    setNome(valor) {
        this.setState(
            (anterior) => {
                anterior.projeto.nome = valor;
                return anterior;
            }
        );
    }


    confirmar() {
        if (this.state.projeto.nome) {
            if (this.state.projeto.id) {
                this.props.editar(this.state.projeto.id, this.state.projeto);
            }
            else {
                this.props.inserir(this.state.projeto);
            }
        } else {
            alert("Preencha todos os campos!");
        }
    }


    render() {
        return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.projeto.id ? `Editar projeto ${this.state.area.nome}` : "Novo projeto"}</DialogTitle>
            <DialogContent>
                <TextField label="Nome"
                           value={this.state.projeto.nome}
                           onChange={(evento) => this.setNome(evento.target.value)}/><br/><br/>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => {
                    this.props.cancelar()
                }} color="primary">
                    Cancelar
                </Button>
                <Button onClick={(evento) => {
                    this.confirmar()
                }} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog >;
    }
} 