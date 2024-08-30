import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneBy({ id });
  }

  create(book: Partial<Book>): Promise<Book> {
    const newBook = this.bookRepository.create(book);
    return this.bookRepository.save(newBook);
  }

  async update(id: number, updateBook: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(id, updateBook);
    return this.bookRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
