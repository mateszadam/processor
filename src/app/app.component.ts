import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProcessorModel } from './models/processorModel';
import { ProcessorsService } from './service/processors.service';
import { ProcessorListComponent } from './processor-list/processor-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProcessorListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  processors: ProcessorModel[];

  constructor(private p: ProcessorsService) {
    this.processors = p.processors;
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

  selectedProcessor = '';

  onSelected(processorName: string): void {
    this.selectedProcessor = processorName;
  }
}
