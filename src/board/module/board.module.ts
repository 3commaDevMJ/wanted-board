import { Module } from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { BoardController } from '../controller/board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from '../repository/board.repository';
import { KeywordModule } from '../../keyword/module/keyword.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [KeywordModule, TypeOrmModule.forFeature([BoardRepository])],
})
export class BoardModule {}
