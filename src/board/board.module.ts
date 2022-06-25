import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repository/board.repository';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([BoardRepository])],
})
export class BoardModule {}
