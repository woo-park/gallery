

document.addEventListener('DOMContentLoaded', function (){
  console.log('clientside script begins');
  console.log(findText(document.body, 'Home'));

});



function findText(node, search) {
  if (node.nodeType === document.TEXT_NODE) {
      return node.nodeValue.indexOf(search) > -1; //-1 when not found
  } else if (node.nodeType === document.ELEMENT_NODE) {
      for (let i = 0; i <node.childNodes.length; i++) {
          if (findText(node.childNodes[i], search)) {
                return true;
          }
      }
      return false;
  }

}
