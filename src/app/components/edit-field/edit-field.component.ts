import { Component, inject } from '@angular/core';
import { CampoService } from '../../services/Campo/campo.service';
import ICampo from '../../interfaces/ICampo';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import IEndereco from '../../interfaces/IEndereco';
import { CommonModule } from '@angular/common';
import IGrade from '../../interfaces/IGrade';
import IExcecaoHorario from '../../interfaces/IExcecaoHorario';
import IImagem from '../../interfaces/IImagem';


@Component({
  selector: 'app-edit-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-field.component.html',
  styleUrl: './edit-field.component.scss'
})
export class EditFieldComponent {

  private route = inject(ActivatedRoute)
  private service = inject(CampoService);

  public isEditing = false;
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


  public readonly diasSemana: string[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
  ];

  public gradeHorarios: IGrade[] = this.diasSemana.map(dia => ({
    id: 0,
    campo_id: 0,
    dia_semana: dia,
    horario_abertura: '',
    horario_fechamento: ''
  }));


  excecoesHorarios: IExcecaoHorario[] = [];
  excecaoForm: IExcecaoHorario = {
    id: 0,
    campo_id: 0,
    data: '',
    horario_abertura: '',
    horario_fechamento: '',
    descricao: ''
  };

  clearCampo(): void {
    this.campo = {
      descricao: '',
      dimensoes: '',
      iluminacao: true,
      imagem_principal: '',
      imagem_secundaria: '',
      nome: '',
      preco: 0,
      tipo: '',
    };

  }

  saveCampo(): void {
    if (this.campo && this.campo.id && this.campo.id > 0) {
      this.service.updateCampo(this.campo).subscribe((response) => {
        this.campo = response;
      })
    }
    else {
      this.service.createCampo(this.campo).subscribe((response) => {
        this.campo = response;
      })
    }
  }

  deleteCampo(): void {
    this.service.deleteCampo(this.campo.id||0).subscribe(()=>{
      this.newCampo();
    })
  }

  newCampo(): void {
    this.campo = {
      descricao: '',
      dimensoes: '',
      iluminacao: true,
      imagem_principal: '',
      imagem_secundaria: '',
      nome: '',
      preco: 0,
      tipo: '',
      id: 0,
    };
  }

  clearImagem() {
    this.imagem = {
      tipo: '',
      dados: ''
    }
    this.imagemPreview = ''
    const fileInput = document.getElementById('novoArquivo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reseta o valor do campo de arquivo
    }
  }

  newImagem() {
    this.imagem = {
      id: 0,
      tipo: '',
      dados: ''
    }
    this.imagemPreview = '';
    const fileInput = document.getElementById('novoArquivo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reseta o valor do campo de arquivo
    }
  }
  selectImagem(imagem: IImagem) {
    this.imagem = { ...imagem }
    this.imagemPreview = imagem.dados;
  }

  saveImagem() {
    console.log(this.imagem);
    console.log(this.imagemPreview);
    this.imagem.campo_id = this.campo.id;
    if (this.imagem.id && this.imagem.id > 0) {
      this.service.updateImagem(this.imagem).subscribe((response) => {
        this.imagem = response;
        this.getImagem(this.campo.id || 0)
      })

    }
    else {
      this.service.createImagem(this.imagem).subscribe((response) => {
        this.imagem = response;
        this.getImagem(this.campo.id || 0)
      })
    }
  }

  getImagem(idCampo: number): void {
    this.service.getImageByCampo(idCampo).subscribe((response) => {

      this.imagens = [...response];
      console.log(this.imagens)

    })
  }

  deleteImagem(): void {
    if (this.imagem.id && this.imagem.id > 0) {
      this.service.deleteImagem(this.imagem.id).subscribe(() => {
        this.getImagem(this.campo.id || 0);
        this.newImagem();
      })
    }
  }



  onFileChange(event: any) {

    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagemPreview = e.target?.result as string;
        this.imagem.dados = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }

    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (this.imagem.dados) {
    //       this.imagem.dados = reader.result?.toString().split(',')[1]||''
    //       this.imagemPreview = `data:image/jpeg;base64,${this.imagem.dados}`; // Atualiza a pré-visualização
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  clearGradeHorarios() {
    this.gradeHorarios = this.diasSemana.map(dia => ({
      dia_semana: dia,
      horario_abertura: '',
      horario_fechamento: ''
    }));
  }

  clearEndereco() {
    this.endereco = {
      bairro: '',
      cep: '',
      cidade: '',
      complemento: '',
      estado: '',
      numero: '',
      rua: ''
    }
  }

  saveEndereco(): void {
    this.endereco.campo_id = this.campo.id;
    if (this.endereco.campo_id && this.endereco.campo_id > 0 && this.endereco.id && this.endereco.id > 0) {
      this.service.updateEndereco(this.endereco).subscribe((response) => {
        this.endereco = response;
      })
    }
    else {
      this.service.createEndereco(this.endereco).subscribe((response) => {
        this.endereco = response;
      })
    }
  }

  saveGradeHorarios() {
    console.log('Grade de Horários Salva:', this.gradeHorarios);
    // Aqui você pode implementar a chamada para o backend
    this.saveGradeHorario(this.gradeHorarios)
  }


  getCampo(id: number): void {
    this.service.getCampo(id).subscribe((response: ICampo) => {
      this.campo = response;
    });
  }

  getEndereco(idCampo: number): void {
    this.service.getEnderecoByIdCampo(idCampo).subscribe((response: IEndereco) => {
      this.endereco = response;
      console.log(this.endereco);
    });
  }

  getGradeHorario(idCampo: number): void {
    this.service.getGradeHorarioByIdCampo(idCampo).subscribe((response: IGrade[]) => {
      response.forEach(dia => {
        const matchingDay = this.gradeHorarios.find(e => e.dia_semana === dia.dia_semana);
        if (matchingDay) {
          matchingDay.horario_abertura = dia.horario_abertura;
          matchingDay.horario_fechamento = dia.horario_fechamento;
          matchingDay.campo_id = dia.campo_id;
          matchingDay.id = dia.id;
        }
      });
      console.log(this.gradeHorarios);

    });
  }

  saveGradeHorario(grade: IGrade[]): void {
    if (grade) {
      console.log('iniciando processo de salvar grade...')
      this.service.createGrade(this.campo.id || 0, grade).subscribe((response: IGrade[]) => {
        this.gradeHorarios = response;
      });
    }

  }


  // Carregar exceções
  getExcecoes(idCampo: number): void {
    if (idCampo > 0) {
      this.service.getExcecoesHorarioos(idCampo).subscribe((data) => {
        this.excecoesHorarios = data;
      });
    }
  }

  // Salvar exceção
  saveExcecao(): void {
    if (this.isEditing) {
      // Atualizar exceção
      this.service.updateExcecoesHorario(this.excecaoForm).subscribe(() => {
        this.getExcecoes(this.campo.id || 0);
        this.cancelEdit();
      });
    } else {
      // Adicionar exceção
      this.excecaoForm.campo_id = this.campo.id;
      this.service.createExcecoesHorario(this.excecaoForm).subscribe(() => {
        this.getExcecoes(this.campo.id || 0);
        this.cancelEdit();
      });
    }
  }

  // Editar exceção
  editExcecao(excecao: IExcecaoHorario): void {
    this.isEditing = true;
    this.excecaoForm = { ...excecao };
  }

  // Excluir exceção
  deleteExcecao(id: number): void {
    this.service.deleteExcecoesHorario(id).subscribe(() => {
      this.getExcecoes(this.campo.id || 0);
    });
  }

  // Cancelar edição
  cancelEdit(): void {
    this.isEditing = false;
    this.excecaoForm = {
      id: 0,
      campo_id: 0,
      data: '',
      horario_abertura: '',
      horario_fechamento: '',
      descricao: ''
    };
  }

  ngOnInit(): void {
    // Verifica se existe um parâmetro de ID na rota
    this.route.params.subscribe(async params => {
      if (params['id']) {
        const id = +params['id'];
        this.getCampo(id);
        this.getEndereco(id);
        this.getGradeHorario(id);
        this.getExcecoes(id);
        this.getImagem(id);
      }

    })
  };
}
