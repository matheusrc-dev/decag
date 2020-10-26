'use strict';

const $$ = function (name) {
  return document.getElementsByName(name);
};

function noResults() {
  // VsCode
  window.location = `${window.location.origin}/assets/resources/pages/no-results.html`;

  // GitHub
  // window.location = '/decag/assets/resources/pages/no-results.html';
}

(function () {
  const instrumentos = JSON.parse(localStorage.getItem('instrumentos'));
  const filterInstrumentos = $$('subject');
  const insertOnMain = document.getElementsByTagName('main');

  window.onload = function () {
    for (let i = 0; i < instrumentos.length; i += 1) {
      const option = document.createElement('option');
      option.setAttribute('id', i);
      option.innerHTML = instrumentos[i];
      filterInstrumentos[0].appendChild(option);
    }

    const musico = database.getArray('musicos');
    if (musico.length === 0) {
      noResults();
    }

    for (let i = 0; i < musico.length; i += 1) {
      const musicianItem = document.createElement('article');
      musicianItem.setAttribute('class', 'musician-item');
      musicianItem.innerHTML = `
            <header>
                <img
                  src="${musico[i].avatar}"
                  alt="${musico[i].name}">
                <div>
                  <strong>${musico[i].name}</strong>
                  <span>${musico[i].instruments}</span>
                </div>
              </header>
      
              <p>${musico[i].bio}</p>
      
              <div class="weekdays">
      
                <div id="segunda" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Segunda</strong><br>
                    <small>Horário</small><br>
                    <span id="segHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
      
                <div id="terca" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Terça</strong><br>
                    <small>Horário</small><br>
                    <span id="terHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
                <div id="quarta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Quarta</strong><br>
                    <small>Horário</small><br>
                    <span id="quarHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
                <div id="quinta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Quinta</strong><br>
                    <small>Horário</small><br>
                    <span id="quinHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
                <div id="sexta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Sexta</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
                <div id="sabado" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Sabado</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
                <div id="domingo" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Domingo</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[i].timeTo} - ${musico[i].timeFrom}</span>
                  </p>
                </div>
      
              </div>
      
      
      
              <footer>
                <p>Preço/hora<strong>R$ ${musico[i].cost},00</strong></p>
      
                <a href="https://api.whatsapp.com/send?l=pt_BR&phone=${musico[i].whatsapp}&text=Tenho interesse em te contratar para uma ocasião, ${musico[i].name}"
                  class="button" target="_blank">
                  <img src="../images/icons/whatsapp.svg" alt="WhatsApp">
                  Entrar em contato
                </a>
              </footer>`;
      insertOnMain[0].appendChild(musicianItem);
    }
  };
}());
