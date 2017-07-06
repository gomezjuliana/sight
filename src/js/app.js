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
	
	yesInput.type = 'radio';
	yesInput.name = 'choice';
	yesInput.class = 'yes';
	yesInput.setAttribute('checked','');

	noInput.type = 'radio';
	noInput.name = 'choice';
	noInput.class = 'no';
	
	form.appendChild(yesInput);
	form.append('Yes');
	form.appendChild(noInput);
	form.append('No');

	containerDiv.appendChild(form);
	form.addEventListener('keydown', e => reactToLiked(e));
}

function reactToLiked(e){
	containerDiv.removeChild(document.querySelector('audio'));
	containerDiv.removeChild(document.querySelector('form'));
	if (e.target.class === 'yes'){
		questionH.innerHTML = 'You should <a href="https://www.youtube.com/watch?v=Z-_ub09u3wo" target="_blank" class="youtube-link">listen to the live version</a>.';
		createButton('btn', 'Ok, I will', almostOver);
	} else {
	questionH.innerHTML = 'Thanks for giving it a shot';
	createButton('btn', 'You are welcome.', almostOver);
	}
}

function almostOver(){
	containerDiv.removeChild(document.querySelector('.btn'));
	questionH.innerHTML = 'Our adventure is almost over!';
	setTimeout(() => showCanvas(), 2000);
}

function showCanvas(){
	questionH.innerHTML = 'Before you go, show me some love by drawing a heart :) Thanks for coming along!';
	let div = document.createElement('div');
	div.classList.add('sketch');
	let canvas = document.createElement('canvas');
	canvas.classList.add('paint');
	div.appendChild(canvas);
	containerDiv.appendChild(div);
	paintCanvas();
}

function paintCanvas(){
	var canvas = document.querySelector('.paint');
	var ctx = canvas.getContext('2d');
	var sketch = document.querySelector('.sketch');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	var mouse = {x: 0, y:0};
	var last_mouse = {x: 0, y:0};

	canvas.addEventListener('mousemove', function(e) {
		last_mouse.x = mouse.x;
		last_mouse.y = mouse.y;

		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);

	ctx.lineWidth = 5;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'red';

	canvas.addEventListener('mousedown', e => {
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);

	canvas.addEventListener('mouseup', () => {
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);

	var onPaint = function() {
		ctx.beginPath();
		ctx.moveTo(last_mouse.x, last_mouse.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.closePath();
		ctx.stroke();
	};
}

window.onload = printHello();