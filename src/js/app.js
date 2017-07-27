import '../scss/app.scss';
import '../assets/glorious.wav';

const containerDiv = document.querySelector('.container');
const questionH = document.querySelector('.container__question');

function createButton(classLabel, node, action) {
	const button = document.createElement('button');
	button.classList.add(classLabel);
	const text = document.createTextNode(node);
	button.appendChild(text);
	containerDiv.appendChild(button);
	button.addEventListener('click', action);
}

function createElement(element, className){
	const el = document.createElement(element);
	if (className){
		el.classList.add(className);
	}
	return el;	
}

function printHello() {
	let greeting = document.createTextNode('Hey.');
	questionH.appendChild(greeting);
	createButton('btn', 'Hey gurl hey', askForAdventure);
}

function askForAdventure(e){
	containerDiv.removeChild(e.target);
	questionH.innerHTML = 'Do you wanna go on an adventure?';

	createButton('btn', 'Yes.', startAdventure);
	createButton('btn', 'What kind of an adventure?', checkIfSure);
	createButton('btn', 'Naaaaah.', sayEarlyGoodbye);
}

function startAdventure(){
	document.querySelectorAll('.btn').forEach(function(button){
		containerDiv.removeChild(button);
	});
	questionH.innerHTML = 'Awesome.';

	const countdown = createElement('p');
	containerDiv.appendChild(countdown);
	let timeleft = 3; //10
	let downloadTimer = setInterval(function(){
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
	questionH.innerHTML = 'A little trip on the internet.';
	createButton('btn', 'Ok, I\'m down.', startAdventure);
	createButton('btn', 'Ya know, I gotta go wash my hair so maybe another time.', sayEarlyGoodbye);
}

function sayEarlyGoodbye(){
	alert('That\'s cool, see you later!');
}

function watchThis(){
	containerDiv.removeChild(document.querySelector('p'));
	questionH.innerHTML = 'Watch this.';
	const video = createElement('iframe', 'container__youtube-video');
	containerDiv.appendChild(video);
	video.width = '90%';
	video.src ='https://www.youtube.com/embed/zDCNJdeM9PE';
	video.setAttribute('frameborder', 0);
	video.setAttribute('allowfullscreen', '');
	createButton('btn', 'When you\'re done click here.', askForThoughts);
}

function askForThoughts(){
	const newQuestion = createElement('h3','container__new-question');
	containerDiv.appendChild(newQuestion);
	newQuestion.innerHTML = 'What did you think?';
	const form = createElement('form', 'form');
	containerDiv.appendChild(form);
	const input = createElement('input', 'form__text');
	form.appendChild(input);
	input.type = 'text';
	input.name = 'thoughts';
	input.placeholder = 'I thought it was...';
	input.focus();
	form.addEventListener('submit', e => listenThis(e));
}

function listenThis(e){
	e.preventDefault();
	containerDiv.removeChild(document.querySelector('iframe'));
	containerDiv.removeChild(document.querySelector('.btn'));
	containerDiv.removeChild(document.querySelector('.container__new-question'));
	containerDiv.removeChild(document.querySelector('form'));
	questionH.innerHTML = 'Ah, gotcha. Ok, next, listen to this song.';
	const audio = createElement('audio', 'audio-file');
	containerDiv.appendChild(audio);
	audio.setAttribute('controls','');
	const source = createElement('source', 'audio');
	audio.appendChild(source);
	source.src = '../assets/glorious.wav';
	source.type = 'audio/wav';
	audio.addEventListener('ended', askIfLike);
}

function askIfLike() {
	const newQuestion = createElement('h3', 'container__new-question');
	containerDiv.appendChild(newQuestion);
	newQuestion.innerHTML = 'Did you like it?';

	let form = document.createElement('form');
	containerDiv.appendChild(form);

	let yesInput = document.createElement('input');
	let noInput = document.createElement('input');
	
	yesInput.type = 'radio';
	yesInput.name = 'choice';
	yesInput.id = 'yes';
	yesInput.setAttribute('checked','');

	noInput.type = 'radio';
	noInput.name = 'choice';
	noInput.id = 'no';

	let yesLabel = document.createElement('label');
	let noLabel = document.createElement('label');
	yesLabel.setAttribute('for','yes');
	yesLabel.append('Yeah, it was great!');
	yesLabel.classList.add('form__input-label');

	noLabel.setAttribute('for','no');
	noLabel.append('Not my jam.');
	noLabel.classList.add('form__input-label');
	
	form.appendChild(yesInput);
	form.append(yesLabel);
	form.appendChild(noInput);
	form.append(noLabel);

	form.addEventListener('keydown', e => reactToLiked(e));
}

function reactToLiked(e){
	containerDiv.removeChild(document.querySelector('audio'));
	containerDiv.removeChild(document.querySelector('form'));
	containerDiv.removeChild(document.querySelector('.container__new-question'));
	
	if (e.target.id === 'yes'){
		questionH.innerHTML = 'You should <a href="https://www.youtube.com/watch?v=Z-_ub09u3wo" target="_blank" class="container__youtube-link">listen to the live version</a>.';
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
	const div = createElement('div', 'container-sketch');
	containerDiv.appendChild(div);
	const canvas = createElement('canvas', 'container-sketch__paint');
	div.appendChild(canvas);
	paintCanvas();
}

function paintCanvas(){
	window.addEventListener('resize', paintCanvas);
	const canvas = document.querySelector('.container-sketch__paint');
	const ctx = canvas.getContext('2d');
	const sketch = document.querySelector('.container-sketch');
	const sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	const mouse = {x: 0, y:0};
	const last_mouse = {x: 0, y:0};

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

	canvas.addEventListener('mousedown', () => {
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);

	canvas.addEventListener('mouseup', () => {
		canvas.removeEventListener('mousemove', onPaint, false);
	}, false);

	const onPaint = function() {
		ctx.beginPath();
		ctx.moveTo(last_mouse.x, last_mouse.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.closePath();
		ctx.stroke();
	};
}

window.onload = printHello();