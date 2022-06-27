import { Module } from '@nestjs/common';
import { KeywordService } from '../service/keyword.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';

@Module({
  providers: [
    {
      provide:'KeywordInterface',
      useClass: KeywordService
    }
  ],
  imports: [TypeOrmModule.forFeature([KeywordRepository])],
  exports:['KeywordInterface']
})
export class KeywordModule {}
