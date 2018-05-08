//HERDANDO DA CLASSE VIEW
class NegociacaoView extends View{
    //PASSANDO OS CONSTRUTOR PARA A CLASSE PAI
    constructor(elemento){
       super(elemento); 
    }
    template(model){
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${
                        model.negociacoes.map(item=>`
                        <tr>
                            <td>${DateHelper.dataParaTexto(item.data)}</td>  
                            <td>${item.quantidade}</td>   
                            <td>${item.valor}</td> 
                            <td>${item.volume}</td>                        
                        </tr>
                        `).join('')
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"></td>
                        <td>${model.negociacoes.reduce((total, item)=> total + item.volume, 0.0)}</td>
                    <tr>
                </tfoot>
            </table>
        `
    }
}