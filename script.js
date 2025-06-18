let input = document.getElementById("searchInput");
let result = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendResult(res) {
    let {
        title,
        link,
        description
    } = res;
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    result.appendChild(resultItem);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultItem.appendChild(resultTitle);

    let resultBreak = document.createElement("br");
    resultItem.appendChild(resultBreak);

    let resultUrl = document.createElement("a");
    resultUrl.textContent = link;
    resultUrl.href = link;
    resultUrl.target = "_blank";
    resultUrl.classList.add("result-url");
    resultItem.appendChild(resultUrl);

    let Break = document.createElement("br");
    resultItem.appendChild(Break);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    resultItem.appendChild(para);

}

function displayResults(search_results) {
    for (let res of search_results) {
        createAndAppendResult(res);
    }
}



function setKey(event) {

    if (event.key === "Enter") {
        result.textContent = "";
        spinner.classList.remove("d-none");
        let inputVal = input.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.add("d-none");
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }
}

input.addEventListener("keydown", setKey);