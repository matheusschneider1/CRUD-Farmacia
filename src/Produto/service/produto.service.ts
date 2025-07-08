import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private CategoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: { categoria: true },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: { categoria: true },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findAllByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: { categoria: true },
    });
  }

  async create(remedio: Produto): Promise<Produto> {
    await this.CategoriaService.findById(remedio.categoria.id);
    return await this.produtoRepository.save(remedio);
  }

  async update(remedio: Produto): Promise<Produto> {
    const buscaExercicio = await this.findById(remedio.id);

    if (!buscaExercicio || !remedio.id)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.save(remedio);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscaExercicio = await this.findById(id);

    if (!buscaExercicio)
      throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.delete(id);
  }
}
