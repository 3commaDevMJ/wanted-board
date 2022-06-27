import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(200)
  comment: string;
  @IsNotEmpty()
  @MaxLength(30)
  userName: string;
  @IsNotEmpty()
  boardId: number;
  groupId: number;
  @IsNotEmpty()
  password: string;
  depth: number;
}
