import { IPost } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { PostService } from 'src/app/services/Post/post.service';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { PostComponent } from '../post/post.component';

class mockPostService {
  getPost() {
    return of([])
  }
  deletePost(post: IPost) {
    return of(true);
  }
}

describe('', () => {
  let POSTS: IPost[];
  let component: PostsComponent;
  let postService: any;

  beforeEach(() => {
    POSTS = [
      { id: 1, body: 'body 1', title: 'title 1' },
      { id: 2, body: 'body 2', title: 'title 2' },
      { id: 3, body: 'body 3', title: 'title 3' },
    ];

    // let mockPostService = jasmine.createSpyObj(PostService, {
    //   getPost: new Observable((next) => next.next(POSTS)),
    //   deletePost: new Observable(),
    // });

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          useClass: mockPostService,
        },
      ],
    });

    component = TestBed.inject(PostsComponent);
    postService = TestBed.inject(PostService);
  });

  // describe('get', () => {
  //   it('get posts', () => {
  //     component.ngOnInit();
  //     console.log('POSTP', component.posts);

  //     expect(component.posts.length).toBeGreaterThan(0);
  //   });
  // });

  describe('delete', () => {
    beforeEach(() => {
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[0]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the selected Post from the posts only once', () => {
      spyOn(postService, 'deletePost').and.callThrough();
      component.delete(POSTS[1]);
      expect(postService.deletePost).toHaveBeenCalledTimes(1);
    });

    it('should delete the actual selected Post from the posts', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });
  });
});
