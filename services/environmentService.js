import UUID from './UUID.js';

const celsiusToFahrenheit = (val) => {
	const c = parseFloat(`${val.getUint8(0)}.${val.getUint8(1)}`);
	return Math.round(c * 9 / 5 + 32);
}



export default async (server, cb) => {
	const env = {
		TEMP: null,
		PRESSURE: null,
		HUMIDITY: null,
		GAS: null
	}
	const updateEnvironment = (updates, cb) => {
		Object.assign(env, updates)
		if(updates.TEMP){
			env.TEMP = celsiusToFahrenheit(updates.TEMP);
		}
		if(updates.HUMIDITY){
			env.HUMIDITY = updates.HUMIDITY.getUint8(0);
		}
		if(updates.PRESSURE){
			env.PRESSURE = parseFloat(`${updates.PRESSURE.getUint8(0)}.${updates.PRESSURE.getUint8(1)}`);
		}
		cb(env);
	}
	const service = await server.getPrimaryService(UUID.ENV.ID);

	Object.keys(UUID.ENV)
		.filter(k => !['ID', 'CONFIG', 'COLOR'].includes(k))
		.forEach(async k => {
			const char = await service.getCharacteristic(UUID.ENV[k]);
			char.addEventListener('characteristicvaluechanged', e => updateEnvironment({[k]: e.target.value}, cb));
			return char.startNotifications();
		})





}