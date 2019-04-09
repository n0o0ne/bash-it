const fs = require('fs');
const {withHermes} = require('Hermes-Javascript'); /* Die Hermes zu Javascript Bibliothek wird eingebunden. Sie realisiert die Weitergabe der in der STT erkannten Schlüsselworte und deren Intents */

//Funktion zum ausführen von Konsolenbefehlen
function execute(command) 
{
	const exec = require('child_process').exec

	exec(command, (err, stdout, stderr) => 
	{
        	process.stdout.write(stdout)
	})
}


withHermes(hermes => {
	const dialog = hermes.dialog()

	dialog.flow('n01:ExecBash', (msg, flow) => /* Wenn der Intent, der von Hermes übergeben wird, "StartScript" ist wird ein Konsolenbefehl ausgeführt */
	{
		console.log(msg)
		execute('echo "Test" > /home/n01/test.txt') /**/
		if (err) 
		{
			return console.log(err.message);
		}
		flow.end()
		return "Der Test Text wurde in die Testdatei geschrieben!"
	})

	dialog.flow('n01:ReadBashDir', (msg, flow) => /* Wenn der Intent, der von Hermes übergeben wird, "ReadBashDir" ist wird der Scriptordner ausgelesen */
	{
		console.log(msg)
		fs.readdir('./Scripts/', (err, entries) => 
		{
			if (err) 
			{
				return console.log(err.message);
			}
			console.log(entries);
		}); /* der Inhalt, des Ordners in dem die Scripte liegen,  wird in ein Array gepackt und anschließend im Log ausgegeben */
		flow.end()
		return "Es stehen" entries  "zur Auswahl"
	})

})
