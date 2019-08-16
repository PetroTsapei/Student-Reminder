import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class SubjectApi {
  static getSubjects(token, page) {
    const request = new Request(`${apiUrl}/subjects?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }
}