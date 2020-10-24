'use strict';

(function () {
  const emailConfirm = window.confirm('Deseja receber atualizações por email?');
  let email;
  const small = document.createElement('small');

  //  Adiciona os instrumentos no array
  const instrumentosQtd = document.querySelector('div.grupo').children.length;
  const instrumentosCheck = [];
  const instrumentosString = [];

  const $ = function $(id) {
    return document.getElementById(id);
  };

  //  Função que verifica se existe ao menos um intrumentos selecionado
  const isAtLeastOneInstrumentSelected = function isAtLeastOneInstrumentSelected(instruments) {
    let qtdChecked = 0;

    for (let i = 0; i < instruments.length; i += 1) {
      if (instruments[i].checked) {
        qtdChecked += 1;
      }
    }

    if (qtdChecked > 0) {
      return true;
    }
    return false;
  };

  //  Pega todos os instrumentos (elementos) do checkbox
  for (let i = 0; i < instrumentosQtd * 4; i += 1) {
    instrumentosCheck.push($(`instrumentCheck${i}`));
  }

  //  Adiciona os intrumentos do label no Array de instrumentosString como String
  for (let i = 0; i < instrumentosCheck.length; i += 1) {
    instrumentosString.splice(i, 1, document.querySelector(`label[for="${instrumentosCheck[i].id}"]`).innerText.trim());
  }

  //  Colocar os valores no web storage atraves ta classe instrumentoo
  localStorage.setItem('instrumentos', JSON.stringify(instrumentosString));

  window.onload = function () {
    function validaEmail(emailToConfirm) {
      if (emailToConfirm === '') {
        return false;
      }
      if (emailToConfirm.indexOf('@') === -1 || emailToConfirm.indexOf('.') === -1) {
        return false;
      }
      return true;
    }

    //  Confirma se quer receber atualizações por email
    if (emailConfirm.valueOf() === true) {
      do {
        email = window.prompt('Informe seu email abaixo');
        if (email == null) {
          return;
        }
      } while (!validaEmail(email));

      window.alert('Obrigado!');
    }

    //  Adiciona um <small> no campo do Whatsapp
    document.querySelector('#whatsapp').addEventListener('focus', () => {
      small.innerHTML = '(somente números)';

      document.querySelector('label[for="whatsapp"]').appendChild(small);
    });

    //  Remove o <small> do campo do Whatsapp
    document.querySelector('#whatsapp').addEventListener('blur', () => {
      document.querySelector('label[for="whatsapp"]').removeChild(small);
    });

    //  Evita que o usuario digite algo além de números no Whatsapp
    document.querySelector('#whatsapp').onkeypress = function (event) {
      const number = event.charCode;
      if (!(number >= 48 && number <= 57)) {
        event.preventDefault();
      }
    };

    //  Avisa o usuário se ele não preencher o custo do horário
    document.querySelector('#cost').addEventListener('blur', () => {
      const cost = $('cost').value;

      if (cost === '') {
        window.alert('Por favor informe o custo do seu horário');
      }
    });

    //  Evita que o usuario digite algo além de números no custo da hora
    document.querySelector('#cost').onkeypress = function (event) {
      const number = event.charCode;
      if (!(number >= 48 && number <= 57)) {
        event.preventDefault();
      }
    };

    document.querySelector('#create-class').onsubmit = function () {
      if (!isAtLeastOneInstrumentSelected(instrumentosCheck)) {
        window.alert('Ops! Você esqueceu de selecionar os intrumentos');
        return false;
      }

      //  Capitura os valores do campo do formulário para cadastrar no banco
      const name = document.querySelector('#name').value.toUpperCase();
      const avatar = document.querySelector('#avatar').value;
      const whatsapp = document.querySelector('#whatsapp').value;
      const bio = document.querySelector('#bio').value.toLowerCase();
      const instruments = [];

      //  Adiciona apenas os Instrumentos checked
      for (let i = 0; i < instrumentosCheck.length; i += 1) {
        if (instrumentosCheck[i].checked) {
          instruments.push(instrumentosString[i]);
        }
      }

      const cost = document.querySelector('#cost').value;
      const weekday = $('weekday').selectedIndex;
      const timeFrom = $('time_from').value;
      const timeTo = $('time_to').value;

      const musico = new Musico(database.sequenceId('musicos'), name, avatar, whatsapp, bio, instruments, cost, weekday, timeFrom, timeTo);
      database.saveItemArray('musicos', musico);

      // VsCode
      window.location.href = '/assets/resources/pages/cadastro-concluido.html';

      // GitHub
      // window.location = `/decag/assets/resources/pages/cadastro-concluido.html`;

      return false;
    };
  };
}());

//  Adiciona um <small> no campo do Link da sua foto
const small = document.createElement('small');

function mostraInfo(input) {
  small.innerText = '(comece com https://)';
  document.querySelector(`label[for="${input}"]`).appendChild(small);
  document.querySelector('#avatar').setAttribute('value', 'https://');
}

//  Retira o <small> do campo do Link da sua foto
function retiraInfo(input) {
  document.querySelector(`label[for="${input}"]`).removeChild(small);
  document.querySelector('#avatar"').setAttribute('value', '');
}
