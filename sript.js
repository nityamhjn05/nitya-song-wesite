import { apiCall } from "./node.js";
const searchButton =document.getElementById('button')
searchButton.addEventListener('click',loadSong)

function loadSong(){
    const inputValue = document.getElementById('userInput').value
    const URL = `https://itunes.apple.com/search?term=${inputValue}&limit=5`;
    console.log(inputValue)
    const promise = apiCall(URL);
    promise.then(function(response){
        const pr = response.json();
        pr.then(function(data){
            resultCount(data.results)
            console.log(data.results)
            console.log("song data",data)
           
        }).catch(function(err){
            console.log('Invalid JSON ', err);
        })
    }).catch(function(err){
        console.log('Unable to make API Call ', err);
    });
}
loadSong();
function resultCount(songs){
    const div = document.getElementById('songData');
    div.innerText="";
    // Loop and call song
    for(var i = 0 ; i<songs.length; i++){
        result(songs[i]);
    }

}


function result(song){
    const div = document.getElementById('songData');    
    // Design of one pizza
    const card  = `
    <div class="col-4 card">
  <img src="${song.artworkUrl100}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${song.trackName}</h5>
    <audio controls>
                <source src=" ${song.previewUrl}" type="audio/mp3"/>
   </audio>
    <a href="#" class="btn btn-primary"><button class="btn btn-primary">add to playlist</button></a>
  </div>
</div>`;
div.innerHTML = div.innerHTML +  card;
}
