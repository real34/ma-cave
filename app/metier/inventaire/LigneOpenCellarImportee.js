import {Rx} from '@cycle/core';

function asEvent(ligne) {
	return {
		type: 'LigneOpenCellarImportee',
		ligne: ligne
	};
}

const commands = new Rx.Subject();

const events = commands
	.filter(command => command.type === 'ImporterLigneOpenCellar')
	.pluck('data')
	.map(asEvent);

export default { commands, events };