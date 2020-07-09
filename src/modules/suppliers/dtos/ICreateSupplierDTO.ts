export default interface ICreateSupplierDTO {
  name: string;
  phone: string;
  cnpj?: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  address: string;
  user_id: string;
}
