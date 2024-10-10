const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Configurez votre client Supabase
const supabaseUrl = 'https://gnbdewfilzmdbwztqhzh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduYmRld2ZpbHptZGJ3enRxaHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwMjMsImV4cCI6MjA0NDA3OTAyM30.f1LwDW2FAsSlpzkGlu1Ni0h0QkyQOvmww787yLV138k'; // Remplacez par votre clé API
const supabase = createClient(supabaseUrl, supabaseKey);

// Charger les données du fichier JSON
const data = JSON.parse(fs.readFileSync('texts.json', 'utf-8'));

// Fonction pour insérer les données dans la table 'books'
async function insertDataIntoBooks() {
  try {
    for (const item of data) {
      const { title, textLink, textContent } = item;

      // Vérifier que les champs ne sont pas null
      if (!title || !textLink || !textContent || !textContent.mainText || !textContent.author) {
        console.log(`Skipping entry due to missing data for title: ${title || 'unknown'}`);
        continue; // Ignore les entrées avec des champs manquants ou null
      }

      // Insertion dans la table books
      const { error } = await supabase
        .from('books')
        .insert([
          {
            title: title,
            url: textLink,
            mainText: textContent.mainText,
            author: textContent.author,
          },
        ]);

      if (error) {
        console.error(`Erreur lors de l'insertion des données pour ${title}:`, error.message);
      } else {
        console.log(`Données insérées avec succès pour le titre : ${title}`);
      }
    }
  } catch (err) {
    console.error('Erreur inattendue :', err.message);
  }
}

// Exécuter la fonction
insertDataIntoBooks();
