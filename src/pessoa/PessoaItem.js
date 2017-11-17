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
            pessoa: this.props.pessoa,
            vazio: '',
            showPassword: false,
            textmaskTel: '(  )     -    ',
            checkedAdmin: false,
        }
    }

    componentWillReceiveProps(proximoEstado) {
        this.setState({pessoa: proximoEstado.pessoa});
    }

    confirmar() {                    
        let re = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*/;
        
    

        if (this.state.pessoa.nome && this.state.pessoa.email && this.state.pessoa.senha) {
            if(re.test(this.state.pessoa.email)){
                if (this.state.pessoa.tipo === "usuario"){
                    if (this.state.pessoa.tipoVinculo) {
                        
                        if(this.state.pessoa.tipoVinculo !== "aluno" || this.state.pessoa.curso ){
                            
                            if (this.state.pessoa.id) {
                                this.props.editar(this.state.pessoa.id, this.state.pessoa);
                            }
                            else {
                                this.props.inserir(this.state.pessoa);
                            }
                        } else {
                            alert("Curso obrigatório");
                        }
                            
                    }else {
                        alert("Tipo de vínculo obrigatório");
                    } 
                    
                } else {
                    if (this.state.pessoa.cpf) {
                        if (this.state.pessoa.id) {
                            this.props.editar(this.state.pessoa.id, this.state.pessoa);
                        }
                        else {
                            this.props.inserir(this.state.pessoa);
                        }
                    }else {
                        alert("Cpf obrigatório");
                    } 
                    
                }
                                   
            }else {
                alert("Prefixo de Email inválido");
            }
        } else {
            alert("Preencha todos os campos!");
        }
        
        
    }


    render() {

        const checkedAdmin = this.state.checkedAdmin;
        let selectAdmin = null;
        let pessoa = null;

        if (!this.state.pessoa.id) {
            selectAdmin =
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.checkedAdmin}
                            onChange={(event, checked) => this.setState({checkedAdmin: checked})}
                        />
                    }
                    label="Administrador"
                />
        }

        if (this.state.pessoa.id) {
            if (this.state.pessoa.tipo === "usuario") {
                pessoa =
                    <PessoaUsuario
                        pessoa={this.state.pessoa}
                    />
            } else {
                pessoa =
                    <PessoaAdmin
                        pessoa={this.state.pessoa}
                    />
            }
        } else {
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
        }


        return (
            <div>
                <Dialog open={this.props.abrir}>
                    <DialogTitle>{this.state.pessoa.id ? `Editar ${this.state.pessoa.tipo === "usuario" ? 'Usuário' : 'Administrador'}` : `Adicionar ${this.state.pessoa.tipo === "usuario" ? 'Usuário' : 'Administrador'}`}</DialogTitle>
                    <DialogContent>
                        {selectAdmin}
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
