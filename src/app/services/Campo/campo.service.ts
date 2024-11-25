import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICampo from '../../interfaces/ICampo';
import IEndereco from '../../interfaces/IEndereco';
import IGrade from '../../interfaces/IGrade';
import IExcecoesHorario from '../../interfaces/IExcecaoHorario';
import IImagem from '../../interfaces/IImagem';

@Injectable({
  providedIn: 'root'
})
export class CampoService {

  // Usando inject para injetar dependências
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:5000/campo';


  constructor() { }

  // Método para buscar todos os campos
  getCampos(): Observable<ICampo[]> {
    return this.http.get<ICampo[]>(this.API);
  }

  getCampo(id:number):Observable<ICampo>{
    return this.http.get<ICampo>(`${this.API}/${id}`);
  }

  getEnderecoByIdCampo(idCampo:number):Observable<IEndereco>{
    return this.http.get<IEndereco>(`${this.API}/${idCampo}/endereco`);
  }

  getImageByCampo(idCampo:number):Observable<IImagem[]>{
    return this.http.get<IImagem[]>(`${this.API}/${idCampo}/imagem`);
  }

  getGradeHorarioByIdCampo(idCampo:number):Observable<IGrade[]>{
    return this.http.get<IGrade[]>(`${this.API}/${idCampo}/grade`);
  }

  createCampo(campo:ICampo):Observable<ICampo> {
    return this.http.post<ICampo>(this.API,campo);
  }

  updateCampo(campo:ICampo):Observable<ICampo>{
    return this.http.put<ICampo>(`${this.API}/${campo.id}`,campo);
  }

  deleteCampo(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  createImagem(imagem:IImagem):Observable<IImagem>{
    return this.http.post<IImagem>(`${this.API}/${imagem.campo_id}/imagem`,imagem);
  }

  updateImagem(imagem:IImagem):Observable<IImagem>{
    return this.http.put<IImagem>(`${this.API}/${imagem.campo_id}/imagem/${imagem.id}`,imagem);
  }

  deleteImagem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/imagem/${id}`);
  }

  createEndereco(endereco:IEndereco):Observable<IEndereco> {
    return this.http.post<IEndereco>(`${this.API}/${endereco.campo_id}/endereco`,endereco);
  }

  updateEndereco(endereco:IEndereco):Observable<IEndereco> {
    return this.http.put<IEndereco>(`${this.API}/${endereco.campo_id}/endereco/${endereco.id}`,endereco);
  }

  createGrade(idCampo:number, grade:IGrade[]):Observable<IGrade[]>{
    return this.http.post<IGrade[]>(`${this.API}/${idCampo}/grade`,grade);
  }

  updateGrade(grade:IGrade):Observable<IGrade>{
    return this.http.put<IGrade>(`${this.API}/${grade.campo_id}/grade/${grade.id}`,grade);
  }

  // Obter todas as exceções
  getExcecoesHorarioos(idCampo:number): Observable<IExcecoesHorario[]> {
    return this.http.get<IExcecoesHorario[]>(`${this.API}/${idCampo}/excecoes`);
  }

  // Criar uma exceção
  createExcecoesHorario(excecao: IExcecoesHorario): Observable<IExcecoesHorario> {
    return this.http.post<IExcecoesHorario>(`${this.API}/excecoes`, excecao);
  }

  // Atualizar uma exceção
  updateExcecoesHorario(excecao: IExcecoesHorario): Observable<IExcecoesHorario> {
    return this.http.put<IExcecoesHorario>(`${this.API}/excecoes/${excecao.id}`, excecao);
  }

  // Excluir uma exceção
  deleteExcecoesHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/excecoes/${id}`);
  }
}
