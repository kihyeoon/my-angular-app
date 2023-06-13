import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { ArticleListComponent } from 'src/app/shared/article-list/article-list.component';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { ApiInterceptor } from 'src/app/core/interceptors/api.interceptor';
import { HeaderComponent } from 'src/app/shared/layout/header.component';
import { ArticleComponent } from 'src/app/features/article/article.component';
import { ShowAuthedDirective } from 'src/app/show-authed.directive';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { EMPTY } from 'rxjs';
import { ProfileComponent } from 'src/app/features/profile/profile.component';

export function initAuth(tokenService: TokenService, userService: UserService) {
  return () => (tokenService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListComponent,
    EditorComponent,
    HeaderComponent,
    ArticleComponent,
    ShowAuthedDirective,
    AuthComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [TokenService, UserService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
