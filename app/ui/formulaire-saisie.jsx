import React from 'react';

import {
	Bouteille,
	Cepage,
	Contenance,
	Couleur,
	Denomination,
	Medaille,
	Millesime,
	Producteur,
	Region,
	Taux
} from '../metier/inventaire/bouteille';

class FormulaireSaisie extends React.Component {
	ajouteBouteille(e) {
		var fields = e.target.elements;
		var bouteille = new Bouteille(fields.nom.value);
		bouteille.setMillesime(new Millesime(fields.millesime.value));
		bouteille.setCouleur(new Couleur(fields.couleur.value));
		bouteille.setContenance(new Contenance(
			fields.contenance_quantite.value,
			fields.contenance_unite.value
		));
		bouteille.setProducteur(new Producteur(fields.producteur.value));
		bouteille.setDenomination(new Denomination(fields.denomination.value));
		bouteille.setRegion(new Region(fields.region.value));
		bouteille.setTauxAlcool(new Taux(fields.taux_alcool.value));

		// TODO Make it work in a different component
		// for (var cepage in fields.cepages.value) {
		// 	bouteille.ajouteCepage(new Cepage(cepage));
		// }

		bouteille.ajouteMedaille(new Medaille(
			fields.medaille_classement.value,
			fields.medaille_nom.value,
			fields.medaille_annee.value
		));

		this.props.cave.ajouteBouteille(bouteille);
		e.preventDefault();
	}

	render() {
		return (
			<form onSubmit={ this.ajouteBouteille.bind(this) }>
				<div>
					<label for="nom">Nom / Cuvée</label>
					<input type='text' name='nom' placeholder='Entrez le nom / la cuvée de la bouteille' />
				</div>

				<div>
					<label for="millesime">Millésime</label>
					<input type='number' name='millesime' placeholder='2012' />
				</div>

				<div>
					<label for="couleur">Couleur</label>
					<select name="couleur">
						<option value="Rouge">Rouge</option>
						<option value="Rosé">Rosé</option>
						<option value="Blanc">Blanc</option>
						<option value="Champagne">Champagne</option>
					</select>
				</div>

				<div>
					<label for="contenance">Contenance</label>
					<input type='number' name='contenance_quantite' placeholder='75' />
					<select name='contenance_unite'>
						<option value="cl">cl</option>
						<option value="l">L</option>
					</select>
				</div>

				<div>
					<label for="producteur">Producteur</label>
					<input type='text' name='producteur' placeholder='Château Saincrit' />
				</div>

				<div>
					<label for="denomination">Dénomination</label>
					<input type='text' name='denomination' placeholder='bordeaux supérieur aoc' />
				</div>

				<div>
					<label for="region">Région</label>
					<input type='region' name='region' placeholder='bordeaux' />
				</div>

				<div>
					<label for="taux_alcool">Taux d'alcool</label>
					<input type='text' name='taux_alcool' placeholder='12,5' />
				</div>

				<div>
					<label for="cepages">Cépages</label>

					<input type="checkbox" name="cepages_cabernet" id="cabernet" value="cabernet" />
					<label for="cabernet">Cabernet</label>

					<input type="checkbox" name="cepages_sauvignon" id="sauvignon" value="sauvignon" />
					<label for="sauvignon">Sauvignon</label>

					<input type="checkbox" name="cepages_syrah" id="syrah" value="syrah" />
					<label for="syrah">Syrah</label>

					<input type="checkbox" name="cepages_merlot" id="merlot" value="merlot" />
					<label for="merlot">Merlot</label>

					<input type="checkbox" name="cepages_tanat" id="tanat" value="tanat" />
					<label for="tanat">Tanat</label>

					<input type="checkbox" name="cepages_muscat" id="muscat" value="muscat" />
					<label for="muscat">Muscat</label>

					<input type="checkbox" name="cepages_chacelas" id="chacelas" value="chacelas" />
					<label for="chacelas">Chacelas</label>
				</div>

				<div>
					<label for="medaille">Médaille</label>

					<label for="classement">Classement</label>
					<input type="number" name="medaille_classement" />

					<label for="nom">Nom</label>
					<input type="text" name="medaille_nom" />

					<label for="annee">Annee</label>
					<input type="number" name="medaille_annee" />
				</div>

				<button type="submit">Mettre en cave</button>
			</form>
		)
	}

};

export default FormulaireSaisie;