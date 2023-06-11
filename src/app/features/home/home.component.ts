import { ArticleService } from './../../core/services/article.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles!: Observable<Article[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles = this.articleService.getArticles();
  }
}
