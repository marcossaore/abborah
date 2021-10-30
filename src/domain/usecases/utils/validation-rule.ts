export interface ValidationRule<T = any> {
  validate: (input: T) => Error
}
