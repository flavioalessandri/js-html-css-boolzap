// --------------------------------------------------------------
// SendMessage Function-----------------------------
function sendMessageFunction(){
  var input = $('#sendMessage');
  input.keyup(valueFromInput); //get a value from input after press "ENTER"
  input.keydown(upperCaseKeydown); //trigger SHIFT keydown to type Uppercase letters
  input.keyup(automaticReply); // get an automatic reply 1 second after press "ENTER"
}

// SendMessage -\- valueFromInput----------
function valueFromInput(event){ //this function need the event object
  var key = event.which;// return the ascii number of the pressed key
  console.log("Codice tasto", event.which);

  var input = $(this);// (this) si riferisce a $('#sendMessage'). elemento su cui si scatena evento
  var txt = input.val(); //get the input value

  if(key == 13 && txt){ //trigger the function when ENTER is keyup
  console.log("la parola è:" , txt); // if txt is empty no message will be sent

  input.val(''); //clean the value in the input space
  myMessage(txt); //invoke a new function NOT ANONYMOUS
  }
}

// SendMessage -\- -valueFromInput-\--myMessage---------
function myMessage(txt){
  console.log(txt, "log txt");
  var template=$('#message_sent > div').clone(); //get the CLONE of the DIV under TEMPLATE (hidden folder)
  // when we use clone() we can modify the element copy without touch the original
  var target = $('#chat_board');

  console.log("template",template);
  console.log("myMessage", txt);

  // The .find() and .children() methods are similar, but children only travels a single level down the DOM tree

  template.find('.content').text(txt);//search the element with class "content" overwriting the text
  template.find('#date').text(getNewTime()); //search the element with class "date" overwriting the text  with the current date

  target.append(template);
}

// SendMessage -\--valueFromInput-\--myMessage-\--getNewTime-----
function getNewTime(){
  var data = new Date();
  return data.getHours() + ":" + data.getMinutes();
}

// SendMessage -\- upperCaseKeydown----------
function upperCaseKeydown(event){
  var key = event.which;
  var txt = $(this).val();
  if(key == 16){
    txt.toUpperCase();
    console.log(txt);
  }
}

// SendMessage -\- automaticReply----------
function automaticReply(event){
  console.log("automatic Reply dopo 1 sec");
  var template = $('#message_received > div').clone();
  var target = $('#chat_board');
  var key = event.which;
  var input = $(this);
  var reply = setTimeout(function(){
    if (key == 13){
      template.find('.content').html("Combatti come una mucca!");
      template.find('.date').html(getNewTime());
      target.append(template);
    }
  },1000);
}

// --------------------------------------------------------------
// sortContactsFunction Function-----------------------------

function sortContactsFunction(){
  var input= $('#input_src');
  console.log(input.val());
  input.keyup(sortByLetters);
}

// sortContactsFunction  -\- sortByLetters------------------
function sortByLetters(){
  var input = $(this);
  var searchCont = $(this).val(); //user input
  var target = $('#contacts .contact_list_wrapper .contact_name .name');
  console.log("i target sono i nomi : ", target);
  target.each(function(){ //loop through the list
      if($(this).text().toLowerCase().match(searchCont)){ //check if list item contains the typed letters
          $(this).closest('.contact_list_wrapper').show();
      }else{
          $(this).closest('.contact_list_wrapper').hide();
      }
  });
}


// 2) MAIN Container used to invocate the functions---------------
function init(){
  console.log("Container used to invocate the functions");

  sendMessageFunction(); //function to Send Message and receive a reply
  sortContactsFunction(); //function to sort Contact from the sidenav
}


// 1) Document Ready-----
$(document).ready(init);
