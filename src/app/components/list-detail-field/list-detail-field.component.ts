import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CampoService } from '../../services/Campo/campo.service';
import ICampo from '../../interfaces/ICampo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-detail-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-detail-field.component.html',
  styleUrl: './list-detail-field.component.scss'
})
export class ListDetailFieldComponent {

  @Input() isAdmin = true;

  private route = inject(Router);
  private service = inject(CampoService);
  public listaCampos: ICampo[] = [];

  alugar(campo:ICampo):void{
    this.route.navigate(['/aluguel',campo.id]);
  }

  ngOnInit() {
    this.service.getCampos().subscribe((response) => {
      this.listaCampos = response.map((campo) => {
        const imagemPrincipal = campo.imagens?.find(imagem => imagem.tipo === 'principal');
        return {
          ...campo,
          imagem_principal: imagemPrincipal?.dados || '', // Atribui vazio se a imagem não for encontrada
        };
      });
    })
    console.log(this.listaCampos);
  }
}
