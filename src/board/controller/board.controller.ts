import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';

import { UpdateBoardDto } from '../dto/update-board.dto';
import { CreateBoardDto } from '../dto/create-board.dto';
import { FindBoardDto } from '../dto/find-board.dto';
import { BoardInterface } from '../interface/board.interface';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject('BoardInterface') private readonly boardService: BoardInterface,
  ) {}

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
  update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  // 게시판 삭제.
  @Delete(':id')
  remove(@Param('id') id: number, @Query('password') password: string) {
    return this.boardService.remove(id, password);
  }
}
