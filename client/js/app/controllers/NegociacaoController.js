class NegociacaoController{
    constructor(){
        var $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        //Instancia uma lista e ja passa uma Arrow function de atualização da view
        //Assim não precisamos nos preocupar em atualizar a lista, quando adicionamos, ja atualiza.

        //Criamos uma fabrica de proxy, agora para gerar um proxy basta chamar ProxyFActory
        this._listaNegociacao = new Bind(
            new ListaNegociacoes(), 
            new NegociacaoView($("#negociacaoView")), 
            'adiciona', 'esvazia');
    
        //proxy de mensagem
        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($("#mensagemView")), 
            'texto');

        //buscar todas negocicoes do banco quando abrir a pagina. Promisse ao pé da letra
        ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(item =>
                    this._listaNegociacao.adiciona(item)
            )).catch(erro=>{
                console.log(erro);
                this._mensagem.texto = erro;
            })     
    }  
    
    //apaga o array e atualiza a view e exibe uma mensagem
    apaga()
    {
        ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.apagaTodos())
            .then(mensagem =>{
                this._mensagem.texto = "Negociações Apagada com sucesso";
                this._listaNegociacao.esvazia();
            });       
    }

    adiciona(event){
        event.preventDefault();
        //salvar no index e atualizar na tela
        ConnectionFactory
            .getConnection()
            .then(conn => {
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(conn)
                    .adiciona(negociacao)
                    .then(()=>{
                        this._listaNegociacao.adiciona(negociacao);
                        this._limpaFormulario();
                        this._mensagem.texto = 'Adicionado com sucesso';
                    })
            }).catch(error=>this._mensagem.texto = error);
        
        //console.log(typeof(this._inputData.value)); 
    }

    //metodo privado para limpar o formulario
    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );
    }

    importaNegociacoes(){
       let negociacaoService = new NegociacaoService();
       Promise.all([
           negociacaoService.obterNegociacoesSemana(),
           negociacaoService.obterNegociacoesDaSemanaAnterior(),
           negociacaoService.obterNegociacoesDaSemanaRetrasada()
       ]).then(negociacoes => {negociacoes.reduce((array, obj) => array.concat(obj) , [])
           .forEach(item => {
           this._listaNegociacao.adiciona(item);
           this._mensagem.texto = "Negociações importadas com sucesso";
       })}).catch(error =>{
           this._mensagem.texto = error;
       });    
    }
}
