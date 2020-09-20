function update() {
    let instrumentos = JSON.parse(localStorage.getItem('instrumentos'));
    let filterInstrumentos = document.getElementsByName('subject');

    for (let i in instrumentos) {
        let option = document.createElement('option');
        option.setAttribute('id', i);
        option.innerHTML = instrumentos[i];
        filterInstrumentos[0].appendChild(option);
    }
    let musico = database.getArray('musicos');
    if (musico.length > 0) {
        window.location = "/assets/resources/pages/procurar-musicos.html";
    }

    let info = document.getElementsByTagName('p');

    // setInterval(()=>{
    //     info[1].setAttribute('id', 'change-visibility');
    //     removeAtt(info[1], 'id');
    // }, 2000);

    let pageHeader = document.querySelector('.page-header');

    pageHeader.addEventListener('mouseout', () => {
        info[1].setAttribute('id', 'change-visibility');


    });
    pageHeader.addEventListener('mouseover', (event) => {
        info[1].removeAttribute('id');
        info[1].innerHTML = "Nenhum músico encontrado, atualize a página em alguns minutos<br><br><br>" 
        +"posição do mouse: "+ event.clientX + " x " + event.clientY;
        
        console.log(event.clientX, event.clientY);
    });


    setInterval(horario, 1000);

    function horario() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.querySelector('.hour').innerHTML = t;
    }

}


