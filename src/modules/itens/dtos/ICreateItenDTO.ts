export default interface ICreateConstructionsDTO {
  date: Date;
  description: string;
  supplier_id: string;
  payment_type: string;
  self_life_date: Date;
  value: number;
  construction_id: string;
}
