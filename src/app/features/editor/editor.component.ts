import { ArticleService } from 'src/app/core/services/article.service';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) {}

  articleForm: UntypedFormGroup = this.formBuilder.group({
    title: '',
    body: '',
  });

  onSubmit(): void {
    this.isSubmitting = true;

    const formValue = this.articleForm.value;
    formValue.createdAt = new Date().toISOString();

    this.articleService.create(formValue).subscribe({
      next: (article) => {
        console.log(article);
        this.isSubmitting = false;
        this.articleForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }
}
