
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AboutProject from './pages/AboutProject.jsx';

const queryClient = new QueryClient();

 document.documentElement.classList.add("dark");
createRoot(document.getElementById('root')).render(


  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App /> 
     
    </Provider>
  </QueryClientProvider>
)
