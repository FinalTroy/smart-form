import ClientIdentification from "./stepComponents/ClientIdentification";
import ForeignActivities from "./stepComponents/ForeignActivities";
import OtherInformationFo from "./stepComponents/OtherInfomationFo";
import ClientEconomicActivity from "./stepComponents/ClientEconomicActivity";

export interface IStep {
    key: string;
    component: React.ComponentType;
    visibleTo: number[];
}

// IdRef - but will urge BE to change to values ("FO", "PO", "FOP")
export enum PersonType {
    FOP = 1,
    PO = 2,
    FO = 3,
}

const { FO, FOP, PO } = PersonType;

export default [
    {
        key: "ClientIdentification",
        component: ClientIdentification,
        visibleTo: [FOP, PO, FO],
    },
    {
        key: "ForeignActivities",
        component: ForeignActivities,
        visibleTo: [FOP, PO],
    },
    {
        key: "OtherInformationFo",
        component: OtherInformationFo,
        visibleTo: [FO],
    },
    {
        key: "HeadquartersAddress",
        component: null,
        visibleTo: [FOP, PO],
    },
    {
        key: "MailingAddress",
        component: null,
        visibleTo: [FOP, PO, FO],
    },
    {
        key: "ClientEconomicActivity",
        component: ClientEconomicActivity,
        visibleTo: [FOP, PO],
    },
    {
        key: "SupplierRelationships",
        component: null,
        visibleTo: [FOP, PO],
    },
    {
        key: "CustomerRelationships",
        component: null,
        visibleTo: [FOP, PO],
    },
    {
        key: "OtherRelationships",
        component: null,
        visibleTo: [FOP, PO, FO],
    },
    {
        key: "AssetsOrigins",
        component: null,
        visibleTo: [FOP, PO, FO],
    },
    {
        key: "ControlStructure",
        component: null,
        visibleTo: [PO],
    },
    {
        key: "OwnershipStructure",
        component: null,
        visibleTo: [PO, FOP],
    },
    {
        key: "BeneficialOwners",
        component: null,
        visibleTo: [FOP, PO],
    },
    {
        key: "RealBeneficiariesOfTheTrade",
        component: null,
        visibleTo: [FOP, PO, FO],
    },
    {
        key: "ClientRepresentatives",
        component: null,
        visibleTo: [FOP, FO],
    },
    {
        key: "OtherInformation",
        component: null,
        visibleTo: [FOP, PO, FO],
    },
] as IStep[];
