import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ICampo from '../../interfaces/ICampo';
import IImagem from '../../interfaces/IImagem';
import IEndereco from '../../interfaces/IEndereco';
import { CampoService } from '../../services/Campo/campo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aluguel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluguel.component.html',
  styleUrl: './aluguel.component.scss'
})
export class AluguelComponent {

  private service = inject(CampoService);
  private route = inject(ActivatedRoute)
  //private route = inject(Router);

  public campo: ICampo = {
    id: 0,
    descricao: '',
    dimensoes: '',
    iluminacao: true,
    imagem_principal: '',
    imagem_secundaria: '',
    imagens: [],
    nome: '',
    preco: 0,
    tipo: '',
  };


  public imagemPreview = '';

  public imagem: IImagem = {
    id: 0,
    campo_id: 0,
    tipo: '',
    dados: ''
  }

  public imagens: IImagem[] = []

  public endereco: IEndereco = {
    id: 0,
    campo_id: 0,
    bairro: '',
    cep: '',
    cidade: '',
    complemento: '',
    estado: '',
    numero: '',
    rua: ''

  };

  selectImagem(imagem: IImagem) {
    this.imagem = { ...imagem }
    this.imagemPreview = imagem.dados;
  }

  getCampo(id:number){
    this.service.getCampo(id).subscribe((response)=>{
      this.campo = response;
      this.imagemPreview = this.campo.imagens?this.campo.imagens[0].dados:''

    })
  }

  ngOnInit(): void {
    // Verifica se existe um parâmetro de ID na rota
    this.route.params.subscribe(async params => {
      if (params['id']) {
        const id = +params['id'];
        this.getCampo(id);
      }

    })
  };

}
