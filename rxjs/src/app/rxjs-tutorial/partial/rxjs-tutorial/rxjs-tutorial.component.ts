import { Component, OnInit } from '@angular/core';
import { timeout } from 'q';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-rxjs-tutorial',
  templateUrl: './rxjs-tutorial.component.html',
  styleUrls: ['./rxjs-tutorial.component.css']
})
export class RxjsTutorialComponent implements OnInit {

  str: string = 'hello world';
  constructor() { }

  ngOnInit() {
    // const sequence = new Observable(this.sequenceSubscriber);
    // sequence.subscribe({
    //   next(num) { console.log('1st subscribe:' + num); },
    //   complete() { console.log('1st sequence finished'); }
    // });

    // setTimeout(() => {
    //   sequence.subscribe({
    //     next(num) { console.log(`2nd subscribe: ${num}`) },
    //     complete() { console.log(`2nd sequence finished.`) }
    //   })
    // }, 500);

    const multicastSeqence = new Observable(this.multicastSequenceSubscribe());
    multicastSeqence.subscribe({
      next(num) { console.log('1st subscribe: ' + num) },
      complete() { console.log(`1st sequence finished.`) }
    });

    setTimeout(() => {
      multicastSeqence.subscribe({
        next(num){console.log(`2nd subscribe: ${num}`)},
        complete(){console.log(`2nd sequence finished`)}
      })
    }, 1000);

  }

  doSequence(observer, arr, idx) {
    return setTimeout(() => {
      observer.next(arr[idx]);
      if (idx === arr.length - 1) {
        observer.complete();
      } else {
        this.doSequence(observer, arr, ++idx);
      }
    }, 1000);
  }

  multicastSequenceSubscribe() {
    const seq = [1, 2, 3];
    const observers = [];
    let timeoutId;
    return (observer) => {
      observers.push(observer);
      if (observers.length === 1) {
        timeoutId = this.doSequence({
          next(val) {
            observers.forEach(obs => obs.next(val));
          },
          complete() {
            observers.slice(0).forEach(obs => obs.complete());
          }
        }, seq, 0);
      }

      return {
        unsubscribe() {
          observers.splice(observers.indexOf(observer, 1));
          if (observers.length === 0) {
            clearTimeout(timeoutId);
          }
        }
      }
    }
  }

  sequenceSubscriber(observer) {
    const seq = [1, 2, 3];
    let timeoutId;
    function doSequence(arr, idx) {
      timeoutId = setTimeout(() => {
        observer.next(arr[idx]);
        if (idx === arr.length - 1) {
          observer.complete();
        } else {
          doSequence(arr, ++idx);
        }
      }, 1000);
    }
    doSequence(seq, 0);
    return {
      unsubscribe() {
        clearTimeout(timeoutId);
      }
    }
  }
}
