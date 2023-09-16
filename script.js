const api=document.getElementById("api");
const movie=document.getElementById("movie");
const btn=document.getElementsById("scr-btn");
const cont=document.getElementsByClassName("movies");





//data fetching
async function searchQuery(){
    cont.innerHTML = '';
    const apiKey = api.value.trim();
    const search = movie.value.trim();
    if(apiKey === '' || search === ''){
        return;
    }
    // buffer.classList.remove("hide");
    const url = `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`

    const response = await fetch(url);
    const data = await response.json();
    console.log(data, data.Search);
    if(data.Response === 'True'){
        makeMovieCards(data.Search);}
    else{
        handleError();
    }
}

//showing image if error comes
function handleError(){
    const err = document.querySelector(".error");
    const img = document.createElement('img');
    img.src = "Error-handle.png";
    img.alt = "Something Went Wrong";
    err.appendChild(img);
    // buffer.classList.add('hide');
    document.querySelector('main').appendChild(err);
}

//making movie cards dynamically
function makeMovieCards(movies){
    // buffer.classList.add("hide");
    const err_con = document.querySelector('.error');
    if(err_con) err_con.innerHTML= "";
    cont.innerHTML = '';
    let i = 1;
    movies.forEach(movie => {
        if(i > 9) return;
        const re_Dir = document.createElement('a');
        re_Dir.target = '_blank';
        re_Dir.className = 're-dir';
        re_Dir.href = `https://www.imdb.com/title/${movie.imdbID}/`
        let my_Str = `
        <div class="movies">
        <div class="items">
          

        <div>
            <img class="img" src="${movie.Poster=='N/A' ? `N_A.jpg`:movie.poster}" alt="movieimg">
        </div>

        <div class="details">
            <div class="rank">
                ${i}
            </div>
            <div class="name">${movie.Title}</div>
        </div>

       </div>
    </div>`
            re_Dir.innerHTML = my_Str;
            cont.appendChild(re_Dir);
            i++;
        });
    }
    // adding eventlistener in search-btn
    btn.addEventListener("click",searchQuery);