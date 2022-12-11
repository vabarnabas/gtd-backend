export class AuthDTO {
  identifier: string;
  password: string;
}

export class RegisterDTO {
  displayName: string;
  email: string;
  password: string;
}

export class ChangePasswordDTO {
  oldPassword: string;
  password: string;
}
