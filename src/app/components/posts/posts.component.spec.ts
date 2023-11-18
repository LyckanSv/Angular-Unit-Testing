import { IPost } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { PostService } from 'src/app/services/Post/post.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post.component';

// class mockPostService {
//   getPost() {
//     return of([])
//   }
//   deletePost(post: IPost) {
//     return of(true);
//   }
// }

describe('Posts', () => {
  let POSTS: IPost[];
  let component: PostsComponent;
  let mockPostService: jasmine.SpyObj<PostService>;
  let fixture: ComponentFixture<PostsComponent>;

  // @Component({
  //   selector: 'app-post',
  //   template: '<div></div>',
  // })
  // class FakePostComponent {
  //   @Input() post?: IPost
  // }

  beforeEach(() => {
    POSTS = [
      { id: 1, body: 'body 1', title: 'title 1' },
      { id: 2, body: 'body 2', title: 'title 2' },
      { id: 3, body: 'body 3', title: 'title 3' },
    ];

    mockPostService = jasmine.createSpyObj<PostService>('PostService', {
      getPosts: of(POSTS),
      deletePost: of(true),
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
      declarations: [PostsComponent, PostComponent],
    });

    // TestBed.configureTestingModule({
    //   providers: [
    //     PostsComponent,
    //     {
    //       provide: PostService,
    //       useClass: mockPostService,
    //     },
    //   ],
    // });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should create exact same number of Post Component with Posts', () => {
    fixture.detectChanges();

    const postComponents = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    expect(postComponents.length).toEqual(POSTS.length);
  });

  it('should check wither exact post is sending to PostComponent', () => {
    fixture.detectChanges();
    const postComponentes = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    for (let i = 0; i < POSTS.length; i++) {
      let postComponentInstances = postComponentes[i]
        .componentInstance as PostComponent;
      expect(postComponentInstances.post?.id).toEqual(POSTS[i].id);
    }
  });

  it('should get posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  it('should create one post child element for each post', () => {
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const postsElement = debugElement.queryAll(By.css('.posts'));
    expect(postsElement.length).toBe(POSTS.length);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(false));
      component.posts = POSTS;
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[0]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post from the posts', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });

    it('should call delete method when post component button is clicked', () => {
      spyOn(component, 'delete');
      mockPostService.getPosts.and.returnValue(of(POSTS));

      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );
      for (let i = 0; i < POSTS.length; i++) {
        const element = POSTS[i];
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', {
            preventDefault: () => {},
            stopPropagation: () => {},
          });

        //postComponentDEs[0].query(By.css('button')).nativeElement.click();

        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });

    it('should call the delete method when the delete event is emitted in Post Component', () => {
      spyOn(component, 'delete');
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < POSTS.length; i++) {
        (postComponentDEs[i].componentInstance as PostComponent).delete.emit(
          POSTS[i]
        );
      }

      expect(component.delete).toHaveBeenCalledWith(POSTS[0]);
    });
  });
});
