import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FindCommentDto } from '../dto/find-comment.dto';
import { Pagination } from '../../lib/paginate';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(createCommentDto: CreateCommentDto) {
    const comment = this.create(createCommentDto);
    return await this.save(comment);
  }

  async findCommentByGroupId(boardId: number, groupId: number) {
    return await this.createQueryBuilder()
      .select('id')
      .where('depth =0 and id = (:groupId) and boardId = (:boardId)', {
        boardId,
        groupId,
      })
      .getRawMany();
  }

  async findComment(findCommentDto: FindCommentDto) {
    const { take, page, boardId } = findCommentDto;

    const [result, total] = await this.createQueryBuilder()
      .select()
      .take(take)
      .skip(take * (page - 1))
      .where('boardId = (:boardId)', { boardId })
      .orderBy('IF((depth=0),id,groupId)')
      .getManyAndCount();
    return new Pagination<Comment>({
      result,
      total,
    });
  }
}
