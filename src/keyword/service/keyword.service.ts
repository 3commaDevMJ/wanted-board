import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';
import { KeywordInterface } from '../interface/keyword.interface';

@Injectable()
export class KeywordService implements KeywordInterface {
  constructor(
    private keywordRepository: KeywordRepository,
  ) {}

  async sendAlarm(keywordContent: string) {
    try {
      const users = await this.getUsers(keywordContent);

      // 테스트 위해 catch로 전달.
      throw {};
    } catch (err) {
      console.log(err);
      console.log('에러가 나더라도 등록기능에는 문제가 없어야 함.');
    }
  }

  async getUsers(keywordContent: string) {
    const keywordArray = keywordContent.split(' ');
    const keywordUsers = await this.keywordRepository.findKeywordUser(
      keywordArray,
    );
    return keywordUsers.map((keyword) => keyword.userId);
  }
}
