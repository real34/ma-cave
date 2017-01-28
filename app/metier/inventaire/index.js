import Cave from './projections/cave';

import LigneOpenCellarImportee from './LigneOpenCellarImportee';

export default {
	name: 'Inventaire',
	domainEvents: [LigneOpenCellarImportee],
	projections: [Cave]
	// TODO sideEffects: []
};
