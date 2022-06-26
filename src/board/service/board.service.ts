import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardRepository } from '../repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Pagination } from '../../lib/paginate';
import { FindBoardDto } from '../dto/find-board.dto';
import { checkPw } from '../../lib/util/check.data';
import { KeywordService } from '../../keyword/service/keyword.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    private keywordService: KeywordService,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardRepository.createBoard(createBoardDto);

    this.keywordService.sendAlarm(`${board.title} ${board.content}`);

    return board;
  }

  async findBoard(findBoardDto: FindBoardDto): Promise<Pagination<Board>> {
    return await this.boardRepository.findBoard(findBoardDto);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne(id);

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
