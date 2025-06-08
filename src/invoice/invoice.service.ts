import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.save(createInvoiceDto);
  }

  findAllByUserId(userId: number) {
    return this.invoiceRepository.find({
      where: { userId: userId },
    });
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: { id: id },
    });
  }

}
