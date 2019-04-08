const {withHermes} = require('Hermes-Javascript')

withHermes(hermes => {
	const dialog = hermes.dialog()

	dialog.flow('n01:StartScript', (msg, flow) => {
		console.log(msg)
		
		flow.end()
		return "Ok, wird ausgeführt"
		})

	})