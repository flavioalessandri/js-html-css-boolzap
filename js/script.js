function sendMessageFunction(){
  var input = $('#sendMessage');
  input.keyup(valueFromInput);
  input.keydown(upperCaseKeydown);
  input.keyup(automaticReply);
}

function sortContactsFunction(){
  var input= $('#input_src');
  console.log(input.val());
  input.keyup(sortByLetters);
}

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
  sortContactsFunction();
}

$(document).ready(init);
