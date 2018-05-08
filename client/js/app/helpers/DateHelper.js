class DateHelper{
    
    constructor(){
        //criar um error para dizer que essa classe não deve ser instanciada
        throw new Error('DateHelper não pode ser instaciado!');
    }

    //metodos estaticos
    static textoParaData(texto){
        //validar a data
        if(!/\d{4}-\d{2}-\d{2}/.test(texto))throw new Error("Deve estar no formato AAAA-MM-DD");
        //criando uma data
        return new Date(...texto.split('-').map((item, indice)=> indice == 1 ? item - 1 : item));
    }

    static dataParaTexto(data){
        //string templates interpolando strings
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }
}