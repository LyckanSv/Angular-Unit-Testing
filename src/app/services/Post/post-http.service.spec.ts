import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('postService (HttpClientTestingModule)', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;
  let POSTS = [
    { id: 1, body: 'body 1', title: 'title 1' },
    { id: 2, body: 'body 2', title: 'title 2' },
    { id: 3, body: 'body 3', title: 'title 3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', () => {
    it('should return post when getPost() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS);
        done();
      });

      //postService.getPost(1).subscribe();

      let request = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );

      request.flush(POSTS);

      expect(request.request.method).toBe('GET');
    });
  });

  describe('getPost', () => {
    it('should return single post when getpost is called with postId', () => {
      postService.getPost(1).subscribe();

      const request = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      expect(request.request.method).toBe('GET');
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
