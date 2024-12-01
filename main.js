let elCountryList = document.querySelector(".list");
let elSelect = document.querySelector(".country-select");
let elSearchInput = document.querySelector(".search-input");

function render(arr, list, renderType = "countries") {
    list.innerHTML = "";
    arr.forEach((item) => {
        if (renderType === "countries") {

            let elCountryItem = document.createElement("li");
            elCountryItem.className = "w-[264px] rounded-md overflow-hidden bg-slate-100";
            elCountryItem.innerHTML = `
                <img class="w-full h-[160px] object-cover" src="${item.flag}" alt="${item.name}" width="100" height="160"/>
                <div class="p-5">
                    <h2 class="font-bold mb-2 text-[22px]">${item.name}</h2>
                    <p class="mb-2"><strong>Population:</strong> ${item.population.toLocaleString()}</p>
                    <p class="mb-2"><strong>Capital:</strong> ${item.capital}</p>
                </div>
                <div class="flex items-center justify-between p-2">
                    <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                        <img src="./icons/heart.png" width="22" height="22" alt="Like icon" />
                    </button>
                    <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                        <img src="./icons/bookmark.png" width="22" height="22" alt="Save icon" />
                    </button>
                    <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                        <img src="./icons/settings.png" width="22" height="22" alt="More icon" />
                    </button>
                </div>
            `;
            list.append(elCountryItem);
        } else if (renderType === "options") {

            let elOption = document.createElement("option");
            elOption.textContent = item.capital || "Unknown";
            elOption.value = item.capital ? item.capital.toLowerCase() : "unknown";
            list.append(elOption);
        }
    });
}

render(countrys, elCountryList, "countries"); 
render(countrys, elSelect, "options"); 

elSelect.addEventListener("change", function (evt) {
    if (evt.target.value === "all") {
        render(countrys, elCountryList, "countries");
    } else {
        const result = countrys.filter(
            (item) => item.capital && item.capital.toLowerCase() === evt.target.value
        );
        render(result, elCountryList, "countries");
    }
});

elSearchInput.addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();
    const searchResults = countrys.filter((item) =>
        item.name.toLowerCase().includes(value)
    );
    render(searchResults, elCountryList, "countries");
});
