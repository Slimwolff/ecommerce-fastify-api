/** 
 * 🧩 Interface de Produto — Compatível com Google Merchant Schema
 * Gerado automaticamente a partir de product.txt
 * Autor: ChatGPT (GPT-5)
 */

export type Availability =
  | "in_stock"
  | "out_of_stock"
  | "preorder"
  | "backorder";

export type Condition = "new" | "used" | "refurbished";

export type Gender = "male" | "female" | "unisex";

export type AgeGroup = "newborn" | "infant" | "toddler" | "kids" | "adult";

export type SizeType =
  | "regular"
  | "petite"
  | "maternity"
  | "big"
  | "tall"
  | "plus";

export type SizeSystem =
  | "US"
  | "UK"
  | "EU"
  | "DE"
  | "FR"
  | "JP"
  | "CN"
  | "IT"
  | "BR"
  | "MEX"
  | "AU";

export type EnergyEfficiency =
  | "A+++"
  | "A++"
  | "A+"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G";

export interface StructuredText {
  digitalSourceType?: "default" | "trained_algorithmic_media";
  content: string;
}

export interface Installment {
  months: number;
  amount: string; // "199.00 BRL"
  downpayment?: string;
  creditType?: "finance" | "lease";
}

export interface SubscriptionCost {
  period: "month" | "year";
  periodLength: number;
  amount: string;
}

export interface LoyaltyProgram {
  programLabel?: string;
  tierLabel?: string;
  price?: string;
  loyaltyPoints?: number;
  memberPriceEffectiveDate?: string; // ISO 8601 range
  shippingLabel?: string;
}

export interface Certification {
  certificationAuthority: "EC" | "European_Commission";
  certificationName: "EPREL";
  certificationCode: string;
}

export interface ProductDetail {
  sectionName: string;
  attributeName: string;
  attributeValue: string;
}

export interface Shipping {
  country: string; // ISO 3166-1 code
  region?: string;
  postalCode?: string;
  service?: string;
  price?: string;
  minHandlingTime?: number;
  maxHandlingTime?: number;
  minTransitTime?: number;
  maxTransitTime?: number;
}

export interface Product {
  /** 🔹 Identificação Básica */
  id: string;
  title?: string;
  structuredTitle?: StructuredText;

  /** 🔹 Descrição */
  description?: string;
  structuredDescription?: StructuredText;

  /** 🔹 Links */
  link: string;
  mobileLink?: string;
  imageLink: string;
  additionalImageLink?: string[];
  virtualModelLink?: string;

  /** 🔹 Disponibilidade e Preço */
  availability: Availability;
  availabilityDate?: string; // ISO 8601
  costOfGoodsSold?: string; // "23.00 USD"
  expirationDate?: string; // ISO 8601
  price: string;
  salePrice?: string;
  salePriceEffectiveDate?: string; // interval ISO 8601
  unitPricingMeasure?: string; // ex: "1.5 kg"
  unitPricingBaseMeasure?: string; // ex: "100g"

  /** 🔹 Parcelas e Assinaturas */
  installment?: Installment;
  subscriptionCost?: SubscriptionCost;
  loyaltyProgram?: LoyaltyProgram;

  /** 🔹 Política de Preços */
  autoPricingMinPrice?: string;
  maximumRetailPrice?: string;

  /** 🔹 Categorias */
  googleProductCategory?: string;
  productType?: string;

  /** 🔹 Identificadores */
  brand?: string;
  gtin?: string;
  mpn?: string;
  identifierExists?: boolean;

  /** 🔹 Estado e Conteúdo */
  condition?: Condition;
  adult?: boolean;

  /** 🔹 Agrupamentos e Pacotes */
  multipack?: number;
  isBundle?: boolean;

  /** 🔹 Certificações e Eficiência Energética */
  certification?: Certification;
  energyEfficiencyClass?: EnergyEfficiency;
  minEnergyEfficiencyClass?: EnergyEfficiency;
  maxEnergyEfficiencyClass?: EnergyEfficiency;

  /** 🔹 Atributos de Moda e Estilo */
  ageGroup?: AgeGroup;
  color?: string;
  gender?: Gender;
  material?: string;
  pattern?: string;
  size?: string;
  sizeType?: SizeType;
  sizeSystem?: SizeSystem;
  itemGroupId?: string;

  /** 🔹 Dimensões Físicas */
  productLength?: string;
  productWidth?: string;
  productHeight?: string;
  productWeight?: string;

  /** 🔹 Detalhes Técnicos */
  productDetail?: ProductDetail[];
  productHighlight?: string[];

  /** 🔹 Marketing e Publicidade */
  adsRedirect?: string;
  customLabel0?: string;
  customLabel1?: string;
  customLabel2?: string;
  customLabel3?: string;
  customLabel4?: string;
  promotionId?: string;
  lifestyleImageLink?: string;

  /** 🔹 Marketplaces */
  externalSellerId?: string;

  /** 🔹 Controle de Exibição */
  excludedDestination?: string[];
  includedDestination?: string[];
  shoppingAdsExcludedCountry?: string[];
  pause?: string;

  /** 🔹 Frete e Logística */
  shipping?: Shipping[];
  shippingLabel?: string;
  shippingWeight?: string;
  shippingLength?: string;
  shippingWidth?: string;
  shippingHeight?: string;
  shipsFromCountry?: string;
  maxHandlingTime?: number;
  minHandlingTime?: number;
  freeShippingThreshold?: string;
}
