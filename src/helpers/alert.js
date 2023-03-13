import store from '../app/store';
import { setShow, setMessage, setType } from '../features/alert/alertSlice';

export default function alert() {
  store.dispatch(setShow(true));
}
