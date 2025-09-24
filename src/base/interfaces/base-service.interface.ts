
export interface IBaseService<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): void;
}
