export default {
    ClientIdentification: {
        CompanyIdNr: { cs: "Identifikační číslo klienta", en: "" },
        LegalFormId: { cs: "Právní forma klienta", en: "" },
        ClientsBusinessName: { cs: "Zkrácený název klienta", en: "" },
        ClientsBusinessNameExtd: { cs: "Název klienta", en: "" },
        PartyPoIdentificatorCountryId: {
            cs: "Stát registrace klienta",
            en: "",
        },
        IdentificatorCountryId: { cs: "Stát identifikátoru", en: "" },
        IdentificatorTypeId: { cs: "Druh průkazu totožnosti klienta", en: "" },
        DateValidFrom: { cs: "Platnost dokladu od", en: "" },
        DateValidTo: { cs: "Platnost dokladu do", en: "" },
        Identificator: { cs: "Číslo průkazu", en: "" },
        OriginAuthority: { cs: "Orgán vydávající průkaz totožnosti", en: "" },
    },
    OtherInformationFo: {
        bpid: { cs: "BPID", en: "" },
        HasAnyRiskActivity: {
            cs: "Vykonává osoba živnost či jiné činnosti?",
            en: "",
        },
        RiskActivityList: { cs: "Vyberte obory činnosti", en: "" },
        FirstName: { cs: "Jméno", en: "" },
        IsPep: { cs: "Je politicky exponovanou osobou (PEP)?", en: "" },
        IsClosePerson: {
            cs: "Je osobou blízkou k některé politicky exponované osobě?",
            en: "",
        },
        ClosePep: {
            ClosePersonGuid: { cs: "Osoba blízká PEP", en: "" },
            ClosePersonId: {
                cs: "Vztah k této politicky exponované osobě",
                en: "",
            },
            //   "PepFunction":
            PepFunctionGuid: { cs: "Funkce PEP", en: "" },
            PoliticalPositionId: {
                cs: "Funkce, kterou PEP vykonává / vykonával?",
                en: "",
            },
            DateOfPositionEnd: {
                cs: "Datum ukončení výkonu této funkce",
                en: "",
            },
            IsDateValidToKnown: {
                cs: "Je známé datum platnosti ukončení funkce?",
                en: "",
            },
            Description: { cs: "Poznámka", en: "" },
        },
        PepFunction: {
            PepFunctionGuid: { cs: "Funkce PEP", en: "" },
            PoliticalPositionId: {
                cs: "Funkce, kterou PEP vykonává / vykonával?",
                en: "",
            },
            DateOfPositionEnd: {
                cs: "Datum ukončení výkonu této funkce",
                en: "",
            },
            IsDateValidToKnown: {
                cs: "Je známé datum platnosti ukončení funkce?",
                en: "",
            },
            Description: { cs: "Poznámka", en: "" },
        },
        LastName: { cs: "Příjmení", en: "" },
        DateOfBirth: { cs: "Datum narození", en: "" },
        ResidentialAddress: {
            DescriptiveNr: { cs: "Číslo popisné", en: "" },
            Street: { cs: "Ulice", en: "" },
            IndicativeNr: { cs: "Číslo orientační", en: "" },
            Zip: { cs: "PSČ", en: "" },
            CountryId: { cs: "Stát", en: "" },
            City: { cs: "Obec", en: "" },
        },
        OtherAddress: {
            DescriptiveNr: { cs: "Číslo popisné", en: "" },
            Street: { cs: "Ulice", en: "" },
            IndicativeNr: { cs: "Číslo orientační", en: "" },
            Zip: { cs: "PSČ", en: "" },
            CountryId: { cs: "Stát", en: "" },
            City: { cs: "Obec", en: "" },
        },
        BirthCountryId: { cs: "Datum narození", en: "" },
        Citizenship: { cs: "Státní občanství", en: "" },
        HasAnotherCitizenship: {
            cs: "Má fyz. osoba další státní občanství?",
            en: "",
        },
        AnotherCitizenshipList: { cs: "Další státní občanství", en: "" },
        PartyFoIdentificators: {
            PartyFoIdentificatorCountryId: {
                cs: "Stát identifikátoru fyz. osoby",
                en: "",
            },
            PartyFoIdentificatorTypeId: {
                cs: "Typ identifikátoru fyz. osoby",
                en: "",
            },
            PersonalNumber: { cs: "Rodné číslo", en: "" },
        },
        IdentificatorCountryId: {
            cs: "Druh průkazu totožnosti klienta",
            en: "",
        },
        IdentificatorTypeId: { cs: "Druh průkazu totožnosti klienta", en: "" },
        DateValidFrom: { cs: "Platnost dokladu od", en: "" },
        DateValidTo: { cs: "Platnost dokladu do", en: "" },
        Identificator: { cs: "Číslo průkazu", en: "" },
        OriginAuthority: {
            cs: "Orgán vydávající průkaz totožnosti klienta",
            en: "",
        },
        PlaceofBirth: { cs: "Místo narození - město", en: "" },
        SexId: { cs: "Pohlaví", en: "" },
        HasAnyForeignCountryResidence: {
            cs:
                "Je evidována další země přihlášení k jinému než trvalému pobytu, a to minimálně po dobu 1 roku v posledních 3 letech?",
            en: "",
        },
        ForeignCountryResidence: { cs: "Další stát pobytu", en: "" },

        HeadquartersAddress: {
            DescriptiveNr: { cs: "Číslo popisné", en: "" },
            Street: { cs: "Ulice", en: "" },
            IndicativeNr: { cs: "Číslo orientační", en: "" },
            Zip: { cs: "PSČ", en: "" },
            CountryId: { cs: "Stát", en: "" },
            City: { cs: "Obec", en: "" },
        },
        ForeignActivities: {
            HasAnyForeignActivity: {
                cs:
                    "Má klient obchodní zastoupení / pobočku / organizační složku / provozovnu v jiném státě?",
                en: "",
            },
            ForeignActivityList: {
                cs:
                    "Stát (mimo Českou republiku), ve kterém existuje pobočka / organizační složka / provozovna žadatele.",
                en: "",
            },
        },
        MailingAddress: {
            DescriptiveNr: { cs: "Číslo popisné", en: "" },
            Street: { cs: "Ulice", en: "" },
            IndicativeNr: { cs: "Číslo orientační", en: "" },
            Zip: { cs: "PSČ", en: "" },
            CountryId: { cs: "Stát", en: "" },
            City: { cs: "Obec", en: "" },
            DeliveryTo: { cs: "Název / K rukám", en: "" },
        },
        ClientEconomicActivity: {
            CnbAnCompanySizeId: { cs: "Vyberte velikost klienta", en: "" },
            BusinessScopeLevels: {
                cs:
                    "Vyberte nejnižší dostupnou úroveň převažující ekonomické činnosti klienta",
                en: "",
            },
            MainBusinessScope: {
                cs:
                    "Vyberte převažující ekonomickou činnost v podnikání žadatele",
                en: "",
            },
            HasAnyRiskActivity: {
                cs: "Vyberte všechny činnosti klienta",
                en: "",
            },
            RiskActivityList: { cs: "Vyberte obory činnosti", en: "" },
            NaceCodeLevels: {
                cs:
                    "CZ-NACE kód převažující ekonomické činnosti v podnikání klienta",
                en: "",
            },
        },
    },
};
