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

    state = {
        vazio: '',
        showPassword: false,
        textmaskTel: '(  )     -    ',
        checkedAdmin: false,
        isAluno: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

        if (event.target.value === "aluno") {
            this.setState({isAluno: true});
        } else {
            this.setState({isAluno: false});
        }
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };


    render() {
        const {classes} = this.props;
        const isAluno = this.state.isAluno;

        let curso = null;
        if (isAluno) {
            curso =
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="curso"
                    label="Curso"
                    type="text"
                    className={classes.maior}
                />;
        } else {
            curso = null;
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
                />
                <TextField
                    margin="dense"
                    id="apelido"
                    label="Apelido"
                    type="text"
                    className={classes.formControl}
                />
                <TextField
                    required
                    margin="dense"
                    id="email"
                    label="Prefixo do Email"
                    placeholder="pcsilva"
                    type="text"
                    className={classes.formControl}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="senha" required>Senha</InputLabel>
                    <Input
                        id="senha"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
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
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="telefone" required>Telefone</InputLabel>
                    <Input
                        id="telefone"
                        value={this.state.textmaskTel}
                        inputComponent={TextMaskCustom}
                        onChange={this.handleChange('textmaskTel')}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </FormControl>
                <FormControl className={classes.maior}>
                    <InputLabel htmlFor="tipoVinculo" required>Tipo de Vínculo Institucional</InputLabel>
                    <Select
                        value={this.state.vazio}
                        onChange={this.handleChange('vazio')}
                        input={<Input id="tipoVinculo"/>}
                    >
                        <MenuItem value=""> </MenuItem>
                        <MenuItem value={'aluno'}>Aluno</MenuItem>
                        <MenuItem value={'professor'}>Professor</MenuItem>
                        <MenuItem value={'servidorTecnico'}>Servidor Técnico</MenuItem>
                    </Select>
                </FormControl>
                {curso}
            </div>
        );
    }
}

PessoaUsuario.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PessoaUsuario);
