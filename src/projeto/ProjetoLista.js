import React from "react";
import Card from "../../node_modules/material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import CardActions from "material-ui/es/Card/CardActions";
import Button from "material-ui/es/Button/Button";
import Typography from "material-ui/es/Typography/Typography";
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class ProjetoLista extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {classes} = this.props;

        if (!this.props.pagina.content) {
            return <div>Não há nenhum projeto cadastrado no sistema.<br/><br/><br/></div>;
        } else {

            return <div>
                {this.props.pagina.content.map((projeto) => {
                    return (
                        <div>
                            <Card>
                                <CardContent>
                                    {projeto.area.map((area) => {
                                        return <Typography className={classes.title}>{area.nome}</Typography>
                                    })}
                                    <Typography type="headline" component="h2">
                                        {projeto.nome}
                                    </Typography>
                                    <Typography className={classes.pos}>{projeto.coordenadorProjeto.nome}</Typography>
                                    <Typography component="p">
                                        {projeto.resumo}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button dense>Mais Detalhes</Button>
                                </CardActions>
                            </Card>
                            <br/>
                        </div>)
                })}
            </div>;
        }
    }
}

ProjetoLista.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoLista);