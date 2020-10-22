// styles
import "antd/dist/antd.css";

import React, {
    FC,
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useMemo,
} from "react";
import { Dictionary, zipObject, random } from "lodash";
import { Progress, Layout, Button, Modal, Form as AntForm, Image } from "antd";

// hooks
// import useQueryParser from "../hooks/useQueryParser";
import useStepProgress from "../hooks/useStepProgress";
import useStepFilter from "../hooks/useStepFilter";

// custom components
import StepWrapper from "./StepWrapper";
import StepMenu from "./StepMenu";
import { Context } from "./Store";
import steps from "./steps";

// services
import axios from "../services/axiosInstance";
const { Sider, Header, Content, Footer } = Layout;

// temporary
const t = ["posts", "comments", "albums", "photos", "todos", "users", "posts"];

const codeBookNames = [
    "CbCountry",
    "CbProduct",
    "CbLoanProgram",
    "CbCollateralProgram",
    "CbPartyLegalForm",
    "CbTitleAndDegreeBefore",
    "CbTitleAndDegreeAfter",
    "CbNACE",
    "CbCompanySize",
    "CbAccountingType",
    "CbMarketConcurencyPosition",
    "CbCoreBusinessChangeTimeHorizon",
    "CbMainTypeAcquiredAssetLoan",
    "CbOutageEliminationCountry",
    "CbPartyCustomer",
    "CbGoal",
    "CbDistrict",
    "CbProjectExpenditureCategory",
    "CbPartnerBankLoanType",
    "CbPartnerBankLoanInterestRateType",
    "CbCurrency",
    "CbPartnerBankLoanRepaymentMode",
    "CbPartnerBankIdentification",
    "CbOtherProjectFinancingMainSource",
    "CbPartyBankCode",
    "CbAddressType",
    "CbSpecificSupportedActivity",
    "CbSex",
    "CbRepresentativeIndividual",
    "CbIdentificationDocumentType",
    "CbPepFunction",
    "CbClosePersonPepRelationship",
    "CbPublicStatusCategory",
    "CbResponsiblePersonCompanyManagmentLength",
    "CbCompanyExecutive",
    "CbPartyGroupPerson",
    "CbBusinessActivity",
    "CbFieldOfActivity",
    "CbInfinPriorityFulfillDescription",
    "CbProjectCriteriaFulfillEfficientEnergyManagementDescription",
    "CbReceivedSupport36MonthsBeforeApplicantIdentification",
    "CbProjectInnovationStrategy",
    "CbPerson",
    "CbPartyRelationType",
    "CbRiskActivityPo",
    "CbRiskActivityFo",
    "CbRiskActivityFop",
    "CbAssetsOrigin",
];
interface IBasicCodeBook {
    Value: string;
    Description: string;
    IdRef: number;
    Id: string;
}

const ProgressOverlay: FC<{
    codeBookMap: Dictionary<IBasicCodeBook | null>;
    setCodeBookMap: Dispatch<SetStateAction<Dictionary<IBasicCodeBook | null>>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    formError: string | null;
    setFormError: Dispatch<SetStateAction<string | null>>;
}> = (props) => {
    const {
        codeBookMap,
        setCodeBookMap,
        setLoading,
        formError,
        setFormError,
    } = props;

    const progress = useMemo(() => {
        const loadedCount = Object.values(codeBookMap).reduce(
            (pv, cv) => (cv !== null ? pv + 1 : pv),
            0
        );

        return Math.floor(
            (loadedCount / Object.keys(codeBookMap).length) * 100
        );
    }, [codeBookMap]);

    // load codebooks (promise array + edit mode)
    useEffect(() => {
        const promiseArray = [
            ...codeBookNames.map((name) =>
                axios
                    .get(
                        `https://jsonplaceholder.typicode.com/${
                            t[random(0, t.length - 1)]
                        }`
                    )
                    .then(({ data }) => {
                        setCodeBookMap((pv) => ({
                            ...pv,
                            [name]: data,
                        }));
                    })
            ),
            // TODO: edit mode (load form)
        ];

        Promise.all(promiseArray)
            .then(() => setTimeout(setLoading, 1000, false))
            .catch(({ message, config: { url } }) => {
                // set form error
                setFormError(message);

                Modal.error({
                    title: "Error appeared while loading form resources",
                    content: `${url}\n${message}`,
                    // TODO: handle error message`
                    onOk: () => {},
                });
            });
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Progress
                type="circle"
                status={formError ? "exception" : undefined}
                percent={progress}
            />
        </div>
    );
};

const StepButtons: FC<{
    progress: number;
    availableSteps: string[];
}> = (props) => {
    const { progress, availableSteps } = props;
    const { step, setStoreState = () => {} } = useContext(Context);

    const availableStepIndexes = useMemo(
        () =>
            steps
                .map((step, index) =>
                    availableSteps.includes(step.key) ? index : null
                )
                .filter((_) => _ !== null) as number[],
        [availableSteps]
    );

    const [previousStep, nextStep] = useMemo(() => {
        const currentIndex = availableStepIndexes.indexOf(step);
        return [
            !currentIndex ? null : availableStepIndexes[currentIndex - 1],
            currentIndex === availableStepIndexes.length - 1
                ? null
                : availableStepIndexes[currentIndex + 1],
        ];
    }, [step, availableStepIndexes]);

    return (
        <>
            <Button
                disabled={previousStep === null}
                onClick={() => {
                    if (previousStep === null) return;
                    setStoreState((pv) => ({
                        ...pv,
                        step: previousStep,
                    }));
                }}
            >
                Previous
            </Button>
            <Button
                disabled={progress < 100 || nextStep === null}
                onClick={() => {
                    console.log(nextStep);
                    if (nextStep === null) return;
                    setStoreState((pv) => ({
                        ...pv,
                        step: nextStep,
                    }));
                }}
            >
                Next
            </Button>
        </>
    );
};

const Form: FC = () => {
    const [codeBookMap, setCodeBookMap] = useState<
        Dictionary<IBasicCodeBook | null>
    >(zipObject<null>(codeBookNames, Array(codeBookNames.length).fill(null)));

    const [loading, setLoading] = useState(true);

    const [formError, setFormError] = useState<string | null>(null);

    const progress = useStepProgress();
    const availableSteps = useStepFilter();

    const { step } = useContext(Context);
    // const { partyId } = useCustomQuery();
    return (
        <>
            {loading && (
                <ProgressOverlay
                    setFormError={setFormError}
                    formError={formError}
                    codeBookMap={codeBookMap}
                    setCodeBookMap={setCodeBookMap}
                    setLoading={setLoading}
                />
            )}
            {!loading && (
                <Layout>
                    <Sider
                        theme="light"
                        style={{
                            padding: "20px",
                            borderRight: "1px solid #ddd",
                        }}
                        width={250}
                    >
                        <StepMenu
                            progress={progress}
                            availableSteps={availableSteps}
                        />
                    </Sider>

                    <Layout
                        style={{
                            backgroundColor: "white",
                        }}
                    >
                        <Header
                            style={{
                                backgroundColor: "white",
                                borderBottom: "1px solid #ddd",
                                fontSize: 20,
                                fontWeight: "bold",
                                padding: "0px 20px",
                            }}
                        >
                            {steps[step].key}
                        </Header>
                        <Content
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                                backgroundColor: "white",
                                overflowY: "auto",
                            }}
                        >
                            <AntForm
                                layout="vertical"
                                style={{
                                    padding: "10px 20px",
                                }}
                            >
                                <StepWrapper />
                            </AntForm>
                            <Footer
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    backgroundColor: "white",
                                }}
                            >
                                <StepButtons
                                    progress={progress}
                                    availableSteps={availableSteps}
                                />
                            </Footer>
                        </Content>
                    </Layout>
                </Layout>
            )}
        </>
    );
};

export default Form;
