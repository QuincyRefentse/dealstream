const fetch = require('node-fetch');

exports.verifyDocument = async (documentText, documentType) => {
    try {
        const prompt = `Verify if this document is a valid ${documentType}. Here is the content: ${documentText}`;

        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                prompt: prompt,
                max_tokens: 1500,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return data.choices[0].text;  // Return the result from AI verification
    } catch (error) {
        throw new Error('Error with AI verification: ' + error.message);
    }
};
