import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { ArticleListComponent } from 'src/app/shared/article-list/article-list.component';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { ApiInterceptor } from 'src/app/core/interceptors/api.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
