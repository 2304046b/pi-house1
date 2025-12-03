(function(){

	var settings = {
		channel: 'pi-house',
		publish_key: 'pub-c-d7031905-2761-47d5-a9b4-d15da7ff153',
		subscribe_key: 'sub-c-c34fe3bd-da3e-4394-a72d-4dd48ce71bbe'
	};

	var pubnub = PUBNUB(settings);

	var door = document.getElementById('door');
	var lightLiving = document.getElementById('lightLiving');
	var lightPorch = document.getElementById('lightPorch');
	var fireplace = document.getElementById('fireplace');

	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
			}
		}
	})

	/* 
		Data settings:

		Servo

		item: 'door'
		open: true | false

		LED

		item: 'light-*'
		brightness: 0 - 10

	*/

	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	// UI EVENTS

	door.addEventListener('change', function(e){
		publishUpdate({item: 'door', open: this.checked});
	}, false);

	lightLiving.addEventListener('change', function(e){
		publishUpdate({item: 'light-living', brightness: +this.value});
	}, false);

	lightPorch.addEventListener('change', function(e){
		publishUpdate({item: 'light-porch', brightness: +this.value});
	}, false);

	fireplace.addEventListener('change', function(e){
		publishUpdate({item: 'fireplace', brightness: +this.value});
	}, false);
})();
