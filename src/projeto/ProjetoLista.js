import React from "react";
import Card from "../../node_modules/material-ui/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import CardActions from "material-ui/es/Card/CardActions";
import Button from "material-ui/es/Button/Button";
import Typography from "material-ui/es/Typography/Typography";
import {withStyles} from "material-ui";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

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
    date: {
        color: theme.palette.text.secondary,
    },
    link: {
        textDecoration: 'none',
    },
});

class ProjetoLista extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        function reformatDate(dateStr) {
            var dArr = dateStr.split("-");  // ex input "2010-01-18"
            return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
        }

        if (!this.props.pagina.content) {
            return <div>Não há nenhum projeto cadastrado no sistema.<br/><br/><br/></div>;
        } else {
            return <div>
                {this.props.pagina.content.map((projeto) => {
                    return (
                        <div>
                            <Card>
                                <CardContent>
                                    <Typography className={classes.title}>{projeto.area}</Typography>
                                    <Typography type="headline" component="h2">
                                        {projeto.nome}
                                    </Typography>
                                    <Typography className={classes.pos}>{reformatDate(projeto.dataInicio)}
                                        - {projeto.coordenadorProjeto.nome}</Typography>
                                    <Typography component="p">
                                        {projeto.resumo}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to="maisDetalhes" className={classes.link}>
                                        <Button
                                            onClick={() => {
                                                this.props.setProjeto(projeto);
                                            }}
                                            dense
                                            style={{backgroundColor: '#51B0FF', color: '#FFFFFF'}}
                                        >
                                            Mais Detalhes
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                            <br/>
                        </div>
                    )
                })}
            </div>;
        }
    }
}

ProjetoLista.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoLista);