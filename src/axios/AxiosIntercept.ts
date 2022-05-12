import Axios, { AxiosRequestConfig } from 'axios';

const mocks: Map<string, string> = new Map<string, string>();

export function addMock(url: string, data: string) {
  mocks.set(url, data);
}

const isMockData = (url: string) => {
  return mocks.has(url);
};

const getMockError = (config: AxiosRequestConfig<any>) => {
  const mockError = new ErrorIntercept();
  mockError.mockData = mocks.get(config.url ? config.url : '') as string;
  mockError.config = config;
  return Promise.reject(mockError);
};

class ErrorIntercept extends Error {
  mockData = '';
  config: AxiosRequestConfig<any> | undefined;
}

const axios = Axios.create({
  //baseURL: 'https://reqres.in/api',
  baseURL: 'http://localhost:8080/mngt/v1/',
  headers: {
    Accept: 'application/json',
    Authorization: 'Basic QU5EOnNhZmUyZ29fYW5k',
  },
});

const isMockError = (error: ErrorIntercept) => Boolean(error.mockData);

const getMockResponse = (mockError: ErrorIntercept) => {
  const { mockData, config } = mockError;
  return Promise.resolve(
    Object.assign(
      {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        isMock: true,
      },
      mockData
    )
  );
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isMockError(error)) {
      return getMockResponse(error);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  async (config) => {
    await sleep(1000);
    console.log('http request api => ', config.url);
    if (isMockData(config.url ? config.url : '')) {
      return getMockError(config);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

addMock(
  '/users/',
  '{"page":1,"per_page":6,"total":12,"total_pages":2,"data":[{"id":1,"email":"jaewon3739@gmail.com","first_name":"PARK","last_name":"JAEWON","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}'
);

export { isMockData };
export default axios;
