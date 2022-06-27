import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { FindBoardDto } from '../dto/find-board.dto';
import { Pagination } from '../../lib/paginate';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface BoardInterface{
  createBoard(createBoardDto: CreateBoardDto): Promise<Board>;

  findBoard(findBoardDto: FindBoardDto): Promise<Pagination<Board>>;

  update(id: number, updateBoardDto: UpdateBoardDto);

  remove(id: number, password: string);
}
