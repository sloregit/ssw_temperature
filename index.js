// Import stylesheets
import './style.css';

//modificata api key con quella personale
const apiKey = 'e6f38b0049fc0177522baf2baa00026f';
//oggetto request
const leCitta = ['Genova', 'Milano', 'Torino', 'Roma', 'Lucca'];
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' +
  apiKey +
  '&units=metric&q=';

const risposta = document.getElementById('risposta');
//Tasto per il calcolo della media Es.4
const buttonMedia = document.getElementById('media');
buttonMedia.addEventListener('click', calcolaMediaTemp);

leCitta.map((citta) => {
  const btn = document.createElement('button');
  btn.innerHTML = citta;
  btn.addEventListener('click', () => display(btn.innerHTML));
  btn.addEventListener('mouseenter', function () {
    this.style.backgroundColor = 'lightblue';
  });
  btn.addEventListener('mouseleave', function () {
    this.style.backgroundColor = 'inherit';
  });
  const item = document.createElement('li');
  item.appendChild(btn);
  document.getElementById('citta').appendChild(item);
});

//Es.4 calcolo della media
function calcolaMediaTemp() {
  let media = 0;
  let i = 1; // utilizzato perché l'indice di .map non è lineare(vedi j in console log)
  leCitta.map((città, j) => {
    const tempRequest = new XMLHttpRequest();
    tempRequest.onload = () => {
      if (tempRequest.status === 200) {
        var dataObject = JSON.parse(tempRequest.response);
        media = media + dataObject.main.temp;
        console.log('indice j .map: ' + j);
        i === leCitta.length
          ? (risposta.innerHTML =
              'le media delle temperature è: ' + media / leCitta.length)
          : i++;
      } else {
        console.log(tempRequest.status);
        risposta.innerText = 'Errore';
      }
    };
    tempRequest.open('GET', URL + città, true);
    tempRequest.send();
  });
}

// Funzione collegata ai bottoni
function display(c) {
  const request = new XMLHttpRequest();
  // Funzione callback invocata quando la request termina
  request.onload = () => {
    // funzione definita arrow
    if (request.status === 200) {
      var dataObject = JSON.parse(request.response);
      risposta.innerHTML =
        new Date().toISOString() +
        '</br>' +
        'A ' +
        c +
        ' ci sono ' +
        dataObject.main.temp +
        ' gradi' +
        '</br>' +
        'La pressione è di: ' +
        dataObject.main.pressure +
        ' hPa';
    } else {
      risposta.innerText = 'Errore';
    }
  };
  request.open('GET', URL + c, true);
  request.send();
  console.log(new Date().toISOString() + ': Finito');
}
