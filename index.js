import Device from './services/device.js';
import buttonService from './services/buttonService.js';
import ledService from './services/ledService.js';
import batteryService from './services/batteryService.js';
import soundService from './services/soundService.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const connButton = $('#connect');
const setConnState = (state) => {
	switch (state) {
		case 'disconnected':
			connButton.removeAttribute('disabled');
			connButton.innerText = 'Connect';
			Array.from($$('.card.action')).forEach(el => el.classList.add('hidden'));
			$('.connect').classList.remove('hidden');
			break;
		case 'connecting':
			connButton.setAttribute('disabled', true);
			connButton.innerText = 'Connecting...';
			break;
		case 'connected':
			// Show hidden interaction cards.
			Array.from($$('.card.action')).forEach(el => el.classList.remove('hidden'));
			// Hide connect button card.
			$('.connect').classList.add('hidden');
			break;

		default:
			break;
	}
}

const setBattery = val => $('#batt > #level').innerText = `${val}%`;

const connect = async () => {
	setConnState('connecting');
	try {
		const { server } = await Device();
		const bs = await buttonService(server, val => $("#btn").innerHTML = val ? "PRESSED" : "RELEASED");
		const ls = await ledService(server);
		const batt = await batteryService(server, val => setBattery(val));
		const sound = await soundService(server);
		// sound.playSample(1);
		setConnState('connected');
		// Set disconnect action.
		$('#disconnect').addEventListener('click', () => {
			server.disconnect();
			setConnState('disconnected');
		});
		// Set led actions.
		$('#off').addEventListener('click', () => ls.set(0));
		['red', 'blue', 'green'].forEach(id => $(`#${id}`).addEventListener('click', () => ls.set(1, id)));
		Array.from(Array(9).keys()).forEach(i => {
			$(`#btn_${i}`).addEventListener('click', sound.playSample.bind(null, i));
		})
	}
	catch (err) {
		console.log(err);
		setConnState('disconnected')
	}
}

connButton.addEventListener('click', connect);