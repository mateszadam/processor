import { Component, Input } from '@angular/core';
import { ProcessorCardComponent } from '../processor-card/processor-card.component';
import { ProcessorModel } from '../models/processorModel';
import { ProcessorsService } from '../service/processors.service';
import { ProcessorEditComponent } from '../processor-edit/processor-edit.component';

@Component({
  selector: 'app-processor-list',
  standalone: true,
  imports: [ProcessorCardComponent, ProcessorEditComponent],
  templateUrl: './processor-list.component.html',
  styleUrl: './processor-list.component.css',
})
export class ProcessorListComponent {
  processors: ProcessorModel[];
  processorToEdit: ProcessorModel | undefined | null;

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
    this.processorToEdit = p;
  }

  save(p: ProcessorModel | undefined): void {
    console.log('Save');

    if (p != undefined) {
      console.log('Processor: ', p.id);
      if (p.id == undefined) {
        this.p.addProcessor(p);
        location.reload();
      } else {
        this.p.editProcessor(p);
        this.processors = this.processors.map((item) =>
          item.id === p.id ? p : item
        );
      }
      this.processorToEdit = undefined;
    }
  }

  cancel(): void {
    console.log('Cancel');
    this.processorToEdit = undefined;
  }

  delete(p: ProcessorModel | undefined): void {
    if (p != undefined) {
      this.processors = this.processors.filter((item) => item !== p);
      this.p.deleteProcessor(p);
    }
  }
  add(): void {
    this.processorToEdit = {
      name: '',
      manufacturer: '',
      price: 0,
      socket: '',
      coreCount: 0,
      threadCount: 0,
      baseClock: 0,
      boostClock: 0,
    };
    window.scrollTo(0, 0);
  }
}
