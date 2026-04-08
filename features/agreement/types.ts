export type AgreementFormValues = {
  additionalTerms: string;
  durationMonths: string;
  landlordName: string;
  monthlyRent: string;
  propertyAddress: string;
  securityDeposit: string;
  startDate: string;
  tenantName: string;
};

export type AgreementFieldName = keyof AgreementFormValues;

export type AgreementFieldErrors = Partial<Record<AgreementFieldName, string>>;

export type AgreementStep = 1 | 2 | 3;

export type AgreementGenerationResult = {
  agreementId: string;
  downloadUrl: string;
  endpoint: string;
  generatedAt: string;
  summary: string[];
  title: string;
  watermark: boolean;
};

export type AgreementPreviewModel = {
  additionalTerms: string;
  durationMonths: string;
  endDate: string;
  landlordName: string;
  monthlyRent: string;
  propertyAddress: string;
  securityDeposit: string;
  startDate: string;
  tenantName: string;
};
