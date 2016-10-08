var main = document.querySelector('.main');

function parseTalkData(data) {
   var list = document.createElement('ul');
   list.className = 'talks_list';

   data.detailLines.forEach(function(talk) {
      var listItem = document.createElement('li');
      listItem.className = 'talks__listItem';
      listItem.innerText = talk.title;

      list.appendChild(listItem);
   });

   main.innerHTML = list.outerHTML;
}

fetch('data/talks.json')
    .then(function(response) {
        return response.json();
    })
    .then(parseTalkData);