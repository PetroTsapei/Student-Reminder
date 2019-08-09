import { errorStore } from '../stores/ErrorStore';
import { globalAlertsStore } from '../stores/GlobalAlertsStore';

export default error => {
  if (error.fieldsErrors) {
    errorStore.add(error.fieldsErrors.errors);
  } else {
    globalAlertsStore.addAlert({
      title: "Error",
      message: error.message
    });
  }
}
