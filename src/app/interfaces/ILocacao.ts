export default interface ILocacao {
    id?:number,
    campo_id:number,
    usuario_id: number,
    horario_inicio: string,
    horario_fim: string,
    data_inicio: string,
    valor_total: number,
    status: string
}
