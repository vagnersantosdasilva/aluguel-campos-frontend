import IEndereco from "./IEndereco";
import IImagem from "./IImagem";

export default interface ICampo {
  id?:number,
  nome:string,
  tipo: string,
  dimensoes: string,
  iluminacao: boolean,
  preco: number,
  endereco?: IEndereco,
  imagem_principal?:string,
  imagem_secundaria?:string,
  imagens?:IImagem[],
  descricao:string
}
