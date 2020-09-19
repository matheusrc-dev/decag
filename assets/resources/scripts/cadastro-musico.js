(function () {

    let emailConfirm = confirm("Deseja receber atualizações por email?");
    let email;
    let small = document.createElement("small");
    //Adiciona os instrumentos no array
    let instrumentosQtd = document.querySelector('div.grupo').children.length;

    let instrumetos = [];
    for (let i = 0; i < instrumentosQtd * 4; i++) {
        instrumetos.push($(`instrumentCheck${i}`));
    }

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
            if (!isAtLeastOneInstrumentSelected(instrumetos)) {
                alert("Ops! Você esqueceu de selecionar os intrumentos");
                return false;
            }

            let name = document.querySelector('#name').value;
            let avatar = document.querySelector('#avatar').value;
            let whatsapp = document.querySelector('#whatsapp').value;
            let bio = document.querySelector('#bio').value;
            let instruments = [];

            for (let i = 0; i < instrumetos.length; i++) {
                if (instrumetos[i].checked) {
                    instruments.push(instrumetos[i].id);
                }
            }

            //Adiciona os intrumentos do label no Array de instrumentos como String
            for(let i = 0; i < instruments.length; i++) {
                instruments.splice(i, 1, document.querySelector(`label[for="${instruments[i]}"]`).innerText.trim());
            }

            let cost = document.querySelector('#cost').value;
            let weekday = document.getElementById('weekday').selectedIndex;
            let time_from = document.getElementById('time_from').value;
            let time_to = document.getElementById('time_to').value; 

            let musico = new Musico(database.sequenceId('musico') ,name, avatar, whatsapp, bio, instruments, cost, weekday, time_from, time_to);
            database.saveItemArray('musico', musico);
            location.href = `http://localhost:5500/assets/resources/pages/cadastro-concluido.html`;

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


