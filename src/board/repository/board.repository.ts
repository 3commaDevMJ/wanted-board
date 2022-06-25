import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create(createBoardDto);

    return await this.save(board);
  }
}
