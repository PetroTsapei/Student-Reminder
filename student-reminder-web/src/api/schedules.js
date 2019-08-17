import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class ScheduleApi {
  static getSchedules(token, page) {
    const request = new Request(`${apiUrl}/schedules?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request)
  }
}