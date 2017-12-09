import ServicoRest from "../ServicoRest";
import base64 from "base-64/base64.js";

class ServicoLogin {
    constructor() {
        //super("api/login");
    }

    login(usuario, senha, sucesso, erro) {
        this.usuario = usuario;
        this.senha = senha;


        fetch(`api/pessoas/login`, {
                headers: new Headers({
                    'Authorization': 'Basic ' + this.getAuthorization()
                }),
                method: "GET"
            }
        ).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then((dados) => {
                    this.dados = dados;
                    sucesso(dados);
                })

            } else {
                resposta.json().then(erro);
            }

        }).catch(erro);
    }

    getAuthorization() {
        return base64.encode(this.usuario + ":" + this.senha);
    }

    logado() {
        if (this.usuario && this.senha) {
            return this.dados;
        } else {
            return false;
        }
    }
}

let servicoLogin = new ServicoLogin();

//servicoLogin.login("admin","1234");

export default servicoLogin;