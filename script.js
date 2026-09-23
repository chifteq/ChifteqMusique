let songs = [
  {
    name: "Lorenzo - Je vous déteste tous (Clip Officiel)",
    file: "lorenzo.mp3"
  }
];

const box = document.querySelector("#songs");
const search = document.querySelector("#search");
const player = document.querySelector("#player");
const now = document.querySelector("#now");

function render() {
  const q = search.value.toLowerCase();

  const list = songs.filter(song =>
    song.name.toLowerCase().includes(q)
  );

  if (list.length === 0) {
    box.innerHTML = "<p>Aucune musique trouvée.</p>";
    return;
  }

  box.innerHTML = list.map((song, index) => `
    <div class="song">
      <div>
        <b>${esc(song.name)}</b><br>
        <small>${esc(song.file)}</small>
      </div>

      <button onclick="play(${index})">
        ▶ Écouter
      </button>
    </div>
  `).join("");
}

function play(index) {
  const song = songs[index];

  player.src = "./" + encodeURIComponent(song.file);
  player.load();

  player.play().catch(error => {
    console.log("Erreur audio :", error);
  });

  now.textContent = "🎵 " + song.name;
}

function esc(text) {
  return text.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

search.addEventListener("input", render);

render();
