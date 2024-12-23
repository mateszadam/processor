export interface ProcessorModel {
  id?: number;
  name: string;
  manufacturer: string;
  price: number;
  socket: string;
  coreCount: number;
  threadCount: number;
  baseClock: number;
  boostClock: number;
}
