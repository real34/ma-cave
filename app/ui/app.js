import riot from 'riot';

import layout from './layout';
import presentation from './presentation';
import cave from './cave';

riot.tag('ma-cave-app',

	`
    <layout-header></layout-header>

    <presentation></presentation>
    <cave></cave>

    <layout-footer></layout-footer>
	`

);
