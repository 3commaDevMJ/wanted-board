import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';

import { UpdateBoardDto } from '../dto/update-board.dto';
import { CreateBoardDto } from '../dto/create-board.dto';
import { FindBoardDto } from '../dto/find-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시판 작성.
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.createBoard(createBoardDto);
  }

  // 게시판 조회.
  @Get()
  findBoard(@Query() findBoardDto: FindBoardDto) {
    return this.boardService.findBoard(findBoardDto);
  }

  // 게시판 수정.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  // 게시판 삭제.
  @Delete(':id')
  remove(@Param('id') id: string, @Query('password') password: string) {
    return this.boardService.remove(+id, password);
  }
}
