import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/Post/post.service';
import { CommonModule, Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/app/models/Post';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('PostDetailComponent', () => {
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockLocation: jasmine.SpyObj<Location>;

  let POSTS: IPost[];

  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(() => {
    let mockActivatedRouteObj = {
      snapshot: {
        paramMap: {
          get: () => {
            return '1';
          },
        },
      },
    };

    let mockPostServiceObj = jasmine.createSpyObj<PostService>('PostService', {
      getPosts: of(POSTS),
      getPost: of({
        id: 1,
        title: 'Title 1',
        body: 'Body 1',
      } as IPost),
      deletePost: of(true),
      updatePost: of(true),
    });

    let mockLocationObj = jasmine.createSpyObj<Location>('Location', {
      back: undefined,
    });

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRouteObj,
        },
        {
          provide: PostService,
          useValue: mockPostServiceObj,
        },
        {
          provide: Location,
          useValue: mockLocationObj,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;

    mockActivatedRoute = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;

    mockPostService = TestBed.inject(
      PostService
    ) as jasmine.SpyObj<PostService>;

    mockLocation = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(
      of({
        id: 2,
        title: 'Title 2',
        body: 'Body 2',
      } as IPost)
    );

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('h2'))
      .nativeElement as HTMLElement;
    expect(element.textContent).toBe('Title 2');
  });
});
