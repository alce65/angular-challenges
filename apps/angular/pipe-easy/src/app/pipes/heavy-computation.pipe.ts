import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  capitalice(value: string): string {
    const words = value.split(' ');
    return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  }

  transform(value: string, index: number): string {
    return `${this.capitalice(value)} - ${index + 1}`;
  }
}
