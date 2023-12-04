export class RequiredFieldError extends Error {
  constructor(message?: string) {
    super(message ?? "Campo obrigatório");
    this.name = "RequiredFieldError";
  }
}
