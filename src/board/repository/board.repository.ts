import { EntityRepository, Like, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Pagination } from '../../lib/paginate';
import { FindBoardDto } from '../dto/find-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create(createBoardDto);

    return await this.save(board);
  }

  async findBoard(findBoardDto: FindBoardDto) {
    const { limit, offset, title, userName } = findBoardDto;
    const where = {};

    // 유틸로 빼기
    if (title) Object.assign(where, { title: Like(`%${title}%`) });
    if (userName) Object.assign(where, { userName: Like(`%${userName}%`) });

    const [result, total] = await this.findAndCount({
      select: ['id', 'title', 'userName', 'content', 'createdAt', 'updatedAt'],
      where,
      take: limit,
      skip: limit * (offset - 1),
      order: { createdAt: 'DESC' },
    });
    return new Pagination<Board>({
      result,
      total,
    });
  }
}
