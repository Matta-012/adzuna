const APP_ID = '2047c73d';
const APP_KEY = '1aee86fe2274bc4c8dc595c30941d928';
const ROOT_URL = 'https://api.adzuna.com/v1/api';
const STANDARD_SEARCH_URL = '/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5';

/*

  Exemplos de URL requests:
  Por padrão, a busca será apenas no Brasil, porém o usuário pode escolher outra localidade.
  Por padrão, as buscas exibirão 5 resultados. Mais serão acrescidos se sobrar tempo.

  Por país, sem outros filtros: https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5

  Por país e por title (nome da vaga): https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5&what=fullstack

  Por país e por categoria: https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5&category=it-jobs

  Por país, title e categoria: https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5&what=fullstack&&category=it-jobs

  Por país, title, categoria e geolocalização (cidade ou estado): https://api.adzuna.com/v1/api/jobs/br/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5&what=fullstack&where=sao%20paulo&&category=it-jobs

*/

const fetchAPI = async (url) => (await fetch(url)).json();

const urlFilter = (jobTitleValue, jobLocation, jobCategorie) => {
  if (!jobTitleValue) {
    return `${ROOT_URL}${STANDARD_SEARCH_URL}`;
  }

  return `${ROOT_URL}/jobs/${jobLocation}/search/1?app_id=2047c73d&app_key=1aee86fe2274bc4c8dc595c30941d928&results_per_page=5&what=${jobTitleValue}&category=${jobCategorie}`;
};

const getAPIData = async () => {
  const jobTitle = 'javascript';
  const jobCategorie = 'it-jobs';
  const jobLocation = 'br';

  const filteredURL = urlFilter(jobTitle, jobLocation, jobCategorie);

  try {
    // const data = await fetchAPI(filteredURL);

    // data.results.forEach((jobData) => {
    //   createJobListElements(jobData);
    // });
  } catch (error) {
    console.log(error);
    alert(error)
  }
};

const createCustomElement = (element, className, innerText) => {
  const el = document.createElement(element);

  el.className = className;
  el.innerHTML = innerText;

  return el;
};

const createJobListElements = (jobData) => {
  const { category: { label }, created, location: {  display_name  }, redirect_url, title } = jobData;

  const jobsSection = document.querySelector('.jobs');
  const jobsContainer = createCustomElement('div', 'jobs-container d-flex card text-center p-2 m-1', '');
  jobsSection.append(jobsContainer);

  jobsContainer.append(createCustomElement('h3', 'job-title', title));

  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container d-flex flex-wrap justify-content-around';
  
  let jobInnerHTML = `<i class='far fa-building fs-5'></i><p class='job-category mx-2 mb-0 fs-5'>${label}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobInnerHTML = `<i class='fas fa-map-marker fs-5'></i><p class='job-location mx-2 fs-5 mb-0'>${display_name}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobInnerHTML = `<i class='far fa-clock fs-5'></i><p class='posted-since mx-2 fs-5 mb-0'>${created}</p>`;
  cardContainer.append(createCustomElement('div', 'job d-flex mx-2 align-items-center', jobInnerHTML));

  jobsContainer.append(cardContainer);

  const applyBtn = createCustomElement('a', 'btn btn-secondary btn-lg active mt-2 p-0', 'Aplicar');
  applyBtn.href = redirect_url;
  applyBtn.target = '_blank';
  applyBtn.role = 'button';

  jobsContainer.append(applyBtn);
  jobsSection.append(jobsContainer);
};

window.onload = async () => {
  await getAPIData();
};