
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

  $(document).on("click",'.contact_list_wrapper', function() {

    var sidebar_contact_list = $('.contact_list_wrapper');

    //SIDEBAR SECTION - Assign a "data-info: name value" to the selected contact_list_wrapper item
    sidebar_contact_list.removeClass('active');
    $(this).addClass('active');
    $(this).attr('data-info', keyName );//dataset.info

    // find Icon name and Contact name of the item selected
    var name = $(this).find('.name').text();
    var keyName = $(this).find('.name').text().toLowerCase();
    var icon = $(this).find('.img_contact').attr('src');
    var last_access = $(this).find('.last_access').text();

    //MESSAGE BUBBLE SECTION
    var this_chat_attr= $('#chat_messages .chat_personal.active').attr('data-info');
    console.log("data-info della chat-active = " , this_chat_attr);
    console.log("data-info del contatto-active della sideBar = ",keyName);

    var elemento = $('div.chat_personal[data-info="'+keyName+'"]');
    console.log(elemento , "elemento");

    var chat_container_template = $('#chat_container.template > div').clone();
    var chat_container_keyName = chat_container_template.attr('data-info',keyName);

    if(this_chat_attr == keyName){
      console.log("SIDEBAR CONTACT data-info = ' ", keyName, " ' match with CHAT-ACTIVE data-info ='", this_chat_attr,"'" );
      $('#chat_messages .chat_personal').removeClass('active');
      $('#chat_messages .chat_personal[data-info="'+ keyName + '"]').addClass('active');

    }else if(elemento.length == 0){
      console.log( " This is your first conversation with : "+ name +" ! Create a new chat-container");
      $('#chat_messages .chat_personal').removeClass('active');
      chat_container_keyName.addClass('active');
      $('#chat_messages .overflow').append(chat_container_keyName);

      // $('#chat_messages .overflow').append('<div class="chat_personal active" data-info="'+keyName+'">' + '<div class="overflow-content"></div>' +  '</div>' );
    }
      else if(this_chat_attr != keyName){
      console.log("Return to contact selected");
      $('#chat_messages .chat_personal').removeClass('active');
      $('#chat_messages .chat_personal[data-info="'+ keyName + '"]').addClass('active');
    }

    // TOPBAR SECTION - CHANGE the Top Main Section "Icon and Name" of  with the selected item
    var selected_contact_name = $("#chat_selected_contact").find('.name').text(name);
    var selected_contact_img = $("#chat_selected_contact").find('.img_contact').attr('src', icon);
  })
}

// --------------------------------------------------------------
// SendMessage Function-----------------------------

function sendMessageFunction(){

  var input = $('#sendMessage');

  input.keyup(valueFromInput);

  input.keydown(upperCaseKeydown); //trigger SHIFT keydown to type Uppercase letters
}

// SendMessage -\- valueFromInput----------
function valueFromInput(e){ //this function need the event object
  var key = e.which;// return the ascii number of the pressed key

  var input = $(this);// (this) si riferisce a $('#sendMessage'). elemento su cui si scatena evento
  var txt = input.val(); //get the input value
  console.log(input.val());

  if(key == 13 && txt){ //trigger the function when ENTER is keyup

      input.val(''); //clean the value in the input space
      // "sendNewMessage function" needs two arguments (the input-text-value and the tag-class for the style)
      sendNewMessage(txt,'right_msg'); //invoke a new function NOT ANONYMOUS
      console.log("la parola è:" , txt); // if txt is empty no message will be sent

      // Once getting input value we need to Send our message and receive an automatic automatic Reply

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
  var searchCont = $(this).val(); //user input - letters typed
  var target = $('#contacts .contact_list_wrapper .contact_name .name');
  console.log("Target is the contact list name : ", target);
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
  console.log("Container used to invoke the functions!");

  viewContactMessage(); //function to print messages on screen using the correct style - use clone()

  sendMessageFunction(); //function to Send Message and receive a reply

  sortContactsFunction(); //function to sort Contact from the sidenav

  selectChatMessage(); //function to select generated messages (on.() method)

  deleteChatMessage();  //function to delete message using dropdown menu

}

// 1) Document Ready-----
$(document).ready(init);
