// ============================
// EXERCICE 1.1
// Classe Personne
// ============================

class Personne {
  constructor(prenom, nom) {
    this.prenom = prenom;
    this.nom = nom;
  }

  nomComplet() {
    return `${this.prenom} ${this.nom}`;
  }
}

const p1 = new Personne("Lina", "Durand");
const p2 = new Personne("Amar", "Kaci");

console.log("Personnes:");
console.log(p1.nomComplet());
console.log(p2.nomComplet());



// ============================
// EXERCICE 1.2
// Classe Compteur
// ============================

class Compteur {

  static nbInstances = 0;
  #val = 0;

  constructor(initial = 0) {
    this.#val = initial;
    Compteur.nbInstances++;
  }

  inc() {
    this.#val++;
  }

  get valeur() {
    return this.#val;
  }

  set valeur(v) {
    if (Number.isInteger(v)) {
      this.#val = v;
    }
  }

}

const c1 = new Compteur(1);
const c2 = new Compteur();

c1.inc();

console.log("\nCompteur:");
console.log(c1.valeur);
console.log("Nombre d'instances:", Compteur.nbInstances);



// ============================
// EXERCICE 2.1
// Classe CompteBancaire
// ============================

class CompteBancaire {

  #solde = 0;

  constructor(soldeInitial = 0) {
    if (soldeInitial < 0) {
      throw new Error("Solde initial invalide");
    }

    this.#solde = soldeInitial;
  }

  crediter(montant) {
    if (montant > 0) {
      this.#solde += montant;
    }
  }

  debiter(montant) {

    if (montant <= 0) return;

    if (montant > this.#solde) {
      throw new Error("Fonds insuffisants");
    }

    this.#solde -= montant;
  }

  get solde() {
    return this.#solde;
  }

}

const cb = new CompteBancaire(100);
cb.debiter(30);

console.log("\nCompte bancaire:");
console.log("Solde:", cb.solde);



// ============================
// EXERCICE 3.1
// Classe Article
// ============================

class Article {

  constructor({ titre = "(Sans titre)", prix = 0, stock = 0 } = {}) {

    if (prix < 0 || stock < 0) {
      throw new Error("Valeurs invalides");
    }

    this.titre = titre;
    this.prix = prix;
    this.stock = stock;
  }

  enStock() {
    return this.stock > 0;
  }

}

const a = new Article({ titre: "Stylo", prix: 1.2, stock: 10 });
const b = new Article();

console.log("\nArticle:");
console.log(a.enStock(), b.titre);



// ============================
// EXERCICE 4.1
// Héritage
// ============================

class Animal {

  constructor(nom) {
    this.nom = nom;
  }

  parler() {
    return `${this.nom} fait un bruit.`;
  }

}

class Chien extends Animal {

  parler() {
    return `${this.nom} aboie.`;
  }

}

class Chat extends Animal {

  parler() {
    return `${this.nom} miaule.`;
  }

}

const animaux = [
  new Chien("Rex"),
  new Chat("Mina")
];

console.log("\nAnimaux:");

for (const a of animaux) {
  console.log(a.parler());
}



// ============================
// EXERCICE 4.2
// Héritage Vehicule
// ============================

class Vehicule {

  constructor(marque) {
    this.marque = marque;
  }

  info() {
    return `Véhicule ${this.marque}`;
  }

}

class Voiture extends Vehicule {

  constructor(marque, portes = 4) {
    super(marque);
    this.portes = portes;
  }

  info() {
    return `${super.info()} avec ${this.portes} portes`;
  }

}

console.log("\nVehicule:");
console.log(new Voiture("Renault", 5).info());



// ============================
// EXERCICE 5.1
// Composition Panier
// ============================

class Panier {

  constructor() {
    this.lignes = [];
  }

  ajouter(article, quantite = 1) {

    const exist = this.lignes.find(l => l.article === article);

    if (exist) {
      exist.qte += quantite;
    } else {
      this.lignes.push({ article: article, qte: quantite });
    }
  }

  total() {
    return this.lignes.reduce((s, l) => s + l.article.prix * l.qte, 0);
  }

}

const stylo = new Article({
  titre: "Stylo",
  prix: 1.2,
  stock: 10
});

const panier = new Panier();

panier.ajouter(stylo, 3);

console.log("\nPanier:");
console.log("Total:", panier.total());



// ============================
// MINI PROJET
// BIBLIOTHEQUE
// ============================

class Livre {

  #disponible = true;

  constructor({ id, titre, auteur }) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
  }

  estDisponible() {
    return this.#disponible;
  }

  marquerEmprunte() {

    if (!this.#disponible) {
      throw new Error("Livre déjà emprunté");
    }

    this.#disponible = false;
  }

  marquerRetour() {
    this.#disponible = true;
  }

}



class Membre {

  constructor({ id, nom }) {
    this.id = id;
    this.nom = nom;
    this.emprunts = [];
  }

  peutEmprunter() {
    return this.emprunts.filter(e => !e.dateRetour).length < 3;
  }

}



class Emprunt {

  constructor({ livre, membre, dateEmprunt = new Date(), dateRetour = null }) {
    this.livre = livre;
    this.membre = membre;
    this.dateEmprunt = dateEmprunt;
    this.dateRetour = dateRetour;
  }

  retourner() {
    this.dateRetour = new Date();
    this.livre.marquerRetour();
  }

}



class Bibliotheque {

  constructor() {
    this.livres = [];
    this.membres = [];
    this.historique = [];
  }

  ajouterLivre(livre) {
    this.livres.push(livre);
  }

  ajouterMembre(membre) {
    this.membres.push(membre);
  }

  trouverLivre(id) {
    return this.livres.find(l => l.id === id);
  }

  trouverMembre(id) {
    return this.membres.find(m => m.id === id);
  }

  emprunter(idLivre, idMembre) {

    const livre = this.trouverLivre(idLivre);
    const membre = this.trouverMembre(idMembre);

    if (!livre || !membre) {
      throw new Error("Livre ou membre introuvable");
    }

    if (!livre.estDisponible()) {
      throw new Error("Livre indisponible");
    }

    if (!membre.peutEmprunter()) {
      throw new Error("Quota atteint");
    }

    livre.marquerEmprunte();

    const emprunt = new Emprunt({
      livre: livre,
      membre: membre
    });

    membre.emprunts.push(emprunt);
    this.historique.push(emprunt);

    return emprunt;
  }

  retourner(idLivre, idMembre) {

    const membre = this.trouverMembre(idMembre);

    const emprunt = membre.emprunts.find(
      e => e.livre.id === idLivre && !e.dateRetour
    );

    if (!emprunt) {
      throw new Error("Emprunt introuvable");
    }

    emprunt.retourner();

    return emprunt;
  }

  livresDisponibles() {
    return this.livres.filter(l => l.estDisponible());
  }

}



// ============================
// DEMONSTRATION
// ============================

const bib = new Bibliotheque();

bib.ajouterLivre(new Livre({
  id: 1,
  titre: "Clean Code",
  auteur: "R. Martin"
}));

bib.ajouterLivre(new Livre({
  id: 2,
  titre: "YDKJS",
  auteur: "K. Simpson"
}));

bib.ajouterMembre(new Membre({
  id: 1,
  nom: "Lina"
}));


const emp = bib.emprunter(1, 1);

console.log("\nBibliotheque:");
console.log("Emprunt:", emp.livre.titre, "par", emp.membre.nom);

console.log(
  "Disponibles:",
  bib.livresDisponibles().map(l => l.titre)
);

bib.retourner(1, 1);

console.log(
  "Retour effectué. Disponibles:",
  bib.livresDisponibles().map(l => l.titre)
);