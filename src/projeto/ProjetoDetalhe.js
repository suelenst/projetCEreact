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
    tagAreas: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class ProjetoDetalhe extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const projeto = this.props.projeto;

        if (!projeto) {
            return <div>Projeto não encontrado.<br/><br/><br/></div>;
        } else {
            return <div>
                <div>
                    <Card>
                        <CardContent>

                            {projeto.area.map((area) => {
                                return <Typography className={classes.tagAreas}>{area.nome}</Typography>
                            })}
                            <br/>
                            <Typography type="headline" component="h2">
                                {projeto.nome}
                            </Typography>
                            <br/>
                            <Typography className={classes.pos}>{projeto.dataInicio}</Typography>
                            <br/>
                            <Typography className={classes.title}>Coordenador</Typography>
                            <Typography component="p">{projeto.coordenadorProjeto.nome}</Typography>
                            <br/>
                            <Typography className={classes.title}>Integrantes do Projeto</Typography>
                            {projeto.integrantesProjeto.map((integrantes) => {
                                return <Typography component="p">{integrantes.nome}</Typography>
                            })}
                            <br/>
                            <Typography
                                className={classes.title}>Resumo</Typography>
                            <Typography component="p">{projeto.resumo}</Typography>
                            <br/>
                            <Typography className={classes.title}>Descrição Detalhada</Typography>
                            <Typography component="p">
                                {projeto.descricao}
                            </Typography>
                            <br/>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*<Button dense>Mais Detalhes</Button>*/}
                        {/*</CardActions>*/}
                    </Card>
                    <br/>
                </div>
            </div>;
        }
    }
}

ProjetoDetalhe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjetoDetalhe);