/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

function main() {
  return <footer>
    <hr/>
    <div className="a-propos">
      <h4>Qui sommes-nous ?</h4>
      <p>
        <i className="fa fa-twitter"></i>
        Le projet principalement maintenu par <a href="http://twitter.com/pierremartin">Pierre Martin</a>.
      </p>
      <p>
        <i className="fa fa-github"></i>
        Le code source est disponible sur <a href="http://github.com/real34/ma-cave">Github</a> !
      </p>
    </div>
    <div className="suggestions">
      <h4>Un problème, des suggestions ? Contactez-nous !</h4>
      <form action="//api.formspree.com/contact@pierre-martin.fr" method="post">
        <label for="nom">Nom :</label> <input type="text" name="nom" />
        <label for="_replyto">Email :</label> <input type="email" name="_replyto" />
        <label for="suggestion">Message : </label>
        <textarea name="suggestion" required="required" id="" cols="30" rows="10"></textarea>
        <button type="submit"><i className="fa fa-rocket"></i> Envoyer</button>
      </form>
    </div>
  </footer>
}

export default main;
