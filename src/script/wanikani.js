const axios = require('axios');
const fs = require('fs');

// WaniKani API token
const token = '2d4c7c9f-71b1-4eca-8dbc-bae5b8433794'; // Replace with your token

// Initialize the kanji data structure
const kanjiData = {};

// Fetch kanji from the WaniKani API
async function fetchKanji() {
    try {
        let nextUrl = 'https://api.wanikani.com/v2/subjects?types=kanji';

        while (nextUrl) {
            const response = await axios.get(nextUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const kanjis = response.data.data;

            // Group kanji by WaniKani levels
            kanjis.forEach(kanji => {
                const level = kanji.data.level;

                // Initialize the level group if not present
                if (!kanjiData[level]) {
                    kanjiData[level] = [];
                }

                kanjiData[level].push({
                    kanji: kanji.data.characters,
                    signification: kanji.data.meanings.map(meaning => meaning.meaning).join(', '),
                    description: kanji.data.meanings[0].meaning // Taking the first meaning as description
                });
            });

            // Check if there's more data to fetch
            nextUrl = response.data.pages.next_url;
        }

        // Write the data to a file
        fs.writeFileSync('kanjiData.js', `const kanjiData = ${JSON.stringify(kanjiData, null, 2)};\n\nexport default kanjiData;`);
        console.log('Kanji data has been written to kanjiData.js');
    } catch (error) {
        console.error('Error fetching kanji data:', error);
    }
}

// Call the fetch function
fetchKanji();
