import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';

interface ArticleForm {
  title: FormControl<string>;
  body: FormControl<string>;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  articleForm: UntypedFormGroup = new FormGroup<ArticleForm>({
    title: new FormControl('', { nonNullable: true }),
    body: new FormControl('', { nonNullable: true }),
  });
}
