import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private observer = new Subject<Message>();
  private subscriber$ = this.observer.asObservable();

  constructor() { }

  public add(message: Message): void {
    this.observer.next(message);
  }

  public subscriber(): Observable<Message> {
    return this.subscriber$;
  }
}
