import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class GroupsApi {
  static getAll(token) {
    const request = new Request(`${apiUrl}/groups`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return fetchRequest(request);
  }
}