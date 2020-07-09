export default interface ICreateConstructionsDTO {
  construction: string;
  address?: string;
  start_date?: Date;
  cep?: string;
  state?: string;
  city?: string;
  user_id: string;
}
