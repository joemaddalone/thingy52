import UUID from './UUID.js';
export default async server => {
	const service = await server.getPrimaryService(UUID.UI.ID);
	const led = await service.getCharacteristic(UUID.UI.LED);
	return {
		set(mode, color) {
			if (mode === 0) {
				return led.writeValue(new Uint8Array([0]));
			}
			let data = [mode];
			switch (color) {
				case 'red':
					data = data.concat([255, 0, 0]);
					break;
				case 'blue':
					data = data.concat([0, 0, 255]);
					break;
				case 'green':
					data = data.concat([0, 128, 0]);
					break;
				default:
					break;
			}
			led.writeValue(new Uint8Array(data));
		}
	};
}