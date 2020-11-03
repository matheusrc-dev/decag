'use strict';

(function () {
  const form = document.forms[0];
  const { name } = form;
  const { avatar } = form;
  const { whatsapp } = form;
  const { bio } = form;
  const { cost } = form;
  const { weekday } = form;
  const timeFrom = form.time_from;
  const timeTo = form.time_to;

  //  Mensagem de Erro do campo NAME
  name.addEventListener('invalid', () => {
    if (name.validity.valueMissing) {
      name.setCustomValidity('Por favor preencha o campo com seu nome');
    } else {
      name.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo AVATAR
  avatar.addEventListener('invalid', () => {
    if (avatar.validity.valueMissing) {
      avatar.setCustomValidity('Insira uma URL válida para sua foto de avatar');
    } else {
      avatar.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo WHATSAPP
  whatsapp.addEventListener('invalid', () => {
    if (whatsapp.validity.valueMissing) {
      whatsapp.setCustomValidity('Preecha o campo com seu WHATSAPP');
    } else {
      whatsapp.setCustomValidity('');
    }

    if (whatsapp.validity.patternMismatch) {
      whatsapp.setCustomValidity('Corriga para o formato 4299999-9999');
    } else {
      whatsapp.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo BIO
  bio.addEventListener('invalid', () => {
    if (bio.validity.valueMissing) {
      bio.setCustomValidity('Insira alguma descrição');
    } else {
      bio.setCustomValidity('');
    }

    //  Mensagem de Erro do campo BIO quando o tamanho é menor que 10 char
    if (bio.validity.tooShort) {
      bio.setCustomValidity('Sua descrição está muito curta, fale mais sobre você!');
    } else {
      bio.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo COST
  cost.addEventListener('invalid', () => {
    if (cost.validity.valueMissing) {
      cost.setCustomValidity('Informe um valor para sua hora');
    } else {
      cost.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo WEEKDAY
  weekday.addEventListener('invalid', () => {
    if (weekday.validity.valueMissing) {
      weekday.setCustomValidity('Por favor escolha um dia da semana');
    } else {
      weekday.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo timeFrom
  timeFrom.addEventListener('invalid', () => {
    if (timeFrom.validity.valueMissing) {
      timeFrom.setCustomValidity('Informe qual horário você está disponível');
    } else {
      timeFrom.setCustomValidity('');
    }
  });

  //  Mensagem de Erro do campo timeFrom
  timeTo.addEventListener('invalid', () => {
    if (timeTo.validity.valueMissing) {
      timeTo.setCustomValidity('Informe qual horário você não está mais disponível');
    } else {
      timeTo.setCustomValidity('');
    }
  });
}());
