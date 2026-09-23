let songs = [
  {
    name: "Lorenzo - Je vous déteste tous (Clip Officiel)",
    file: "Lorenzo - Je vous déteste tous (Clip Officiel).mp3"
  }
];

const box = document.querySelector('#songs');
const search = document.querySelector('#search');
const player = document.querySelector('#player');
const now = document.querySelector('#now');

function render() {
  const q = search.value.toLowerCase();

  const list = songs.filter(s =>
    s.name.toLowerCase().includes(q)
  );

  box.innerHTML = list.length
    ? list.map((s, i) => `
      <div class="song">
        <div>
          <b>${esc(s.name)}</b><br>
          <small>${esc(s.file)}</small>
        </div>
        <button onclick="play(${i})">▶ Écouter</button>
      </div>
    `).join('')
    : '<p>Aucune musique trouvée.</p>';
}

function play(i) {
  const s = songs[i];

  player.src = "audio/" + encodeURIComponent(s.file);
  player.play();

  now.textContent = "🎵 " + s.name;
}

function esc(x) {
  return x.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[c]));
}

search.addEventListener('input', render);

render();
