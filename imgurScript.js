const key = "AD8OM2MUXKQ4";
// let offset = -1;

// window.addEventListener('scroll', () =>
// {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     offset++;
//     console.log({ scrollTop, scrollHeight, clientHeight });
//     if (clientHeight + scrollTop >= scrollHeight - 10)
//     {
//         const data = document.getElementById("search-bar").value;
//         if (data.length <= 2)
//         {
//             const div = document.getElementById("main-gif");
//             div.innerHTML = "";
//             return;
//         }
//         appendData(offset);
//     }
// });


async function gallery (data, append = false)
{
    const main = document.getElementById("main-gifs");
    if (!append) main.innerHTML = "";
    data.map((e) =>
    {
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


async function gify ()
{
    let response = await fetch(`https://g.tenor.com/v1/trending?key=${ key }&limit=24`);

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

/*
async function gify ()
{
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

function gifappend (link)
{
    console.log('257 link: ', link);
    let main = document.getElementById("main-gifs");

    let fstDiv = document.createElement("div");
        fstDiv.setAttribute("class", "gif-obj");

        let image = document.createElement("img");
    image.src = `${ link }`;
    image.alt = "imgur";

        let gifText = document.createElement("div");
        gifText.setAttribute("class", "gif-text");
        let p = document.createElement("p");
        p.textContent = 'gif';

        gifText.append(p);
        fstDiv.append(image, gifText);

    main.append(fstDiv);
    
    main.style.display = "block";
}

async function gallery ()
{
    let { data } = await gify();
    console.log('281 data: ', data);

    data.map(({ images }) =>
    {
        if (images) {
            console.log('286: images: ', images[0].link);
            
            let image = document.createElement("img");
            image.src = images[0].link;
            
            gifappend(images[ 0 ].link); 
            
        }
      });
}


gallery();
*/
// gify()
gify();