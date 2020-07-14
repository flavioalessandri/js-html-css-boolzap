console.log("Starting log");

function inputKeyup(){
  var input = $('#sendMessage');
  input.keyup(function(event){
  if(event.which == 13){ //trigger the function when ENTER is keyup
  var txt = $(this).val();

  console.log("tasto ENTER corrisponde al numero ", event.which);
  var template= $('.template').append('<p class="my_green">' + txt + '</p>')
  var my_chat = $('.template').children().last();
  if (my_chat.hasClass('my_green')==true){
      $('#chat_messages .overflow-content').append(my_chat.clone());
  }
  var empty_txt = $(this).val(''); //clean input value
  console.log("la mia chat", my_chat);
  }
});
}

function upperCaseKeydown(){
  var input = $('#sendMessage');
  input.keydown(function(event){
  var txt = $(this).val();
  if(event.which == 16){
    txt.toUpperCase();
    console.log(txt);
  }
});
}



function consoleLogKeyup(){
  var input = $('#sendMessage');
  input.keyup(function(event){
  var txt = $(this).val();
  console.log("Typed Word:",txt);
  console.log("Typed Key: ", event.which);
});
}

// Container used to invocate the functions---------------
function init(){
  console.log("Container used to invocate the functions");
  inputKeyup();
  consoleLogKeyup();
  upperCaseKeydown();
}

$(document).ready(init);
