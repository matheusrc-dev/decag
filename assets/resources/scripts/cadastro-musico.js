'use strict';

(function () {
  const emailConfirm = window.confirm('Deseja receber atualizações por email?');
  let email;
  const small = document.createElement('small');
  const form = document.forms[0];

  //  Adiciona os instrumentos no array
  const instrumentosVector = document.getElementsByName('instrumentCheck');
  const instrumentosQtd = instrumentosVector.length;
  const instrumentosString = [];

  const $ = function $(id) {
    return document.getElementById(id);
  };

  //  Função que verifica se existe ao menos um intrumentos selecionado
  const isAtLeastOneInstrumentSelected = function isAtLeastOneInstrumentSelected(instruments) {
    for (let i = 0; i < instruments.length; i += 1) {
      if (instruments[i].checked) {
        return true;
      }
    }
    return false;
  };

  //  Adiciona os intrumentos do label no Array de instrumentosString como String
  for (let i = 0; i < instrumentosQtd; i += 1) {
    instrumentosString.splice(i, 1, document.querySelector(`label[for="instrumentCheck${[i]}"]`).innerText.trim());
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
    form.whatsapp.addEventListener('focus', () => {
      small.innerHTML = '(somente números)';

      document.querySelector('label[for="whatsapp"]').appendChild(small);
    });

    //  Remove o <small> do campo do Whatsapp
    form.whatsapp.addEventListener('blur', () => {
      document.querySelector('label[for="whatsapp"]').removeChild(small);
    });

    //  Evita que o usuario digite algo além de números no Whatsapp
    form.whatsapp.onkeypress = function (event) {
      const number = event.charCode;
      if (!((number >= 48 && number <= 57) || (number === 45))) {
        event.preventDefault();
      }
    };

    //  Campo com valor padrão da BIOGRAFIA
    form.bio.value = 'Olá me chamo..';

    //  Avisa o usuário se ele não preencher o custo do horário
    form.cost.addEventListener('blur', () => {
      const cost = $('cost').value;

      if (cost === '') {
        window.alert('Por favor informe o custo do seu horário');
      }
    });

    //  Evita que o usuario digite algo além de números no custo da hora
    form.cost.onkeypress = function (event) {
      const number = event.charCode;
      if (!(number >= 48 && number <= 57)) {
        event.preventDefault();
      }
    };

    //  Faz a validação e o envio do formulário ONSUBMIT
    form.onsubmit = () => {
      if (!isAtLeastOneInstrumentSelected(instrumentosVector)) {
        window.alert('Ops! Você esqueceu de selecionar os intrumentos');
        return false;
      }

      //  Captura os valores do campo do formulário para cadastrar no banco
      const name = form.name.value.toUpperCase();
      const avatar = form.avatar.value;
      const whatsapp = form.whatsapp.value;
      const bio = form.bio.value.toLowerCase();
      const instruments = [];

      //  Adiciona apenas os Instrumentos checked
      for (let i = 0; i < instrumentosQtd; i += 1) {
        if (instrumentosVector[i].checked) {
          instruments.push(instrumentosString[i]);
        }
      }

      const cost = form.cost.value;
      const weekday = form.weekday.selectedIndex;
      const timeFrom = form.time_from.value;
      const timeTo = form.time_to.value;

      //  Adiciona o horário e dia da semana em Schedule
      const schedule = new Schedule(weekday, timeFrom, timeTo);

      //  Outros atributos no objeto musico
      const musico = new Musico(database.sequenceId('musicos'), name, avatar, whatsapp, bio, instruments, cost);
      musico.addSchedule(schedule);

      database.saveItemArray('musicos', musico);

      // VsCode
      // window.location.href = '/assets/resources/pages/cadastro-concluido.html';

      // GitHub
      window.location = '/decag/assets/resources/pages/cadastro-concluido.html';

      return false;
    };
  };
}());

//  Adiciona um <small> no campo do Link da sua foto
const small = document.createElement('small');

const mostraInfo = function mostraInfo(input) {
  small.innerText = '(comece com https://)';
  document.querySelector(`label[for="${input}"]`).appendChild(small);
  document.querySelector('#avatar').setAttribute('placeholder', 'https://');
};

//  Retira o <small> do campo do Link da sua foto
const retiraInfo = function retiraInfo(input) {
  document.querySelector(`label[for="${input}"]`).removeChild(small);
  document.querySelector('#avatar').setAttribute('placeholder', '');
};
