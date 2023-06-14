import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from 'src/app/core/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articles = new BehaviorSubject<Article[]>([]);
  public articles = this._articles.asObservable();

  constructor(private http: HttpClient) {
    this.loadArticles();
  }

  loadArticles(): void {
    this.http.get<Article[]>('/articles').subscribe((data) => {
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
    return this.http
      .delete<void>(`/articles/${id}`)
      .pipe(tap(() => this.loadArticles()));
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<Article>('/articles', article)
      .pipe(tap(() => this.loadArticles()));
  }

  update(id: string, article: Partial<Article>): Observable<Article> {
    return this.http
      .patch<Article>(`/articles/${id}`, article)
      .pipe(tap(() => this.loadArticles()));
  }
}
