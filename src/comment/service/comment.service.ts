import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '../repository/comment.repository';
import { BoardRepository } from '../../board/repository/board.repository';
import { FindCommentDto } from '../dto/find-comment.dto';
import { Pagination } from '../../lib/paginate';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const board = await this.boardRepository.findOne(createCommentDto.boardId);
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }
    //groupId로 원댓글을 찾고 없다면 에러.
    const comment = await this.commentRepository.findOne(
      createCommentDto.groupId,
    );
    if (!comment) {
      throw new BadRequestException('원 댓글을 찾을 수 없습니다.');
    } else {
      createCommentDto.depth = 1;
    }

    return await this.commentRepository.createComment(createCommentDto);
  }

  async findComment(findCommentDto: FindCommentDto) {
    const board = await this.boardRepository.findOne(findCommentDto.boardId);
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }
    return await this.commentRepository.findComment(findCommentDto);
  }
}
