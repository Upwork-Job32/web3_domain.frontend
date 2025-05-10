export interface LocationState {
  custody?: 'self' | 'hosted'
  query?: string
  fromDomainRegister?: boolean
}

export type RegistrarType = 'domain' | 'web3'
export type PaymentMethodType = 'crypto' | 'credit'

export interface RegistrationFormData {
  domainName: string
  registrar: RegistrarType
  paymentMethod: PaymentMethodType
  custody: 'self' | 'hosted'
}
