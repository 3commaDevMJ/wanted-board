import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FindCommentDto } from '../dto/find-comment.dto';
import { CommentInterface } from '../interface/comment.interface';

@Controller('comments')
export class CommentController {
  constructor(
    @Inject('CommentInterface') private commentService: CommentInterface,
  ) {}
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
