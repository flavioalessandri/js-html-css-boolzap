function sendMessageFunction(){
  var input = $('#sendMessage');
  input.keyup(valueFromInput);
  input.keydown(upperCaseKeydown);
  input.keyup(automaticReply);
}

function valueFromInput(event){
  var key = event.which;
  console.log("Codice tasto", event.which);

  var input = $(this);// this si riferisce a $('#sendMessage'). elemento su cui si scatena evento
  var txt = input.val(); //get the input value

  if(key == 13 && txt){ //trigger the function when ENTER is keyup


  console.log("la parola è:" , txt);

  input.val('');
  myMessage(txt);
  }
}

function upperCaseKeydown(event){
  var key = event.which;
  var txt = $(this).val();
  if(key == 16){
    txt.toUpperCase();
    console.log(txt);
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
}

function automaticReply(event){
  console.log("automatic Reply dopo 1 sec");
  var template = $('#message_received > div').clone();
  var target = $('#chat_board');
  var key = event.which;
  var input = $(this);
  var reply = setTimeout(function(){
    if (key == 13){
      template.find('.content').html("Automatic Reply!");
      target.append(template);
    }
  },1000);
}


// Container used to invocate the functions---------------
function init(){
  console.log("Container used to invocate the functions");

  sendMessageFunction();
}

$(document).ready(init);
