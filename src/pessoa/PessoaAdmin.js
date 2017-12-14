import React from 'react';
import TextField from 'material-ui/TextField';

import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import FormControl from "material-ui/es/Form/FormControl";
import MaskedInput from 'react-text-mask';

import Dialog, {
DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        } from 'material-ui/Dialog';
        
 import servicoLogin from "../login/ServicoLogin";  
 
const styles = theme => ({
    maior: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 350,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    img: {
        width: "300px", 
    }
});

class TextMaskCustomTelefone extends React.Component {
    render() {
        return (
            <MaskedInput
                {...this.props}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }
}

// class TextMaskCustomCPF extends React.Component {
//     render() {
//         return (
//             <MaskedInput
//                 {...this.props}
//                 mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
//                 placeholderChar={'\u2000'}
//                 showMask
//             />
//         );
//     }
// }

class PessoaAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pessoa: this.props.pessoa,
            vazio: '',
            showPassword: false,
            textmaskTel: '(  )     -    ',
            //textmaskCPF: '   .   .   -  ',
            checkedAdmin: true,
            update:0,
        };
        this.props.pessoa.tipo = "administrador";
        this.props.pessoa.permissoes = ["administrador"];
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };
    
    componentWillReceiveProps(proximoEstado) {
        this.setState({pessoa: proximoEstado.pessoa});
    }

    setValor(campo, valor) {
        this.setState(
            (anterior) => {
                anterior.pessoa[campo] = valor;
                return anterior;
            }
        );
    }

    upload(form) {

        let formData = new FormData(form);
        fetch("/api/pessoas/" + this.state.pessoa.id + "/foto", {
            method: "POST",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
            body: formData
        }).then((resultado) => {
            if (resultado.ok) {
                this.setState(
                (anterior) =>
        {
            anterior.update = anterior.update+1;
            console.log("Mudou!");
            return anterior;
        }
        );
                
                
            } else {
                resultado.json().then(
                        (resultadoErro) => console.log(resultadoErro)
                )
            }

        });

    }


    render() {
        const {classes} = this.props;
        let formSenha =  null;
        
        if (!this.state.pessoa.id) {            
            formSenha = 
            
            <FormControl className={classes.formControl} required>
                    <InputLabel htmlFor="novaSenha">Senha</InputLabel>
                    <Input

                        id="novaSenha"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.pessoa.novaSenha}
                        onChange={(evento) => this.setValor("novaSenha", evento.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={this.handleClickShowPasssword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    >
                    </Input>
                </FormControl>           
            
            
        } else {
            this.state.pessoa.novaSenha = "senha";            
        }
        

        return (
            <div>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nome"
                    label="Nome"
                    type="text"
                    className={classes.maior}
                    value={this.state.pessoa.nome}
                    onChange={(evento) => this.setValor("nome", evento.target.value)}
                />

                <FormControl className={classes.formControl} required>
                    <InputLabel htmlFor="cpf">CPF</InputLabel>
                    <Input
                        id="cpf"
                        className={classes.input}
                        //inputComponent={TextMaskCustomCPF}
                        //value={this.state.pessoa.cpf ? this.state.pessoa.cpf : this.state.textmaskCPF}
                        value={this.state.pessoa.cpf}
                        onChange={(evento) => this.setValor("cpf", evento.target.value)}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </FormControl>

                <TextField
                    required
                    margin="dense"
                    id="email"
                    label="Prefixo do Email"
                    placeholder="pcsilva"
                    type="text"
                    className={classes.formControl}
                    value={this.state.pessoa.email}
                    onChange={(evento) => this.setValor("email", evento.target.value)}
                />

                {formSenha}

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="telefone">Telefone</InputLabel>
                    <Input
                        id="telefone"
                        value={this.state.pessoa.telefone ? this.state.pessoa.telefone : this.state.textmaskTel}
                        onChange={(evento) => this.setValor("telefone", evento.target.value)}
                        inputComponent={TextMaskCustomTelefone}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </FormControl>
                
                                
                <br/><br/><br/>
                
                <img className={classes.img} src={"/api/pessoas/" + this.state.pessoa.id + "/foto?" 
                + servicoLogin.getAuthorizationGet()+"&update="+this.state.update}/>

                <br/>
                <form method="post" encType="multipart/form-data"  
                      onSubmit={(event) => {
                            event.preventDefault();
                            this.upload(event.target);
                }}>
                    <input name="arquivo" type="file" />
                    <button type="submit">Enviar</button>
                </form>


                <br/>        
                        
                        
                        
                
                
            </div>
        );
    }
}

PessoaAdmin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PessoaAdmin);
