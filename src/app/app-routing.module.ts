import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from 'src/app/features/article/article.component';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { ProfileComponent } from 'src/app/features/profile/profile.component';

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
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
