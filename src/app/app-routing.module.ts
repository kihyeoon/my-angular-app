import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from 'src/app/features/editor/editor.component';
import { HomeComponent } from 'src/app/features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', component: EditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
