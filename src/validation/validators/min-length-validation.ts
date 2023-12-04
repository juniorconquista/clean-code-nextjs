import { string } from "yup";
import { FieldValidation } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  async validate(input: { [key: string]: string }): Promise<Error | null> {
    try {
      await string().min(this.minLength).validate(input[this.field]);
      return null;
    } catch (error) {
      return new InvalidFieldError();
    }
  }
}
