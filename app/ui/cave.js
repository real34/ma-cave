import riot from 'riot';

import {Cave} from '../cave/local_storage';
import formulaireImport from './formulaire-import';
import formulaireSaisie from './formulaire-saisie';

riot.tag('cave',

	`
	<section class="cave" ng-controller="CaveController">
		<div class="erreur" if="{ estVide }">
			<p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>
			<p>
				<a class="action" onclick="{ afficherFormulaires }"><i class="fa fa-plus"></i> Mettez des bouteilles en cave</a>
				ou <a class="action" onclick="{ afficherFormulaires }"><i class="fa fa-file"></i> Importez une cave depuis OpenCellar</a>
				afin de pouvoir commencer à utiliser le site
			</p>
		</div>

		<div if="{ enModeAjout }">
			<a onclick="{ cacherFormulaires }" href="#">Fermer [x]</a>
			<formulaire-import cave="{ cave }">
			<formulaire-saisie cave="{ cave }">
		</div>

		<div class="bouteilles" if="{ !estVide }">
			<h2>Vos bouteilles</h2>
			<p>
				<button onclick="{ afficherFormulaires }">Mettre une bouteille en cave</button>
				<button onclick="{ afficherFormulaires }">Importer depuis OpenCellar</button>
			</p>

			<ul>
				<li each="{ bouteilles }">
					{ nom } { millesime.annee } ({ couleur.nom })
				</li>
			</ul>
		</div>
	</section>
	`,

	function(opts) {
		this.cave = new Cave();

		this.cave.on('update', () => this.update());

		this.enModeAjout = false;
		this.afficherFormulaires = (e) => this.enModeAjout = true;
		this.cacherFormulaires = (e) => this.enModeAjout = false;

		this.on('update', () => {
			this.bouteilles = this.cave.bouteilles();
			this.estVide = this.cave.estVide();
		});
	}

);