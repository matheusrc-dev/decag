let $$ = function (name) {
    return document.getElementsByName(name);
};

function noResults() {
    // VsCode
    // window.location = `${location.origin}/assets/resources/pages/no-results.html`;

    // GitHub
    window.location = `/decag/assets/resources/pages/no-results.html`;

}

(function ($$) {
    let instrumentos = JSON.parse(localStorage.getItem('instrumentos'));
    let filterInstrumentos = $$('subject');
    let insertOnMain = document.getElementsByTagName('main');

    window.onload = function () {
        for (let i in instrumentos) {
            let option = document.createElement('option');
            option.setAttribute('id', i);
            option.innerHTML = instrumentos[i];
            filterInstrumentos[0].appendChild(option);
        }

        let musico = database.getArray('musicos');
        if(musico.length == 0) {
            noResults();
        }

        for (let m in musico) {
            let musicianItem = document.createElement('article');
            musicianItem.setAttribute('class', 'musician-item');
            musicianItem.innerHTML = `
            <header>
                <img
                  src="${musico[m].avatar}"
                  alt="${musico[m].name}">
                <div>
                  <strong>${musico[m].name}</strong>
                  <span>${musico[m].instruments}</span>
                </div>
              </header>
      
              <p>${musico[m].bio}</p>
      
              <div class="weekdays">
      
                <div id="segunda" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Segunda</strong><br>
                    <small>Horário</small><br>
                    <span id="segHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
      
                <div id="terca" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Terça</strong><br>
                    <small>Horário</small><br>
                    <span id="terHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
                <div id="quarta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Quarta</strong><br>
                    <small>Horário</small><br>
                    <span id="quarHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
                <div id="quinta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Quinta</strong><br>
                    <small>Horário</small><br>
                    <span id="quinHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
                <div id="sexta" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Sexta</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
                <div id="sabado" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Sabado</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
                <div id="domingo" class="day-item">
                  <p>
                    <small>Dia</small><br>
                    <strong>Domingo</strong><br>
                    <small>Horário</small><br>
                    <span id="sexHr">${musico[m].time_to} - ${musico[m].time_from}</span>
                  </p>
                </div>
      
              </div>
      
      
      
              <footer>
                <p>Preço/hora<strong>R$ ${musico[m].cost},00</strong></p>
      
                <a href="https://api.whatsapp.com/send?l=pt_BR&phone=${musico[m].whatsapp}&text=Tenho interesse em te contratar para uma ocasião, ${musico[m].name}"
                  class="button" target="_blank">
                  <img src="../images/icons/whatsapp.svg" alt="WhatsApp">
                  Entrar em contato
                </a>
              </footer>`;
               insertOnMain[0].appendChild(musicianItem);
        }
    }
})($$);
