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

async function test (data, append = false)
{
    const main = document.getElementById("main-gifs");
    if (!append) main.innerHTML = "";
    data.map((e) =>
    {
        console.log('e:', e);

        const outer = document.createElement("div");
        outer.setAttribute("class", "gif-obj");

        const image = document.createElement("img");
        image.src = e.media[ 0 ].gif.url;
        console.log('url:', e.media[ 0 ].gif.url);

        const gifText = document.createElement("div");
        gifText.setAttribute("class", "gif-text");
        const p = document.createElement("p");
        p.textContent = e.content_description;

        gifText.append(p);
        outer.append(image, gifText);

        main.append(outer);
    });
    main.style.display = "block";
}


async function random ()
{
    let response = await fetch(`https://g.tenor.com/v1/trending?key=${ key }&limit=24`);

    let { results: data } = await response.json();
    console.log('data:', data);

    test(data);
}

async function finddata (offset)
{
    let q = document.getElementById("search-bar").value;
    if (!q) return;
    if (q.length < 2) { return; }
    let response = await fetch(`https://g.tenor.com/v1/search?q=${ q }&offset=${ 0 }&key=${ key }&limit=10`);
    let { results: data } = await response.json();
    console.log('data:', data);
    test(data);
}

async function appendData (offset)
{
    let q = document.getElementById("search-bar").value;
    if (!q) return;
    if (q.length < 2) { return; }
    let response = await fetch(`https://g.tenor.com/v1/search?q=${ q }&offset=${ offset }&key=${ key }&limit=10`);
    let { results: data } = await response.json();
    console.log('data:', data);
    test(data, true);
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
    // test(data);

    const outerdiv = document.getElementById("search-results");
    outerdiv.innerHTML = "";
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
        outerdiv.append(div);
    });
}

random();