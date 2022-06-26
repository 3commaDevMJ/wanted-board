import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  sendAlarm(keywordContent: string) {
    const keywordArray = keywordContent.split(' ');
  }
}
