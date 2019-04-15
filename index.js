const fs = require('fs');
const path = require('path');
const {withHermes} = require('hermes-javascript'); /* Die Hermes zu Javascript Bibliothek wird eingebunden. Sie realisiert die Weitergabe der in der STT erkannten Schlüsselworte und deren In
tents */

//Funktion zum ausführen von Konsolenbefehlen
function execute(command)
{
        const exec = require('child_process').exec
        exec(command, (err, stdout, stderr) =>
        {
                process.stdout.write(stdout);
        });
}

function ArrayToString()
{
	const entries = fs.readdir('./Scripts/', function(err, entries)
        {
            const ArrayString = entries.join(' ');
            console.log(ArrayString);
        }); /* der Inhalt, des Ordners in dem die Scripte liegen,  wird in ein Array gepackt und anschließend im Log ausgegeben */
	return entries
}

withHermes(hermes => {
    const dialog = hermes.dialog();

	dialog.flow('n01:ExecBash', (msg, flow) => /* Wenn der Intent, der von Hermes übergeben wird, "StartScript" ist wird ein Konsolenbefehl ausgeführt */
        {
                console.log(msg);
                execute('echo "Test" >> /home/pi/test.txt'); /**/
                flow.end();
                return "Der Test Text wurde in die Testdatei geschrieben!"
        });

        dialog.flow('n01:ReadBashDir', (msg, flow) => /* Wenn der Intent, der von Hermes übergeben wird, "ReadBashDir" ist wird der Scriptordner ausgelesen */
        {
                console.log(msg);
                const ArrayString = ArrayToString();
                console.log(ArrayString);
                flow.end();
                return "Es stehen" + ArrayString  + "zur Auswahl"
        });

});
