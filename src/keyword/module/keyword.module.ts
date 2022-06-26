import { Module } from '@nestjs/common';
import { KeywordService } from '../service/keyword.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';

@Module({
  providers: [KeywordService],
  imports: [TypeOrmModule.forFeature([KeywordRepository])],
})
export class KeywordModule {}
