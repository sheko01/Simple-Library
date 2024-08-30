import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book';
import { BookService } from './bookService';
import { BookResolver } from './bookResolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BookResolver],
})
export class BookModule {}
