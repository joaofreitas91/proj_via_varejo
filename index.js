var produtos = JSON.parse(localStorage.getItem("produtos"));
if (produtos == null){
    produtos = [];
}

reescreveLista()

document.getElementById('nameTransaction').addEventListener('keyup', (ev) => {
	const input = ev.target;
	input.value = input.value.toUpperCase();
});

function trataFormulario(e){
    e.preventDefault()
    console.log(e.target.elements)
    
    
    if (e.target.elements.typeTransaction.value == ""){
        e.target.elements.typeTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }
    
    if (e.target.elements.nameTransaction.value == ""){
        e.target.elements.nameTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }

    if (e.target.elements.valueTransaction.value <= 0){
        e.target.elements.valueTransaction.parentElement.querySelector("em").classList.remove("hidden")
        
        return false;
    }
    
    let novoProduto = {
        nome : e.target.elements.nameTransaction.value,
        valor : e.target.elements.valueTransaction.value,
        tipo : e.target.elements.typeTransaction.value
    }

    produtos.push(novoProduto)

    reescreveLista()

    localStorage.setItem("produtos", JSON.stringify(produtos))

    console.log(produtos)
    return false;
}


function openMenu(){
    if ([...document.querySelector(".list-menu").classList].indexOf("opened") == -1){
        document.querySelector(".list-menu").classList.add("opened")
    } else{
        document.querySelector(".list-menu").classList.remove("opened")
    }
}


document.getElementById("meuForm").addEventListener('submit', trataFormulario)

function reescreveLista() {

    document.querySelector("table").innerHTML = ""

    for (let i = 0; i < produtos.length; i ++){
    var typeTransaction = "-"
        if ( produtos[i].tipo == "1"){
            typeTransaction = "+"
        }
    
        document.querySelector("table").innerHTML += `
        <tr>
            <td class="signal-left">`+ typeTransaction +`</td>
            <td class="text-left">`+ produtos[i].nome +` </td>
            <td class="text-right">`+ 'R$ ' +produtos[i].valor +`</td>
        </tr>
        `
    }

    if (produtos.length == 0) {
        document.querySelector("table").innerHTML = `
        <tr class="line-tbody">
            <td class="text-center">Por favor, adicione uma transação!</td>
        </tr>
        `
    }
}