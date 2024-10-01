export interface ProfileResponse {
  exists: boolean
  user: UserInterface
}

export interface UserInterface {
  nombre: string
  apellido: string
  dni: string
  email: string
  rol: string
  cc?: string
  cci?: string
}
