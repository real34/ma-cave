import React from 'react';

import {Cave} from '../cave/local_storage';
import FormulaireImport from './formulaire-import.jsx';
import FormulaireSaisie from './formulaire-saisie.jsx';

class ContenuCave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enModeAjout: false,
			cave: new Cave()
		};
	}

	handleAfficherFormulaires() {
		this.setState({ enModeAjout: true });
	}

	handleCacherFormulaires() {
		this.setState({ enModeAjout: false });
	}

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

				<div class="bouteilles" if="{ !this.state.cave.estVide() }">
					<h2>Vos bouteilles</h2>
					<p>
						<button onClick={ callToAction }>Mettre une bouteille en cave</button>
						<button onClick={ callToAction }>Importer depuis OpenCellar</button>
					</p>

					<ul>
						{ this.state.cave.bouteilles().map((bouteille) => <Bouteille data={bouteille} />)}
					</ul>
				</div>
			</section>
		)
	}
}

class Bouteille extends React.Component {
	render() {
		let bouteille = this.props.data;
		return (
			<li>{ bouteille.nom } { bouteille.millesime.annee } ({ bouteille.couleur.nom })</li>
		);
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
	render() {
		return (
			<div>
				<a onClick={ this.props.onClose } href="#">Fermer [x]</a>
				<FormulaireImport cave={ this.props.cave } />
				<hr />
				<FormulaireSaisie cave={ this.props.cave } />
			</div>
		)
	}
}

export default ContenuCave;