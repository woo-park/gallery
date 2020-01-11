
//add new item to end of list
var list = document.getElementsByTagName('ul')[0];

var newItemLast = document.createElement('li');
var newTextLast = document.createTextNode('Cream');
newItemLast.appendChild(newTextLast);
list.appendChild(newItemLast);

// add new item start of list
var newItemFirst = document.createElement('li');
var newTextFirst = document.createTextNode('kale');
newItemFirst.appendChild(newTextFirst);
list.insertBefore(newItemfirst, list.firstChild);

//add a class of cool to all list items
var listItems = document.querySelectorAll('li');

var i;
for (i = 0; i < listItems.length; i ++) {
  listItems[i].className = 'cool';
}

//add number of items in the list to the heading
var heading = document.querySelector('h2');
var headingText = heading.firstChild.nodeValue;
var totalItems = listItems.length;
var newHeading = headingText + '<span>' + totalItems + '</span>';
heading.innerHTML = newHeading;


//accessing text only  //page 217
var firstItem = document.getElementById('one');
var showTextContent = firstItem.textContent;
var showInnerText = firstItem.innerText;
//show the content of these two properties at the end of the list
var msg = '<p>textContent:' + showTextContent + '</p>';
    msg += '<p>innerText: ' + showInnerText + '</p>';
var el = document.getElementById('scriptResults');
el.innerHTML = msg;

firstItem.textContent = 'sourdough bread';

//accessing and changing a text node
var itemTwo = document.getElementById('two');
var elText = itemTwo.firstChild.nodeValue;    //get its text content

elText = elText.replace('pine nuts','kale');    //changing pinenuts to kale
itemTwo.firstChild.nodeValue = elText;      //updating the list item



getElementById();
querySelector()

getElementsByClassName();
getElementsByTagName()
querySelectorAll()

parentNode
previousSibling / nextSibling
firstChild / lastChild

nodeValue

innerHTML

textContent

createElement()
createTextNode()
appendChild() / removeChild()

attribute
className /
