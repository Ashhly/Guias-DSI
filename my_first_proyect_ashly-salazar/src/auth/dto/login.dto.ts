import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true, example: 'admin@techsolutions.com' })
  email: string;

  @ApiProperty({ required: true, example: 'password123' })
  password: string;
}