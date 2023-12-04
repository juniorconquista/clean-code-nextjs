export interface FieldValidation {
  field: string;
  validate: (input: { [key: string]: string }) => Promise<Error | null>;
}
