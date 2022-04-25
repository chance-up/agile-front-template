export interface SearchOption {
  type: string;
  label: string;
  target: string;
  placeholder: string;
  selectOptions?: string[];
}

export interface SearchCondition {
  inputBoxCondition: object[];
  selectBoxCondition: object[];
}
