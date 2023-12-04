import { string } from "yup";
import { FieldValidation } from "@/validation/protocols";
import { RequiredFieldError } from "@/validation/errors";

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  async validate(input: { [key: string]: string }): Promise<Error | null> {
    try {
      await string().required().validate(input[this.field]);
      return null;
    } catch (error) {
      return new RequiredFieldError();
    }
  }
}
