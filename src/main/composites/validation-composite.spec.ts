import * as faker from "@ngneat/falso";
import { ValidationComposite } from "@/main/composites";
import { FieldValidationSpy } from "@/validation/mocks";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  it("Should return error if any validation fails", async () => {
    const fieldName = faker.randDatabaseColumn();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessage = faker.randPhrase();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.randPhrase());

    const error = await sut.validate(fieldName, {
      [fieldName]: faker.randWord(),
    });
    expect(error).toBe(errorMessage);
  });

  it("Should return error if any validation fails", async () => {
    const fieldName = faker.randDatabaseColumn();
    const { sut } = makeSut(fieldName);

    const error = await sut.validate(fieldName, {
      [fieldName]: faker.randWord(),
    });
    expect(error).toBeFalsy();
  });
});
