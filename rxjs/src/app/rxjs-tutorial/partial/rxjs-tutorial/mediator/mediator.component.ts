import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mediator',
  templateUrl: './mediator.component.html',
  styleUrls: ['./mediator.component.css']
})
export class MediatorComponent implements OnInit {

  str: string = '';
  event$: Observable<any>;
  player = {
    name: 'A',
    EventName: 'hule'
  }
  constructor() { }

  ngOnInit() {
    this.str = JSON.stringify(this.player);
    this.event$ = new Observable(this.pushEvent);
    const playA$ = this.event$.subscribe({
      next(str) {
        const event = JSON.parse(str);
        console.log(str);
        if(event.name==='A'){
          console.log(`A 消费了这条消息`);
        }
      },
      complete() {
        console.log(`finished`);
      }
    });

  }

  pushEvent(observer) {
    const str = JSON.stringify({
      name: 'A',
      EventName: 'hule'
    });
    observer.next(str);
    observer.complete();
  }

}
