"use strict";


const filmImg = $("#film-img");
const filmTitle = $('#film-title');
const goBack = $("#goBack");
const filmVideo = $('#film-video');

const data = movies.splice(0, 102);
// ----------------------------------- normalize data ----------------------------------- //
const normalize = data.map((el) => {
    return {
        title: el.title,
        year: el.year,
        genres: el.categories,
        id: el.imdbId,
        rating: el.imdbRating,
        time: `${Math.round(el.runtime / 60)}h ${el.runtime % 60}m`,
        language: el.language,
        youtube: `https://youtube.com/embed/${el.youtubeId}`,
        summary: el.summary,
        imgMax: el.bigThumbnail,
        imgMin: el.smallThumbnail,
    };
});

// console.log(normalize);



// 3. film.js
// 4. (function) find film from databae by id -> return object
// 5. html render 

const filmID = localStorage.getItem('film-id');
// console.log(filmID);
function findFilmById(filmId){
    return normalize.filter(e => e.id===filmId)[0]; 
};

const state = findFilmById(filmID);


function renderData(data){
    filmTitle.textContent=data.title;
    filmImg.src=data.imgMax;
    filmVideo.src=data.youtube;
};
renderData(state);





// ------------------ go back ------------------ //
goBack.addEventListener('click', e => {
    window.location.href='./index.html';
});


