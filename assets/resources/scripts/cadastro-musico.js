(function () {

    let emailConfirm = confirm("Deseja receber atualizações por email?");
    let email;
    let small = document.createElement("small");
    //Adiciona os instrumentos no array
    let instrumentosQtd = document.querySelector('div.grupo').children.length;
    let instrumentosCheck = [];
    let instrumentosString = [];

    //Pega todos os instrumentos (elementos) do checkbox
    for (let i = 0; i < instrumentosQtd * 4; i++) {
        instrumentosCheck.push($(`instrumentCheck${i}`));
    }
    
    //Adiciona os intrumentos do label no Array de instrumentosString como String
    for(let i = 0; i < instrumentosCheck.length; i++) {
        instrumentosString.splice(i, 1, document.querySelector(`label[for="${instrumentosCheck[i].id}"]`).innerText.trim());
    }

    //Colocar os valores no web storage atraves ta classe instrumentoo

    localStorage.setItem('instrumentos', JSON.stringify(instrumentosString));

    // console.log(instrumentosString);


    window.onload = function () {
        //Confirma se quer receber atualizações por email
        if (emailConfirm.valueOf() == true) {
            do {

                email = prompt("Informe seu email abaixo");
                if (email == null) {
                    return;
                }

            } while (!validaEmail(email));

            alert("Obrigado!");
        }

        function validaEmail(email) {

            if (email == '') {
                return false;
            }
            if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
                return false;
            }
            return true;
        }


        //Adiciona um <small> no campo do Whatsapp
        document.querySelector("#whatsapp").addEventListener("focus", function () {
            small.innerHTML = "(somente números)";

            document.querySelector('label[for="whatsapp"]').appendChild(small);

        });

        //Remove o <small> do campo do Whatsapp
        document.querySelector("#whatsapp").addEventListener("blur", function () {
            document.querySelector('label[for="whatsapp"]').removeChild(small);

        });

        //Evita que o usuario digite algo além de números no Whatsapp
        document.querySelector('#whatsapp').onkeypress = function (event) {
            var number = event.charCode;
            if (!(number >= 48 && number <= 57)) {
                event.preventDefault();
            }
        }

        //Avisa o usuário se ele não preencher o custo do horário
        document.querySelector("#cost").addEventListener("blur", function () {
            var cost = $("cost").value;

            if (cost == "") {
                alert("Por favor informe o custo do seu horário");
            }

        });

        //Evita que o usuario digite algo além de números no custo da hora
        document.querySelector('#cost').onkeypress = function (event) {
            var number = event.charCode;
            if (!(number >= 48 && number <= 57)) {
                event.preventDefault();
            }
        }

        document.querySelector('#create-class').onsubmit = function () {
            if (!isAtLeastOneInstrumentSelected(instrumentosCheck)) {
                alert("Ops! Você esqueceu de selecionar os intrumentos");
                return false;
            }

            //Capitura os valores do campo do formulário para cadastrar no banco
            let name = document.querySelector('#name').value;
            let avatar = document.querySelector('#avatar').value;
            let whatsapp = document.querySelector('#whatsapp').value;
            let bio = document.querySelector('#bio').value;
            let instruments = [];

            //Adiciona apenas os Instrumentos checked
            for (let i = 0; i < instrumentosCheck.length; i++) {
                if (instrumentosCheck[i].checked) {
                    instruments.push(instrumentosString[i]);
                }
            }

            // console.log(instruments);

            let cost = document.querySelector('#cost').value;
            let weekday = document.getElementById('weekday').selectedIndex;
            let time_from = document.getElementById('time_from').value;
            let time_to = document.getElementById('time_to').value; 

            let musico = new Musico(database.sequenceId('musicos') ,name, avatar, whatsapp, bio, instruments, cost, weekday, time_from, time_to);
            database.saveItemArray('musicos', musico);
            
            // VsCode
            // location.href = `/assets/resources/pages/procurar-musicos.html`;    
    
            // GitHub
            window.location = `/decag/assets/resources/pages/procurar-musicos.html`;

            return false;

        }

    }
})();

function $(id) {
    return document.getElementById(id);
}


//Função que verifica se existe ao menos um intrumentos selecionado
function isAtLeastOneInstrumentSelected(instruments) {
    let qtdChecked = 0;

    for (let i in instruments) {

        if (instruments[i].checked) {
            qtdChecked++;
        }
    }

    if (qtdChecked > 0) {
        return true;
    } else {
        return false;
    }
}



//Adiciona um <small> no campo do Link da sua foto 
let small = document.createElement("small");

function mostraInfo(input) {
    small.innerText = "(comece com https://)";
    document.querySelector(`label[for="${input}"]`).appendChild(small);
    document.querySelector("#avatar").setAttribute('value', 'https://');

}

//Retira o <small> do campo do Link da sua foto 
function retiraInfo(input) {
    document.querySelector(`label[for="${input}"]`).removeChild(small);
    document.querySelector("#avatar").setAttribute('value', '');

}


