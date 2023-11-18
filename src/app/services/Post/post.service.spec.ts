import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { IPost } from 'src/app/models/Post';
import { TestBed } from '@angular/core/testing';

describe('Post Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let POSTS: IPost[];

  beforeEach(() => {
    POSTS = [
      { id: 1, body: 'body 1', title: 'title 1' },
      { id: 2, body: 'body 2', title: 'title 2' },
      { id: 3, body: 'body 3', title: 'title 3' },
    ];

    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', {
      get: of(POSTS),
    });

    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });

    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('getPosts()', () => {
    it('should return expected posts when getposts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));

      postService.getPosts().subscribe({
        next: (post) => {
          setTimeout(() => {
            expect(post.length).toEqual(POSTS.length);
            done();
          }, 200);
        },
        error: () => {
          done.fail;
        },
      });

      //expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    });
  });
});
