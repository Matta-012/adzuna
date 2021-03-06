const APP_ID = '025d6491';
const APP_KEY = 'c05137ab27ab370a4878249f4e814f28';
const ROOT_URL = 'https://api.adzuna.com/v1/api';

const fetchAPI = async (url) => (await fetch(url)).json();

const urlFilter = (jobTitle, jobLocation, jobCategory) => {
  const standard_url_endpoint = `/jobs/${jobLocation}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=5`;
  if (!jobTitle) {
    return `${ROOT_URL}${standard_url_endpoint}&category=${jobCategory}`;
  }

  return `${ROOT_URL}${standard_url_endpoint}&what=${jobTitle}&category=${jobCategory}`;
};

const getJobsQuantityByCategory = async () => {
  const country = document.querySelector('#job-location').value;
  const standard_url_endpoint = `/jobs/${country}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}`;
  const popularJobsCategory = document.querySelectorAll('.jobs-quantity');

  try {
    for (let i = 0; i < popularJobsCategory.length; i += 1) {
      const { id } = popularJobsCategory[i];
      const url = `${ROOT_URL}${standard_url_endpoint}&category=${id}`;
  
      const { count } = await fetchAPI(url);
  
      popularJobsCategory[i].innerText = `${count} vagas`;
    }
  } catch (error) {
    alert('Ops, parece que tivemos um problema :(. Aparentemente nossa API atingiu o limite máximo de requisições diárias, tenta novamente amanhã.');
    console.log(error);
  }
};

const getAPIData = async () => {
  const jobList = document.querySelector('.lista-vagas');
  jobList.style.display = 'block';

  const jobTitle = document.querySelector('#job-title').value;
  const jobLocation = document.querySelector('#job-location').value;
  const jobCategorie = document.querySelector('#job-category').value;

  const filteredURL = urlFilter(jobTitle, jobLocation, jobCategorie);

  try {
    const data = await fetchAPI(filteredURL);

    data.results.forEach((jobData) => {
      createJobListElements(jobData);
    });

    await getJobsQuantityByCategory();
  } catch (error) {
    alert('Ops, parece que tivemos um problema :(. Aparentemente nossa API atingiu o limite máximo de requisições diárias, tenta novamente amanhã.');
    console.log(error);
  }
};

const createCustomElement = (element, className, innerText) => {
  const el = document.createElement(element);

  el.className = className;
  el.innerHTML = innerText;

  return el;
};

const calcDateDifference = (created) => {
  const today = new Date();

  const result = Math.floor((today - Date.parse(created)) / (1000 * 60 * 60 * 24));

  return result > 1 ? `${result} dias atrás` : `${result} dia atrás`;
};

const createJobListElements = (jobData) => {
  const { category: { label }, created, location: {  display_name  }, redirect_url, title } = jobData;

  const postedSince = calcDateDifference(created);

  const job = document.querySelector('#job');
  const jobsContainer = createCustomElement('div', 'jobs-container d-flex card text-center p-2 m-1', '');
  job.append(jobsContainer);

  jobsContainer.append(createCustomElement('h3', 'job-title', title));

  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container d-flex flex-wrap justify-content-around';
  
  let jobInnerHTML = `<i class='far fa-building fs-5'></i><p class='job-category mx-2 mb-0 fs-5'>${label}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobInnerHTML = `<i class='fas fa-map-marker fs-5'></i><p class='job-location mx-2 fs-5 mb-0'>${display_name}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobInnerHTML = `<i class='far fa-clock fs-5'></i><p class='posted-since mx-2 fs-5 mb-0'>${postedSince}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobsContainer.append(cardContainer);

  const applyBtn = createCustomElement('a', 'btn btn-secondary btn-lg active mt-2 p-0', 'Aplicar');
  applyBtn.href = redirect_url;
  applyBtn.target = '_blank';
  applyBtn.role = 'button';

  jobsContainer.append(applyBtn);
  job.append(jobsContainer);
};

window.onload = async () => {
  const searchBtn = document.querySelector('#search-btn');

  await getJobsQuantityByCategory();

  searchBtn.addEventListener('click', async () => {
    const jobsContainer = document.querySelector('.jobs-container');
    const job = document.querySelector('#job');
    if (jobsContainer) {
      job.innerHTML = '';
    }

    await getAPIData();
  });
};