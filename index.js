const query=document.getElementById("query");
const form=document.getElementById("form");
const submit=document.getElementById("search-button");
const resultSection=document.querySelector(".results");

const url="https://api.lyrics.ovh";

async function searchSongs(query){
    const data=await fetch(`${url}/suggest/${query}`);
    const jsonData=await data.json();
    showData(jsonData);
}

function showData(json){
  console.log(json);
    resultSection.innerHTML=`
    <ul class="songs">
    ${json.data.map((song)=>`<li data-artist="${song.artist.name}"
    data-audio-link="${song.preview}" data-songtitle="${song.title}"
     class="songs-list">
    <img  class="album-cover" src="${song.album.cover}">
   <p class="name-artist">
    <span class="song-title">
     ${song.title} 
        <span class="artist">- ${song.artist.name}</span>
    </span></p>
    </li>`).join(" ")}
    </ul>`;
    }

      async function getLyrics(artist,song,audio){
         const res=await fetch(`${url}/v1/${artist}/${song}`);
        const json= await res.json();
        if(json.error){
            resultSection.innerHTML=json.error;
        }
        else{
            const lyrics= json.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');
            resultSection.innerHTML=`<div class="lyrics">
            <h2 class=" lyrics-heading">${song}  <span class="lyrics-artist">
            - ${artist}</span>
            </h2>
            <div class="audio-div">
            <p class="preview"> Preview : </p>
          <audio class="audio" controls>
  <source src="${audio}" />
</audio>
</div>
            <p class="lyrics-text"><span >${lyrics}</span></p>
            </div>
            `;
        }
    }

form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = query.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

resultSection.addEventListener('click',e=>{
  const clickedEl = e.target;
  console.log(clickedEl);
  if (clickedEl.tagName === "LI" ) {
    console.log("clicked");
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    const audio = clickedEl.getAttribute("data-audio-link");  
    getLyrics(artist, songTitle,audio);
  }
});
