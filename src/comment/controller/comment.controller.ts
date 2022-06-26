import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../service/comment.service';
import { FindCommentDto } from '../dto/find-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  // 댓글 생성.
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  async findComment(@Query() findCommentDto: FindCommentDto) {
    return this.commentService.findComment(findCommentDto);
  }
}
