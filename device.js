import UUID from './UUID.js';

export default async ()  => {
	const device = await navigator.bluetooth.requestDevice({
		filters: [{
			services: [UUID.CONFIG.ID]
		}]
	});
	const server = await device.gatt.connect();
	return {device, server};
}

