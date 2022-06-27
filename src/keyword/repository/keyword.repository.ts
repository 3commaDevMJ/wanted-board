import { EntityRepository, Repository } from 'typeorm';
import { Keyword } from '../entities/keyword.entity';

@EntityRepository(Keyword)
export class KeywordRepository extends Repository<Keyword> {
  async findKeywordUser(keywordArray) {
    return await this.createQueryBuilder()
      .select('userId')
      .where('keyword In (:keyword)', { keyword: keywordArray })
      .distinct()
      .getRawMany();
  }
}
