import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function notify(text, type) {
  if (type == "ok") {
    toast.success(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  else if (type == "error") {
    toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    })
  }
  else if (type == "gen") {
    toast.info(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    })
  }
}

export default notify;