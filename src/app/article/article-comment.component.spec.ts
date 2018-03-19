import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ArticleCommentComponent } from './article-comment.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User, UserService, Comment, Profile } from '../shared';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const MOCK_USER: User = {
    email: 'test@test.com',
    token: 'testtoken',
    username: 'test',
    bio: 'test bio',
    image: 'imagetest'
};

const MOCK_PROFILE: Profile = {
    username: 'nottest',
    bio: 'test',
    following: true,
    image: 'image'
};

const MOCK_COMMENT: Comment = {
    author: MOCK_PROFILE,
    id: 12,
    body: 'test comment',
    createdAt: '02/20/2018'
};

class MockUserService {


    constructor() {
    }

    public currentUser = Observable.of(MOCK_USER);
}



describe('ArticleCommentComponent', () => {


    let component: ArticleCommentComponent;
    let fixture: ComponentFixture<ArticleCommentComponent>;
    let userService: UserService;
    let modOptions: DebugElement;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ArticleCommentComponent],
            providers: [{ provide: UserService, useClass: MockUserService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleCommentComponent);
        component = fixture.componentInstance;
        userService = TestBed.get(UserService);



        component.comment = MOCK_COMMENT;
    });

    it('should not be able to modify comment if author is not the current signed in user', fakeAsync(() => {

        component.ngOnInit();

        modOptions = fixture.debugElement.query(By.css('.mod-options'));

        fixture.detectChanges();

        expect(modOptions.nativeElement.hidden).toBeTruthy();
    }));

    it('emit delete comment event when delete button is pressed', fakeAsync(() => {
        spyOn(component.deleteComment, 'emit');
        const deleteButton = fixture.debugElement.nativeElement.querySelector('.ion-trash-a');
        deleteButton.click();
        expect(component.deleteComment.emit).toHaveBeenCalledWith(true);
    }));

});
