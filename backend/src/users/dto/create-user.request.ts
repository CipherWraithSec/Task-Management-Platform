import { IsEmail, IsStrongPassword } from 'class-validator';

// DTO for creating a user
export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
