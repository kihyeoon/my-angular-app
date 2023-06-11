import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('/articles');
  }

  get(id: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`/articles/${id}`)
      .pipe(map((data) => data.article));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/articles/${id}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>('/articles', article)
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.id}`, article)
      .pipe(map((data) => data.article));
  }

  // 현재 시간을 리턴하는 함수
  getCurrentTime(): Observable<number> {
    return this.http
      .get<{ time: number }>('/time')
      .pipe(map((data) => data.time));
  }
}
