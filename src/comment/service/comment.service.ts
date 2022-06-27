import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '../repository/comment.repository';
import { BoardRepository } from '../../board/repository/board.repository';
import { FindCommentDto } from '../dto/find-comment.dto';
import { CommentInterface } from '../interface/comment.interface';
import { KeywordInterface } from '../../keyword/interface/keyword.interface';

@Injectable()
export class CommentService implements CommentInterface {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
    @Inject('KeywordInterface')
    private readonly keywordService: KeywordInterface,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const board = await this.boardRepository.findOne(createCommentDto.boardId);
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }

    if (createCommentDto.groupId) {
      //groupId로 원댓글을 찾고 없다면 에러.
      const comment = await this.commentRepository.findCommentByGroupId(
        createCommentDto.boardId,
        createCommentDto.groupId,
      );
      if (comment.length < 1) {
        throw new BadRequestException('원 댓글을 찾을 수 없습니다.');
      }
      createCommentDto.depth = 1;
    } else {
      createCommentDto.depth = 0;
    }

    const resultComment = await this.commentRepository.createComment(
      createCommentDto,
    );

    // 코멘트가 성공적으로 등록됬을시에만 있을시에만 알림 전송.
    if (resultComment) this.keywordService.sendAlarm(resultComment.comment);

    return resultComment;
  }

  async findComment(findCommentDto: FindCommentDto) {
    const board = await this.boardRepository.findOne(findCommentDto.boardId);
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }
    return await this.commentRepository.findComment(findCommentDto);
  }
}
