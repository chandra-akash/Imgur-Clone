const key = "AD8OM2MUXKQ4";
let offset = -1;

window.addEventListener('scroll', () =>
{
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    offset++;
    console.log({ scrollTop, scrollHeight, clientHeight });
    if (clientHeight + scrollTop >= scrollHeight - 10)
    {
        const data = document.getElementById("search-bar").value;
        if (data.length <= 2)
        {
            const div = document.getElementById("main-gif");
            div.innerHTML = "";
            return;
        }
        appendData(offset);
    }
});
/*
async function gallery ()
{
    // const { data } = await gify();
    var apiResult;
    var header = new Headers();
    header.append("Authorization", "Client-ID c5db48e94e74f4f");
    try
    {
        let response = await fetch(
            "https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true",
            {
                method: "GET",
                headers: header,
                redirect: "follow",
            }
        );
        let data = await response.json();
        console.log('39 data:', data);

        // for (const i of data.data) {
        //     console.log('i: ', i);
        // }

        data.data.map((e) =>
        {
            console.log('e:', e);
    
            const fstDiv = document.createElement("div");
            fstDiv.setAttribute("class", "gif-obj");
    
            const image = document.createElement("img");
            image.src = e.media[ 0 ].gif.url;
            console.log('url:', e.media[ 0 ].gif.url);
    
            const gifText = document.createElement("div");
            gifText.setAttribute("class", "gif-text");
            const p = document.createElement("p");
            p.textContent = e.content_description;
    
            gifText.append(p);
            fstDiv.append(image, gifText);
    
            main.append(fstDiv);
        });
        main.style.display = "block";
        // gallery(data.data);
        // return data;
        apiResult = data.data;
        console.log('galleryData: ' + apiResult);
    } catch (err)
    {
        console.log("err", err.message);
    }

    // let d = data.data;
    // let qv = await d.stringify();
    // console.log('qv: ' + qv);
    // console.log('galleryD: ' + d);
    const main = document.getElementById("main-gifs");
    // if (!append) main.innerHTML = "";

    console.log('apiResult: ' + apiResult);

    apiResult.map((e) =>
    {
        console.log('e:', e);

        const fstDiv = document.createElement("div");
        fstDiv.setAttribute("class", "gif-obj");

        const image = document.createElement("img");
        image.src = e.media[ 0 ].gif.url;
        console.log('url:', e.media[ 0 ].gif.url);

        const gifText = document.createElement("div");
        gifText.setAttribute("class", "gif-text");
        const p = document.createElement("p");
        p.textContent = e.content_description;

        gifText.append(p);
        fstDiv.append(image, gifText);

        main.append(fstDiv);
    });
    main.style.display = "block";
}
*/

async function gify ()
{
    // let response = await fetch(`https://g.tenor.com/v1/trending?key=${ key }&limit=24`);
    // let { results: data } = await response.json();
    // console.log('data:', data);
    // gallery(data);

    var header = new Headers();
    header.append("Authorization", "Client-ID c5db48e94e74f4f");
    try
    {
        let response = await fetch(
            "https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true",
            {
                method: "GET",
                headers: header,
                redirect: "follow",
            }
        );
        let data = await response.json();
        console.log('data:', data);
        // gallery(data.data);
        return data;
    } catch (err)
    {
        console.log("err", err.message);
    }
}

function  gifappend(link){
    const main = document.getElementById("main-gifs");

    const fstDiv = document.createElement("div");
        fstDiv.setAttribute("class", "gif-obj");

        const image = document.createElement("img");
        image.src = `${link}`;

        const gifText = document.createElement("div");
        gifText.setAttribute("class", "gif-text");
        const p = document.createElement("p");
        p.textContent = 'gif';

        gifText.append(p);
        fstDiv.append(image, gifText);

    main.append(fstDiv);
    
    main.style.display = "block";
}

async function gallery ()
{
    const { data } = await gify();
    console.log('164 data: ', data);

    data.map(({ images }) => {
        images.map(({ link }) => {
          gifappend(link);
        });
      });
}

async function finddata (offset)
{
    let q = document.getElementById("search-bar").value;
    if (!q) return;
    if (q.length < 2) { return; }
    let response = await fetch(`https://g.tenor.com/v1/search?q=${ q }&offset=${ 0 }&key=${ key }&limit=25`);
    let { results: data } = await response.json();
    console.log('data:', data);
    gallery(data);
}

async function appendData (offset)
{
    let q = document.getElementById("search-bar").value;
    if (!q) return;
    if (q.length < 2) { return; }
    let response = await fetch(`https://g.tenor.com/v1/search?q=${ q }&offset=${ offset }&key=${ key }&limit=25`);
    let { results: data } = await response.json();
    console.log('data:', data);
    gallery(data, true);
}

let timer;
function debauncing ()
{
    console.log(1);
    if (timer) { return; }
    timer = setTimeout(() =>
    {
        main();
        timer = undefined;
    }, 500);
}

async function main ()
{
    const data = document.getElementById("search-bar").value;
    console.log(11, data);
    if (data.length <= 2)
    {
        const div = document.getElementById("search-results");
        div.innerHTML = "";
        return;
    }
    searchResult(data);
}

async function searchResult (q)
{
    console.log("in search");
    let response = await fetch(`https://g.tenor.com/v1/autocomplete?key=${ key }&q=${ q }&limit=10`);

    let { results: data } = await response.json();

    console.log("data :", data);
    // gallery(data);

    const firsthalfResult = document.getElementById("search-results");
    firsthalfResult.innerHTML = "";
    data.map((e) =>
    {
        const div = document.createElement("div");
        div.innerText = e;
        div.addEventListener("click", function ()
        {
            let inputDiv = document.getElementById("search-bar");
            inputDiv.value = e;
            const searchdiv = document.getElementById("search-results");
            searchdiv.innerHTML = "";
        });
        firsthalfResult.append(div);
    });
}

gallery();

// gify()