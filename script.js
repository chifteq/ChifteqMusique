let songs=[];const box=document.querySelector('#songs'),search=document.querySelector('#search'),player=document.querySelector('#player'),now=document.querySelector('#now');
async function load(){try{songs=await (await fetch('/api/songs')).json();render()}catch(e){box.innerHTML='<p>Lance le site avec start.bat.</p>'}}
function render(){const q=search.value.toLowerCase();const list=songs.filter(s=>s.name.toLowerCase().includes(q));box.innerHTML=list.length?list.map((s,i)=>`<div class="song"><div><b>${esc(s.name)}</b><br><small>${esc(s.file)}</small></div><button onclick="play(${i})">▶ Écouter</button></div>`).join(''):'<p>Aucune musique trouvée.</p>'}
function play(i){const s=songs[i];player.src='/audio/'+encodeURIComponent(s.file);player.play();now.textContent='🎵 '+s.name}
function esc(x){return x.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
search.addEventListener('input',render);load();