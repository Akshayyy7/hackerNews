import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { newsComponent } from './news.component';

describe('newsComponent', () => {
  let component: newsComponent;
  let fixture: ComponentFixture<newsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ newsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(newsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
