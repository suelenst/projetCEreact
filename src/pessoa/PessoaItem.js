import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';


import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import FormControlLabel from "material-ui/es/Form/FormControlLabel";
import Switch from "material-ui/es/Switch/Switch";
import PessoaUsuario from "./PessoaUsuario";
import PessoaAdmin from "./PessoaAdmin";


const styles = theme => ({
    maior: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 350,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});


class PessoaItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pessoa: this.props.pessoa
        }
    }

    state = {
        vazio: '',
        showPassword: false,
        textmaskTel: '(  )     -    ',
        checkedAdmin: false,
    };

    componentWillReceiveProps(proximoEstado) {
        this.setState({pessoa: proximoEstado.pessoa});
    }

    confirmar() {
        if (this.state.pessoa.nome) {
            if (this.state.pessoa.id) {
                this.props.editar(this.state.pessoa.id, this.state.pessoa);
            }
            else {
                this.props.inserir(this.state.pessoa);
            }
        } else {
            alert("Preencha todos os campos!");
        }
    }

    render() {

        const checkedAdmin = this.state.checkedAdmin;
        let pessoa = null;
        if (checkedAdmin) {
            pessoa =
                <PessoaAdmin
                    pessoa={this.state.pessoa}
                />
        } else {
            pessoa =
                <PessoaUsuario
                    pessoa={this.state.pessoa}
                />
        }

        return (
            <div>
                <Dialog open={this.props.abrir}>
                    <DialogTitle>{this.state.pessoa.id ? `Editar ${checkedAdmin ? 'Administrador' : 'Usuário'}` : `Adicionar ${checkedAdmin ? 'Administrador' : 'Usuário'}`}</DialogTitle>
                    <DialogContent>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.checkedAdmin}
                                    onChange={(event, checked) => this.setState({checkedAdmin: checked})}
                                />
                            }
                            label="Administrador"
                        />
                        <br/>
                        {pessoa}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.props.cancelar();
                            this.setState({checkedAdmin: false})
                        }} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={(evento) => {
                            this.confirmar()
                        }} color="primary">
                            {this.state.pessoa.id ? `Salvar` : `Adicionar`}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PessoaItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PessoaItem);
