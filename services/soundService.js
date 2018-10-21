import UUID from './UUID.js';
export default async server => {
	const service = await server.getPrimaryService(UUID.SOUND.ID);
	const config = await service.getCharacteristic(UUID.SOUND.CONFIG);
	const sound = await service.getCharacteristic(UUID.SOUND.DATA);
	return {
		async playSample(sample) {
			await config.writeValue(new Uint8Array([3, 1])); // speakerMode, microphoneMode
			await sound.writeValue(new Uint8Array([sample]))
		},
		async playTone({frequency, duration, volume}) {
			await config.writeValue(new Uint8Array([1, 1])); // speakerMode, microphoneMode
			const data = new Uint8Array(5);
        	data[0] = frequency;
        	data[1] = (frequency >> 8);
        	data[2] = duration;
        	data[3] = (duration >> 8);
			data[4] = volume;
			await sound.writeValue(data)
		}
	}
}