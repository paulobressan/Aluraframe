class NegociacaoDao{
    constructor(connection){
        this._connection = connection;
        //o dao vai operar sobre a store negociação(tabela do indexedb)
        this._store = 'negociacoes'
    }

    //salvar no indexed db retornando a promisse com resultados
    adiciona(negociacao){
        return new Promise((resolve, reject)=>{
            let request = this._connection
                .transaction([this._store], 'readwrite')//criando uma transação para ler e escrever em um object store
                .objectStore(this._store)//Pegar uma ObjectStore com a transação
                .add(negociacao);//Gravar um objeto dentro da object store(Adicionar), devolve uma requesição
            request.onsuccess = e => {
                resolve();
            };
            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possivel adicionar essa negociação');
            };
        })
    }

    //listar todos as negociações na base
    listaTodos(){
        return new Promise((resolve, reject)=>{
            var negociacoes = [];
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore([this._store])
                .openCursor(); //cursor, lembramos de maloc no C.
            cursor.onsuccess = e =>{
                let atual = e.target.result;
                //if existir cursor para percorrer
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(
                        dado._data,
                        dado._quantidade,
                        dado._valor
                    ));
                    //continuar percorrendo o cursor
                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possivel listar as negociações');
            };
        });
    }

    //remover todos negociações da base
    apagaTodos(){
        return new Promise((resolve,reject)=>{
            let request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore([this._store])
            .clear();//remove o banco

            //se ocorrer tudo bem
            request.onsuccess = e => resolve('Negociações removida com sucesso');
            // se não
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possivel remover as negociações');
            } 
        });
    }
}