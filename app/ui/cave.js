// import React from 'react';

// import FormulaireImport from './formulaire-import.jsx';
// import FormulaireSaisie from './formulaire-saisie.jsx';

/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import FormulaireImport from './formulaire-import.js';
// import FormulaireSaisie from './formulaire-saisie.js';

function main (responses) {
  // TODO Improve containment in views to add a 'close' link in forms
  const route$ = Rx.Observable.just({ url: '/', on: view });
  const formulaireImport = FormulaireImport(responses, '/cave');

  return {
    Router: route$.merge(formulaireImport.Router)
  };
}

function view () {
  const timer$ = Rx.Observable.interval(1000).map(t => t + 1).startWith(1);

  return Rx.Observable.combineLatest(timer$, time => <section className='cave'>
    CAVE {time}
    {renderErreurCaveVide()}
  </section>);
   // { this.props.cave.estVide() ? <ErreurCaveVide onCallToAction={callToAction} /> : '' }
   // { formulaires }

   // <div className='bouteilles' if='{ !this.props.cave.estVide() }'>
   //   <h2>Vos bouteilles</h2>
   //   <p>
   //     <button onClick={ callToAction }>Mettre une bouteille en cave</button>
   //     <button onClick={ callToAction }>Importer depuis OpenCellar</button>
   //   </p>

   //   <ul>
   //     { this.props.cave.bouteilles().map((bouteille) => <Bouteille data={bouteille} />)}
   //   </ul>
   // </div>
}

function renderErreurCaveVide () {
  return <div className='erreur'>
    <p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>
    <p>
     <a className='action' href='#/cave/mettre-des-bouteilles'><i className='fa fa-plus'></i> Mettez des bouteilles en cave</a>
     ou <a className='action' href='#/cave/importer-depuis-opencellar'><i className='fa fa-file'></i> Importez une cave depuis OpenCellar</a>
     afin de pouvoir commencer à utiliser le site
    </p>
  </div>;
}

// class ContenuCave extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			enModeAjout: false
// 		};
// 	}

// 	handleAfficherFormulaires() {
// 		this.setState({ enModeAjout: true });
// 	}

// 	handleCacherFormulaires() {
// 		this.setState({ enModeAjout: false });
// 	}

// 	render() {
// 		var callToAction = this.handleAfficherFormulaires.bind(this);
// 		var formulaires = '';
// 		if (this.state.enModeAjout) {
// 			formulaires = <Formulaires cave={this.props.cave} onClose={this.handleCacherFormulaires.bind(this)} />;
// 		}

// 		return (
// 			<section className='cave'>
// 				{ this.props.cave.estVide() ? <ErreurCaveVide onCallToAction={callToAction} /> : '' }
// 				{ formulaires }

// 				<div className='bouteilles' if='{ !this.props.cave.estVide() }'>
// 					<h2>Vos bouteilles</h2>
// 					<p>
// 						<button onClick={ callToAction }>Mettre une bouteille en cave</button>
// 						<button onClick={ callToAction }>Importer depuis OpenCellar</button>
// 					</p>

// 					<ul>
// 						{ this.props.cave.bouteilles().map((bouteille) => <Bouteille data={bouteille} />)}
// 					</ul>
// 				</div>
// 			</section>
// 		)
// 	}
// }

// class Bouteille extends React.Component {
// 	render() {
// 		let bouteille = this.props.data;
// 		return (
// 			<li>{ bouteille.nom } ({ bouteille.couleur.nom })</li>
// 		);
// 	}
// }

// class ErreurCaveVide extends React.Component {
// 	render() {
// 		return (
// 			<div className='erreur'>
// 				<p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>
// 				<p>
// 					<a className='action' onClick={ this.props.onCallToAction }><i className='fa fa-plus'></i> Mettez des bouteilles en cave</a>
// 					ou <a className='action' onClick={ this.props.onCallToAction }><i className='fa fa-file'></i> Importez une cave depuis OpenCellar</a>
// 					afin de pouvoir commencer à utiliser le site
// 				</p>
// 			</div>
// 		)
// 	}
// }

// class Formulaires extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<a onClick={ this.props.onClose } href='#'>Fermer [x]</a>
// 				<FormulaireImport cave={ this.props.cave } />
// 				<hr />
// 				<FormulaireSaisie cave={ this.props.cave } />
// 			</div>
// 		)
// 	}
// }

export default main;
