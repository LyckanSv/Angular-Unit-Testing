import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from 'src/app/models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<IPost[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  getPost(postId: number) {
    return this.httpClient.get<IPost>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }

  deletePost(post: IPost) {
    return this.httpClient.delete(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`
    );
  }

  updatePost(post: IPost) {
    return this.httpClient.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
  }
}
