import { FieldValidation } from "@/validation/protocols";

export class FieldValidationSpy implements FieldValidation {
  error: Error = null as unknown as Error;

  constructor(readonly field: string) {}

  async validate(_input: object): Promise<Error> {
    return new Promise((resolve) => resolve(this.error));
  }
}
