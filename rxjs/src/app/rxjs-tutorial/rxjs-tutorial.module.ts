import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsTutorialComponent } from './partial/rxjs-tutorial/rxjs-tutorial.component';
import { MediatorComponent } from './partial/rxjs-tutorial/mediator/mediator.component';

@NgModule({
  declarations: [RxjsTutorialComponent, MediatorComponent],
  imports: [
    CommonModule
  ]
})
export class RxjsTutorialModule { }
