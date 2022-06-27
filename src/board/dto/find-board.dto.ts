import { PaginationOptions } from '../../lib/paginate';
import { IsOptional } from 'class-validator';

export class FindBoardDto extends PaginationOptions {
  @IsOptional()
  title: string;
  @IsOptional()
  userName: string;
}
