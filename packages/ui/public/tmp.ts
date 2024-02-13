import { query } from "@synthql/queries"

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
    [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type TypesActivityCategoryEnum = "execution" | "inspection" | "post_processing" | "preparation";

export type TypesActivityProcessEnum20210923121501 = "cable_assembly" | "hand_soldering" | "inspection" | "logistics" | "mechanical_assembly" | "npi" | "other" | "packaging" | "panel_separation" | "potting" | "process_preparation" | "quality_control" | "ruggedizing" | "smt" | "testing" | "tht";

export type TypesApprovalStatusEnum = "approved" | "pending" | "rejected";

export type TypesAssemblyIndustryEnum = "Aero" | "Auto" | "Construction" | "Consumer" | "Defense" | "Industrial" | "Medical" | "Other" | "Rail";

export type TypesCommentCategoryEnum = "internal" | "public";

export type TypesComplianceStatusEnum = "compliant" | "compliant_with_exemption" | "non_compliant" | "not_required" | "unknown";

export type TypesCostedBomColumnEnum = "aggregated_quantity" | "approved_parts" | "consignment" | "currency_exchange_rate" | "customer_part_number" | "description" | "designator" | "excess_material_costs" | "excess_material_quantity" | "factory_quantity" | "internal_part_number" | "last_updated" | "lead_time_days" | "manufacturer" | "manufacturer_free" | "moq" | "mounting" | "mpn" | "mpq" | "notes" | "offer_number" | "on_order" | "one_time_costs" | "origin" | "original_currency" | "original_purchase_price" | "package" | "packaging" | "part_type" | "part_warnings" | "pending_parts" | "pins" | "price_type" | "purchase_price" | "purchase_quantity" | "quantity" | "scrap_quantity" | "solution_warnings" | "sourcing_notes" | "std_factory_lead_time_days" | "stock" | "supplier" | "supplier_number" | "supplier_part_number" | "unit_price" | "unit_price_original_currency" | "validity";

export type TypesCustomerTypeEnum = "customer" | "inactive" | "test" | "trial";

export type TypesCustomPriceTypeEnum = "contract_price" | "list_price";

export type TypesExpenseLevelEnum = "batch" | "project" | "unit";

export type TypesGenericPartTypeEnum = "capacitor" | "resistor";

export type TypesHistoryOperationEnum = "auto_add" | "auto_update" | "manual_add" | "manual_approved" | "manual_remove" | "manual_resolve" | "manual_unresolve" | "manual_update" | "manual_update_approval" | "manual_upload";

export type TypesInternalPartNumberState = "active" | "removed";

export type TypesInvitedByEntityEnum = "customer" | "organization";

export type TypesLifecycleEnum = "acquired" | "active" | "aftermarket" | "end_of_life" | "not_recommended_for_new_designs" | "obsolete" | "pre_release" | "unknown";

export type TypesManufacturingentitystatusEnum = "active" | "inactive";

export type TypesMonitoringFrequencyEnum = "Daily" | "Inactive" | "Monthly" | "Weekly";

export type TypesPackagingV2Enum = "ammo_pack" | "bag" | "bulk" | "carton" | "re_reel" | "reel" | "tape" | "tray" | "tube";

export type TypesPartAlternativeOrigin = "IHS" | "Internal";

export type TypesPartSpecificationTypeEnum = "custom" | "off_the_shelf";

export type TypesPnpFileStateEnum = "Created" | "Parsed" | "Uploaded";

export type TypesPnpSideEnum = "Bottom" | "Top";

export type TypesPriceTypeEnum = "contract_price" | "list_price" | "purchase_price" | "quote_price";

export type TypesQualificationEnum = "aec_q100" | "aec_q100_200" | "aec_q101" | "aec_q102" | "aec_q200" | "dla" | "rad_hard" | "space" | "ul";

export type TypesQuoteRequestStateEnum = "Pending" | "Received";

export type TypesRegionEnum = "Afghanistan" | "Africa" | "AlandIslands" | "Albania" | "Algeria" | "AmericanSamoa" | "Americas" | "Andorra" | "Angola" | "Anguilla" | "Antarctica" | "AntiguaAndBarbuda" | "Argentina" | "Armenia" | "Aruba" | "Asia" | "Australia" | "AustraliaAndNewZealand" | "Austria" | "Azerbaijan" | "Bahamas" | "Bahrain" | "Bangladesh" | "Barbados" | "Belarus" | "Belgium" | "Belize" | "Benin" | "Bermuda" | "Bhutan" | "Bolivia" | "BonaireAndSintEustatiusAndSaba" | "BosniaAndHerzegovina" | "Botswana" | "BouvetIsland" | "Brazil" | "BritishIndianOceanTerritory" | "BritishVirginIslands" | "BruneiDarussalam" | "Bulgaria" | "BurkinaFaso" | "Burundi" | "CaboVerde" | "Cambodia" | "Cameroon" | "Canada" | "Caribbean" | "CaymanIslands" | "CentralAfricanRepublic" | "CentralAmerica" | "CentralAsia" | "Chad" | "ChannelIslands" | "Chile" | "China" | "ChristmasIsland" | "CocosKeelingIslands" | "Colombia" | "Comoros" | "Congo" | "CookIslands" | "CostaRica" | "CoteDIvore" | "Croatia" | "Cuba" | "Curacao" | "Cyprus" | "Czechia" | "DemocraticPeoplesRepublicOfKorea" | "DemocraticRepublicOfTheCongo" | "Denmark" | "Djibouti" | "Dominica" | "DominicanRepublic" | "EasternAfrica" | "EasternAsia" | "EasternEurope" | "Ecuador" | "Egypt" | "ElSalvador" | "EquatorialGuinea" | "Eritrea" | "Estonia" | "Eswatini" | "Ethiopia" | "Europe" | "FalklandIslands" | "FaroeIslands" | "FederatedStatesOfMicronesia" | "Fiji" | "Finland" | "France" | "FrenchGuiana" | "FrenchPolynesia" | "FrenchSouthernTerritories" | "Gabon" | "Gambia" | "Georgia" | "Germany" | "Ghana" | "Gibraltar" | "Greece" | "Greenland" | "Grenada" | "Guadeloupe" | "Guam" | "Guatemala" | "Guernsey" | "Guinea" | "GuineaBissau" | "Guyana" | "Haiti" | "HeardIslandAndMcDonaldIslands" | "HolySee" | "Honduras" | "HongKong" | "Hungary" | "Iceland" | "India" | "Indonesia" | "Iran" | "Iraq" | "Ireland" | "IsleOfMan" | "Israel" | "Italy" | "Jamaica" | "Japan" | "Jersey" | "Jordan" | "Kazakhstan" | "Kenya" | "Kiribati" | "Kuwait" | "Kyrgyzstan" | "LaoPeoplesDemocraticRepublic" | "LatinAmericaAndTheCaribbean" | "Latvia" | "Lebanon" | "Lesotho" | "Liberia" | "Libya" | "Liechtenstein" | "Lithuania" | "Luxembourg" | "Macao" | "Madagascar" | "Malawi" | "Malaysia" | "Maldives" | "Mali" | "Malta" | "MarshallIslands" | "Martinique" | "Mauritania" | "Mauritius" | "Mayotte" | "Melanesia" | "Mexico" | "Micronesia" | "MiddleAfrica" | "Monaco" | "Mongolia" | "Montenegro" | "Montserrat" | "Morocco" | "Mozambique" | "Myanmar" | "Namibia" | "Nauru" | "Nepal" | "Netherlands" | "NewCaledonia" | "NewZealand" | "Nicaragua" | "Niger" | "Nigeria" | "Niue" | "NorfolkIsland" | "NorthernAfrica" | "NorthernAmerica" | "NorthernEurope" | "NorthernMarianaIslands" | "NorthMacedonia" | "Norway" | "Oceania" | "Oman" | "Pakistan" | "Palau" | "Panama" | "PapuaNewGuinea" | "Paraguay" | "Peru" | "Philippines" | "Pitcairn" | "Poland" | "Polynesia" | "Portugal" | "PuertoRico" | "Qatar" | "RepublicOfKorea" | "RepublicOfMoldova" | "Reunion" | "Romania" | "RussianFederation" | "Rwanda" | "SaintBarthelemy" | "SaintHelena" | "SaintKittsAndNevis" | "SaintLucia" | "SaintMartin" | "SaintPierreAndMiquelon" | "SaintVincentAndTheGrenadines" | "Samoa" | "SanMarino" | "SaoTomeAndPrincipe" | "Sark" | "SaudiArabia" | "Senegal" | "Serbia" | "Seychelles" | "SierraLeone" | "Singapore" | "SintMaarten" | "Slovakia" | "Slovenia" | "SolomonIslands" | "Somalia" | "SouthAfrica" | "SouthAmerica" | "SouthEasternAsia" | "SouthernAfrica" | "SouthernAsia" | "SouthernEurope" | "SouthGeorgiaAndTheSouthSandwichIslands" | "SouthSudan" | "Spain" | "SriLanka" | "StateOfPalestine" | "SubSaharanAfrica" | "Sudan" | "Suriname" | "SvalbardAndJanMayenIslands" | "Sweden" | "Switzerland" | "SyrianArabRepublic" | "Taiwan" | "Tajikistan" | "Thailand" | "TimorLeste" | "Togo" | "Tokelau" | "Tonga" | "TrinidadAndTobago" | "Tunisia" | "Turkey" | "Turkmenistan" | "TurksAndCaicosIslands" | "Tuvalu" | "Uganda" | "Ukraine" | "UnitedArabEmirates" | "UnitedKingdomOfGreatBritainAndNorthernIreland" | "UnitedRepublicOfTanzania" | "UnitedStatesMinorOutlyingIslands" | "UnitedStatesOfAmerica" | "UnitedStatesVirginIslands" | "Unknown" | "Uruguay" | "Uzbekistan" | "Vanuatu" | "Venezuela" | "VietNam" | "WallisAndFutunaIslands" | "WesternAfrica" | "WesternAsia" | "WesternEurope" | "WesternSahara" | "World" | "Yemen" | "Zambia" | "Zimbabwe";

export type TypesResourceTypeEnum = "machine" | "person";

export type TypesRfqStatusEnum = "NoOrder" | "NoQuotation" | "OrderConfirmed" | "OrderInProduction" | "OrderPlaced" | "OrderShipped" | "QuotationAvailable" | "QuotationInProgress" | "RequestInDraft";

export type TypesRohsVersionEnum = "rohs_2002_95_ec" | "rohs2_2011_65_eu" | "rohs2_2015_863_eu";

export type TypesSiteTagEnum = "Inventory" | "Manufacturing" | "Sourcing";

export type TypesSourcesApiEnum = "apct" | "arrow" | "avnetabacus" | "avnetebv" | "avnetsilica" | "beta_layout" | "buerklin" | "digikey" | "element14" | "farnell" | "future" | "gudeco" | "ibr_ringler" | "ibrringler" | "mouser" | "myarrow" | "newark" | "nexar" | "octopart" | "orbweaver" | "rutronik" | "safe_pcb" | "schukat" | "sourcengine" | "tme" | "trustedparts" | "weltron" | "wuerth" | "wuertheisos";

export type TypesSupplierTypeEnum = "custom_part_supplier" | "part_supplier" | "pcb_supplier";

export type TypesTemplatestatusEnum = "active" | "inactive";

export type TypesVoteOriginEnum = "ArrowAPI" | "AvnetAPI" | "AvnetUsaAPI" | "BuerklinAPI" | "ChipAssistAPI" | "DescriptionExtraction" | "DigikeyAPI" | "Element14API" | "EveAPI" | "FarnellAPI" | "FutureAPI" | "GudecoAPI" | "HeilindAPI" | "IHSImport" | "Import" | "Manual" | "MasterAPI" | "MouserAPI" | "MyArrowAPI" | "NewarkAPI" | "OctopartAPI" | "OnlineComponentsAPI" | "RsComponentsAPI" | "RutronikAPI" | "SchukatAPI" | "SosAPI" | "SourcengineAPI" | "TiAPI" | "TmeAPI" | "TrustedPartsAPI" | "VenkelAPI" | "WeltronAPI" | "WuerthEisosAPI";

export type TypesWorkflowTypeEnum = "Automatic" | "DontShow" | "Manual";

export interface _DieselSchemaMigrations {
    run_on: Generated<Timestamp>;
    version: string;
}

export interface Activity {
    category: TypesActivityCategoryEnum;
    description: string | null;
    id: Generated<string>;
    internal_number: string | null;
    name: string;
    process: TypesActivityProcessEnum20210923121501;
    resources_details: Json;
    status: Generated<TypesManufacturingentitystatusEnum | null>;
    time_calculation: Json;
    time_calculation_backup230906: Json | null;
}

export interface ActivityConfiguration {
    activity: string;
    id: Generated<string>;
    manual_driver_count_overrides: Generated<Json>;
}

export interface AdditionalService {
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    manufacturing_scenario_template_id: string | null;
    name_de: string;
    name_en: string;
    updated_at: Generated<Timestamp>;
}

export interface ApiIntegration {
    api: TypesSourcesApiEnum;
    content: Json;
    id: Generated<string>;
}

export interface ApiToken {
    api: TypesSourcesApiEnum;
    content: Json;
    holding_id: string | null;
    id: Generated<string>;
    is_locked: Generated<boolean>;
    lock_expires_at: Timestamp | null;
}

export interface AppUser {
    created_at: Generated<Timestamp>;
    customer: string | null;
    email: string;
    external_id: string;
    first_name: string;
    id: Generated<string>;
    invited_by: string | null;
    invited_by_entity: TypesInvitedByEntityEnum | null;
    last_name: string;
    phone_number: string | null;
    photo: string | null;
    position: string | null;
    timezone: Generated<string>;
    updated_at: Generated<Timestamp>;
    user_language: Generated<string>;
}

export interface Assembly {
    assembly_type: Json | null;
    creation_date: Generated<Timestamp>;
    customer: string;
    designator: string;
    id: Generated<string>;
    industry: TypesAssemblyIndustryEnum;
    notes: string | null;
    parent: string | null;
    quantity: Generated<number>;
    rfq: string | null;
}

export interface AssemblyClosures {
    ancestor_id: string;
    descendant_id: string;
    is_parent: Generated<boolean>;
    quantity_in_parent: number | null;
}

export interface AssemblyMonitoring {
    assembly_id: string;
    frequency: Generated<TypesMonitoringFrequencyEnum>;
    interest_compliance: Generated<boolean>;
    interest_lifecycle: Generated<boolean>;
}

export interface AssemblyMonitoringSubscriber {
    app_user: string;
    assembly_id: string;
    host: string | null;
}

export interface AssemblyWideManuallyOverwrittenDriverCount {
    id: Generated<string>;
    manual_driver_count: Json;
    manufacturing_assembly_details: string;
    system_driver: string | null;
    user_driver: string | null;
}

export interface BomFile {
    assembly: string;
    column_map: Json | null;
    creation_date: Generated<Timestamp>;
    id: Generated<string>;
    raw_header: Json;
}

export interface CalculationAssemblyCost {
    calculation_assembly_details: string;
    costs_backup: Json | null;
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    updated_at: Generated<Timestamp>;
}

export interface CalculationAssemblyDetail {
    assembly: string;
    created_at: Generated<Timestamp>;
    created_from_calculation_template: string | null;
    id: Generated<string>;
    include_excess_material_in_material_cost: Generated<boolean>;
    include_project_cost_in_manufacturing_cost: Generated<boolean>;
    last_template_reset_at: Timestamp | null;
    notes: string | null;
    updated_at: Generated<Timestamp>;
}

export interface CalculationCommentsReference {
    calculation_assembly_details: string;
    comment: string;
}

export interface CalculationTemplate {
    additional_cost: Json;
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    include_excess_material_in_material_cost: boolean;
    include_project_cost_in_manufacturing_cost: Generated<boolean>;
    manufacturing_cost: Json;
    material_cost: Json;
    name: string;
    notes: string | null;
    project_cost: Generated<Json>;
    updated_at: Generated<Timestamp>;
}

export interface Comment {
    category: TypesCommentCategoryEnum;
    content: string | null;
    created_at: Generated<Timestamp>;
    created_by: string | null;
    id: Generated<string>;
    resolved_at: Timestamp | null;
    updated_at: Generated<Timestamp>;
}

export interface Consignment {
    design_item: string;
    id: Generated<string>;
}

export interface CostedBomExportTemplate {
    created_at: Generated<Timestamp>;
    description: string | null;
    id: Generated<string>;
    include_summary_sheet: Generated<boolean>;
    included_columns: TypesCostedBomColumnEnum[];
    is_default: Generated<boolean>;
    name: string;
    updated_at: Generated<Timestamp>;
}

export interface Customer {
    billing_address: Json | null;
    billing_address_backup: string | null;
    commercial_register_number: string | null;
    customer_number: string | null;
    default_contact_person: string | null;
    id: Generated<string>;
    language: Generated<string>;
    name: string;
    vat_identification_number: string | null;
}

export interface CustomerPartNumber {
    created_at: Generated<Timestamp>;
    customer: string;
    id: Generated<string>;
    revision: string | null;
    updated_at: Generated<Timestamp>;
    value: string;
}

export interface CustomPart {
    description: string | null;
    id: Generated<string>;
    part_type: Json;
    reach_compliant: TypesComplianceStatusEnum;
    rohs_compliant: TypesComplianceStatusEnum;
}

export interface CustomPartOffer {
    creation_date: Timestamp;
    custom_part: string;
    id: Generated<string>;
    notes: string | null;
    offer_number: string | null;
    offer_url: string | null;
    offer_validity: Json | null;
    one_time_costs: Generated<Json>;
    price_points: Generated<Json>;
    price_type: TypesCustomPriceTypeEnum | null;
    supplier_and_stock_location: string;
    unit_of_measurement: Generated<Json>;
    valid_until: Timestamp | null;
}

export interface CustomPartOfferResult {
    created_at: Generated<Timestamp>;
    custom_part: string;
    id: Generated<string>;
    offer_validity: Json;
    status: Json;
    supplier_and_stock_location: string;
}

export interface DefaultSite {
    site: string;
    tag: TypesSiteTagEnum;
}

export interface DesignItem {
    aggregation_key: string;
    assembly: string;
    creation_date: Generated<Timestamp>;
    design_item_excel_origin_id: string | null;
    designator: string | null;
    do_not_place: Generated<boolean | null>;
    id: Generated<string>;
    manufacturer_free: boolean | null;
    notes: string | null;
    origin: Json;
    part_specification_type: TypesPartSpecificationTypeEnum | null;
    quantity: Json | null;
}

export interface DesignItemExcelOrigin {
    bom_file: string;
    id: Generated<string>;
    original_lines: Json;
}

export interface DesignItemsCommentsReference {
    comment: string;
    design_item: string;
}

export interface Driver {
    details: Json;
    id: Generated<string>;
    is_per_panel: boolean;
    lexorank: string;
    name: string;
    notes: string | null;
    status: Generated<TypesManufacturingentitystatusEnum | null>;
}

export interface Expense {
    category: TypesActivityCategoryEnum;
    cost_components: Json;
    description: string | null;
    id: Generated<string>;
    internal_number: string | null;
    level: TypesExpenseLevelEnum;
    name: string;
    process: TypesActivityProcessEnum20210923121501;
    site: string | null;
    status: Generated<TypesManufacturingentitystatusEnum | null>;
}

export interface ExpenseConfiguration {
    expense: string;
    id: Generated<string>;
    manual_driver_count_overrides: Generated<Json>;
}

export interface FrozenScenarioCost {
    calculation_assembly_details: string;
    created_at: Generated<Timestamp>;
    frozen_cost: Json;
    id: Generated<string>;
}

export interface GenericPart {
    content: Json;
    created_at: Generated<Timestamp | null>;
    id: Generated<string>;
    package_id: string;
}

export interface GenericPartOffTheShelfPartMatches {
    created_at: Generated<Timestamp>;
    generic_part: string;
    id: Generated<string>;
    off_the_shelf_part: string;
    updated_at: Generated<Timestamp>;
}

export interface History {
    created_at: Generated<Timestamp>;
    created_by: string | null;
    data: Json;
    id: Generated<string>;
    operation: TypesHistoryOperationEnum;
}

export interface HistoryAssemblyReference {
    assembly_id: string;
    history_id: string;
}

export interface HistoryDesignItemReference {
    design_item_id: string;
    history_id: string;
}

export interface IncompleteGenericPart {
    capacitance: Numeric | null;
    created_at: Generated<Timestamp>;
    dielectric: Json | null;
    id: Generated<string>;
    package_id: string | null;
    part_type: TypesGenericPartTypeEnum;
    power_rating: Numeric | null;
    resistance: Numeric | null;
    temperature_coefficient: Numeric | null;
    tolerance: Numeric | null;
    voltage_rating: Numeric | null;
}

export interface InternalPartNumber {
    created_at: Generated<Timestamp>;
    edited_form_and_fit: string | null;
    edited_function_specification: Json | null;
    id: string;
    imported_form_and_fit: string | null;
    imported_function_specification: Json | null;
    inferred_form_and_fit: string | null;
    inferred_function_specification: Json | null;
    is_restricted_to_customers: Generated<boolean>;
    last_imported_at: Generated<Timestamp>;
    state: Generated<TypesInternalPartNumberState>;
    updated_at: Generated<Timestamp>;
}

export interface InternalPartNumberPartMatches {
    created_at: Generated<Timestamp>;
    generic_part: string | null;
    id: Generated<string>;
    ipn: string;
    matching_reason: Json;
    off_the_shelf_part: string | null;
    updated_at: Generated<Timestamp>;
}

export interface InternalPartNumberRawSpecification {
    created_at: Generated<Timestamp>;
    description: string | null;
    id: string;
    ipn: string;
    manufacturer: string | null;
    manufacturer_id: string | null;
    mpn: string | null;
    package: string | null;
    type: string | null;
    updated_at: Generated<Timestamp>;
}

export interface InternalPartNumberSpn {
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    ipn: string;
    supplier: string | null;
    supplier_id: string | null;
    supplier_part_number: string;
    updated_at: Generated<Timestamp>;
}

export interface InternalPartNumberSuggestion {
    created_at: Generated<Timestamp>;
    generic_part: string | null;
    id: Generated<string>;
    incomplete_generic_part: Json | null;
    ipn: string;
    matching_reason: Json;
    off_the_shelf_part: string | null;
}

export interface IpnCpnReference {
    cpn: string;
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    ipn: string;
}

export interface MainSupplierContact {
    private_contact: string | null;
    public_contact: string | null;
    supplier_and_stock_location: string;
}

export interface ManufacturerPreference {
    manufacturer_id: string;
    part_category_id: number;
}

export interface ManufacturingAssemblyDetails {
    assembly: string;
    id: Generated<string>;
    notes: string | null;
}

export interface ManufacturingScenario {
    batch_sizes: number[];
    default_panel_factor: number | null;
    id: Generated<string>;
    manufacturing_assembly_details: string;
    name: string;
    notes: string | null;
    ordered_activity_configurations: Generated<string[]>;
    ordered_expense_configurations: Generated<string[]>;
    sourcing_scenario: string | null;
}

export interface ManufacturingScenarioTemplate {
    id: Generated<string>;
    name: string;
    notes: string | null;
    ordered_activities: Generated<string[]>;
    ordered_expenses: Generated<string[]>;
    status: TypesTemplatestatusEnum | null;
}

export interface ManufacturingScenarioTemplateInstance {
    activity_configuration_id: string | null;
    created_at: Generated<Timestamp>;
    expense_configuration_id: string | null;
    id: Generated<string>;
    manufacturing_scenario_id: string;
    manufacturing_scenario_template_id: string | null;
    rank: number;
    rfq_additional_service_id: string | null;
    updated_at: Generated<Timestamp>;
}

export interface OffTheShelfOffer {
    attachment: string | null;
    available_prices: Generated<Json>;
    creation_date: Timestamp;
    customer: string | null;
    id: Generated<string>;
    inventory_site: string | null;
    inventory_unique_key: Generated<string | null>;
    ipn: string | null;
    notes: string | null;
    offer_number: string | null;
    offer_url: string | null;
    origin: Json;
    packaging: TypesPackagingV2Enum | null;
    part: string | null;
    price_type: TypesPriceTypeEnum;
    rfq: string | null;
    supplier_and_stock_location: string | null;
    supplier_part_number: string | null;
    unit_of_measurement: Generated<Json>;
    valid_until: Timestamp | null;
}

export interface OldOffTheShelfOffer {
    attachment: string | null;
    available_prices: Generated<Json>;
    creation_date: Timestamp;
    id: Generated<string>;
    notes: string | null;
    oem: string | null;
    offer_number: string | null;
    offer_url: string | null;
    origin: Json;
    packaging: TypesPackagingV2Enum | null;
    part: string;
    price_type: TypesPriceTypeEnum;
    project: string | null;
    supplier_and_stock_location: string;
    supplier_part_number: string;
    unit_of_measurement: Generated<Json>;
    valid_until: Timestamp | null;
}

export interface OrderHistory {
    assembly_id: string | null;
    batch_cost: Json;
    batch_size: number;
    chosen_lead_time_in_days: number | null;
    created_at: Generated<Timestamp>;
    estimated_lead_time_in_days: number | null;
    id: Generated<string>;
    order_size: number;
    ordered_by_user_id: string | null;
    payment_id: string | null;
    payment_processor: Json | null;
    scenario_combination: Json;
    shipping_details: Json | null;
    updated_at: Generated<Timestamp>;
}

export interface Organization {
    billing_address: string | null;
    client_type: TypesCustomerTypeEnum | null;
    customer_success_manager_email: string | null;
    has_access_to_customer_portal: Generated<boolean>;
    has_customers: Generated<boolean>;
    id: Generated<string>;
    name: string;
    one_row: Generated<boolean>;
}

export interface PartOption {
    approval_status: TypesApprovalStatusEnum;
    created_at: Generated<Timestamp>;
    custom_part_id: string | null;
    design_item_id: string;
    generic_part_id: string | null;
    id: Generated<string>;
    ipn_id: string | null;
    off_the_shelf_part_id: string | null;
    part_origin: Json | null;
}

export interface PartSuggestion {
    created_at: Generated<Timestamp>;
    design_item_id: string;
    generic_part_id: string | null;
    id: Generated<string>;
    incomplete_generic_part_id: string | null;
    ipn_id: string | null;
    off_the_shelf_part_id: string | null;
    part_origin: Json | null;
}

export interface PcbPanelPreferences {
    created_at: Generated<Timestamp>;
    depanelization: Json;
    gap: Json;
    id: Generated<string>;
    max_height: Numeric;
    max_pcbs: number | null;
    max_width: Numeric;
    min_height: Numeric;
    min_width: Numeric;
    name: string;
    padding: Json;
    updated_at: Generated<Timestamp>;
}

export interface PnpFile {
    assembly_id: string;
    column_mapping: Json | null;
    created_at: Generated<Timestamp>;
    file_name: string;
    id: Generated<string>;
    state: Generated<TypesPnpFileStateEnum>;
    updated_at: Generated<Timestamp>;
}

export interface PnpItem {
    design_item: string | null;
    designator: string;
    id: Generated<string>;
    pnp_file: string;
    side: TypesPnpSideEnum | null;
}

export interface PublicApiSupplierMapping {
    api_supplier_name: string;
    comment: string | null;
    stock_location: TypesRegionEnum | null;
    supplier: string;
}

export interface PublicDieselSchemaMigrations {
    run_on: Generated<Timestamp>;
    version: string;
}

export interface PublicHypopgListIndexes {
    am_name: string | null;
    index_name: string | null;
    indexrelid: number | null;
    schema_name: string | null;
    table_name: string | null;
}

export interface PublicManufacturer {
    alternative_names: string[];
    billing_address: string | null;
    created_at: Generated<Timestamp>;
    description: string | null;
    has_online_shopping: boolean | null;
    id: Generated<string>;
    name: string;
    phone_number: string | null;
    updated_at: Generated<Timestamp>;
    website_url: string | null;
}

export interface PublicManufacturingLiteSampleDataEn {
    details: Json | null;
    id: string | null;
    is_per_panel: boolean | null;
    lexorank: string | null;
    name: string | null;
    notes: string | null;
    status: TypesManufacturingentitystatusEnum | null;
}

export interface PublicMounting {
    name: string;
}

export interface PublicOffTheShelfPart {
    id: Generated<string>;
    manufacturer: string;
    mpn: string;
    mpn_aliases: Generated<string[]>;
}

export interface PublicOffTheShelfPartAlternative {
    id: Generated<string>;
    part_a: string;
    part_b: string;
}

export interface PublicOffTheShelfPartAlternativeOrigin {
    alternative: string;
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    origin_data: Json;
    origin_type: TypesPartAlternativeOrigin;
    updated_at: Generated<Timestamp>;
}

export interface PublicOffTheShelfPartSupplierPartNumberReference {
    created_at: Generated<Timestamp>;
    part: string;
    supplier: string;
    supplier_part_number: Generated<string[]>;
    updated_at: Generated<Timestamp>;
}

export interface PublicOffTheShelfPartVote {
    additional_text_for_technical_parameter_extraction: string | null;
    china_rohs_compliant: TypesComplianceStatusEnum | null;
    created_at: Generated<Timestamp>;
    datasheet_url: string | null;
    datasheet_url_set: boolean;
    description: string | null;
    description_set: boolean;
    hts_code: string | null;
    id: Generated<string>;
    image_url: string | null;
    image_url_set: Generated<boolean>;
    last_buy_date: Timestamp | null;
    last_delivery_date: Timestamp | null;
    lifecycle: TypesLifecycleEnum | null;
    lifecycle_yteol: number | null;
    lifecycle_yteol_range: string | null;
    manufacturer_product_url: string | null;
    manufacturer_product_url_set: boolean;
    origin: TypesVoteOriginEnum;
    origin_data: Json | null;
    origin_id: Generated<string>;
    package_id: string | null;
    package_id_set: boolean;
    part: string;
    part_category: number | null;
    part_type: string | null;
    part_type_set: boolean;
    prop65_compliant: TypesComplianceStatusEnum | null;
    qualifications: TypesQualificationEnum[] | null;
    raw_part_category: string[] | null;
    reach_candidate_list_date: Timestamp | null;
    reach_compliant: TypesComplianceStatusEnum | null;
    rohs_compliant: TypesComplianceStatusEnum | null;
    rohs_version: TypesRohsVersionEnum | null;
    technical_properties: Json | null;
    tenant: string;
    updated_at: Generated<Timestamp>;
}

export interface PublicOffTheShelfPartVoteChanges {
    changed_attributes: Json;
    created_at: Generated<Timestamp>;
    id: Generated<string>;
    tenant: string;
    vote: string;
}

export interface PublicOrganizationSettings {
    bom_warnings_configuration_settings: Generated<Json>;
    calculation_template: string | null;
    calculation_without_manufacturing: Generated<boolean>;
    currency_settings: Json | null;
    customer_portal_settings: Generated<Json>;
    default_pcb_panel_preferences: string | null;
    erp_import_status_subscriber_addresses: Generated<string[]>;
    guidance_text: Generated<Json>;
    image_assets: Generated<Json>;
    manufacturing_templates: Generated<string[]>;
    order_confirmation_workflow: Generated<Json>;
    part_alternative_settings: Generated<Json>;
    payment_information_link: string | null;
    payment_information_text: string | null;
    scrap_rules: { formulae: Array<any>, default_formula: any } | null;
    shipping_information_link: string | null;
    shipping_information_text: string | null;
    solution_preferences: Generated<{
        approved_suppliers_and_stock_locations: string[],
        excluded_suppliers_and_stock_locations: string[],
        preferred_suppliers_and_stock_locations: string[],
        approved_inventory_sites: string[],
    }>;
    standard_quotations_lead_time_days: number | null;
    tenant: Generated<string>;
}

export interface PublicPackage {
    aliases: Generated<string[]>;
    id: Generated<string>;
    mounting: string | null;
    name: string | null;
    number_of_pins: number | null;
    tags: Generated<string[]>;
}

export interface PublicPartCategories {
    id: Generated<number>;
    tenant: Generated<string>;
}

export interface PublicPartCategoryClosures {
    ancestor: number;
    depth: number;
    descendant: number;
}

export interface PublicPartCategoryNames {
    is_main: Generated<boolean>;
    name: string;
    part_category: number;
    refinement_for_part_category: number | null;
    tenant: Generated<string>;
}

export interface PublicPgStatStatements {
    blk_read_time: number | null;
    blk_write_time: number | null;
    calls: Int8 | null;
    dbid: number | null;
    local_blks_dirtied: Int8 | null;
    local_blks_hit: Int8 | null;
    local_blks_read: Int8 | null;
    local_blks_written: Int8 | null;
    max_exec_time: number | null;
    max_plan_time: number | null;
    mean_exec_time: number | null;
    mean_plan_time: number | null;
    min_exec_time: number | null;
    min_plan_time: number | null;
    plans: Int8 | null;
    query: string | null;
    queryid: Int8 | null;
    rows: Int8 | null;
    shared_blks_dirtied: Int8 | null;
    shared_blks_hit: Int8 | null;
    shared_blks_read: Int8 | null;
    shared_blks_written: Int8 | null;
    stddev_exec_time: number | null;
    stddev_plan_time: number | null;
    temp_blks_read: Int8 | null;
    temp_blks_written: Int8 | null;
    total_exec_time: number | null;
    total_plan_time: number | null;
    userid: number | null;
    wal_bytes: Numeric | null;
    wal_fpi: Int8 | null;
    wal_records: Int8 | null;
}

export interface PublicPublicOffTheShelfOffer {
    attachment: string | null;
    available_prices: Generated<Json>;
    creation_date: Timestamp;
    id: Generated<string>;
    notes: string | null;
    offer_number: string | null;
    offer_url: string | null;
    origin: Json;
    packaging: TypesPackagingV2Enum | null;
    part: string;
    supplier_and_stock_location: string;
    supplier_part_number: string;
    unit_of_measurement: Generated<Json>;
    valid_until: Timestamp | null;
}

export interface PublicPublicSupplierContacts {
    email: string;
    first_name: string;
    id: Generated<string>;
    last_name: string;
    position: string | null;
    supplier_and_stock_location: string;
    user_language: Generated<string>;
}

export interface PublicSupplier {
    alternative_names: string[];
    id: Generated<string>;
    is_quote_partner: Generated<boolean>;
    name: string;
    supplier_type: Generated<TypesSupplierTypeEnum>;
    tenant: string | null;
}

export interface PublicSupplierAndStockLocation {
    id: Generated<string>;
    stock_location: TypesRegionEnum;
    supplier: string;
    tenant: string | null;
}

export interface PublicSupplierLineCard {
    manufacturer: string;
    supplier_and_stock_location: string;
}

export interface PurchaseOrder {
    approved_at: Timestamp | null;
    billing_address: string;
    created_at: Timestamp | null;
    email_recipient_id: string | null;
    erp_purchase_order_id: Generated<string>;
    expected_delivery_at: Timestamp | null;
    id: Generated<string>;
    notes: string | null;
    rfq_id: string | null;
    sent_at: Timestamp | null;
    shipping_address: string;
    shipping_costs: Json | null;
    sourcing_scenario_id: string | null;
    supplier_and_stock_location_id: string | null;
    supplier_purchase_order_id: string | null;
}

export interface PurchaseOrderLineItem {
    availability: Json | null;
    custom_part_id: string | null;
    expected_unit_price: Json;
    id: Generated<string>;
    off_the_shelf_part_id: string | null;
    packaging: TypesPackagingV2Enum | null;
    purchase_order_id: string;
    quantity: Json;
    received_at: Timestamp | null;
    solution_config_id: string;
    supplier_part_number: string | null;
    total_price: Json;
}

export interface QuoteTracking {
    content: Json;
    creation_date: Timestamp | null;
    due_date: Timestamp | null;
    id: Generated<string>;
    received_date: Timestamp | null;
    rfq: string;
    state: TypesQuoteRequestStateEnum;
    supplier_and_stock_location: string | null;
    supplier_contact: string | null;
}

export interface Refund {
    created_at: Generated<Timestamp>;
    customer_id: string;
    id: Generated<string>;
    payment_id: string;
    payment_processor: Json;
    reason: Json;
    refunded_at: Timestamp | null;
    updated_at: Generated<Timestamp>;
}

export interface Resource {
    cost_per_hour: Json;
    description: string | null;
    id: Generated<string>;
    internal_number: string | null;
    name: string;
    resource_type: TypesResourceTypeEnum;
    site: string | null;
    status: Generated<TypesManufacturingentitystatusEnum | null>;
}

export interface Rfq {
    created_by: string | null;
    creation_date: Generated<Timestamp>;
    currency: Generated<string>;
    customer: string;
    due_date: Timestamp | null;
    ems_internal_number: string | null;
    id: Generated<string>;
    is_archived: Generated<boolean>;
    name: string;
    shipping_tracking_link: string | null;
    status: TypesRfqStatusEnum;
    volume_estimate: Json | null;
    workflow_type: Generated<TypesWorkflowTypeEnum>;
}

export interface RfqAdditionalService {
    additional_service_id: string;
    id: Generated<string>;
    rfq_id: string;
}

export interface RfqCommentsReference {
    comment: string;
    rfq: string;
}

export interface ScenarioCombinationForCalculation {
    batch_sizes: number[];
    id: Generated<string>;
    manufacturing_scenario: string;
    sourcing_scenario: string;
}

export interface ScenarioCost {
    additional_cost: Json;
    batch_size: number;
    calculation_assembly_cost: string;
    id: Generated<string>;
    manufacturing_cost: Json;
    material_cost: Json;
    project_cost: Json;
    scenario_combination_for_calculation: string;
}

export interface SelfSignupSettings {
    colors: Json;
    default_contact_person: string | null;
    id: Generated<string>;
    is_customer_user_management_enabled: boolean;
    is_self_signup_enabled: boolean;
    one_row: Generated<boolean>;
    organization_logo: string | null;
}

export interface ShippingTimeForSupplierAndStockLocation {
    shipping_time_in_days: number;
    supplier_and_stock_location_id: string;
}

export interface Site {
    address: Json | null;
    id: Generated<string>;
    name: string | null;
    notes: string | null;
    site_number: string | null;
    tags: Generated<TypesSiteTagEnum[]>;
}

export interface SolutionConfiguration {
    design_items: string[];
    id: Generated<string>;
    manual_one_time_costs: Json | null;
    manual_scrap_quantity: number | null;
    manual_solution_status: Json | null;
    manual_unit_costs: Json | null;
    manually_selected_solution: Json | null;
    notes: string | null;
    sourcing_scenario: string;
}

export interface SourcingScenario {
    creation_date: Generated<Timestamp>;
    id: Generated<string>;
    name: string;
    rfq: string;
    solution_preference: Json;
}

export interface SourcingScenarioAssemblyQuantities {
    assembly: string;
    quantity: number;
    sourcing_scenario: string;
}

export interface StockLevelAlerts {
    condition: Json;
    creation_date: Generated<Timestamp>;
    id: Generated<string>;
    notes: Generated<string>;
    owner: string | null;
    part: string;
    status: Json;
    supplier_preference: Json;
}

export interface SupplierContacts {
    email: string;
    first_name: string;
    id: Generated<string>;
    last_name: string;
    position: string | null;
    supplier_and_stock_location: string;
    user_language: Generated<string>;
}

export interface SupplierNumbers {
    id: Generated<string>;
    internal_supplier_number: string;
    supplier_and_stock_location: string;
}

export interface TenantSupplierLineCard {
    active: Generated<boolean>;
    created_at: Generated<Timestamp>;
    is_manufacturer_restricted_to_supplier: Generated<boolean | null>;
    last_updated_by: string | null;
    manufacturer: string;
    part_category_restriction: Generated<number[] | null>;
    supplier_and_stock_location: string;
    updated_at: Timestamp | null;
}

export interface UserContributorRfq {
    rfq: string;
    user: string;
}

export interface UserInvite {
    created_at: Generated<Timestamp>;
    customer_id: string | null;
    email: string;
    first_name: string;
    hashed_token: string;
    id: Generated<string>;
    invited_by: string | null;
    last_name: string;
    user_language: string;
}

export interface UserInviteRfqContributor {
    rfq_id: string;
    user_invite_id: string;
}

export interface UserPaymentConfiguration {
    created_at: Generated<Timestamp>;
    payment_processor: Json;
    payment_processor_user_id: string;
    updated_at: Generated<Timestamp>;
    user_id: string;
}

export interface DB {
    __diesel_schema_migrations: _DieselSchemaMigrations;
    activity: Activity;
    activity_configuration: ActivityConfiguration;
    additional_service: AdditionalService;
    api_integration: ApiIntegration;
    api_token: ApiToken;
    app_user: AppUser;
    assembly: Assembly;
    assembly_closures: AssemblyClosures;
    assembly_monitoring: AssemblyMonitoring;
    assembly_monitoring_subscriber: AssemblyMonitoringSubscriber;
    assembly_wide_manually_overwritten_driver_count: AssemblyWideManuallyOverwrittenDriverCount;
    bom_file: BomFile;
    calculation_assembly_cost: CalculationAssemblyCost;
    calculation_assembly_detail: CalculationAssemblyDetail;
    calculation_comments_reference: CalculationCommentsReference;
    calculation_template: CalculationTemplate;
    comment: Comment;
    consignment: Consignment;
    costed_bom_export_template: CostedBomExportTemplate;
    custom_part: CustomPart;
    custom_part_offer: CustomPartOffer;
    custom_part_offer_result: CustomPartOfferResult;
    customer: Customer;
    customer_part_number: CustomerPartNumber;
    default_site: DefaultSite;
    design_item: DesignItem;
    design_item_excel_origin: DesignItemExcelOrigin;
    design_items_comments_reference: DesignItemsCommentsReference;
    driver: Driver;
    expense: Expense;
    expense_configuration: ExpenseConfiguration;
    frozen_scenario_cost: FrozenScenarioCost;
    generic_part: GenericPart;
    generic_part_off_the_shelf_part_matches: GenericPartOffTheShelfPartMatches;
    history: History;
    history_assembly_reference: HistoryAssemblyReference;
    history_design_item_reference: HistoryDesignItemReference;
    incomplete_generic_part: IncompleteGenericPart;
    internal_part_number: InternalPartNumber;
    internal_part_number_part_matches: InternalPartNumberPartMatches;
    internal_part_number_raw_specification: InternalPartNumberRawSpecification;
    internal_part_number_spn: InternalPartNumberSpn;
    internal_part_number_suggestion: InternalPartNumberSuggestion;
    ipn_cpn_reference: IpnCpnReference;
    main_supplier_contact: MainSupplierContact;
    manufacturer_preference: ManufacturerPreference;
    manufacturing_assembly_details: ManufacturingAssemblyDetails;
    manufacturing_scenario: ManufacturingScenario;
    manufacturing_scenario_template: ManufacturingScenarioTemplate;
    manufacturing_scenario_template_instance: ManufacturingScenarioTemplateInstance;
    off_the_shelf_offer: OffTheShelfOffer;
    old_off_the_shelf_offer: OldOffTheShelfOffer;
    order_history: OrderHistory;
    organization: Organization;
    part_option: PartOption;
    part_suggestion: PartSuggestion;
    pcb_panel_preferences: PcbPanelPreferences;
    pnp_file: PnpFile;
    pnp_item: PnpItem;
    "public.__diesel_schema_migrations": PublicDieselSchemaMigrations;
    "public.api_supplier_mapping": PublicApiSupplierMapping;
    "public.hypopg_list_indexes": PublicHypopgListIndexes;
    "public.manufacturer": PublicManufacturer;
    "public.manufacturing-lite-sample-data-en": PublicManufacturingLiteSampleDataEn;
    "public.mounting": PublicMounting;
    "public.off_the_shelf_part": PublicOffTheShelfPart;
    "public.off_the_shelf_part_alternative": PublicOffTheShelfPartAlternative;
    "public.off_the_shelf_part_alternative_origin": PublicOffTheShelfPartAlternativeOrigin;
    "public.off_the_shelf_part_supplier_part_number_reference": PublicOffTheShelfPartSupplierPartNumberReference;
    "public.off_the_shelf_part_vote": PublicOffTheShelfPartVote;
    "public.off_the_shelf_part_vote_changes": PublicOffTheShelfPartVoteChanges;
    "public.organization_settings": PublicOrganizationSettings;
    "public.package": PublicPackage;
    "public.part_categories": PublicPartCategories;
    "public.part_category_closures": PublicPartCategoryClosures;
    "public.part_category_names": PublicPartCategoryNames;
    "public.pg_stat_statements": PublicPgStatStatements;
    "public.public_off_the_shelf_offer": PublicPublicOffTheShelfOffer;
    "public.public_supplier_contacts": PublicPublicSupplierContacts;
    "public.supplier": PublicSupplier;
    "public.supplier_and_stock_location": PublicSupplierAndStockLocation;
    "public.supplier_line_card": PublicSupplierLineCard;
    purchase_order: PurchaseOrder;
    purchase_order_line_item: PurchaseOrderLineItem;
    quote_tracking: QuoteTracking;
    refund: Refund;
    resource: Resource;
    rfq: Rfq;
    rfq_additional_service: RfqAdditionalService;
    rfq_comments_reference: RfqCommentsReference;
    scenario_combination_for_calculation: ScenarioCombinationForCalculation;
    scenario_cost: ScenarioCost;
    self_signup_settings: SelfSignupSettings;
    shipping_time_for_supplier_and_stock_location: ShippingTimeForSupplierAndStockLocation;
    site: Site;
    solution_configuration: SolutionConfiguration;
    sourcing_scenario: SourcingScenario;
    sourcing_scenario_assembly_quantities: SourcingScenarioAssemblyQuantities;
    stock_level_alerts: StockLevelAlerts;
    supplier_contacts: SupplierContacts;
    supplier_numbers: SupplierNumbers;
    tenant_supplier_line_card: TenantSupplierLineCard;
    user_contributor_rfq: UserContributorRfq;
    user_invite: UserInvite;
    user_invite_rfq_contributor: UserInviteRfqContributor;
    user_payment_configuration: UserPaymentConfiguration;

    'information_schema.schemata': {
        schema_name: string;
    },
}

const from = query<DB>().from;

export default from('off_the_shelf_offer')
    .columns(
        'id',
        'price_type',
        'part',
        'packaging',
        'origin'
    )
    .where({price_type:'quote_price'})
    .limit(10)
    .many()