class NegociacaoService{
    constructor(){
        this.http = new HttpService();
    }
    obterNegociacoesSemana(){
         return new Promise((resolve, reject)=>{
             this.http.get("/negociacoes/semana")
                .then(negociacoes => resolve(negociacoes.map(item => 
                    new Negociacao(
                        new Date(item.data), item.quantidade, item.valor)
                )))
                .catch(error => reject("Não foi possivel obter as negociações da semana"));
         });
    }

    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject)=>{
            this.http.get("/negociacoes/anterior")
               .then(negociacoes => resolve(negociacoes.map(item => 
                   new Negociacao(
                       new Date(item.data), item.quantidade, item.valor)
               )))
               .catch(error => reject("Não foi possivel obter as negociações da semana"));
        });
   }

   obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject)=>{
            this.http.get("/negociacoes/retrasada")
                .then(negociacoes => resolve(negociacoes.map(item => 
                    new Negociacao(
                        new Date(item.data), item.quantidade, item.valor)
                )))
                .catch(error => reject("Não foi possivel obter as negociações da semana"));
        });
    }
}