
//server
// on
// emit

//client
// on
// emit

//io.on('connection', sock => {...})    //exception..kinda

let lastSentDate;

/*
instead of:

get(url, callback)
get(url)
  .then(someFunction)

fetch(url)
  .then(response => response.json())    // when fetch resolves, f is called with response object
              // response object has methods, like .json... parses the response as json
  .then(g)    // when .json is resolved,


*/

async function getMessages() {      //async await - for promise - while you wait for promise - you can do other things

  function addToDom(messages) {
    for (const m of messages) {
      const div = document.body.appendChild(document.createElement('div'));
      div.textContent = m.sent + ' ' + m.text;
    }

    lastSentDate = messages[messages.length - 1].sent     //hmmm
  }

  let url = 'api/messages';
  if (lastSentDate) {
    url = url + '?lastSentDate=' + lastSentDate;
  }

  const res = await fetch(url); //while waiting you can do other things   //await is a pause btn
  // if (res.status ) ...blah can be checked
  const messages = await res.json();
  addToDom(messages);

  setTimeout(getMessages, 1000);    //recursive callback
}


function handleClick(evt) {
  // 1.get the value from the text input, #message
  const message = document.querySelector('#message').value;


  const xhr = new XMLHttpRequest();

  // 3. configure the request
  xhr.open('POST', 'api/message');

  //4. Setting the data -- name = value pair
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


  console.log('POSTING', message);
  res.send(`message=${message}`);


}   //we want a post request












//promise and async VS traditional XMLHttpRequest








function getMessages() {

  let url = 'api/messages';
  if (lastSentDate) {
    url = url + '?lastSentDate=' + lastSentDate;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);     //we get back json

  xhr.addEventListener('load', function() {
    if(xhr.status >= 200 && xhr.status < 300) {
      const messages = JSON.parse(xhr.responseText)

      for (const m of messages) {
        const div = document.body.appendChild(document.createElement('div'));
        div.textContent = m.sent + ' ' + m.text;
      }

      lastSentDate = messages[messages.length - 1].sent     //hmmm
    }


  });
  setTimeout(getMessages, 1000);    //recursive callback

  xhr.send
}

function handleClick(evt) {
  // 1.get the value from the text input, #message
  const message = document.querySelector('#message').value;


  const xhr = new XMLHttpRequest();

  // 3. configure the request
  xhr.open('POST', 'api/message');

  //4. Setting the data -- name = value pair
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


  console.log('POSTING', message);
  res.send(`message=${message}`);


}   //we want a post request
