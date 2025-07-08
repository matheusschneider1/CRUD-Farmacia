import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './service/produto.service';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './controllers/produto.controller';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
