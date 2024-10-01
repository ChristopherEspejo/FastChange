// auth.interface.ts (o el archivo donde esté la interfaz)

export interface RegisterData {
  nombre: string;
  apellido: string;
  dni: string;
  email?: string;  // El campo email sigue siendo opcional
  tipoPersona: string;  // Agrega tipoPersona como obligatorio
}
