export default interface IEndereco {
  id?:number,
  campo_id?:number,
  rua:string,
  numero: string,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string,
  complemento: string
}
