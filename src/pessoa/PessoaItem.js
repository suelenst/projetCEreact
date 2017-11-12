import AddIcon from 'material-ui-icons/Add';
import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
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

    state = {
        open: false,
        vazio: '',
        showPassword: false,
        textmaskTel: '(  )     -    ',
        checkedAdmin: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
        this.setState({checkedAdmin: false});
    };

    render() {

        const checkedAdmin = this.state.checkedAdmin;
        let pessoa = null;
        if (checkedAdmin) {
            pessoa = <PessoaAdmin/>
        } else {
            pessoa = <PessoaUsuario/>
        }

        return (
            <div>
                <Button fab color="primary" onClick={this.handleClickOpen}><AddIcon/></Button>
                <Dialog open={this.state.open}>
                    <DialogTitle>Adicionar {checkedAdmin ? 'Administrador' : 'Usuário'}</DialogTitle>
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
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Adicionar
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
