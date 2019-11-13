//

document.addEventListener('DOMContentLoaded', function(){
  main();
});

function main() {

  const btn = document.querySelector('input[type=submit]');
  btn.addEventListener('click',function(evt){
    const textInput = document.querySelector('input[type =text]');  //bad but its good for practice... it will grab all the type = text
    console.log(textInput)

    const teaName = textInput.value;

    const url = `https://api.github.com/teas/add`;




    getRepos();
    evt.preventDefault();

    console.log(btn);
  });
}

function getRepos(url){
  // 1.
  const xhr = new XMLHttpRequest();

  // 2.
  xhr.open('GET', url);
  //succeeds

  // 3.
  xhr.addEventListener('load', () => handleData(xhr) );


  // 3.5  //look at this again -
  xhr.setRequestHeader('Content-Type', 'x-www-....');

  // 4.
  xhr.addEventListener('error', handleError);//was this not able to connect at all?

  // 5.
  xhr.send()


}

function handleData(xhr) {
  // xhr.status    //first check the status- whether data is retrieved
  if (xhr.status >= 200 && xhr.status < 300) {

    const data = JSON.parse(xhr.responseText)
    console.log(data);
    const ul = document.createElement('ul');
    for (const repo of data) {      //array objects, so we loop and get obj.name
      console.log(repo.name)
      const li = document.createElement('li');
      li.textContent = repo.name;
      ul.appendChild(li);
    }
    document.body.appendChild(ul);
    //do remove child if you want to clear the list => above
    //or or create div with id =>


    // console.log(xhr.responseText);
  } else {
    console.log('did not get 2xx')
  }

}

function handleError() {
  console.log('could not make request')
}


/*
console.log(url)
// 1.
const req = new XMLHttpRequest();

// 2. configure(does not actually send
req.open('GET', url);
)


// 3.what to do on success(and erorr)
req.addEventListener('load', function() {
  //once we get response backk....
  // out object, req, will have status and responseText
  // check req.status for 200
  // use response Text
  if(req.status >= 200 && req.status < 300) {
    console.log(req.responseText)
  } else {
    alert('did not get 2xx');
  }
});

// 4 req.send() to actually send it
req.send()
*/
