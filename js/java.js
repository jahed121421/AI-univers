const loadData = async (datashow) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url);
    const data = await res.json();
    dispalyData(data.data.tools, datashow)
}
const dispalyData = (datas, datashow) => {
    loadspiner(true);
    const datacontainer = document.getElementById('cardContainer');
    // divied card in 6 

    const showMore = document.getElementById('showMore');
    if (datashow && datas.length > 6) {
        datas = datas.slice(0, 6);
        showMore.classList.remove('hidden');
    }
    else {
        showMore.classList.add('hidden');
    }
    // foreach loop

    datas.forEach(tools => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-72', 'bg-base-100', 'shadow-xl', 'm-5')
        cardDiv.innerHTML = `
        <figure><img class="w-full" src='${tools.image}' alt="Shoes"/>
        </figure>
                <div class="card-body m-5">
                    <h2 class="card-title">
                        Features
                    </h2>
                    <div>
                            <ul class="list-decimal text-sm">
                            <li>${tools.features[0]}</li>
                            <li>${tools.features[1]}</li>
                            <li>${tools.features[2]}</li>
                            <hr class="m-1">
                            <h3 class="text-sm">${tools.name}</h3>
                            <div class="card-actions justify-end items-end">
                                <p><i class="fa-solid fa-calendar-days mr-1"></i>${tools.published_in}</p>
                                <!-- The button of modal -->
                                <label for="my-modal-3" class="btn" id="modalBtn" onclick="loadDetails('${tools.id}')">Details</label>
                            </div>     
                    </div>

                </div>
                `
        datacontainer.appendChild(cardDiv);

    });
    loadspiner(false);
}
// spinner function 
const loadspiner = isLoding => {
    const spinner = document.getElementById('spinner');
    if (isLoding) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}


const process = (datashow) => {
    loadData(datashow);
}
document.getElementById('showMore').addEventListener('click', function () {
    const datacontainer = document.getElementById('cardContainer');
    datacontainer.textContent = '';
    process();
})

const loadDetails = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    dispalyDatas(data.data);
}
const dispalyDatas = (data) => {
    const constainer = document.getElementById('container');
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('md:flex', 'w-full', 'gap-5', 'border');
    console.log(data)
    constainer.innerHTML = `
                    <div class="w-100 m-2">
                    <h3 class="text-4xlw-32 ">${data.description ? data.description : 'No data found'}</h3>
                    <div class="flex justify-around">
                        <div class="w-32 h-20 m-1 p-1 bg-green-200 rounded">
                            <h1>${data.pricing ? data.pricing[0].plan : 'No data'}</h1>
                            <p>${data.pricing ? data.pricing[0].price : 'No price'}</p>
                        </div>
                        <div class="w-32 h-20 m-1 p-1 bg-green-200 rounded">
                        <h1>${data.pricing ? data.pricing[1].plan : 'No data'}</h1>
                        <p>${data.pricing ? data.pricing[1].price : 'No price'}</p>
                        </div>
                        <div class="w-32 h-20 m-1 p-1 bg-green-200 rounded">
                        <h1>${data.pricing ? data.pricing[2].plan : 'No data'}</h1>
                        <p>${data.pricing ? data.pricing[2].price : 'No price'}</p>
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div class="w-1/2">
                            <h1  class="font-bold">Feature</h1>
                            <ul class="list-decimal list-inside text-left pl-4">
                            <li>${data.features[1].feature_name ? data.features[1].feature_name : 'No data found'}</li>
                            <li>${data.features[2].feature_name ? data.features[2].feature_name : 'No data found'}</li>
                            <li>${data.features[3].feature_name ? data.features[3].feature_name : 'No data found'}</li>
                            </ul>
                        </div>
                        <div class="w-1/2">
                        <h1 class="font-bold">Integrations</h1>
                            <ul class="list-decimal list-inside text-left pl-5">
                            ${data.integrations?.length ? data.integrations.map((name) =>`<li>${name}</li>`).join(''):'No Data Found'}
                            </ul>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div class=" w-100 m-2 relative">
                    <img class="w-100" src="${data.image_link ? data.image_link[0] : ''}" alt="">
                    <span id="accurncybtn" class="btn text-gray-500 badge absolute right-2 top-2">${data.accuracy > 0  ? data.accuracy.score * 100 +'% accurcy' : ''}</span>
                    <h1 class="font-bold p-2">${data.input_output_examples ? data.input_output_examples[0].input : 'No data found'}</h1>
                    <p class="text-sm">${data.input_output_examples ? data.input_output_examples[0].output : 'No data found'}</p>
                </div>

    `

  

}
process(6)