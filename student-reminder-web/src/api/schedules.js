import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class ScheduleApi {
  static getById(token, id) {
    const request = new Request(`${apiUrl}/schedules/${id}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static getSchedules(token, page) {
    const request = new Request(`${apiUrl}/schedules?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static createSchedule(token, data) {
    const request = new Request(`${apiUrl}/schedules`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static updateSchedule(token, id, data) {
    const request = new Request(`${apiUrl}/schedules/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static deleteById(token, id) {
    const request = new Request(`${apiUrl}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }
}