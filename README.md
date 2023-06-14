# 1. 프로젝트 소개

<aside>
💡 게시판 웹 서비스

</aside>

## 1-1. Features

- article 관련 기능
  - CRUD (작성, 상세, 수정, 삭제)
  - 아티클 수정시 리스트 자동 최신화
- user 관련 기능
  - 로그인 / 회원가입 / 로그아웃
  - 회원 정보 수정 / 탈퇴
  - 로컬스토리지에 토큰 보유시 자동 로그인
  - 로그인 상태에 따라 헤더 뷰 분기(구조 디렉티브)
  - 로그인 상태 검증 라우팅 가드
  - 아티클 수정, 삭제시 작성자 인증
- 기타
  - api.interceptor로 URL 오리진 관리

## 1-2. **사용 스택**

- 클라이언트
  - Angular
  - ngx-ellipsis: 아티클 리스트 말 줄임표(…)
- 서버
  - json-server

## 1-3. 폴더 구조

```tsx
📦src
 ┣ 📂app
 ┃ ┣ 📂core
 ┃ ┃ ┣ 📂guard
 ┃ ┃ ┃ ┗ 📜auth.guard.ts
 ┃ ┃ ┣ 📂interceptors
 ┃ ┃ ┃ ┗ 📜api.interceptor.ts
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜article.model.ts
 ┃ ┃ ┃ ┣ 📜errors.model.ts
 ┃ ┃ ┃ ┗ 📜user.model.ts
 ┃ ┃ ┗ 📂services
 ┃ ┃ ┃ ┣ 📜article.service.ts
 ┃ ┃ ┃ ┣ 📜token.service.ts
 ┃ ┃ ┃ ┗ 📜user.service.ts
 ┃ ┣ 📂features
 ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┣ 📜article.component.css
 ┃ ┃ ┃ ┣ 📜article.component.html
 ┃ ┃ ┃ ┗ 📜article.component.ts
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜auth.component.css
 ┃ ┃ ┃ ┣ 📜auth.component.html
 ┃ ┃ ┃ ┗ 📜auth.component.ts
 ┃ ┃ ┣ 📂editor
 ┃ ┃ ┃ ┣ 📜editor.component.css
 ┃ ┃ ┃ ┣ 📜editor.component.html
 ┃ ┃ ┃ ┗ 📜editor.component.ts
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜home.component.css
 ┃ ┃ ┃ ┣ 📜home.component.html
 ┃ ┃ ┃ ┗ 📜home.component.ts
 ┃ ┃ ┗ 📂profile
 ┃ ┃ ┃ ┣ 📜profile.component.css
 ┃ ┃ ┃ ┣ 📜profile.component.html
 ┃ ┃ ┃ ┗ 📜profile.component.ts
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📂article-list
 ┃ ┃ ┃ ┣ 📜article-list.component.css
 ┃ ┃ ┃ ┣ 📜article-list.component.html
 ┃ ┃ ┃ ┗ 📜article-list.component.ts
 ┃ ┃ ┗ 📂layout
 ┃ ┃ ┃ ┣ 📜header.component.css
 ┃ ┃ ┃ ┣ 📜header.component.html
 ┃ ┃ ┃ ┗ 📜header.component.ts
 ┃ ┣ 📜app-routing.module.ts
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┗ 📜show-authed.directive.ts
 ┣ 📂assets
 ┃ ┣ 📜.gitkeep
 ┃ ┗ 📜db.json
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜main.ts
 ┗ 📜styles.css
```

- 재사용 가능한 로직: core
- 라우팅 되는 페이지 컴포넌트: features
- 재사용하는 컴포넌트: shared

## 1-4. 화면

# 2. **설치, 실행 방법**

## 2-1. 설치

- 클라이언트

```tsx
$ npm run install
```

- 서버

```tsx
npm install -g json-server
```

## 2-2. 실행

- 클라이언트

```tsx
$ ng serve
```

- 서버

```tsx
$ json-server --watch ./src/assets/db.json
```

# 3. **과제 진행 시 주안점**

## 3-1. 인터셉터로 HTTP 요청 가로채기

각 요청마다 전체 API 주소를 작성하지 않고 오리진을 통합 관리하기 위해서 인터셉터를 사용했습니다.

```tsx
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `http://localhost:3000${req.url}` });
    return next.handle(apiReq);
  }
}
```

```tsx
// app.module.ts
@NgModule({
	...
	providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
```

인터셉터를 정의하고 이를 `providers` 배열에 등록 합니다. 이때 인터셉터는 `HTTP_INTERCEPTORS` 토큰과 함께 멀티 프로바이더로 제공 합니다.

인터셉터는 제공된 순서대로 체인처럼 작동하므로, 여러 인터셉터를 사용할 때는 순서에 주의해야 합니다.

<aside>
💡 **HTTP_INTERCEPTORS 토큰이란?**

Angular의 의존성 주입 시스템에서는 '토큰(token)'이라는 개념을 사용하여 의존성을 식별하고 주입합니다. 즉, 토큰은 의존성을 찾아내고 주입할 수 있도록 하는 식별자 역할을 합니다.

`HTTP_INTERCEPTORS` 토큰은 HTTP 인터셉터를 등록하고 주입하는데 사용되는 토큰입니다. 이 토큰을 사용하여 provide 구문을 작성하면, 해당 토큰에 대응되는 의존성으로 HTTP 인터셉터를 주입할 수 있습니다.

</aside>

## 3-2. **article 수정시 article-list 최신 상태 유지**

```tsx
// article.service.ts

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private _articles = new BehaviorSubject<Article[]>([]);
  public articles = this._articles.asObservable();

  constructor(private http: HttpClient) {
    this.loadArticles();
  }

  loadArticles(): void {
    this.http.get<Article[]>("/articles").subscribe((data) => {
      this._articles.next(data);
    });
  }

  getArticles(): Observable<Article[]> {
    return this.articles;
  }

  get(id: string): Observable<Article> {
    return this.http.get<Article>(`/articles/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/articles/${id}`).pipe(tap(() => this.loadArticles()));
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>("/articles", article).pipe(tap(() => this.loadArticles()));
  }

  update(id: string, article: Partial<Article>): Observable<Article> {
    return this.http.patch<Article>(`/articles/${id}`, article).pipe(tap(() => this.loadArticles()));
  }
}
```

`ArticleService`는 내부적으로 `BehaviorSubject`를 사용하여 `articles` 데이터를 유지하게 됩니다. 이 `BehaviorSubject`는 `Observable`로 변환되어 외부로 노출되며, 이를 구독하는 컴포넌트들은 데이터가 업데이트될 때마다 새로운 데이터를 받게 됩니다.

또한, `delete`, `create`, `update` 메소드에서는 `tap` 연산자를 사용하여 HTTP 요청이 성공하면 `loadArticles` 메소드를 호출하여 `articles` 데이터를 최신 상태로 유지합니다.

⇒ 데이터가 변경될 때마다 자동으로 `articles`가 업데이트되어 반영됩니다.

<aside>
💡 **BehaviorSubject란?**

`Subject`는 Observable과 Observer의 기능을 모두 가지고 있는 특별한 객체로, Observable처럼 데이터를 발행할 수 있고, Observer처럼 데이터를 구독할 수 있습니다.

`BehaviorSubject`는 생성될 때 초기값을 받으며, 이 초기값은 새로운 구독자에게도 전달됩니다. 그리고 `BehaviorSubject`는 항상 가장 최신의 값(마지막으로 발행된 값)을 새로운 구독자에게 전달합니다.

</aside>

## 3-3. 로그인 상태에 따라 헤더 뷰 다르게 보여주기(구조 디렉티브)

![image](https://github.com/kihyeoon/my-angular-app/assets/102677317/e13a2c78-ef20-4f4c-9a19-c52f3765a5e5)
![image](https://github.com/kihyeoon/my-angular-app/assets/102677317/0f493715-f2fc-4042-bb49-f1376787eddf)

```tsx
@Directive({
  selector: "[appShowAuthed]",
})
export class ShowAuthedDirective implements OnInit {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private userService: UserService) {}

  condition = false;
  hasView = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      if ((isAuthenticated && this.condition) || (!isAuthenticated && !this.condition)) {
        if (!this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        }
      } else {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
```

`ngOnInit` 메서드에서 `userService.isAuthenticated`를 구독하고 있습니다. 이 Observable이 새로운 인증 상태를 발행할 때마다, if 문을 통해 해당 상태와 `condition` 속성을 확인합니다.

만약 두 값이 모두 참이거나 모두 거짓이라면(같은 상태를 가지고 있다면), `viewContainer.createEmbeddedView`를 호출하여 템플릿의 뷰를 생성합니다. 그렇지 않다면 `viewContainer.clear()`를 호출하여 뷰를 제거합니다.

`@Input() set appShowAuthed(condition: boolean)`는 `appShowAuthed` 속성에 바인딩된 값으로 `condition`을 설정하는 setter 입니다.

템플릿에선 다음과 같이 사용합니다.

```html
...
<!-- 로그아웃시 렌더링 -->
<ul *appShowAuthed="false">
  <li>
    <a routerLink="/login" routerLinkActive="active"> <button class="fancy-button">로그인</button></a>
  </li>

  <li>
    <a routerLink="/register" routerLinkActive="active">
      <button class="fancy-button">회원가입</button>
    </a>
  </li>
</ul>

<!-- 로그인시 렌더링 -->
<ul *appShowAuthed="true">
  <li>
    <a routerLink="/edit" routerLinkActive="active" class="flex-center link">
      <span class="material-symbols-outlined edit-icon"> edit_square </span>
      글쓰기
    </a>
  </li>
  <li *ngIf="currentUser$ | async as currentUser">
    <a routerLink="/profile" routerLinkActive="active" class="flex-center link"> <span class="material-symbols-outlined profile-icon"> person </span>{{ currentUser.username }} </a>
  </li>
</ul>
```

## 3-4. 로컬스토리지에 토큰 보유시 자동 로그인

토큰 보유시 자동 로그인 기능을 구현하기 위해 `APP_INITIALIZER`를 사용했습니다.

<aside>
💡 `**APP_INITIALIZER`란?**

하나 이상의 초기화 함수를 제공하는 데 사용할 수 있는 DI 토큰입니다.

제공된 함수는 애플리케이션 시작 시 주입되고 앱 초기화 중에 실행됩니다. 이러한 함수 중 하나라도 프로미스 또는 옵저버블을 반환하는 경우, 프로미스가 해결되거나 옵저버블이 완료될 때까지 초기화가 완료되지 않습니다.

</aside>

```tsx
export function initAuth(tokenService: TokenService, userService: UserService) {
  return () => (tokenService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
	...
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [TokenService, UserService],
      multi: true,
    },
		...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- `useFactory`: 토큰에 연결된 값을 생성하는 팩토리 함수를 제공합니다.
- `deps`: 팩토리 함수에 주입할 의존성을 배열로 명시합니다. 의존성들은 팩토리 함수가 호출될 때 인자로 전달됩니다.

`TokenService`로부터 토큰을 가져와서 그 토큰이 있으면 `UserService`의 `getCurrentUser()` 메서드를 호출합니다.

⇒ 앱이 시작될 때 사용자의 인증 상태를 초기화하는 역할을 합니다.

## 3-5. 로그인 상태 검증 라우팅 가드

이미 로그인 된 상태에서 로그인 또는 회원가입 페이지에 접근하지 못하게 하기 위해서, `CanActivate` 가드를 사용했습니다.

<aside>
💡 **`CanActivate`란?**

클래스가 경로를 활성화할 수 있는지 결정하는 가드로 구현할 수 있는 인터페이스입니다. 모든 가드가 참을 반환하면 내비게이션이 계속됩니다. 가드 중 하나라도 거짓을 반환하면 내비게이션이 취소됩니다. 가드 중 하나라도 UrlTree를 반환하면 현재 탐색이 취소되고 가드에서 반환한 UrlTree로 새 탐색이 시작됩니다.

</aside>

```tsx
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    return this.userService.isAuthenticated.pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigateByUrl("/");
          return false;
        }
        return true;
      })
    );
  }
}
```

구현한 가드를 로그인, 회원가인 라우트에 적용합니다.

```tsx
const routes: Routes = [...{ path: "login", component: AuthComponent, canActivate: [AuthGuard] }, { path: "register", component: AuthComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

# 4. 트러블 슈팅

## 헤더 디렉티브가 중복생성되는 이슈

### 문제

![image](https://github.com/kihyeoon/my-angular-app/assets/102677317/312cb0a2-24cc-44aa-97e8-14b3f1d055d1)

- 회원정보를 수정하면 헤더의 ul 요소가 중복생성되는 이슈가 있음.
  - 새로고침하면 하나만 남는다.

### 원인

```tsx
@Directive({
  selector: "[appShowAuthed]",
})
export class ShowAuthedDirective implements OnInit {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private userService: UserService) {}

  condition = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      (isAuthenticated && this.condition) || (!isAuthenticated && !this.condition) ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
```

`ngOnInit` 내부에서 `userService.isAuthenticated`에 대한 구독을 설정하고 있었습니다. Observable이 새로운 값을 emit하면 구독에 제공된 함수가 호출됩니다. 즉, 인증 상태가 변경될 때마다 `userService.isAuthenticated` Observable이 새 값을 emit하고, 이로 인해 구독 함수가 호출되어 새 뷰가 생성되는 것입니다.

<aside>
⚠️ `ngOnInit` 자체는 한 번만 호출되지만, `ngOnInit` 내부에서 설정한 `userService.isAuthenticated`의 구독으로 인해 인증 상태가 변경될 때마다 새로운 뷰가 생성되었습니다.

</aside>

### 해결

1. view가 이미 생성되어 있는지 추적하는 플래그를 사용

   ```tsx
   hasView = false;

   ngOnInit() {
     this.userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
       if (
         (isAuthenticated && this.condition) ||
         (!isAuthenticated && !this.condition)
       ) {
         if (!this.hasView) {
           this.viewContainer.createEmbeddedView(this.templateRef);
           this.hasView = true;
         }
       } else {
         this.viewContainer.clear();
         this.hasView = false;
       }
     });
   }
   ```

   이미 view가 생성되어 있으면 새로운 view를 생성하지 않는 조건문 로직을 추가

2. 이전 뷰를 항상 제거한 후 새 뷰를 생성하는 방식

   ```tsx
   ngOnInit() {
     this.userService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
       this.viewContainer.clear();
       if ((isAuthenticated && this.condition) || (!isAuthenticated && !this.condition)) {
         this.viewContainer.createEmbeddedView(this.templateRef);
       }
     });
   }
   ```

   `userService.isAuthenticated`가 emit하는 모든 값에 대해 `viewContainer.clear()`를 호출하므로 이전에 생성된 뷰가 항상 제거됩니다. 그런 다음 새로운 뷰가 필요한 경우만 `viewContainer.createEmbeddedView(this.templateRef)`를 호출하여 뷰를 생성합니다.

⇒ 코드는 2번이 더 깔끔하지만 새로운 뷰를 계속해서 만들어야 하므로 비효율적일 수 있다고 생각돼서 1번 방법을 선택했습니다.

# 5. 구현하지 못한 **사항**

- 페이지네이션
- article tag
- article list 필터링
- 유효성 검사
