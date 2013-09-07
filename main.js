$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = true;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
  $.mobile.defaultPageTransition = "none";
  $.mobile.defaultDialogTransition = "none";
  $.mobile.buttonMarkup.hoverDelay = "50";
});

//////////////////////////////////////////////////////////////////////////Music player
var myMedia = null;
var playing = false;
function playAudio() {
	if (!playing) {
	myMedia.play();	
	document.getElementById('play').src = "images/pause.png";
	playing = true;	
} else {
	myMedia.pause();
	document.getElementById('play').src = "images/play.png";
	playing = false;
}
} 
function stopAudio() {
	myMedia.stop();
	playing = false;
	document.getElementById('play').src = "images/play.png";
	document.getElementById('audio_position').innerHTML = "0 sec";
} 
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
	console.log("Got device ready");
	updateMedia();
}
function updateMedia(src) {
	if (myMedia != null) {
	myMedia.release();
}
var yourSelect = document.getElementById('playlist');	
myMedia = new Media(yourSelect.options[yourSelect.selectedIndex].value, stopAudio, null);
// Update media position every second
var mediaTimer = setInterval(function() {
// get media position
myMedia.getCurrentPosition(
// success callback
function(position) {
if (position > -1) {
var curTime = parseInt (position,10)
document.getElementById('audio_position').innerHTML = (curTime) + " sec";
}
},
// error callback
function(e) {
console.log("Error getting pos=" + e);
}
);
}, 1000);
}
function setAudioPosition(position) {
document.getElementById('audio_position').innerHTML =position;
}

function doPlay(soundId) {
  var my_media = new Media(soundId+".mp3",
    function() {
	  my_media.release();
    },
    function(err) {
	my_media.release();
  });
  my_media.play();
}


$(document).on('pageinit', function(){

//scenario spinner
$('#spin').click(function() {
var starring = new Array(
"2 people","3 people","4 people","5 people","1 police officer/ 1 offender","2 police officers","2 judges","2 lawyers","3 prisoners","4 prisoners",
"2 nurses/ 1 patient/ 1 relative","1 doctor/ 1 nurse/ 1 patient","1 dentist/ 1 dental nurse/ a child/ child's mother","1 doctor/ 1 nurse/ old man",
"1 doctor/ old man/ old man's daughter","1 dentist/ 1 dental nurse","1 firefighter/ 1 news reporter/ 1 victim","2 firefighters",
"2 news reporters/ 1 cameraman or woman","1 interviewer/ 1 celebrity","4 boy band members/ 1 manager","4 girl band members/ 1 interviewer",
"1 bank manager/ young couple","1 bank manager/ 1 ex con","1 bank teller/ 2 robbers","1 supermarket till worker/ 1 customer/ 1 small child",
"1 deli counter employee/ 2 customers","1 baker/ 3 customers","2 pilots","1 air steward/ 1 pilot","1 air steward/ 2 passengers",
"1 butler/ 1 queen","1 butler/ 1 cook/ 1 king","2 gardeners","2 dustbin men","4 dustbin men","2 hairdressers","1 hairdresser/ 1 customer",
"1 receptionist/ 1 patient","3 sailors","4 soldiers","4 members of a football team","1 member of a football team/ 1 manager",
"1 teacher/ 3 members of their class","1 teacher/ 2 parents","1 teacher/ 1 head teacher/ 2 parents/ 1 child","1 head teacher/ 1 caterer",
"1 careers teacher/ 1 student","2 movie stars","4 movie stars","1 movie star/ their assistant","1 chef/ 1 front of house/ 2 customers",
"1 chef/ 1 sous chef","1 TV chef/ 1 guest","1 tour guide/ 4 customers","1 tour guide/ 1 manager of an historical site/ 2 visitors",
"4 frogs","2 cats","1 cat/ 1 dog","3 horses","2 mice","3 explorers","5 rugby players","1 driving instructor/ 1 learner driver","1 traffic warden/ 1 driver",
"1 traffic warden/ 2 old people","2 buskers","2 nail technicians/ 2 customers","1 child/ 1 imaginary friend","4 small children","3 small children",
"2 small children","4 old people","2 old people","1 children's entertainer/ 5 small children","1 care home assistant/ 5 old people","2 scientists",
"3 astronauts","1 magician/ 1 magician's assistant","2 parents/ 1 teenage child","1 parent/ 1 child","2 parents","1 parent/ 2 children","2 builders",
"3 builders","4 builders","1 postman/ 1 home owner","2 farmers","2 scarecrows","1 vicar/ 1 couple","4 women","4 men","1 psychologist/ 1 patient",
"1 counsellor/ 1 couple","1 librarian/ 2 students","2 librarians"
),
randstar = starring[Math.floor( Math.random() * starring.length )];
var location = new Array(
"At the vets","At the doctors","At the dentists","In a waiting room","In reception","On a football pitch","At a train station","On an aeroplane","In a classroom",
"Parked illegally","In a supermarket","In the hairdressers","In a courtroom","In a toilet cubicle","In the garden","On the battlefield","In a castle",
"In a street","In a car","At an exercise class","At a tennis match","In a swimming pool","Skydiving","Parachuting","Waterskiing","On a ship","In a rowing boat",
"On a desert island","In the desert","On camels","In an amusements arcade","Around the dining table","In the kitchen","In the living room","At a sleepover",
"At a BBQ","On the beach","On fireworks night","On Christmas Eve","On Christmas Day","On New Years Eve","Halloween","In a wheelie bin","In a cardboard box",
"Under the dining room table","On the escalator","In a lift","On a ski slope","In a tent","In a caravan","In a cheese shop","In a pub","At a disco","On a mountain",
"In heaven","In hell","In a bird hide","On a spaceship","On the moon","In a submarine","Under the sea","On the crater of a volcano","In a cave","In a garage",
"In a shop","In a factory","In a mill","In the bath","On a ladder","In a cupboard","On a sledge","Under a rock","In a bubble","In a call centre","In a church",
"In an old people's home","In a school kitchen","In an office","In a hot air balloon","In a lifeboat","In a jeep","In the corridor","Under the mistletoe",
"Around a bonfire","At the front door","In the shed","At a spa","On a teambuilding course","In an observatory","In a museum","In an art gallery","At a rock concert",
"In the countryside","In the city","On top of a tall building","In a tree house","In a wigwam","In an igloo"
),
randloc = location[Math.floor( Math.random() * location.length )];
var scenario = new Array(
"Discussing local politics","Discussing world politics","Deciding which hairstyle to have","Revealing a secret","Revealing a lifelong ambition","Fishing",
"Painting a picture","Taking a photograph","Getting married","Having an argument","Rescuing a cat","Telling a story","Talking about their neighbours","Sinking",
"Going on a tour","Describing something","Singing a song","Playing chess","Reading","Apple bobbing","Jogging on the spot","Climbing a wall","Cooking",
"Watching the TV","Making an announcement","Composing a rap","Winning the lottery","Buying a puppy","Being interviewed","Being interrogated","Decorating a room",
"Laying a carpet","Building a wall","Digging a hole","Planting some flowers","Cooking a meal","Laying the table","Making the bed","Having a bath","Walking the dog",
"Hanging out the washing","Denying a crime","Confessing to a crime","Committing a crime","Climbing a tree","Launching a rocket","Pressing the button",
"Shouting about something","Warning people","Arranging a will","Planning a wedding","Planning a surprise party","Having a baby shower","Having a hen weekend",
"Having a stag weekend","Having a funeral","Eating a meal","Being given an award","Presenting an award","Baking a cake","Having their nails polished",
"Having a massage","Having their palm read","Contacting their dead relative","Competing in a race","Winning a competition","Cleaning","Driving a car",
"Walking in heels for the first time","Losing something","Finding something","Getting lost","Getting found","Discovering a new place","Discovering something new",
"Having a breakdown","Having a baby","Having a misunderstanding","Meeting a long lost friend","Meeting an old school colleague","Speaking gibberish","Being 'new'",
"Retiring from something","About to be sick","Bursting for the loo","Having a haircut","Buying a puppy","Making a documentary","Reporting the news",
"Planning something","Having a meeting","Waking up","Saying a prayer","Asking someone out on a date","Ending a relationship","Celebrating an anniversary",
"Making a proposal","Making a speech"
),
randscen = scenario[Math.floor( Math.random() * scenario.length )];
$('#starringtxt').text( randstar );
$('#locationtxt').text( randloc );;
$('#scenariotxt').text( randscen );
});

$('video').bind('ended', function(){
setTimeout(function(){
  $(".ui-popup").popup("close");
}, 2000);
})

$( "#lfx-followspot" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-followspot video" ).hide().delay(500).fadeIn(100);
   }
});
$( "#lfx-blackout" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-blackout video" ).hide().delay(500).fadeIn(100);
   }
});
$( "#lfx-strobe" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-strobe video" ).hide().delay(500).fadeIn(100);
   }
});
$( "#lfx-xfade" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-xfade video" ).hide().delay(500).fadeIn(100);
   }
});
$( "#lfx-snap" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-snap video" ).hide().delay(500).fadeIn(100);
   }
});
$( "#lfx-scroller" ).bind({
   popupbeforeposition: function(event, ui) {
   $( "#lfx-scroller video" ).hide().delay(500).fadeIn(100);
   }
});

});






