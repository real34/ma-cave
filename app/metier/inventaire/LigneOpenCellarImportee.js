import Bacon from 'baconjs';

function init(commandBus) {
	return commandBus
		.flatMap(extractSupportedCommands)
		.map(asEvent);
}

function extractSupportedCommands(command) {
	return (command.type === 'ImporterLigneOpenCellar')
		? command.data
		: Bacon.never();
}

function asEvent(ligne) {
	return {
		type: 'LigneOpenCellarImportee',
		ligne: ligne
	};
}

export default {
	attachTo: init
}