export type FieldsUpdateCb<T> = (oldState: T) => T;

export type FieldError<Value> = ValidationError<Value>

export type FieldOnChangeCb<T> = (value: T) => void

export type FieldOnErrorCb<T, S> = (validationErrors: ValidationError<T>[], state: S) => void

export type FieldOnSubmitCb<S> = (state: S) => void

export type RuleType = 'string' | 'number' | 'regexp' | 'email';

export type Validator<T = unknown> = (value: T, rule: FormItemRule<T>) => Promise<string | void | Error>;

export type ValidateTrigger = 'onChange' | 'onFinish'

interface BaseRule {
  required?: boolean
  validateTrigger?: ValidateTrigger[]
  message?: string
  type?: RuleType
}

interface MinRule extends BaseRule {
  type: 'string' | 'number'
  min: number
}

interface MaxRule extends BaseRule {
  type: 'string' | 'number'
  max: number
}

interface PatternRule extends BaseRule {
  type: 'regexp'
  pattern: RegExp;
}

interface RequiredRule extends BaseRule {
  required: boolean;
}

interface CustomValidatorRule<T> extends BaseRule {
  validator: Validator<T>
}

export type FormItemRule<T = unknown> = RequiredRule | MinRule | MaxRule | PatternRule | CustomValidatorRule<T>;

export type ValidationStatus = 'notStarted' | 'validating' | 'success' | 'error'

export type ValidationError<Value = unknown> = {
  rule: FormItemRule<Value>,
  value: Value,
  errorText: string;
}

export type FieldUpdateCb<T> = (oldState: T) => Partial<T>;

export type FieldUpdate<T> = FieldUpdateCb<T> | T
