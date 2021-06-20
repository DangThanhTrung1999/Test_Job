import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';

// adding bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
