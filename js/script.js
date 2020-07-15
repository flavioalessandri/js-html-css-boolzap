function viewContactMessage(){
  var contact_list = $('.contact_list_wrapper');
  contact_list.click(function(){
    contact_list.removeClass('active');
    $(this).addClass('active');
    // find Image name and COntact name of the items
    var name = $(this).find('.name').text();
    var icon = $(this).find('.img_contact').attr('src');
    console.log("icon", icon);

    // Assign a "data-info: name value" to the selected contact_list_wrapper item
    $(this).attr('data-info', name );//dataset.info
    console.log("l'elemento nella barra laterale ha come data-info il nome : ", name);
    var chat_board_section = $('.chat_board_section');

  // CHANGE the Top Main Section "Icon and Name" of  with the selected item
    var selected_contact_name = $("#chat_selected_contact").find('.name').text(name);
    var selected_contact_img = $("#chat_selected_contact").find('.img_contact').attr('src', icon);

    console.log(selected_contact_img);
    console.log(selected_contact_name);

    var messaggi_nella_chat = $('#chat_board .bubble').attr('data-info', name);

    if($('#chat_board .bubble').find(messaggi_nella_chat) == true){
      messaggi_nella_chat.show();
    } else{
      $('#chat_board .bubble').hide();
    }


    console.log("messaggi_nella_chat ",messaggi_nella_chat );


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
  setTimeout(sendNewMessage('Va benissimo', 'left_msg'),2000);
  }
}

// SendMessage -\- -valueFromInput-\--sendNewMessage---------
function sendNewMessage(txt, type){

  var template=$('#messages_structure > div').clone(); //get the CLONE of the DIV under TEMPLATE (hidden folder)
  // when we use clone() we can modify the element copy without touch the original
  var target = $('#chat_board');

  console.log("type",type);
  console.log("sendNewMessage", txt);

  // The .find() and .children() methods are similar, but children only travels a single level down the DOM tree
  template.addClass(type);


  var data_key=$('.contact_list_wrapper.active').attr('data-info');
  console.log("data_key", data_key);

  template.find('.content').text(txt);//search the element with class "content" overwriting the text
  template.find('#date').text(getNewTime()); //search the element with class "date" overwriting the text  with the current date
  template.attr('data-info', data_key);
  target.append(template);

}

// SendMessage -\--valueFromInput-\--sendNewMessage-\--getNewTime-----
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

  viewContactMessage();

}

// 1) Document Ready-----
$(document).ready(init);
