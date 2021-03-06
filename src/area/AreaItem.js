import React from "react";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default class AreaItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            area: this.props.area
        }
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({area: proximoEstado.area});
    }

    setNome(valor) {
        this.setState(
            (anterior) => {
                anterior.area.nome = valor;
                return anterior;
            }
        );
    }


    confirmar() {
        if (this.state.area.nome) {
            if (this.state.area.id) {
                this.props.editar(this.state.area.id, this.state.area);
            }
            else {
                this.props.inserir(this.state.area);
            }
        } else {
            alert("Preencha todos os campos!");
        }
    }


    render() {
        return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.area.id ? `Editar área de interesse ${this.state.area.nome}` : "Nova área de interesse"}</DialogTitle>
            <DialogContent>
                <TextField label="Nome"
                           value={this.state.area.nome}
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