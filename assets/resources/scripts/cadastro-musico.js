/* eslint-disable no-undef */

'use strict';

(function () {
  const emailConfirm = window.confirm('Deseja receber atualizações por email?');
  let email;
  const small = document.createElement('small');
  const form = document.forms[0];
  const schedules = new Array(8);

  //  Adiciona os instrumentos no array
  const instrumentosVector = $('#create-class .form-check-input');
  const instrumentosQtd = instrumentosVector.length;
  const instrumentosString = [];

  const $$ = function $$(id) {
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

  //  Colocar os valores no web storage atraves da classe instrumentoo
  localStorage.setItem('instrumentos', JSON.stringify(instrumentosString));

  window.onload = function () {
    $('.input-block +button').css({
      width: '100%',
      height: '5.6rem',
      background: 'var(--color-primary-dark)',
      color: 'var(--color-button-text)',
      border: '0',
      'border-radius': '.8rem',
      cursor: 'pointer',
      font: '300 1.6rem Archivo',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'text-decoration': 'none',
      transition: '0.2s',
      'margin-top': '3.2rem',
    });

    function showAddedSchedule(schedule) {
      const div = document.createElement('div');
      //  Jquery adiciona elemento div abaixo do horário com fadeIn()

      $(div).html(`Dia da semana: ${schedule.weekdays} Das: ${schedule.timeFrom} Até ${schedule.timeTo}
      &nbsp<img src="../images/icons/delete.png" onclick="removeSchedule()">`);
      $(div).css('display', 'none');
      $(div).addClass('addedHour');
      $('#schedule-items').append(div);
      $('.addedHour').fadeIn(1000).show();
    }

    let counterHours = 0;
    $$('addSchedule').addEventListener('click', () => {
      if (form.weekday.selectedIndex === 0 || form.time_from.value === '' || form.time_to.value === ''
      || schedules[form.weekday.selectedIndex] !== undefined) {
        window.alert('[Warning] - Reveja seu horário, ou você esqueceu algum campo ou este dia da semana já existe');
        return;
      }

      if (counterHours < 7) {
        const weekday = form.weekday.selectedIndex;
        const timeFrom = form.time_from.value;
        const timeTo = form.time_to.value;

        //  Adiciona o horário e dia da semana em Schedule
        const schedule = new Schedule(weekday, timeFrom, timeTo);
        schedules[weekday] = schedule;
        showAddedSchedule(schedule);
        counterHours += 1;
      } else {
        window.alert('Você pode inserir no máximo 7 horarios!!!');
      }
    });

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
    $('#whatsapp').on('focus', () => {
      small.innerHTML = '(somente números)';
      //  Adiciona Utilizando JQUERY
      $('label[for="whatsapp"]').append(small);
      $('small').show();
    });

    //  Remove o <small> do campo do Whatsapp com JQUERY
    $('#whatsapp').on('blur', () => {
      $('small').hide();
    });

    //  Evita que o usuario digite algo além de números no Whatsapp
    form.whatsapp.onkeypress = function (event) {
      const number = event.charCode;
      if (!((number >= 48 && number <= 57) || (number === 45))) {
        event.preventDefault();
      }
    };

    //  Campo com valor padrão da BIOGRAFIA com JQUERY
    $('#bio').text('Olá me chamo..');

    //  Avisa o usuário se ele não preencher o custo do horário
    $('#create-class').find('#cost').on('blur', () => {
      const cost = $$('cost').value;

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
      const bio = form.bio.value;
      const instruments = [];

      //  Adiciona apenas os Instrumentos checked
      for (let i = 0; i < instrumentosQtd; i += 1) {
        if (instrumentosVector[i].checked) {
          instruments.push(instrumentosString[i]);
        }
      }

      const cost = form.cost.value;

      //  Outros atributos no objeto musico
      const musico = new Musico(database.sequenceId('musicos'), name, avatar, whatsapp, bio, instruments, cost, schedules);

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

// eslint-disable-next-line no-unused-vars
const mostraInfo = function mostraInfo(input) {
  small.innerText = '(comece com https://)';
  document.querySelector(`label[for="${input}"]`).appendChild(small);
  document.querySelector('#avatar').setAttribute('placeholder', 'https://');
};

//  Retira o <small> do campo do Link da sua foto
// eslint-disable-next-line no-unused-vars
const retiraInfo = function retiraInfo(input) {
  document.querySelector(`label[for="${input}"]`).removeChild(small);
  document.querySelector('#avatar').setAttribute('placeholder', '');
};
