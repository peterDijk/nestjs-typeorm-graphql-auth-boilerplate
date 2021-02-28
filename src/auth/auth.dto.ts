export interface JwtPayload {
  email: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  email: string;
  token: string;
}
