import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';
import { KeywordInterface } from '../interface/keyword.interface';

@Injectable()
export class KeywordService implements KeywordInterface{
  constructor(
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  sendAlarm(keywordContent: string) {
    const keywordArray = keywordContent.split(' ');
    console.log(keywordArray);
  }
}
