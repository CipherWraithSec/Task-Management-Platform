import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  length,
  MinLength,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

// DTO for creating a user
export class CreateUserDTO {
  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm Password is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
