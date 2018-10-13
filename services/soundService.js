import UUID from './UUID.js';
export default async server => {
	const service = await server.getPrimaryService(UUID.SOUND.ID);
	const config = await service.getCharacteristic(UUID.SOUND.CONFIG);
	const sound = await service.getCharacteristic(UUID.SOUND.DATA);
	return {
		async playSample(sample) {
			await config.writeValue(new Uint8Array([3, 1])); // speakermode, microphoneMode
			await sound.writeValue(new Uint8Array([sample]))
		}
	}
}