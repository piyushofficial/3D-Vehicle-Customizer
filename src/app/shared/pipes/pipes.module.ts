import { NgModule } from '@angular/core';
import { DataSuffixPipe } from './data-suffix/data-suffix.pipe';
import { DatePipe } from './date-pipe/date.pipe';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';
import { FileSizePipe } from './file-size-pipe/file-size.pipe';

const pipes = [DatePipe, EllipsisPipe, FileSizePipe, DataSuffixPipe];

@NgModule({
  declarations: [pipes],
  exports: [pipes],
})
export class PipesModule {}
