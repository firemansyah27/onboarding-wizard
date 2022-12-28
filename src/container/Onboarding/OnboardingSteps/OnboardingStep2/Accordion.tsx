import React, {
    FunctionComponent,
    useContext,
    useState,
    ReactElement,
} from "react";
import {
    Box,
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import styles from "./Accordion.module.scss";
import BukalapakFullIcon from "../../../../assets/bukalapak-full.png";
import AkulakuFullIcon from "../../../../assets/akulaku-full.png";
import BlibliFullIcon from "../../../../assets/blibli-full.png";
import ElevaniaFullIcon from "../../../../assets/elevania.png";
import JdidFullIcon from "../../../../assets/jdid-full.png";
import LazadaFullIcon from "../../../../assets/lazada-full.png";
import ShopeeFullIcon from "../../../../assets/shopee-full.png";
import TokopediaFullIcon from "../../../../assets/tokopedia-full.png";
import ZaloraFullIcon from "../../../../assets/zalora.png";
import ZilingoFullIcon from "../../../../assets/zilingo.png";
import DealPosFullIcon from "../../../../assets/dealpos-full.png";
import EvermosFullIcon from "../../../../assets/evermos-full.png";
import FacebookFullIcon from "../../../../assets/facebook-full.png";
import InstagramFullIcon from "../../../../assets/instagram-full.png";
import JubelioPosFullIcon from "../../../../assets/jubeliopos-full.png";
import ShopifyFullIcon from "../../../../assets/shopify-full.png";
import TadaFullIcon from "../../../../assets/tada-full.png";
import TiktokFullIcon from "../../../../assets/tiktok-full.png";
import WoocommerceFullIcon from "../../../../assets/woocommerce-full.png";
import Button from "../../../../components/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "../../../../components/Table/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { observer } from "mobx-react";
import StoreContext from "../../../../stores";
import { DeleteOutline } from "@mui/icons-material";
import CustomDialogs from "../../../../components/Dialog/Dialog";
import {
    BukalapakDialogTitle,
    BukalapakDialogContent,
    BukalapakDialogActionContent,
} from "./DialogContents/BukalapakDialogContent";
import {
    ShopeeDialogTitle,
    ShopeeDialogContent,
    ShopeeDialogActionContent,
} from "./DialogContents/ShopeeDialogContent";
import {
    WoocommerceDialogTitle,
    WoocommerceDialogContent,
    WoocommerceDialogActionContent,
} from "./DialogContents/WoocommerceDialogContent";

interface ObjectData {
    [key: string]: any;
}

type DataType = "channel" | "pos" | "webstore";

type Props = {
    data?: ObjectData[];
    type?: DataType;
};

interface MarketplaceType {
    channel_name: string;
    channel_id: number;
    image: string;
    titleElement: ReactElement;
    content: ReactElement;
    actionContent: ReactElement;
}

const Accordion: FunctionComponent<Props> = (props) => {
    const { data, type } = props;
    const [open, setOpen] = useState(false);
    const [channelId, setChannelId] = useState(0);

    const { onboardingStore } = useContext(StoreContext);

    const getlistStore = (channel_id: number) => {
        return onboardingStore.listStore.filter(
            (value) => value.channel_id == channel_id
        );
    };

    const handleOnClickDelete = async (store_id: number) => {
        onboardingStore.startLoading();
        await onboardingStore.deleteSyncStore(store_id);
        onboardingStore.finishedLoading();
    };

    const handleOnCLickConnectButton = (
        event: React.MouseEvent<HTMLButtonElement>,
        channel_id: number
    ) => {
        event.stopPropagation();
        setChannelId(channel_id);
        setOpen(true);
    };

    const handleOnClose = () => {
        setOpen(false);
    };

    const channels: MarketplaceType[] = [
        {
            channel_name: "bukalapak",
            channel_id: 2,
            image: BukalapakFullIcon,
            titleElement: <BukalapakDialogTitle />,
            content: <BukalapakDialogContent />,
            actionContent: (
                <BukalapakDialogActionContent onClose={handleOnClose} />
            ),
        },
        {
            channel_name: "lazada",
            channel_id: 4,
            image: LazadaFullIcon,
            titleElement: <>lazada</>,
            content: <>lazada</>,
            actionContent: <>lazada</>,
        },
        {
            channel_name: "zalora",
            channel_id: 8,
            image: ZaloraFullIcon,
            titleElement: <>zalora</>,
            content: <>zalora</>,
            actionContent: <>zalora</>,
        },
        {
            channel_name: "elevenia",
            channel_id: 16,
            image: ElevaniaFullIcon,
            titleElement: <>elevenia</>,
            content: <>elevenia</>,
            actionContent: <>elevenia</>,
        },
        {
            channel_name: "blibli",
            channel_id: 32,
            image: BlibliFullIcon,
            titleElement: <>blibli</>,
            content: <>blibli</>,
            actionContent: <>blibli</>,
        },
        {
            channel_name: "shopee",
            channel_id: 64,
            image: ShopeeFullIcon,
            titleElement: <ShopeeDialogTitle />,
            content: <ShopeeDialogContent />,
            actionContent: (
                <ShopeeDialogActionContent onClose={handleOnClose} />
            ),
        },
        {
            channel_name: "tokopedia",
            channel_id: 128,
            image: TokopediaFullIcon,
            titleElement: <>tokopedia</>,
            content: <>tokopedia</>,
            actionContent: <>tokopedia</>,
        },
        {
            channel_name: "zilingo",
            channel_id: 2048,
            image: ZilingoFullIcon,
            titleElement: <>zilingo</>,
            content: <>zilingo</>,
            actionContent: <>zilingo</>,
        },
        {
            channel_name: "jdid",
            channel_id: 4096,
            image: JdidFullIcon,
            titleElement: <>jdid</>,
            content: <>jdid</>,
            actionContent: <>jdid</>,
        },
        {
            channel_name: "instagram",
            channel_id: 16385,
            image: InstagramFullIcon,
            titleElement: <>instagram</>,
            content: <>instagram</>,
            actionContent: <>instagram</>,
        },
        {
            channel_name: "facebook",
            channel_id: 16386,
            image: FacebookFullIcon,
            titleElement: <>facebook</>,
            content: <>facebook</>,
            actionContent: <>facebook</>,
        },

        {
            channel_name: "akulaku",
            channel_id: 65536,
            image: AkulakuFullIcon,
            titleElement: <>akulaku</>,
            content: <>akulaku</>,
            actionContent: <>akulaku</>,
        },
        {
            channel_name: "tiktok",
            channel_id: 131076,
            image: TiktokFullIcon,
            titleElement: <>tiktok</>,
            content: <>tiktok</>,
            actionContent: <>tiktok</>,
        },
        {
            channel_name: "tada",
            channel_id: 131077,
            image: TadaFullIcon,
            titleElement: <>tada</>,
            content: <>tada</>,
            actionContent: <>tada</>,
        },
        {
            channel_name: "evermos",
            channel_id: 131078,
            image: EvermosFullIcon,
            titleElement: <>woocommerce</>,
            content: <>woocommerce</>,
            actionContent: <>woocommerce</>,
        },
    ];

    const poss: MarketplaceType[] = [
        {
            channel_name: "dealpos",
            channel_id: 262144,
            image: DealPosFullIcon,
            titleElement: <>dealpos</>,
            content: <>dealpos</>,
            actionContent: <>dealpos</>,
        },
        {
            channel_name: "jubeliopos",
            channel_id: 524288,
            image: JubelioPosFullIcon,
            titleElement: <>jubeliopos</>,
            content: <>jubeliopos</>,
            actionContent: <>jubelio_pos</>,
        },
    ];

    const webstores: MarketplaceType[] = [
        {
            channel_name: "woocommerce",
            channel_id: 131072,
            image: WoocommerceFullIcon,
            titleElement: <WoocommerceDialogTitle />,
            content: <WoocommerceDialogContent onClose={handleOnClose} />,
            actionContent: <WoocommerceDialogActionContent />,
        },
        {
            channel_name: "shopify",
            channel_id: 1048576,
            image: ShopifyFullIcon,
            titleElement: <>shopify</>,
            content: <>shopify</>,
            actionContent: <>shopify</>,
        },
    ];

    const getDialogData = (): MarketplaceType | undefined => {
        switch (type) {
            case "channel":
                return channels.find((value) => value.channel_id === channelId);
            case "pos":
                return poss.find((value) => value.channel_id === channelId);
            case "webstore":
                return webstores.find(
                    (value) => value.channel_id === channelId
                );
            default:
                return undefined;
        }
    };

    const getMarketplacesByType = (): ObjectData => {
        switch (type) {
            case "channel":
                return channels;
            case "pos":
                return poss;
            case "webstore":
                return webstores;
            default:
                return {};
        }
    };

    const marketPlaces = getMarketplacesByType();

    const dialogData = getDialogData();

    return (
        <Box>
            {marketPlaces.map((value: MarketplaceType) => (
                <Box key={value.channel_name}>
                    <MuiAccordion className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: "100%",
                                    maxWidth: 200,
                                }}
                                alt="The house from the offer."
                                src={value.image}
                            />
                            <Button
                                className={styles.connectButton}
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: "none" }}
                                name="Sambungkan"
                                onClick={(event) =>
                                    handleOnCLickConnectButton(
                                        event,
                                        value.channel_id
                                    )
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionDetail}>
                            {getlistStore(value.channel_id).length > 0 && (
                                <Table
                                    fields={[
                                        { name: "Username", width: "35%" },
                                        { name: "Nama Toko", width: "55%" },
                                        { name: "Tindakan", width: "10%" },
                                    ]}
                                    body={
                                        <>
                                            {getlistStore(value.channel_id).map(
                                                (row) => (
                                                    <TableRow
                                                        key={row.channel_id}
                                                        sx={{
                                                            "&:last-child td, &:last-child th":
                                                                {
                                                                    border: 0,
                                                                },
                                                        }}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {row.channel_name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.store_name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DeleteOutline
                                                                color="error"
                                                                sx={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    handleOnClickDelete(
                                                                        row.store_id
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </>
                                    }
                                />
                            )}
                        </AccordionDetails>
                    </MuiAccordion>
                </Box>
            ))}

            <CustomDialogs
                open={open}
                onClose={handleOnClose}
                titleElement={dialogData?.titleElement}
                content={dialogData?.content}
                actionContent={dialogData?.actionContent}
            />
        </Box>
    );
};

Accordion.defaultProps = { data: [], type: "channel" };

export default observer(Accordion);
