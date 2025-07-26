function getMeaning() {
  const word = document.getElementById("wordInput").value.trim();
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  if (!word) {
    alert("Please enter a word!");
    return;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found!");
      }
      return response.json();
    })
    .then(data => {
      const entry = data[0];
      const meaning = entry.meanings[0];
      const phonetic = entry.phonetics.find(p => p.text);

      document.getElementById("wordTitle").textContent = entry.word;
      document.getElementById("phonetics").textContent = phonetic ? phonetic.text : "N/A";
      document.getElementById("partOfSpeech").textContent = meaning.partOfSpeech;
      document.getElementById("definition").textContent = meaning.definitions[0].definition;
      document.getElementById("example").textContent = meaning.definitions[0].example || "No example available";

      const audio = phonetic && phonetic.audio ? phonetic.audio : null;
      const audioElement = document.getElementById("audio");

      if (audio) {
        audioElement.src = audio;
        audioElement.style.display = "block";
      } else {
        audioElement.style.display = "none";
      }

      document.getElementById("resultBox").classList.remove("hidden");
    })
    .catch(error => {
      alert(error.message);
      document.getElementById("resultBox").classList.add("hidden");
    });
}
