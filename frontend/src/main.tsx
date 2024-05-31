import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {addInterceptors} from './axiosApi.ts';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './consttants';
import { persistor, store } from '../App/store';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
);