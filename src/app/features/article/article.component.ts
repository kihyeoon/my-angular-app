import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article!: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const articleIdFromRoute = routeParams.get('id');

    if (articleIdFromRoute) {
      this.articleService.get(articleIdFromRoute).subscribe({
        next: (article) => {
          this.article = article;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
