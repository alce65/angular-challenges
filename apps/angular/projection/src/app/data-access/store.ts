export interface Store<T extends { id: number }> {
  addAll(teachers: T[]): void;
  addOne(teacher: T): void;
  deleteOne(id: T['id']): void;
}
