# WordSphere
This dictionary app is built using React.js for the frontend and styled with Tailwind CSS for a clean, responsive UI. When a user enters a word into the search input, the app sends a GET request to the Free Dictionary API (https://api.dictionaryapi.dev/api/v2/entries/en/<word>). The response contains an array of word objects, each including definitions, parts of speech, phonetics, and more. The app parses this data and displays it in a structured format using reusable React components. If the word is not found or the API returns an error, the app gracefully handles it by showing a user-friendly message. The layout is optimized for both desktop and mobile devices, and the codebase is modular, making it easy to extend with features like pronunciation audio, synonyms, or dark mode in future updates.

Preview: https://codesandbox.io/p/sandbox/github/iaashishjha/WordSphere

Demo Video: https://youtu.be/tSJwKsG5gcE


