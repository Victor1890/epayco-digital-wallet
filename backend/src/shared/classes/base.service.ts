import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';

@Injectable()
export abstract class Service<T extends IBaseEntity> {
  constructor(entityName: string, repository: Repository<T>) {
    this.logger = new Logger(`${entityName}Service`);
    this.entityName = entityName;
    this.internalRepository = repository;
  }

  protected readonly logger: Logger;
  private readonly entityName: string;
  private readonly internalRepository: Repository<T>;

  /**
   * Retrieves list of entities using the provided FindManyOptions.
   * @param options
   * @returns A promise that resolves to the fetched list of entities.
   */
  async find(options: FindManyOptions<T> = {}): Promise<T[]> {
    this.logger.log(
      `Fetching many ${this.entityName} with criteria: ${JSON.stringify(options)}`,
    );

    return this.internalRepository.find(options);
  }

  /**
   * Retrieves an entity using the provided FindOneOption. If not found, returns null.
   * @param options
   * @returns A promise that resolves to the fetched entity.
   */
  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    this.logger.log(
      `Fetching ${this.entityName} with criteria: ${JSON.stringify(options)}`,
    );

    return this.internalRepository.findOne(options);
  }

  /**
   * Retrieves an entity using the provided FindOneOption. If not found, throws a NotFoundException.
   * @param options
   * @returns A promise that resolves to the fetched entity.
   */
  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options);

    if (!entity) {
      throw new NotFoundException(`${this.entityName} no existe.`);
    }

    return entity;
  }

  /**
   * Deletes entities given the FindOptionsWhere options. If not found, throws a NotFoundException.
   * @param options
   */
  async delete(options: FindOptionsWhere<T>): Promise<DeleteResult> {
    this.logger.log(
      `Deleting ${this.entityName} with criteria: ${JSON.stringify(options, null, 2)}`,
    );

    const result = await this.internalRepository.delete(options);
    return result;
  }
}
