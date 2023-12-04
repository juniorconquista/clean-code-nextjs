import * as faker from "@ngneat/falso";
import { AccountModel } from "@/domain/models";

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.randUuid(),
});
