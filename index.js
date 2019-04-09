const {withHermes} = require('Hermes-Javascript') /* Die Hermes zu Javascript Bibliothek wird eingebunden. Sie realisiert die Weitergabe der in der STT erkannten Schlüsselworte und deren Intents */

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
		flow.end()
		return "Der Test Text wurde in die Testdatei geschrieben!"
	})

})
