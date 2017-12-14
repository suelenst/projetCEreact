import ServicoRest from "../ServicoRest";
import servicoLogin from "../login/ServicoLogin";


export default class ProjetoServico extends ServicoRest {
    constructor(url) {
        super(url);
    }
    
    solicitarPart(id, idu) {
         fetch("/api/projetos/participa/" + id + "/" + idu, {
            method: "PUT",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
        }).then((resultado) => {            
        
        if (resultado.ok) {
           alert("Solicitação enviada com sucesso!");               

        } else {
            resultado.json().then(
                    (resultadoErro) => alert(resultadoErro)
            )
        }

        });
    }
    
        negarPart(id, ids) {
         fetch("/api/projetos/participa/" + id + "/" + ids, {
            method: "DELETE",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
        }).then((resultado) => {            
        
        if (resultado.ok) {
           alert("Solicitação negada!");               

        } else {
            resultado.json().then(
                    (resultadoErro) => alert(resultadoErro)
            )
        }

        });
    }
    
    aceitarPart(id, ids) {
         fetch("/api/projetos/integrante/" + id + "/" + ids, {
            method: "PUT",

            headers: new Headers({
                'Authorization': servicoLogin.getAuthorization()

            }),
        }).then((resultado) => {            
        
        if (resultado.ok) {
           alert("Solicitação aceita!");                

        } else {
            resultado.json().then(
                    (resultadoErro) => alert(resultadoErro)
            )
        }

        });
    }
    
    
    
}