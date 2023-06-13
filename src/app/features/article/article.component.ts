import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article!: Article;
  isDeleting = false;
  userId!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService,
    private readonly userService: UserService
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

    this.userService.currentUser.subscribe((user) => {
      this.userId = user?.id || '';
    });
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.delete(this.article.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
