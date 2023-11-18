import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post?: IPost;
  @Output() delete = new EventEmitter<IPost>();
  constructor() {}

  onDeletePost($event: MouseEvent) {
    $event?.stopPropagation();
    this.delete?.emit(this.post);
  }
}
