import { PaginationOptions } from '../../lib/paginate';
import { IsNotEmpty } from 'class-validator';

export class FindCommentDto extends PaginationOptions {
  @IsNotEmpty()
  boardId: number;
}
