import React from 'react';

import {Cave} from '../cave/local_storage';
// import formulaireImport from './formulaire-import';
// import formulaireSaisie from './formulaire-saisie';

class ContenuCave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enModeAjout: false,
			cave: new Cave()
		};
	}

	handleAfficherFormulaires() {
		console.debug('ajout');
		this.setState({ enModeAjout: true });
	}

	handleCacherFormulaires() {
		console.debug('cache');
		this.setState({ enModeAjout: false });
	}
	/*

		this.cave.on('update', () => this.update());

		this.on('update', () => {
			this.bouteilles = this.cave.bouteilles();
			this.estVide = this.cave.estVide();
		});
	*/
	render() {
		var callToAction = this.handleAfficherFormulaires.bind(this);
		var formulaires = '';
		if (this.state.enModeAjout) {
			formulaires = <Formulaires cave={this.state.cave} onClose={this.handleCacherFormulaires.bind(this)} />;
		}

		return (
			<section class="cave">
				{ this.state.cave.estVide() ? <ErreurCaveVide onCallToAction={callToAction} /> : '' }
				{ formulaires }

				{	/*
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
				</div>*/
				}
			</section>
		)
	}
}

class ErreurCaveVide extends React.Component {
	render() {
		return (
			<div class="erreur">
				<p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>
				<p>
					<a class="action" onClick={ this.props.onCallToAction }><i class="fa fa-plus"></i> Mettez des bouteilles en cave</a>
					ou <a class="action" onClick={ this.props.onCallToAction }><i class="fa fa-file"></i> Importez une cave depuis OpenCellar</a>
					afin de pouvoir commencer à utiliser le site
				</p>
			</div>
		)
	}
}

class Formulaires extends React.Component {
	/*
		TODO
		<formulaire-import cave={ this.props.cave }>
		<formulaire-saisie cave={ this.props.cave }>
	*/
	render() {
		return (
			<div>
				<a onClick={ this.props.onClose } href="#">Fermer [x]</a>
			</div>
		)
	}
}

export default ContenuCave;