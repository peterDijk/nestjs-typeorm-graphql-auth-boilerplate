export interface JwtPayload {
  username: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  email: string;
  token: string;
}
