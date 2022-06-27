import { FindCommentDto } from '../dto/find-comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';

export interface CommentInterface {
  createComment(createCommentDto: CreateCommentDto);
  findComment(findCommentDto: FindCommentDto);
}
