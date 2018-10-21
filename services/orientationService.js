import UUID from './UUID.js';

export default async (server, cb) => {
	const service = await server.getPrimaryService(UUID.MOTION.ID);
	const char = await service.getCharacteristic(UUID.MOTION.ORIENTATION);
	char.startNotifications();
	char.addEventListener('characteristicvaluechanged', e => cb(e.target.value.getUint8(0)));
}