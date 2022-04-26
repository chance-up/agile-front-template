export interface SearchOption {
  type: string;
  label: string;
  target?: string;
  placeholder: string;
  selectOptions?: SelectOptionType[];
}

interface SelectOptionType {
  label: string;
  value: string;
}

export interface SearchCondition {
  inputBoxCondition: ConditionType;
  selectBoxCondition: ConditionType;
}

interface ConditionType {
  [key: string]: string;
}
