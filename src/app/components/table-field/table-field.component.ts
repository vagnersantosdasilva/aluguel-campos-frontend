import { Component, inject } from '@angular/core';
import ICampo from '../../interfaces/ICampo';
import { Router } from '@angular/router';
import { CampoService } from '../../services/Campo/campo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-field.component.html',
  styleUrl: './table-field.component.scss'
})
export class TableFieldComponent {

  private route = inject(Router)
  private service = inject(CampoService);

  public campo: ICampo = {
    id: 0,
    descricao: '',
    dimensoes: '',
    iluminacao: true,
    imagem_principal: '',
    imagem_secundaria: '',
    nome: '',
    preco: 0,
    tipo: '',

  };

  public campos: ICampo[] = [];

  editCampo(campo: ICampo): void {
    //TODO: pegar id do campo e ativar rota para edit-detail/id
    this.route.navigate(['/edit-field', campo.id]);
  }

  newCampo():void{
    this.route.navigate(['/edit-field']);
  }

  deleteCampo(id: number): void {
    if (id && id > 0) {
      this.service.deleteCampo(id).subscribe(() => {
        this.getListCampo();
      })
    }
  }

  getListCampo(): void {
    this.service.getCampos().subscribe((response) => {
      this.campos = [...response];
    })
  }

  ngOnInit(): void {

    this.getListCampo();
  };
}
