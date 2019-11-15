const decode = function (rawInput) {

  const prepopsitions = [
      "About","Above","Across","After","Against","Along","Alongside","Amid","Among","Amongst","Anti","Around","As","At","Before","Behind","Below","Beneath","Beside","Besides","Between","Beyond","But","By","Circa","Concerning","Considering","Despite","Down","During","Except","Excepting","Excluding","Failing","Following","For","From","Given","In","Inside","Into","Like","Minus","Near","Of","Off","On","Onto","Per","Plus","Regarding","Round","Since","Than","Through","To","Toward","Towards","Under","Underneath","Unlike","Until","Up","Upon","Versus","Via","With","Within","Without","Worth"
  ];

  const pronouns = [
      "I","We","Me","Us","You","She","He","Her","Him","They","Them","It","That","Which","Who","Whom","Whose","Whichever","Whoever","Whomever","This","These","That","Those","Anybody","Anyone","Anything","Each","Either","Everyone","Everybody","Everything","Nobody","Neither","Nothing","Somebody","One","Someone","Something","Few","Many","Both","Several","Any","All","Some","Most","Myself","Yourself","Ourselves","Yourselves","Herself","Himself","Themselves","Itself","Who","What","Which","Whose","Whom","His"
  ];

  let conjunctions = [
    "And","As","Because","But","For","Just","Or","Neither","Nor","So","Whether","Yet","Also"
  ];

  let article = [
    "The","A","An","a","Its"
  ];

  let verb = [
    "Is","Was","Has","Been","Will","Be","Cannot","Can","Does","Did","Had","Have","Are"
  ];

  function filterArray(arg) {
    return arg.filter((each) => {

      if(article.indexOf(each) > -1) {
      } else if (prepopsitions.indexOf(each) > -1) {
      } else if (pronouns.indexOf(each) > -1) {
      } else if (conjunctions.indexOf(each) > -1) {
      } else if (verb.indexOf(each) > -1) {
      } else if (each.length <= 1){
      } else if (Number.isInteger(Number(each)) && each.length < 4){
      } else if (Number.isInteger(Number(each)) && each.length > 4){

      }
      else {
        return each;                                  // deleting the common words
      }
    });
  }

  // 1st handles the raw text with regex
  // convert to array
  // sort
  // filter
  // use Check function prototype had & add
  // return the object -> instance of Check proto

  function convertInput(rawInput) {
    const regexTest1 = /[^A-Za-z0-9-']/g;
    const regexText2 = /^\s+|\s+$|\s+(?=\s)/g;    // same as /\s\w/g;
    const regexText3 = /(\b[a-z](?!\s))/g;

    const converted1 = rawInput.replace(regexTest1, " ");  //change the match to white space



    const converted2 = converted1.replace(regexText2, "");

    // console.log('rawinput',rawInput);
    // console.log('1',converted1)
    // console.log('2',converted2)

    function upper(all) { return all.toUpperCase(); }

    const result = String(converted2.replace(regexText3, upper)); //to str

    return result
  }


  let convertedInput = convertInput(rawInput);
  let convertedInput_array = convertedInput.split(' ');

  // console.log('regex handled', convertedInput);
  // console.log('convertedToArray',convertedInput_array);

  function Check() {
    this.data = {};
    this.wordCount = 0;
    this.totalWordCount = 0;
    // this.duplicates = {};
    // this.increment = 0;
  }

  Check.prototype.has = function(item) {              //has method
    return typeof this.data[item] !== 'undefined';    //check if the word exists
  }
  Check.prototype.add = function(...item) {           //array of words
    this.totalWordCount++;
    // console.log('count of words => ',item.length);

    const addWord = (item) => {
      if(!this.has(item)) {
        this.data[item] = 0;
        this.wordCount++;
      }
      if(this.has(item)) {
        this.data[item] += 1;
      }
    }

    if(item.length > 1) {
      item.forEach(each => {
        addWord(each);                                //adding Word
      });
    }
    else {
      addWord(item);                                  //initiates
    }
  }

  const check = new Check();

  function sortArray(arg) {
      arg.sort(( a, b ) => {
          if( a < b ) { return -1;}
          if( a > b ) { return 1;}
          return 0;
      });
      return arg;
  }

  let sortedInput_array = sortArray(convertedInput_array)
  // console.log('sorted',sortedInput_array);

  let filteredInput_array = filterArray(sortedInput_array)
  // console.log('filtered',filteredInput_array);

  filteredInput_array.forEach(each => {
    check.add(each);
  });


  return check;
}


module.exports = decode;
