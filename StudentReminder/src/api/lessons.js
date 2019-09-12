import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';
import queryString from 'query-string';

export default class LessonsApi {
  static getAll({ group, typeOfTime, token }) {
    return fetchRequest(`${apiUrl}/lessons?${queryString.stringify({ group, typeOfTime })}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }
}