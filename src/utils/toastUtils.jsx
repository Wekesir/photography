// toastUtils.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast settings globally
toast.configure({
  position: 'bottom-left', // Customize position for all toasts
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
});

export { ToastContainer, toast };
