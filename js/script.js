console.log("Carella esempi!");

function inputKeyup(){
  var input = $('#sendMessage');
  input.keyup(function(event){
  if(event.which == 13){
  var txt = $(this).val();
  console.log("testo",txt);
  console.log("tasto corrispondente", event.which);
  var template= $('.template').append('<p class="my_green">' + txt + '</p>')
  var my_chat = $('.template').children().last();
  if (my_chat.hasClass('my_green')==true){
      $('#chat_messages .overflow-content').append(my_chat.clone());
  }
  var empty_txt = $(this).val('');
  console.log(my_chat);
  }
});
}


function init(){
  console.log("INIT");
  inputKeyup();
}

$(document).ready(init);
