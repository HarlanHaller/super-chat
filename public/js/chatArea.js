//msg handling
function msgHandaler(event) {
  let field = document.getElementById('msg-box');
  if (event['key'] === 'Enter' && !event['shiftKey']) {
    if (field.value !== '') {
        sendMsg(field.value);
        field.value = '';
    }
  }
}

function renderMsg(msg, sender) {
    let location = document.getElementById("chat-display");

    let text = document.createElement("p");
    text.textContent = msg;
    text.setAttribute("class", `text textFrom${sender}`)

    let textParent = document.createElement("dir");
    textParent.setAttribute("class", "text-container");

    location.appendChild(textParent);
    location.appendChild(text);

    scrollDown()
}


//event listeners
document.addEventListener('DOMContentLoaded', function() {
   setup([
       document.getElementById("chat-display"),
       getTexts()
   ]);
}, false);


//setup functions
//at runtime executes functions
function setup(prams) {
    renderAllMsg(prams[1]);
    scrollDown();
}

function scrollDown() {
    document.getElementById("chat-display").lastChild.scrollIntoView(true);
}


//helper functions
function renderAllMsg(msgDir) {
    for (let i = 0; i<Object.keys(msgDir).length; i++) {
        renderMsg(msgDir[i][0],msgDir[i][1]);
    }
}
function checkSend() {
    let msg = document.getElementById('msg-box');
    if (msg.value !== '') {
        sendMsg(msg.value);
        msg.value = '';
    }
}
//comunications
function getTexts() {
 return {
    0:["hi","In"],
    1:["hello","Out"],
    2:["are you doing anything this afternoon","In"],
    3:["yes i have to gi to soccer practise","Out"],
    4:["go","Out"],
    5:["go","Out"],
    6:["go","Out"],
    7:["go","Out"],
    8:["go","Out"],
    9:["go","Out"],
    10:["go","Out"],
    11:["go","Out"],
    12:["go","Out"],
    13:["go","Out"],
    14:["go","Out"],
    15:["go","Out"]
    }
}


//Connecting to socket.io
var socket = io();
let iSentMsg = false;

//When a message is recieved
socket.on('message', (message) => {
  if (!iSentMsg) {
    renderMsg(message, 'Out');
  } else {
    iSentMsg = false;
  }
});

//Send a message
function sendMsg(msg) {
  console.log(msg);
  socket.emit('message', msg);
  renderMsg(msg, 'In');
  iSentMsg = true;
}