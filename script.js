const getPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  showPhone(phones,isShowAll);
  
};

const showPhone = (phones,isShowAll) => {
  const phoneContainer = document.getElementById
 ("phone-container");
  phoneContainer.innerHTML = "";
  const moreBtn = document.getElementById('more-btn')
  if (phones.length > 9 && !isShowAll) {
    phones = phones.slice(0, 10);
    moreBtn.classList.remove('hidden')
  }
  else {
    moreBtn.classList.add('hidden')
    
  }
  
  phones.forEach((phone) => {
    // console.log(phone)
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card bg-white text-black shadow-xl m-4`;
    cardDiv.innerHTML = `
        <figure class="px-10 pt-10">
            <img width=""
              src="${phone.image}"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
              <button class="btn btn-primary" onclick="show_more_modal.showModal(); phoneDetails('${phone.slug}')">More Details</button>
            </div>
          </div>
        `;
    phoneContainer.appendChild(cardDiv);
    // show_more_modal.showModal()
    
  });
  loader(false)
  const noResult = document.getElementById('no-result')
  if (phones.length <= 0) {
    
    noResult.classList.remove('hidden')
  }
  else {
    noResult.classList.add('hidden')
  }
  
    
};

const searchPhone = (isShowAll) => {
  loader(true)
  const searchTextElement = document.getElementById("search-text");
  const searchText = searchTextElement.value;
  getPhones(searchText,isShowAll);
};
const loadMore = () => {
  searchPhone(true)
}

const loader = (isLoading) => {
  const loader = document.getElementById('loader')
  if (isLoading) {
    loader.classList.remove('hidden')
  }
  else {
    loader.classList.add('hidden')
  }
}

const phoneDetails = async(id) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phoneData = data.data
  console.log(phoneData)
  showModal(phoneData)
}

const showModal = (phoneId) => {
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.innerHTML = `
  <img width="100px" class="mx-auto" src="${phoneId.image}" alt="">
  <br>
          <h4 class="text-xl">Name:  ${phoneId.name}</h4>
          <p class="font-bold">Release Date:  ${phoneId.releaseDate}</p>
          <p class="font-bold">Chipset: ${phoneId.mainFeatures?.chipSet}</p>
          <p class="font-bold">Memory: ${phoneId.mainFeatures.memory}</p>
  `
}
phoneDetails()
