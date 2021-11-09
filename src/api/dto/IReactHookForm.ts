import rhf from 'react-hook-form'
export type RegisterOptions = Partial<{
    required: rhf.Message | rhf.ValidationRule<boolean>;
    min: rhf.ValidationRule<number | string>;
    max: rhf.ValidationRule<number | string>;
    maxLength: rhf.ValidationRule<number | string>;
    minLength: rhf.ValidationRule<number | string>;
    pattern: rhf.ValidationRule<RegExp>;
  }>;