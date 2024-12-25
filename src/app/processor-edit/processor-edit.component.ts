import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcessorModel } from '../models/processorModel';

@Component({
  selector: 'app-processor-edit',
  standalone: true,
  imports: [],
  templateUrl: './processor-edit.component.html',
  styleUrl: './processor-edit.component.css',
})
export class ProcessorEditComponent {
  @Input() processor: ProcessorModel | undefined;
  @Output() save = new EventEmitter<ProcessorModel>();
  @Output() cancel = new EventEmitter<ProcessorModel>();

  errorMessage = '';

  saveEdit(event: any): void {
    event.preventDefault();
    console.log('Processor saved');
    console.log('Processor: ', this.processor);

    let form = event.target;

    let newP: ProcessorModel = {
      name: form.name.value,
      manufacturer: form.manufacturer.value,
      price: form.price.value,
      socket: form.socket.value,
      coreCount: form.coreCount.value,
      threadCount: form.threadCount.value,
      baseClock: form.baseClock.value,
      boostClock: form.boostClock.value,
    };

    console.log('adasd');

    let isValid = true;

    // Input validation
    if (
      !newP.name ||
      !newP.manufacturer ||
      !newP.price ||
      !newP.socket ||
      !newP.coreCount ||
      !newP.threadCount ||
      !newP.baseClock ||
      !newP.boostClock
    ) {
      this.errorMessage = 'Minden mező kitöltése kötelező.';
      isValid = false;
    } else if (isNaN(newP.price) || +newP.price <= 0) {
      this.errorMessage = 'Az árnak pozitív számnak kell lennie.';
      isValid = false;
    } else if (isNaN(newP.coreCount) || +newP.coreCount <= 0) {
      this.errorMessage = 'A magok számnak 0 nál nagyobbnak kell lennie.';
      isValid = false;
    } else if (isNaN(newP.threadCount) || +newP.threadCount <= 0) {
      this.errorMessage = 'A szálak számnak 0 nál nagyobbnak kell lennie.';
      isValid = false;
    } else if (isNaN(newP.baseClock) || +newP.baseClock <= 0) {
      this.errorMessage = 'Az alap órajelnek  0 nál nagyobbnak kell lennie.';
      isValid = false;
    } else if (isNaN(newP.boostClock) || +newP.boostClock <= 0) {
      this.errorMessage = 'A turbó órajelnek  0 nál nagyobbnak kell lennie.';
      isValid = false;
    } else if (+newP.coreCount > +newP.threadCount) {
      this.errorMessage =
        'A szálak számának nagyobbnak kell lennie mint a magok számának.';
      isValid = false;
    } else if (+newP.baseClock > +newP.boostClock) {
      this.errorMessage =
        'A turbó órajelnek nagyobbnak kell lennie mint az alap órajelnek.';
      isValid = false;
    } else if (+newP.name.length > 20) {
      this.errorMessage = 'A név maximum 20 karakter lehet.';
      isValid = false;
    } else if (+newP.manufacturer.length > 20) {
      this.errorMessage = 'A gyártó maximum 20 karakter lehet.';
      isValid = false;
    } else if (+newP.socket.length > 10) {
      this.errorMessage = 'A foglalat maximum 10 karakter lehet.';
      isValid = false;
    }

    if (isValid) {
      if (this.processor?.id) {
        newP.id = this.processor.id;
      }
      this.errorMessage = '';
      this.save.emit(newP);
    }
  }

  cancelEdit(): void {
    console.log('Edit canceled');
    this.cancel.emit(this.processor);
  }
}
