import { Module } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentController } from '../controller/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from '../repository/comment.repository';
import { BoardRepository } from '../../board/repository/board.repository';
import { KeywordModule } from '../../keyword/module/keyword.module';

@Module({
  controllers: [CommentController],
  providers: [
    {
      provide: 'CommentInterface',
      useClass: CommentService,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    TypeOrmModule.forFeature([BoardRepository]),
    KeywordModule,
  ],
})
export class CommentModule {}
