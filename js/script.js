console.log("Carella esempi!");

function nuovokeydown(){
  var user = $('.user');
  user.keydown(function(event){
  var txt = $(this).val();
  console.log("testo",txt);
  console.log("tasto corrispondente", event.which);
  })
}

function myButton(){
var button = $('.button');
button.click(function(){
  var messaggio = $('.user').val();
  var nascosto = $('.template').append("<h3>" + messaggio + "</h3>");
  var copy = nascosto.children().clone();
  $('#target').append(copy);
  // messaggio.remove();
  // var copia = messaggio.clone().append('.copy');
  // messaggio.remove();

  // console.log("valore input" , txta);
  // // var messaggio = txta.clone();
  // $('.clone').append(txta);
  // $( "b" ).clone().prependTo( "h5" );
  // $( "b" ).appendTo( "h6" );
})

var scritta = $(".template > h3");
$('#target').append(scritta);
}



function init(){
  console.log("INIT");

  nuovokeydown();

  myButton();



}

$(document).ready(init);
