import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordRepository } from '../repository/keyword.repository';
import { KeywordInterface } from '../interface/keyword.interface';

@Injectable()
export class KeywordService implements KeywordInterface {
  constructor(
    @InjectRepository(KeywordRepository)
    private keywordRepository: KeywordRepository,
  ) {}

  async sendAlarm(keywordContent: string) {
    const users = await this.getUsers(keywordContent);

    // 추출한 유저로 알림 전송.
    console.log(users);
  }

  async getUsers(keywordContent: string) {
    const keywordArray = keywordContent.split(' ');
    const keywordUsers = await this.keywordRepository.findKeywordUser(
      keywordArray,
    );
    return keywordUsers.map((keyword) => keyword.userId);
  }
}
