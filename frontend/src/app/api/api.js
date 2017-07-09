import { API_ENDPOINT } from 'constants/settings';
import axios from 'axios';

const join = (...chunks) => chunks.join('/');

export class API {
  constructor(resourcePath = '') {
    const endpoint = API_ENDPOINT + resourcePath;

    this.query = (_) => this.http.get(endpoint);
    this.get = (id) => this.http.get(join(endpoint, id));
    this.create = (data) => this.http.post(endpoint, data);
    this.update = (data) => this.http.put(join(endpoint, data.id), data);
    this.delete = (id) => this.http.delete(join(endpoint, id));
  }

  get http() {
    return axios;
  }
}
