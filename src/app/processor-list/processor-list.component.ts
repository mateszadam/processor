import { Component, Input } from '@angular/core';
import { ProcessorCardComponent } from '../processor-card/processor-card.component';
import { ProcessorModel } from '../models/processorModel';
import { ProcessorsService } from '../service/processors.service';

@Component({
  selector: 'app-processor-list',
  standalone: true,
  imports: [ProcessorCardComponent],
  templateUrl: './processor-list.component.html',
  styleUrl: './processor-list.component.css',
})
export class ProcessorListComponent {
  processors: ProcessorModel[];

  constructor(private p: ProcessorsService) {
    this.processors = p.processors;
    console.log('ProcessorListComponent constructor');
    console.log('Processors: ', this.processors);
  }

  ngOnInit() {
    this.p.getCategories().subscribe({
      next: (result) => {
        console.log('Data loaded: ', result);
        this.processors = result;
      },
      error: (err) => {
        console.error('Error loading data: ', err);
      },
    });
  }

  edit(p: ProcessorModel | undefined): void {
    if (p != undefined) {
      this.processors.map((item) => (item.id === p.id ? p : item));
      this.p.editProcessor(p);
    }
  }

  delete(p: ProcessorModel | undefined): void {
    if (p != undefined) {
      this.processors = this.processors.filter((item) => item !== p);
      this.p.deleteProcessor(p);
    }
  }
}
