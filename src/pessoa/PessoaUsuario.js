import React from 'react';
import TextField from 'material-ui/TextField';


import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/Menu/MenuItem';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import FormControl from "material-ui/es/Form/FormControl";
import MaskedInput from 'react-text-mask';
import Select from "material-ui/es/Select/Select";

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

class TextMaskCustom extends React.Component {
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

class PessoaUsuario extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pessoa: this.props.pessoa,
            vazio: '',
            showPassword: false,
            textmaskTel: '(  )     -    ',
            checkedAdmin: false,
            update:0,
        };
        this.props.pessoa.tipo = "usuario";
        this.props.pessoa.permissoes = ["usuario"];
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
        
            formSenha = 
            <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="novaSenha">Senha</InputLabel>
                    <Input
                        type='password'
                        disable
                        value={this.state.pessoa.novaSenha}
       
                    >
                    </Input>
                </FormControl>
            
        }
        let curso =
            <TextField
                autoFocus
                required
                margin="dense"
                id="curso"
                label="Curso"
                type="text"
                className={classes.maior}
                value={this.state.pessoa.curso}
                onChange={(evento) => this.setValor("curso", evento.target.value)}
            />;

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
                /><br/><br/>

                <TextField
                    margin="dense"
                    id="apelido"
                    label="Apelido"
                    type="text"
                    className={classes.formControl}
                    value={this.state.pessoa.apelido}
                    onChange={(evento) => this.setValor("apelido", evento.target.value)}
                />

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
                        inputComponent={TextMaskCustom}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </FormControl>

                <FormControl className={classes.maior} required>
                    <InputLabel htmlFor="tipoVinculo">Tipo de Vínculo Institucional</InputLabel>
                    <Select
                        value={this.state.pessoa.tipoVinculo ? this.state.pessoa.tipoVinculo : ""}
                        onChange={(evento) => this.setValor("tipoVinculo", evento.target.value)}
                        input={<Input id="tipoVinculo"/>}
                    >
                        <MenuItem value=""> </MenuItem>
                        <MenuItem value={'aluno'}>Aluno</MenuItem>
                        <MenuItem value={'professor'}>Professor</MenuItem>
                        <MenuItem value={'servidorTecnico'}>Servidor Técnico</MenuItem>
                    </Select>
                </FormControl>

                {this.state.pessoa.tipoVinculo === "aluno" ? curso : null}
                
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

PessoaUsuario.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PessoaUsuario);