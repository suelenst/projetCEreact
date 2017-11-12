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

class TextMaskCustomCPF extends React.Component {
    render() {
        return (
            <MaskedInput
                {...this.props}
                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-',  /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }
}

class PessoaAdmin extends React.Component {

    state = {
        vazio: '',
        showPassword: false,
        textmaskTel: '(  )     -    ',
        textmaskCPF: '   .   .   -  ',
        checkedAdmin: false,
        test: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };


    render() {
        const {classes} = this.props;

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
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="cpf" required>CPF</InputLabel>
                    <Input
                        id="cpf"
                        value={this.state.textmaskCPF}
                        inputComponent={TextMaskCustomCPF}
                        onChange={this.handleChange('textmaskCPF')}
                        className={classes.input}
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
                        inputComponent={TextMaskCustomTelefone}
                        onChange={this.handleChange('textmaskTel')}
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </FormControl>
            </div>
        );
    }
}

PessoaAdmin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PessoaAdmin);
