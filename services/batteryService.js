import UUID from './UUID.js';
export default async (server, cb) => {
	const service = await server.getPrimaryService('battery_service');
	const char = await service.getCharacteristic('battery_level');
	await char.startNotifications();
	char.addEventListener('characteristicvaluechanged', e => cb(e.target.value.getUint8(0)));
	const value = await char.readValue();
	cb(value.getUint8(0));
}