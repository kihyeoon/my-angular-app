import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from 'src/app/features/article/article.component';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { HomeComponent } from 'src/app/features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'edit',
    children: [
      { path: '', component: EditorComponent },
      { path: ':id', component: EditorComponent },
    ],
  },
  { path: 'article/:id', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
