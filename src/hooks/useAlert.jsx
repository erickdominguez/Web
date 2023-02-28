import { useDispatch } from 'react-redux';
import { setShow, setMessage, setType } from '../features/alert/alertSlice';

export function useAlert(message, type) {
  const dispatch = useDispatch();
  dispatch(setShow(true));
  dispatch(setMessage(message));
  dispatch(setType(type));
}
