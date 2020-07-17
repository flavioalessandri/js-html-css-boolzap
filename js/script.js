
function selectChatMessage(){
  $('#chat_messages').on('click','.dropdown_parent > i', function(){
    $(this).siblings('.dropdown').toggle('hidden');
    console.log("PROVA");
  })
}

function deleteChatMessage(){
  $('#chat_messages').on('click','.dropdown .delete', function(){
    $(this).parents('.bubble').remove();
    console.log("PROVA");
  })
}


function viewContactMessage(){
  var sidebar_contact_list = $('.contact_list_wrapper');

  sidebar_contact_list.click(function() {

    sidebar_contact_list.removeClass('active');
    $(this).addClass('active');

    // find Icon name and Contact name of the item selected
    var name = $(this).find('.name').text();
    var keyName = $(this).find('.name').text().toLowerCase();
    var icon = $(this).find('.img_contact').attr('src');

    //MESSAGE BUBBLE SECTION

    var id = $(this).attr('data-id');
    var general_chat = $('#chat_messages .chat_personal');
    general_chat.removeClass('active');
    // add "active" class to the main chat sections where bubbles are!
    var this_chat= $('#chat_messages .chat_personal[data-id="'+ id + '"]').addClass('active');
    this_chat.attr('data-info', keyName );

    // assegna un "data-info" al contatto selezionato nella SideBar
    //SIDEBAR SECTION - Assign a "data-info: name value" to the selected contact_list_wrapper item
    $(this).attr('data-info', keyName );//dataset.info
    console.log("l'elemento nella barra laterale ha come data-info il nome : ", keyName,"e come data-id: ",id);

    // cambia l'immagine e il nome nella barra in alto delle info contatto
    // TOPBAR SECTION - CHANGE the Top Main Section "Icon and Name" of  with the selected item
    var selected_contact_name = $("#chat_selected_contact").find('.name').text(name);
    var selected_contact_img = $("#chat_selected_contact").find('.img_contact').attr('src', icon);
  })
}

// --------------------------------------------------------------
// SendMessage Function-----------------------------
function sendMessageFunction(){
  var input = $('#sendMessage');
  input.keyup(valueFromInput); //get a value from input after press "ENTER"
  input.keydown(upperCaseKeydown); //trigger SHIFT keydown to type Uppercase letters
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

    // Once getting input value we need to Send our message and receive an automatic automatic Reply

    // "sendNewMessage function" needs two arguments (the input-text-value and the tag-class for the style)
    sendNewMessage(txt,'right_msg'); //invoke a new function NOT ANONYMOUS

    // Now we need an automatic reply - call setTimeout with anonymous funcion;
    // setTimeout(function(){ sendNewMessage('Va benissimo', 'left_msg');},2000);
    setTimeout(function(){
      sendNewMessage(randomReply(),'left_msg');
    } ,1000);
  }
}

// SendMessage -\- -valueFromInput-\--sendNewMessage---------
function sendNewMessage(txt, type){

  var template=$('#messages_structure > div').clone(); //get the CLONE of the DIV under TEMPLATE (hidden folder)
  // when we use clone() we can modify the element copy without touch the original
  var target = $('.chat_personal.active > .overflow-content');

  console.log("type",type);
  console.log("sendNewMessage", txt);

  template.addClass(type);

  template.find('.content').text(txt);//search the element with class "content" overwriting the text
  template.find('#date').text(getNewTime()); //search the element with class "date" overwriting the text  with the current date
  // .find() Vs .children() methods:  children only travels a single level down the DOM tree
  target.append(template);

  var chat_selected_contact= $('#chat_selected_contact');
  var contact_active = $('#contacts .contact_list_wrapper.active');
  contact_active.find('.subtitle').text(txt);
  contact_active.find('.last_access').text(getNewTime());
  chat_selected_contact.find('.last_access').text(getNewTime());


}

// SendMessage -\--valueFromInput-\--sendNewMessage-\--getNewTime-----
function getNewTime(){
  var data = new Date();
  var minutes = (data.getMinutes()<10?'0':'') + data.getMinutes();
  return data.getHours() + ":" + minutes;
}

// SendMessage - Generated random reply messages
function randomReply(){
  console.log("randomReply");
  var lista = $('#chat_random_reply.template>ul>li').clone();
  return lista[randomIndexReply()].textContent;
}

function randomIndexReply(){
  var min = 0;
  var max = $('#chat_random_reply.template>ul>li').length;
  console.log("massimo", max);
  var numero = Math.floor(Math.random()* (max-min)+min);
  return numero;
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

  viewContactMessage(); //function to print messages on screen using the correct style - use clone()

  selectChatMessage(); //function to select generated messages (on.() method)

  deleteChatMessage();  //function to delete message using dropdown menu
}

// 1) Document Ready-----
$(document).ready(init);
