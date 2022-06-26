import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  comment: string;
  userName: string;
  boardId: number;
  groupId: number;
  @IsNotEmpty()
  password: string;
  depth: number;
}
