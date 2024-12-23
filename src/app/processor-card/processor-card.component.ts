import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcessorModel } from '../models/processorModel';

@Component({
  selector: 'app-processor-card',
  standalone: true,
  imports: [],
  templateUrl: './processor-card.component.html',
  styleUrl: './processor-card.component.css',
})
export class ProcessorCardComponent {
  @Input() processor: ProcessorModel | undefined;
  @Output() Edit = new EventEmitter<ProcessorModel>();
  @Output() Delete = new EventEmitter<ProcessorModel>();

  edit(p: ProcessorModel | undefined): void {
    console.log('Edit');
    this.Edit.emit(p);
  }

  delete(p: ProcessorModel | undefined): void {
    this.Delete.emit(p);
    console.log('Delete');
  }
}
