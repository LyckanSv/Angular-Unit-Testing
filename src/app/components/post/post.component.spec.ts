import { IPost } from 'src/app/models/Post';
import { PostComponent } from './post.component';
import { first } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, ModuleWithProviders } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Post Component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostComponent],
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('should render the post title in the anchor element', () => {
    const post: IPost = {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
    };

    comp.post = post;

    fixture.detectChanges();

    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  });

  it('should render the post title in the anchor element for debug', () => {
    const post: IPost = {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
    };

    comp.post = post;

    fixture.detectChanges();

    const postElement: DebugElement = fixture.debugElement;
    const aElement: HTMLElement = postElement.query(By.css('a')).nativeElement;
    expect(aElement.textContent).toContain(post.title);
  });

  // it('should raise and event when the delete post is clicked', () => {
  //   const post: IPost = {
  //     id: 1,
  //     title: 'Title 1',
  //     body: 'Body 1',
  //   };

  //   comp.post = post;

  //   comp.delete.pipe(first()).subscribe((selectedPost) => {
  //     expect(selectedPost).toBe(post);
  //   });

  //   comp.onDeletePost(new MouseEvent('click'));
  // });
});
