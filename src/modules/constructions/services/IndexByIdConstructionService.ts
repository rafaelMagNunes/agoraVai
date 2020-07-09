import { injectable, inject } from "tsyringe";
import { isWithinRange, isEqual } from "date-fns";

import Construction from "@modules/constructions/infra/typeorm/entities/Construction";
import IConstructionsRepository from "@modules/constructions/repositories/IConstructionsRepository";

interface IRequest {
  details: string;
  id: string;
  start_date?: string;
  end_date?: string;
}

@injectable()
class IndexByIdConstructionService {
  constructor(
    @inject("ConstructionsRepository")
    private constructionsRepository: IConstructionsRepository
  ) {}

  public async execute({
    details,
    id,
    start_date,
    end_date,
  }: IRequest): Promise<Construction | undefined> {
    const constructions = await this.constructionsRepository.findById(
      details,
      id
    );

    if (start_date && end_date) {
      if (isEqual(start_date, end_date)) {
        return constructions || undefined;
      }

      const filteredItens = constructions?.iten.filter(
        (i) => isWithinRange(i.date, start_date, end_date) !== false
      );

      return constructions || undefined;
    }

    return constructions || undefined;
  }
}

export default IndexByIdConstructionService;
