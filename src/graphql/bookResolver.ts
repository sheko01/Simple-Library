import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './bookService';
import { Book } from './book';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query((returns) => [Book])
  books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query((returns) => Book)
  book(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation((returns) => Book)
  createBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('publicationYear', { type: () => Int }) publicationYear: number,
  ): Promise<Book> {
    return this.bookService.create({ title, author, publicationYear });
  }

  @Mutation((returns) => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('author', { nullable: true }) author?: string,
    @Args('publicationYear', { type: () => Int, nullable: true })
    publicationYear?: number,
  ): Promise<Book> {
    return this.bookService.update(id, { title, author, publicationYear });
  }

  @Mutation((returns) => Boolean)
  deleteBook(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.bookService.remove(id).then(() => true);
  }
}
