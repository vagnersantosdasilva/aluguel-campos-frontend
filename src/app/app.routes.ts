import { Routes } from '@angular/router';
import { ListDetailFieldComponent } from './components/list-detail-field/list-detail-field.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { TableFieldComponent } from './components/table-field/table-field.component';
import { AluguelComponent } from './components/aluguel/aluguel.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
  { path: 'list-detail', component: ListDetailFieldComponent },
  { path: '', component: ListDetailFieldComponent },
  { path: 'edit-field', component: EditFieldComponent },
  { path: 'edit-field/:id', component: EditFieldComponent },
  { path: 'table-field', component: TableFieldComponent },
  { path: 'aluguel/:id', component:AluguelComponent},
  { path:'login',component:LoginComponent},
  {path: 'cadastro', component:CadastroComponent}
];
