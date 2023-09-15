export interface PassedSchema {
  code: string;
  libraries?: string;
  source: "tree" | "code" | "outside";
  passGraphValidation?: boolean;
}
