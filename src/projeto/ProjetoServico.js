import ServicoRest from "../ServicoRest";

export default class ProjetoServico extends ServicoRest {
    constructor() {
        super("/api/projetos/");
    }

}