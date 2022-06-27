import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @MaxLength(30)
  title: string;
  @IsNotEmpty()
  @MaxLength(200)
  content: string;
  @IsNotEmpty()
  @MaxLength(20)
  userName: string;
  @IsNotEmpty()
  @MaxLength(20)
  password: string;
}
