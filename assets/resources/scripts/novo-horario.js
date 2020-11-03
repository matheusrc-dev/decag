'use strict';

const listOfTime = [];
let cloneTime;

const $ = function $(id) {
  return document.getElementById(id);
};

(function () {
  //  Adiciona o evento de click para adicionar outro horário
  $('add-time').addEventListener('click', () => {
    if (listOfTime.length <= 5) {
      cloneTime = document.querySelector('.schedule-item').cloneNode(true);
      cloneTime.innerHTML = `
        <div class="select-block">
            <label for="weekday">Dia da semana</label>
            <select name="weekday" id="weekday" required>
            <option value="">Selecione um dia da semana</option>
            <option value="">Segunda</option>
            <option value="">Terça</option>
            <option value="">Quarta</option>
            <option value="">Quinta</option>
            <option value="">Sexta</option>
            <option value="">Sabado</option>
            <option value="">Domingo</option>
            </select>
        </div>

        <div class="input-block">
            <label for="time_from">Das</label>
            <input type="time" name="time_from" id="time_from" required>
        </div>

        <div class="input-block">
            <label for="time_to">Até</label>
            
            <img class = "delete-icon" onclick = 'removeTime()' src="../images/icons/delete.png" alt="Delete icon">
            <input type="time" name="time_to" id="time_to" required>
        </div>
        
        `;

      //  Coloca o novo horário no Array de horários
      listOfTime.push(cloneTime);

      //  Adiciona o novo horário na page
      document.getElementById('schedule-items').appendChild(cloneTime);
    } else {
      return false;
    }
  });
}());

function removeTime() {
  //  Remove o horário do Array
  const itemRemoved = listOfTime.pop();

  //  Remove o horário da page
  document.getElementById('schedule-items').removeChild(itemRemoved);
}
