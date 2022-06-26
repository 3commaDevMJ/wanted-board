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

  async findComment(findCommentDto: FindCommentDto) {
    const { take, page, boardId } = findCommentDto;
    const [result, total] = await this.findAndCount({
      select: ['id', 'comment', 'userName', 'createdAt', 'updatedAt'],
      take,
      where: { boardId },
      skip: take * (page - 1),
      order: { createdAt: 'DESC' },
    });

    return new Pagination<Comment>({
      result,
      total,
    });
  }
}
