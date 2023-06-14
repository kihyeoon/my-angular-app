import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ArticleComponent } from 'src/app/features/article/article.component';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { ProfileComponent } from 'src/app/features/profile/profile.component';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';

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
  { path: 'login', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'register', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
