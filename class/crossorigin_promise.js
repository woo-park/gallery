const url = 'https://api.github.com/users/foureyes/repos'

getRepos(url);
function getRepos(url){
  // 1
  const xhr = new XMLHttpRequest();

  // 2
  xhr.open('GET', url)

  // 3 a and b .. specify what to do on success and error
  xhr.addEventListener('load', () => {
    if(xhr.status >= 200 && xhr.status <300) {
      const result = JSON.parse(xhr.responseText);
      console.log(result)
    } else {
      console.log('got error response code');
    }
  });
  xhr.addEventListener('error',() => {
    console.log('error getting data')
  })

  xhr.send() //!dont forget!
}



/*
'session id inside cookie '
'access-control-allow-origin: *' -- if this is specified..

=> Same Origin Policy
=> SOP policy impolemented by the client(your browser)
=> if making request to different 'origin' (protocol, domain, port)
  => cannot read the response w/ javascript
  =>
=> if you want cross origin resource sharing (CORS)
  (u want to access some resource that's at a different origin)
  * browser implements SOP
  * server sends back a header
  * browser's sop will respect whatever heder is sent back
    * if the header is

if theres an api
it doesn't have CORS headers
how can you make your front end be able to access to that api

1.solution
  scrape date and store in your own db..
  serve an api based on that from your same origin
  * may go against the terms of services
  * data may end up stale, so repeat scrape maybe?
  * now you'll have to host that data

2.solution
  *proxy request through some other backend?
  * your server serves an api
  that api makes a server-side request to some other api
  frontend ----> server -----> some other api
  SOP ^^^            ^^^ No SOP
  * advanatage over this over scraping, is that you will always have the latest data
  * you wont have to store that data
  * (is this a Terms Of Service(TOS) issue?)


// chat application
// single page webapp
// |___| send
// message #1
// message #2
// hi

// |__hi_| send
// message #1
// message #2

// client side solution
// somwhere along the line, we are making a background request
// a continuos background request - poll using background requests

//setTimeout --> call a function, after x ms
//setInterval --> call every x ms

// mimicking a real time chat

// function getMessages() {
//   xhr stuff here
//   xhr.addEventListener('load', () => {
//     setTimeout(getMessages, 1000);
//   })
//  // also define handleerror - maybe settimeout in here as well?
//   xhr.addEventListener('error', () => {
    call get messages on.. error
}
// }
//
// getMessages();


AJAX polling
* client is using up a lot of resources OR
* if we make delay longer, then there's lag

PROMISES
* typical strategy -- create a callback

- object that represents an async task:
  *retrieving a url
  * writing a database
- a promise can have state:
  * pending ... async hasn't completed yet(db write still going on, still trying to get url)
  * resolved .. async task has completed succesfully (write commited to db, response retrieved from url)
  * rejected .. async failed (db could not write, network error, - couldn't make request)


  //creating a promise:
    //single argument:
    // a function - the executer ... the function that actually runs something that's async
    // this execturor function ... has two other functions as arguments
    // * fullfill - gets called if successful
    // * reject   - gets called if failed
    // both take a value ... the result of the async task (as a sucess or a failure)

    // promise object has methods:
      .then ... and it takes two aruments
    1st is what fullfill will be
    2nd is what reject will be

    even ..
  const p = new Promise((fullfill, reject) => {
    console.log('begin');
    fullfill(1);    // or reject(1)
    console.log('end');
    //some async stuff is going on

    //write to a database
    // write failed... then call reject('err message');
    write successful... then call fullfill(someVal);

  });
  p.then(console.log, (val) => {console.log('ERROR', val)})

  // WE WILL GET
  // begin
  // end
  // 1


*/

//make nicer api for using XMLHttpRequest.. using promise!
// get(url) ---> promise
// call.then to specify what happens when it's done

function get(url) {
  return new Promise((fullfill, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function (){
      //promise succeeded, call fullfill
      fullfill(xhr.responseText);
    });
    xhr.addEventListener('error');
    xhr.send();

  })
}

const url = 'https://api.github.com/users/foureyes/repos'
const p = get(url)
p.then((val) => console.log('got response', val));

//gosh fullfill is the same thing as resolve

const p1 = new Promise((fullfill, reject) => {
  fullfill(1)   //same thing as resolve(1) and whatever that's inside resolve gets passed on to the 'fullfilled callback'
})

const p2 = p1.then(val => {
  console.log(val)
  return new Promise((fullfill, reject)=>{
    fullfill(val + 1);
  })
})   //then returns another promise

p2.then(console.log)
//


// async function getREpos() {
//   const response = await fetch(url)
//   const json = await response.json();
//   console.log(json);
// }


// my note
/*
var promise1 = new Promise(function(resolve, reject) {
  console.log('before')
  setTimeout(()=>{
  	console.log('still before, 1000');
    resolve('still before innn, 1000');
  }, 1000);
  setTimeout(function() {
    resolve('foo, 300');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]



=> what's shown -- remember that once it is resolved, next resolved is ignored

> "before"
> [object Promise]
> "still before, 1000"
> "still before innn, 1000"

*/
