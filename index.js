import Device from './device.js';
import buttonService from './buttonService.js';
import ledService from './ledService.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const connect = async () => {
	const { server } = await Device();
	const bs = await buttonService(server, val => $("#btn").innerHTML = val ? "PRESSED" : "RELEASED");
	const ls = await ledService(server);

	// Show hidden interaction cards.
	Array.from($$('.card.action')).forEach(el => el.classList.remove('hidden'));
	// Hide connect button card.
	$('.connect').classList.add('hidden');

	// Set disconnect action.
	$('#disconnect').addEventListener('click', () => {
		server.disconnect();
		Array.from($$('.card.action')).forEach(el => el.classList.add('hidden'));
		$('.connect').classList.remove('hidden');
	});

	// Set led actions.
	$('#off').addEventListener('click', () => ls.set(0));
	['red', 'blue', 'green'].forEach(id => $(`#${id}`).addEventListener('click', () => ls.set(1, id)));
}

$('#connect').addEventListener('click', connect);