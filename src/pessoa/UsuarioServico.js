import ServicoRest from "../ServicoRest";

export default class UsuarioServico extends  ServicoRest {
        constructor(){
            super("api/usuarios/");
        }
        
}