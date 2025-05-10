import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import { Providers } from './providers'
import { Web3ModalProvider } from './config/web3modal'

import {
  DomainRegister,
  BillingAndInfo,
  DomainSearchResults
} from './domain-register'

import {
  Web3Register,
  RegistrationComplete,
  RegistrationFailed
} from './web3-register'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route path="/" element={<DomainRegister />} />
            <Route path="/register-domain" element={<BillingAndInfo />} />
            <Route path="/search" element={<DomainSearchResults />} />

            <Route path="/web3-register" element={<Web3Register />} />
            <Route
              path="/web3-register/success"
              element={<RegistrationComplete />}
            />
            <Route
              path="/web3-register/failed"
              element={<RegistrationFailed />}
            />
          </Routes>
        </Providers>
      </BrowserRouter>
    </Web3ModalProvider>
  </React.StrictMode>
)
