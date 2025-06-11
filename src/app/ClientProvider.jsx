'use client';

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import Loader from "@/components/utils/Loader";
import { useState } from "react";
import PrivateRoute from './PrivateRoute';

export default function ClientProvider({ children }) {
  const [rehydrated, setRehydrated] = useState(false);
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<Loader />}
        onBeforeLift={() => setRehydrated(true)}
      >
        <Toaster />
        <PrivateRoute>
          {rehydrated ? children : null}
        </PrivateRoute>
      </PersistGate>
    </Provider>
  );
}