'use strict';

const update = function update() {
  const instrumentos = JSON.parse(localStorage.getItem('instrumentos'));
  const filterInstrumentos = document.getElementsByName('subject');
  const musico = database.getArray('musicos');

  for (let i = 0; i < instrumentos.length; i += 1) {
    const option = document.createElement('option');
    option.setAttribute('id', i);
    option.innerHTML = instrumentos[i];
    filterInstrumentos[0].appendChild(option);
  }
  if (musico.length > 0) {
    //  VsCode
    window.location = '/assets/resources/pages/procurar-musicos.html';

    // GitHub
    // window.location = '/decag/assets/resources/pages/procurar-musicos.html';
  }

  const info = document.getElementsByTagName('p');

  const pageHeader = document.querySelector('.page-header');

  pageHeader.addEventListener('mouseout', () => {
    info[1].setAttribute('id', 'change-visibility');
  });
  pageHeader.addEventListener('mouseover', (event) => {
    info[1].removeAttribute('id');
    info[1].innerHTML = 'Nenhum músico encontrado, atualize a página em alguns minutos<br><br><br>'
      + 'posição do mouse: ' + event.clientX + ' x ' + event.clientY;
  });

  const horario = function horario() {
    const d = new Date();
    const t = d.toLocaleTimeString();
    document.querySelector('.hour').innerHTML = t;
  };

  setInterval(horario, 1000);
};
