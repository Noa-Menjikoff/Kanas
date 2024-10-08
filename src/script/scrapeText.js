const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL de la page des œuvres (par exemple, de Natsume Soseki)
const baseURL = 'https://www.aozora.gr.jp';
const url = `${baseURL}/index_pages/person81.html`; // Exemple de page pour un auteur spécifique

// Fonction pour récupérer les textes
async function fetchTexts() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const texts = [];

    // Sélection des éléments contenant les titres et les premiers liens
    const links = $('ol > li > a');

    // Parcours des liens récupérés pour accéder aux pages des œuvres complètes
    for (let i = 0; i < links.length; i++) {
      const title = $(links[i]).text().trim();
      const partialLink = $(links[i]).attr('href');
      const workPageURL = `${baseURL}/${partialLink}`;

      // Récupération du lien du texte complet depuis la page de l'œuvre
      const textLink = await fetchTextLink(workPageURL);
      if (textLink) {
        texts.push({ title, textLink });
      }
    }

    // Écriture des résultats dans un fichier JSON
    fs.writeFileSync('texts.json', JSON.stringify(texts, null, 2));
    console.log('Textes récupérés et enregistrés dans texts.json');
  } catch (error) {
    console.error('Erreur lors de la récupération des textes :', error);
  }
}

// Fonction pour récupérer le lien du texte complet sur la page d'une œuvre
async function fetchTextLink(workPageURL) {
  try {
    const { data } = await axios.get(workPageURL);
    const $ = cheerio.load(data);

    // Sélection du lien qui mène au fichier texte complet (HTML, EPUB, etc.)
    const downloadLink = $('a[href$=".html"], a[href$=".txt"]').attr('href');
    
    if (downloadLink) {
      return `${baseURL}/${downloadLink}`;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du lien sur ${workPageURL}:`, error);
  }
  return null;
}

// Lancement de la fonction
fetchTexts();
