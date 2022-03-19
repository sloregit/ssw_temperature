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
var media = [];
function calcolaMediaTemp() {
  leCitta.map((città, i) => {
    const tempRequest = new XMLHttpRequest();
    tempRequest.onload = () => {
      if (tempRequest.status === 200) {
        var dataObject = JSON.parse(tempRequest.response);

        return media.push(dataObject.main.temp);
      } else {
        console.log(tempRequest.status);
        risposta.innerText = 'Errore';
      }
    };

    tempRequest.open('GET', URL + città, true);
    tempRequest.send();
  });
  risposta.innerHTML = media;
}
console.log(media);

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
