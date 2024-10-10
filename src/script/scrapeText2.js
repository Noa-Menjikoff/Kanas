const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the Aozora Bunko works list page (for Natsume Soseki in this example)
const baseURL = 'https://www.aozora.gr.jp';
const url = `${baseURL}/index_pages/person81.html`; // Example author page

// Function to fetch and parse the webpage
async function fetchTexts() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const texts = [];
    const links = $('ol > li > a');

    for (let i = 0; i < links.length ; i++) { // Limiting to 10 works
      const title = $(links[i]).text().trim();
      const partialLink = $(links[i]).attr('href');
      const workPageURL = `${baseURL}/${partialLink}`;

      console.log(`Fetching link for: ${title}`);
      const textLink = await fetchTextLink(workPageURL);
      const textContent = await fetchTextContent(textLink);
      if (textLink) {
        texts.push({ title, textLink , textContent });
        console.log(`Retrieved link for ${title}: ${textLink}`);
      }

      // Adding delay to avoid overloading the site
    }

    // Write the result to a JSON file
    fs.writeFileSync('texts.json', JSON.stringify(texts, null, 2));
    console.log('Texts fetched and saved in texts.json');
  } catch (error) {
    console.error('Error fetching texts:', error);
  }
}

// Function to fetch the direct text link on the work's page
async function fetchTextLink(workPageURL) {
  try {
    const { data } = await axios.get(workPageURL);
    const $ = cheerio.load(data);

    // Selecting the link that contains the final text
    const partialFileLink = $('a[href^="./files/"][href$=".html"]').attr('href');
    
    if (partialFileLink) {
      // Constructing the final link by extracting the proper 'cards' directory from the URL
      const workID = workPageURL.split('/').slice(-2, -1)[0]; // Extracts the "cards/000081" part from the URL
      const finalLink = `${baseURL}/cards/${workID}/${partialFileLink.substring(2)}`; // Builds the final link
      return finalLink;
    } else {
      console.log(`No download link found for ${workPageURL}`);
    }
  } catch (error) {
    console.error(`Error fetching the link on ${workPageURL}:`, error);
  }
  return null;
}

const iconv = require('iconv-lite'); // Install this package: npm install iconv-lite

async function fetchTextContent(textLink) {
  try {
    // Utilisation de responseType 'arraybuffer' pour éviter la conversion automatique en chaîne de caractères
    const { data } = await axios.get(textLink, { responseType: 'arraybuffer' });

    // Décodage de la réponse avec l'encodage Shift-JIS
    const decodedData = iconv.decode(Buffer.from(data), 'shift_jis');
    
    // Chargement des données HTML décodées dans Cheerio
    const $ = cheerio.load(decodedData);

    // Extraction des métadonnées (sans balises HTML)
    const author = $('.author').text().trim();

    // Récupérer le contenu HTML complet du texte principal
    let mainText = $('.main_text').html();

    // Supprimer les caractères \n
    mainText = mainText.replace(/\n/g, ''); // Supprime tous les \n du contenu du texte principal

    return { author, mainText}; // Retourne les métadonnées et le contenu HTML complet du texte principal
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu du texte:', error);
    return null;
  }
}
  // Run the function
fetchTexts();
