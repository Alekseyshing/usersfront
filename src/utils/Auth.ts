import { setAlert } from "../Context/alert";
import { IAlert } from "../types";


export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: '', alertStatus: '' }), 3000)
}