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
    return this.http.get<Article>(`/articles/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/articles/${id}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>('/articles', article);
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`/articles/${article.id}`, article);
  }
}
