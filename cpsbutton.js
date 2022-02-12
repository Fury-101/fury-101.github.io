const cpsDisplay = document.getElementById("cps");
const clicks = [];
let totalClicks = 1;
let running = false;
const btn = document.getElementById("clicker");
let maxParticles = 10;

document.getElementById("particles").oninput = function() {
	const text = document.getElementById("particlesText");
  	maxParticles = Number(this.value);
	text.innerHTML = text.innerHTML.split(" ")[0] + " " + maxParticles;
	if (maxParticles>=15)
		text.style.color = "red";
	else
		text.style.color = "c7c7c7";
}

const clicker = e => {
	const now = Date.now();

	clicks.push(now);
	clicks.sort((a, b) => a - b);

	console.log(`[CLICK] ${now}`);

	if (mode == 'dc') {
		if (running) {
			totalClicks++;
			return;
		} else {
			totalClicks = 1;
		}
		
		function typewriter(text,speed,wait) {
			let i = 0;

			cpsText.innerHTML = "clicks";
			let word = "clicks";

			let interval = setInterval(() => {
				word += text[i];
  			cpsText.innerHTML = word + `<span>_</span>`;
				i++;
			}, speed);

			setTimeout(() => {
  		  clearInterval(interval);
			}, speed*text.length);
			
			setTimeout(() => {			
			
    		interval = setInterval(() => {
	  	    word = word.slice(0, -1);
					cpsText.innerHTML = word+`<span>_</span>`;
	  	  }, speed);
			
    		setTimeout(() => clearInterval(interval), speed*text.length);
			
			}, speed*text.length+wait);
		}

		running = true;
		setTimeout(() => {
			cpsDisplay.innerHTML = totalClicks;
			typewriter([
				undefined,
				" c'mon...",
				" basic",
				" damn!",
				" phenomenal"
			][totalClicks] ?? " hacking", 75, 750);
			cpsText.innerHTML = "clicks" + `<span>_</span>`;
			running = false;
		}, 90);
	}
	
	if (e.clientX==0||e.clientY==0) 
		return
	
	//particle system
	for (let i = 0; i < maxParticles; i++) {
		const particle = document.createElement("particle");

		document.body.appendChild(particle);

		const size = Math.floor(Math.random() * 20 + 5);
		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		particle.style.background = `hsl(${Math.random() * 90 + 90}, 70%, 60%)`;
		//random color from blue - purple

		//random destination within a range
		const destinationX = e.clientX + (Math.random() - 0.5) * 2 * 112.5;
		const destinationY = e.clientY + (Math.random() - 0.5) * 2 * 112.5;

		const animation = particle.animate([
			{
			// origin pos of particle (half size offset to center around mouse)
				transform: `translate(${e.clientX - (size / 2)}px, ${e.clientY - (size / 2)}px)`,
				opacity: 1
			},
			{
				// final coordinates = second keyframe
				transform: `translate(${destinationX}px, ${destinationY}px)`,
				opacity: 0
			}
		], {
			// random duration from 500 to 1500ms
			duration: 500 + Math.random() * 1000,
			easing: 'cubic-bezier(0, .9, .57, 1)',
			// particle delay with a random value from 0ms to 200ms
			delay: Math.random() * 200
		}
		);

		animation.onfinish = () => {
			particle.remove();
		};
	}
}

document.querySelector('#clicker').addEventListener('click', clicker);
document.querySelector('#clicker').addEventListener('contextmenu', e => {
	e.preventDefault();
	clicker(e);
});
document.addEventListener('keypress', (e) => {
	
	with(btn.getBoundingClientRect()) {
		if (e.code == 'Space') {
			clicker({clientX: x+width/2, clientY: y+height/2});
		}
	}
});


let lastUpdate = Date.now();

const graphUpdate = () => {
	let labels = cpsGraph.data.labels;
	if (labels.length >= 20)
		removeData(cpsGraph);

	let label = labels[labels.length - 1];
	addData(cpsGraph, (Number(label.slice(0, -1)) + 0.1).toFixed(1) + "s", clicks.length);
}

const frameLoop = () => {
	const msNow = Date.now(); //unix timestamp for now

	if (mode=='cont') {
		while (clicks[0] < msNow - 1000) //remove all clicks more than a second old
				clicks.shift();
		cpsDisplay.innerHTML = clicks.length;
	}
}

setInterval(frameLoop, 17);