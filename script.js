const shortFormDict = {
    "lol": { fullForm: "Laugh Out Loud", example: "He sent me a funny meme, LOL!" },
    "brb": { fullForm: "Be Right Back", example: "I'll be back in a minute, BRB." },
    "idk": { fullForm: "I Don't Know", example: "What's the answer? IDK." },
    "btw": { fullForm: "By The Way", example: "BTW, did you hear the news?" },
    "omg": { fullForm: "Oh My God", example: "OMG! That's unbelievable!" },
    "gtg": { fullForm: "Got To Go", example: "It's late, GTG now." },
    "asap": { fullForm: "As Soon As Possible", example: "Please respond ASAP." },
    "tbh": { fullForm: "To Be Honest", example: "TBH, I didn't like the movie." },
    "smh": { fullForm: "Shaking My Head", example: "That was such a silly mistake, SMH." },
    "imo": { fullForm: "In My Opinion", example: "IMO, that was the best episode." }
};

// Convert form submit handler
document.getElementById("converterForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const convertOption = document.getElementById("convertOption").value;
    const shortFormInput = document.getElementById("shortForm").value.toLowerCase();
    const outputElement = document.getElementById("output");

    if (convertOption === "shortToFull") {
        if (shortFormDict[shortFormInput]) {
            const fullForm = shortFormDict[shortFormInput].fullForm;
            const example = shortFormDict[shortFormInput].example;
            outputElement.textContent = `Full form: ${fullForm}. Example: "${example}"`;
            speakText(fullForm);  // Text-to-speech feature
        } else {
            outputElement.textContent = "Short form not found in the dictionary.";
        }
    } else if (convertOption === "fullToShort") {
        const fullForm = Object.keys(shortFormDict).find(key => shortFormDict[key].fullForm.toLowerCase() === shortFormInput);
        if (fullForm) {
            outputElement.textContent = `Short form: ${fullForm}`;
            speakText(fullForm);  // Text-to-speech feature
        } else {
            outputElement.textContent = "Full form not found in the dictionary.";
        }
    }
});

// Suggest form submit handler
document.getElementById("suggestForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newShortForm = document.getElementById("newShortForm").value.toLowerCase();
    const newFullForm = document.getElementById("newFullForm").value;
    const outputElement = document.getElementById("output");

    if (newShortForm && newFullForm) {
        if (!shortFormDict[newShortForm]) {
            shortFormDict[newShortForm] = { fullForm: newFullForm, example: "" };
            alert("Suggestion submitted!");
            outputElement.textContent = `New short form added: ${newShortForm} = ${newFullForm}`;
        } else {
            alert("Short form already exists.");
        }
    }
});

// Auto-suggest feature
const inputField = document.getElementById("shortForm");
const suggestions = document.getElementById("suggestions");

inputField.addEventListener("input", function() {
    const value = inputField.value.toLowerCase();
    suggestions.innerHTML = '';

    if (value) {
        const filteredSuggestions = Object.keys(shortFormDict).filter(shortForm => shortForm.startsWith(value));
        filteredSuggestions.forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            li.addEventListener("click", function() {
                inputField.value = suggestion;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(li);
        });
    }
});

// Voice input feature
const voiceInputButton = document.getElementById("voiceInput");
const recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US'; // Set language here
recognition.onresult = function(event) {
    document.getElementById("shortForm").value = event.results[0][0].transcript;
};

voiceInputButton.addEventListener("click", function() {
    recognition.start();
});

// Text-to-speech functionality
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = recognition.lang;  // Use the selected language for speech
    window.speechSynthesis.speak(speech);
}
