import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class StudentApi {
  static getByGroupId({ token, groupId }) {
    const request = new Request(`${apiUrl}/students/${groupId}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return fetchRequest(request);
  }
}