//Padrão de projeto MODULE PATTERNS
//Função anonima, auto invocada.
var ConnectionFactory = (function (){
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';
    
    var connection = null;
    var close = null;

    return class ConnectionFactory{
        constructor(){
            throw new Error("Não é possivel criar instancias de connection factory");
        }
        static getConnection(){
            return new Promise((resolve, reject)=>{
                //abrir requisição
                let openResquest = window.indexedDB.open(dbName, version);
                //criar ou atualiza banco
                openResquest.onupgradeneeded = e =>{
                   //Criar ou atualizar stores
                   ConnectionFactory._createStores(e.target.result);
                };
    
                openResquest.onsuccess = e =>{
                    //verificar existencia de connection
                    if(!connection)
                        connection = e.target.result;
                        //atribuindo o metodo close para futuramente podermos fechar a connection internamente
                        close = connection.close.bind(connection);
                        //subscrita do metodo close, assim não sera possivel fechar a conexão direta
                        connection.close = function(){
                            throw new error("Não é possivel fechar a conexão direta");
                        };
                    //retorna conexão
                    resolve(connection);
                };
    
                openResquest.onerror = e =>{
                    //retorna erro
                    console;log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }
    
        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }

        static _createStores(connection){
            stores.forEach(store => {
                //se store existir, deleta. Assim é possivel atualizar
                if(connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                //Cria store
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }
    }
})();