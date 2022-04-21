export interface SearchOption {
  type: string;
  label: string;
  placeholder: string;
  selectOptions?: string[];
}

export interface SearchCondition {
  inputBoxCondition: string[];
  selectBoxCondition: string[];
}
