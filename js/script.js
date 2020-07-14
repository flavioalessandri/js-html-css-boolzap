function sendMessageFunction(){
  var input = $('#sendMessage');
  input.keyup(valueFromInput);
}

function valueFromInput(event){
  var key = event.which;
  console.log("Codice tasto", event.which);

  if(event.which == 13){ //trigger the function when ENTER is keyup

  var input = $(this);// this si riferisce a $('#sendMessage'). elemento su cui si scatena evento
  var txt = input.val(); //get the input value
  console.log("la parola è:" , txt);

  input.val('');
  myMessage(txt);
  }
}

function myMessage(txt){
  console.log(txt, "log txt");
  var template=$('#message_sent > div').clone();
  var target = $('#chat_board');

  console.log("template",template);
  console.log("myMessage", txt);



  template.find('.content').text(txt);
  template.find('#date').text(getNewTime());

  target.append(template);
}


function getNewTime(){
  var data = new Date();
  return data.getHours() + ":" + data.getMinutes();
  console.log(data);
}

function upperCaseKeydown(){
  var input = $('#sendMessage');
  input.keydown(function(event){
  var txt = $(this).val();
  if(event.which == 16){
    txt.toUpperCase();
    console.log(txt);
  }
})
}



// Container used to invocate the functions---------------
function init(){
  console.log("Container used to invocate the functions");

  sendMessageFunction();
  // valueFromInput();
  // newInputKeyUp();
  // inputKeyup();
  // consoleLogKeyup();
  // upperCaseKeydown();
}

$(document).ready(init);
