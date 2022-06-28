import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardRepository } from '../repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Pagination } from '../../lib/paginate';
import { FindBoardDto } from '../dto/find-board.dto';
import { checkPw } from '../../lib/util/check.data';
import { BoardInterface } from '../interface/board.interface';
import { KeywordInterface } from '../../keyword/interface/keyword.interface';

@Injectable()
export class BoardService implements BoardInterface {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
    @Inject('KeywordInterface')
    private readonly keywordService: KeywordInterface,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardRepository.createBoard(createBoardDto);

    // board가 있을시에만 알림 전송.
    if (board) this.keywordService.sendAlarm(`${board.title} ${board.content}`);

    return board;
  }

  async findBoard(findBoardDto: FindBoardDto): Promise<Pagination<Board>> {
    return await this.boardRepository.findBoard(findBoardDto);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne(id);

    // 이후 자주 쓰이는 에러에 대해서 공통모듈에서 처리될수있도록 하는게 좋을듯..
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }

    if (!checkPw(board.password, updateBoardDto.password)) {
      throw new BadRequestException('암호가 틀렸어요');
    }
    board.title = updateBoardDto.title;
    board.content = updateBoardDto.content;

    return this.boardRepository.save(board);
  }

  async remove(id: number, password: string) {
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new BadRequestException('해당 게시물을 찾을 수 없습니다.');
    }

    if (!checkPw(board.password, password)) {
      throw new BadRequestException('암호가 틀렸어요');
    }
    return this.boardRepository.remove(board);
  }
}
