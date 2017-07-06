import '../scss/app.scss';
import '../assets/glorious.wav'

const containerDiv = document.querySelector('.container');
const questionH = document.querySelector('.question');

function createButton(classLabel, node, nextStep) {
	let button = document.createElement('button');
	button.classList.add(classLabel);
	let text = document.createTextNode(node);
	button.appendChild(text);
	containerDiv.appendChild(button);
	button.addEventListener('click', nextStep)
}

function printHello() {
	let greeting = document.createTextNode('Hey.');
	questionH.appendChild(greeting);
	createButton('btn.greeting', 'Hey gurl hey', askForAdventure);
}

function askForAdventure(e){
	containerDiv.removeChild(e.target);
	questionH.innerHTML = 'Do you wanna go on an adventure?'

	createButton('btn', 'Yes.', startAdventure);
	createButton('btn', 'What kind of an adventure?', checkIfSure);
	createButton('btn', 'Naaaaah.', sayEarlyGoodbye);
}

function startAdventure(e){
	document.querySelectorAll('.btn').forEach(function(button){
		containerDiv.removeChild(button);
	});
	questionH.innerHTML = 'Awesome';

	let countdown = document.createElement('p');
	containerDiv.appendChild(countdown);
	var timeleft = 3; //10
    var downloadTimer = setInterval(function(){
    timeleft--;
    countdown.textContent = timeleft;
    if(timeleft <= 0)
    	clearInterval(downloadTimer);
    },300); //1000
    setTimeout(() => watchThis(), 3000); //10 000
}

function checkIfSure(){
	document.querySelectorAll('.btn').forEach(function(button){
		containerDiv.removeChild(button);
	});
	questionH.innerHTML = 'A little trip on the internet.'
	createButton('btn', 'Ok, I\'m down.', startAdventure);
	createButton('btn', 'Ya know, I gotta go wash my hair so maybe another time.', sayEarlyGoodbye);
}

function sayEarlyGoodbye(){
	alert('That\'s cool, see you later!');
}

function watchThis(){
	containerDiv.removeChild(document.querySelector('p'));
	questionH.innerHTML = 'Watch this.';
	let iframe = document.createElement('iframe');
	iframe.width = 560;
	iframe.height = 315;
	iframe.src ="https://www.youtube.com/embed/zDCNJdeM9PE";
	iframe.setAttribute('frameborder', 0);
	iframe.setAttribute('allowfullscreen', '');
	containerDiv.appendChild(iframe);
	createButton('btn', 'When you\'re done click here.', askForThoughts);
}

function askForThoughts(){
	let newQuestion = document.createElement('h3');
	newQuestion.classList.add('new-question');
	newQuestion.innerHTML = 'What did you think?';
	containerDiv.appendChild(newQuestion);
	let form = document.createElement('form');
	form.classList.add('form');
	let input = document.createElement('input');
	input.type = 'text';
	input.name = 'thoughts';
	input.placeholder = 'I thought it was...';
	form.appendChild(input);
	containerDiv.appendChild(form);
	form.addEventListener('submit', e => listenThis(e));
}

function listenThis(e){
	e.preventDefault();
	containerDiv.removeChild(document.querySelector('iframe'));
	containerDiv.removeChild(document.querySelector('.btn'));
	containerDiv.removeChild(document.querySelector('.new-question'))
	containerDiv.removeChild(document.querySelector('form'));
	questionH.innerHTML = 'Ah, gotcha. Ok, next, listen to this song';
	let audio = document.createElement('audio');
	audio.setAttribute('controls','');
	audio.classList.add('audio-file');
	let source = document.createElement('source');
	source.src = '../assets/glorious.wav';
	source.type = 'audio/wav';
	audio.appendChild(source);
	containerDiv.appendChild(audio);
	audio.addEventListener('ended', askIfLike);
}

function askIfLike() {
	let newQuestion = document.createElement('h3');
	newQuestion.innerHTML = 'Did you like it?';

	let form = document.createElement('form');
	form.classList.add('form');

	let yesInput = document.createElement('input');
	let noInput = document.createElement('input');
	form.append(yesInput);
	form.append(noInput);

	yesInput.type = 'radio';
	yesInput.name = 'choice';
	yesInput.id = 'yes';
	yesInput.setAttribute('checked','');

	noInput.type = 'radio';
	noInput.name = 'choice';
	noInput.id = 'no';
	
	yesInput.append('Yes');
	noInput.append('No');

	containerDiv.appendChild(form);
}

window.onload = printHello();