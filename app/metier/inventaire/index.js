import Cave from './projections/cave';
import Trololo from './projections/trololo';

import LigneOpenCellarImportee from './LigneOpenCellarImportee';

export default {
	name: 'Inventaire',
	domainEvents: [LigneOpenCellarImportee],
	projections: [Cave, Trololo]
	// TODO sideEffects: []
};