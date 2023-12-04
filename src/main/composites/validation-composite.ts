import { FieldValidation } from "@/validation/protocols";
import { Validation } from "@/main/protocols";

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  async validate(
    fieldName: string,
    input: { [key: string]: string }
  ): Promise<string> {
    const validators = this.validators.filter((v) => v.field === fieldName);

    for (const validator of validators) {
      const error = await validator.validate(input);
      if (error) {
        return error.message;
      }
    }
    return "";
  }
}
