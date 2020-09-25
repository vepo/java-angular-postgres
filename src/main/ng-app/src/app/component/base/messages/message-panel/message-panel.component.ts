import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../../infra/message/messaging.service';
import { Message } from '../../../../infra/message/message';
import { interval, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.less']
})
export class MessagePanelComponent implements OnInit {

  private subscription: Subscription;
  messages: Message[] = [];
  constructor(private messaging: MessagingService) { }

  ngOnInit(): void {
    this.messaging.subscriber().subscribe(message => {
      if (!this.subscription) {
        this.subscription = interval(1_000).subscribe(counter => this.updateMessage());
      }
      this.messages.push(message);
    });

  }

  private updateMessage(): void {
    this.messages = this.messages.filter(message => {
      message.timeout--;
      return message.timeout > 0
    });
    if (this.messages.length == 0) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

}
