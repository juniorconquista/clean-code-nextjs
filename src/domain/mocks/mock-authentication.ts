import * as faker from "@ngneat/falso";

import { Authentication } from "@/domain/usecases";
import { mockAccountModel } from "@/domain/mocks";

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.randEmail(),
  password: faker.randPassword(),
});

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();
  params!: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
