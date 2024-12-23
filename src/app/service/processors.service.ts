import { Injectable } from '@angular/core';
import { ProcessorModel } from '../models/processorModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessorsService {
  jsonUrl = 'http://localhost:3000/processors';
  processors: ProcessorModel[] = [];
  constructor(private http: HttpClient) {}
  getCategories(): Observable<ProcessorModel[]> {
    return this.http.get<ProcessorModel[]>(this.jsonUrl);
  }
  addProcessor(p: ProcessorModel): void {
    this.processors.push(p);
    this.http.post(this.jsonUrl, p).subscribe();
  }
  deleteProcessor(p: ProcessorModel): void {
    this.processors = this.processors.filter((item) => item !== p);
    this.http.delete(`${this.jsonUrl}/${p.id}`).subscribe();
  }
  editProcessor(p: ProcessorModel): void {
    this.processors = this.processors.map((item) =>
      item.id === p.id ? p : item
    );
    this.http.put(`${this.jsonUrl}/${p.id}`, p).subscribe();
  }
}
