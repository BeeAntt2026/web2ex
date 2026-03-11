import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fashionFilter',
  standalone: false,
})
export class FashionFilterPipe implements PipeTransform {
  transform(fashions: any[], style: string): any[] {
    if (!fashions || !style) return fashions;
    return fashions.filter(f => f.style === style);
  }
}
