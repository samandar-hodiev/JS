"use strict"


const cardsWrapper = $("#cards");
// console.log(cards);
const globalSearch = $("#search");
// console.log(globalSearch);
const searchBtn = $("#search-btn");
const genresOption = $("#genres");
// console.log(genresOption);
const searchForm = $("#search-form");
// console.log(searchForm);
// const searcherBtn = $("#searcher-btn");
// console.log(searcherBtn);
const likeCount = $("#like-count");
console.log(likeCount);



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



// ----------------------------------- rendering data ----------------------------------- //
function renderData(data) {
    cardsWrapper.innerHTML = `<i class="loader"></i>`;
    setTimeout(() => {
        if (data.length) {
            cardsWrapper.innerHTML = " ";
            data?.forEach((element) => {
                const card = createElement('div', 'card', `
                    <img src="${element.imgMin}" alt="foto">
                            <div class="card-body">
                                <h2 class="font-bold">${element.title}</h2>
                                <ul class="mb-4">
                                    <li>
                                        <strong>Year:</strong>
                                        <span>${element.year}</span>
                                    </li>
                                    <li>
                                        <strong>Rating:</strong>
                                        <span>${element.rating}</span>
                                    </li>
                                    <li>
                                        <strong>Language:</strong>
                                        <span>${element.language}</span>
                                    </li>
    
                                    <li>
                                        <strong>Genre:</strong>
                                        <span >${element.genres}</span>
                                    </li>
                                    <li>
                                        <strong>Runtime:</strong>
                                        <span>${element.time}</span>
                                    </li>
                                </ul>
                                <div  class="Buttons-wrapper   flex justify-between btns">
                                    <button id="read-more" data-id="${element.id}">
                                      Read more
                                    </button>
                                    <button id="add-like" data-like="${element.id}">
                                        <i id="like" class="bi bi-heart-fill" id="heartButton" data-like="${element.id}"></i>
                                    </button>
                                </div>
                            </div>
                    `);
                cardsWrapper.appendChild(card);
            });
        } else {
            cardsWrapper.innerHTML = '<h1 class="text-2xl">NOT FOUND!</h1>'
        }
    }, 2000)
};
renderData(normalize);






// ----------------------------------- Global search ----------------------------------- //

globalSearch.addEventListener('keyup', (e) => {
    const filteredData = normalize.filter((el) => el.title.toLowerCase().includes(e.target.value.toLowerCase()));

    searchBtn.addEventListener('click', () => {
        renderData(filteredData);
    })
});






// ----------------------------------- Dynamik option ----------------------------------- //

function filteredOption(state) {
    const options = [];

    state?.forEach((el) => {
        el.genres.forEach(g => {
            if (!options.includes(g)) {
                options.push(g);
            };
        });
    });
    options.sort();
    return options;
};

// const db = filteredOption(normalize);


function renderOption(state) {
    state.forEach(el => {
        const option = createElement('option', 'option-item', el);
        // console.log(option);
        genresOption.appendChild(option);
    });
};
//  renderOption(db);

renderOption(filteredOption(normalize));






//  // ----------------------------------- Multisearch ----------------------------------- //

//  function multiSearch(state){

//     console.log($("#name").value);
//     console.log($("#rating").value);
//     console.log($("#genres").value);

//     const filteredData = state.filter((el) => {
//         return el.title.toLowerCase().includes($("#name").value.toLowerCase()) && $("#rating").value <= el.rating && el.genres.includes($("#genres").value);               
//     });

//     renderData(filteredData);
//  };

// searchForm.addEventListener('submit', e => {
//     console.log('sub');
//     multiSearch(normalize);
// });







// // ----------------- Multi search ----------------- //

// function multiSearch(state) {

//     // console.log($('#name').value)
//     // console.log($('#rating').value)
//     // console.log($('#genres').value)

//     let filteredData = state.filter((el) => {

//         // console.log(el.title.toLowerCase())
//         // console.log(Number(el.rating))
//         // console.log(el.genres)

//         return el.title.toLowerCase().includes($('#name').value.toLowerCase()) && Math.round(Number($('#rating').value)) <= Number(el.rating) && el.genres.includes($('#genres').value);
//     });

//     // console.log(filteredData)

//     renderData(filteredData)
// }

// searchForm.addEventListener('submit', e => {
//     // console.log("submit")
//     multiSearch(normalize);
// });










// ----------------------------------- Event Delegation  ----------------------------------- //

cardsWrapper.addEventListener('click', (e) => {
    if (e.target.id === 'read-more' && e.target.nodeName === "BUTTON") {
        const id = e.target.getAttribute('data-id');
        // console.log(id);
        // ----------------------------------- Read more action  ----------------------------------- //
        // 1. id sat localstorage'
        // 2. window.location.href="./film.html";
        // 3. film.js
        // 4. (function) find film from databae by id -> return object
        // 5. html render 

        // 1
        localStorage.setItem('film-id', id);
        // 2
        window.location.href = "./film.html";
    };


    // ----------------------------------- add like  ----------------------------------- //
    if (e.target.id === 'add-like' && e.target.nodeName === "BUTTON" || e.target.id === 'like'){

        const likedList = JSON.parse(localStorage.getItem('liked-list')) || [];
        const id = e.target.getAttribute('data-like');
   

        if(!likedList.includes(id)){
            likedList.push(id);
            localStorage.setItem('liked-list', JSON.stringify(likedList));
            renderLikdedCount(likedList);
        }else{
            alert("This is already liked")
        }

      
    };
});





function renderLikdedCount(data){
    likeCount.textContent = data.length;
};
const  liked_count = JSON.parse(localStorage.getItem("liked-list"));

renderLikdedCount(liked_count);





























































// // ----------------------------------- like button ----------------------------------- //
// const likeButton = $("#like-button");
// const heartButton = $("#heartButton");


// cardsWrapper.addEventListener('click', (e) => {
//     // console.log(e.target);

//     if (e.target.id === "like-button" && e.target.nodeName === "BUTTON") {
//         // console.log(e.target);
//         // likeButton.setAttribute('class',heart-red);
//         e.target.classList.add('heart-red');
//         // e.target.classList.toggle('heart-red');
//     };





    // if(e.target.id==="heartButton" && e.target.nodeName==="I"){
    //     // console.log(e.target);
    //     // likeButton.setAttribute('class',heart-red);
    //     e.target.classList.add('heart-red');
    //     // e.target.classList.toggle('heart-red');
    // };
// });


