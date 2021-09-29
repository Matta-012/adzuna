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

  // const data = await fetchAPI(filteredURL);

  console.log(data);
};

window.onload = async () => {
  await getAPIData();
};