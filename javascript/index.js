// windowLoad();
// function windowLoad(){
//         window.addEventListener('resize', function (){
//         if(this.innerWidth < 1024){
//             this.document.querySelector('body').innerHTML = '<div style="width:100vw;text-align:center;margin-top:50vh;"><b>Window Resolution Not Supported !!</b></div>';
//         }
        
//         if(this.innerWidth > 1024){
//             this.location.reload();
//         }
//     })
// }

// function onload(){
// document.addEventListener('load', function(){
//     if(this.innerWidth < 1024){
//         this.document.querySelector('body').innerHTML = '<div style="width:100vw;text-align:center;margin-top:50vh;"><b>Window Resolution Not Supported !!</b></div>';
//     }
    
//     if(this.innerWidth > 1024){
//         this.location.reload();
//     }
// })
// }

// function to time interval
setInterval(showTime, 1000);
function showTime(){
    let date = new Date();
    let hours = date.getHours();
    if(hours.toString().length == 1){
        hours = "0"+ hours;
    }
    let minutes = date.getMinutes();
    if(minutes.toString().length == 1){
        minutes = "0"+ minutes;
    }
    let seconds = date.getSeconds();
    if(seconds.toString().length == 1){
        seconds = "0"+ seconds;
    }

    let ampm = hours > 12 ? 'PM': 'AM';
    document.getElementById('time').innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
}

getData();

async function getData(page){
    let content = document.querySelector(".content");
    let pagination = document.querySelector(".pagination");
    let limit = 12;
    let url = new URL(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${page}`);
    await fetch(url)
    .then(response => response.json())
    .then(datas => {
        console.log(datas.data.movies);
        let movie_length = Math.round(datas.data.movie_count/20);
        let button = "";
        let data = ``;
        for (let i = 0; i < datas.data.movies.length; i++) {
            data += `
                <div class="movie_template">
                <img src="${datas.data.movies[i].medium_cover_image}" style="border: 3px solid #fff;border-radius:6px;"><br>
                <span style="word-wrap:break-word;"><b>${datas.data.movies[i].title}</b></span><br/>
                <span>${datas.data.movies[i].year}</span>
                </div>
            `;
        }
{/* <div style="height: 100px; width: 200px; background-image: url(${datas.data.movies[i].background_image}); background-size: contain; background-repeat: no-repeat;"></div> */}
        for (let i = 0; i < movie_length; i++) {
            button += `<li><a href="#content" onclick="getData(${i+1})" style="padding: 2px;">${i+1}</a></li>`;
        }
        content.innerHTML = data;
        pagination.innerHTML = button;
    })
}