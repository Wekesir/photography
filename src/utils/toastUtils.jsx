// toastUtils.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// No need for toast.configure; configure options directly here
const CustomToastContainer = ToastContainer;

CustomToastContainer.defaultProps = {
  position: 'bottom-left', // Customize position
  autoClose: 2000, // Set the default auto-close duration
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'dark',
  // Add any other options you need
};

export { CustomToastContainer, toast };
