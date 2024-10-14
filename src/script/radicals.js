const axios = require('axios');
const fs = require('fs');

// WaniKani API token
const token = '2d4c7c9f-71b1-4eca-8dbc-bae5b8433794'; // Replace with your token

// Initialize the radicals data structure
const radicalsData = {};

// Fetch radicals from the WaniKani API
async function fetchRadicals() {
    try {
        let nextUrl = 'https://api.wanikani.com/v2/subjects?types=radical';

        while (nextUrl) {
            const response = await axios.get(nextUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const radicals = response.data.data;

            // Group radicals by WaniKani levels
            radicals.forEach(radical => {
                const level = radical.data.level;

                // Initialize the level group if not present
                if (!radicalsData[level]) {
                    radicalsData[level] = [];
                }

                radicalsData[level].push({
                    radical: radical.data.characters || radical.data.slug, // Some radicals don't have a 'characters' field
                    signification: radical.data.meanings.map(meaning => meaning.meaning).join(', '),
                    description: radical.data.meanings[0].meaning // Taking the first meaning as description
                });
            });

            // Check if there's more data to fetch
            nextUrl = response.data.pages.next_url;
        }

        // Write the data to a file
        fs.writeFileSync('radicalsData.js', `const radicalsData = ${JSON.stringify(radicalsData, null, 2)};\n\nexport default radicalsData;`);
        console.log('Radicals data has been written to radicalsData.js');
    } catch (error) {
        console.error('Error fetching radicals data:', error);
    }
}

// Call the fetch function
fetchRadicals();
