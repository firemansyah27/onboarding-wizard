import React, { FunctionComponent } from "react";
import {
    Box,
    Paper,
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
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

interface ObjectData {
    [key: string]: any;
}

type DataType = "channel" | "pos" | "webstore";

type Props = {
    data?: ObjectData[];
    type?: DataType;
};

const Accordion: FunctionComponent<Props> = (props) => {
    const { data, type } = props;
    const channels = {
        bukalapak: { channel_id: 2, image: BukalapakFullIcon },
        lazada: { channel_id: 4, image: LazadaFullIcon },
        zalora: { channel_id: 8, image: ZaloraFullIcon },
        elevenia: { channel_id: 16, image: ElevaniaFullIcon },
        blibli: { channel_id: 32, image: BlibliFullIcon },
        shopee: { channel_id: 64, image: ShopeeFullIcon },
        tokopedia: { channel_id: 128, image: TokopediaFullIcon },
        zilingo: { channel_id: 2048, image: ZilingoFullIcon },
        jdid: { channel_id: 4096, image: JdidFullIcon },
        instagram: { channel_id: 16385, image: InstagramFullIcon },
        facebook: { channel_id: 16386, image: FacebookFullIcon },

        akulaku: { channel_id: 65536, image: AkulakuFullIcon },
        tiktok: { channel_id: 131076, image: TiktokFullIcon },
        tada: { channel_id: 131077, image: TadaFullIcon },
        evermos: { channel_id: 131078, image: EvermosFullIcon },
    };

    const poss = {
        dealpos: { channel_id: 262144, image: DealPosFullIcon },
        jubelio_pos: { channel_id: 524288, image: JubelioPosFullIcon },
    };

    const webstores = {
        woocommerce: { channel_id: 131072, image: WoocommerceFullIcon },
        shopify: { channel_id: 1048576, image: ShopifyFullIcon },
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

    function createData(name: string, calories: number, fat: number) {
        return { name, calories, fat };
    }

    const rows = [
        createData("Frozen yoghurt", 159, 6.0),
        createData("Ice cream sandwich", 237, 9.0),
        createData("Eclair", 262, 16.0),
        createData("Cupcake", 305, 3.7),
        createData("Gingerbread", 356, 16.0),
    ];
    return (
        <Box>
            {Object.entries(marketPlaces).map(([key, value]) => (
                <Box key={key} sx={{ mb: 2 }}>
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
                                name="sambungkan"
                            />
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionDetail}>
                            <Table
                                fields={["Username", "Nama Toko", "Tindakan"]}
                                body={
                                    <>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
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
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.calories}
                                                </TableCell>
                                                <TableCell>{row.fat}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                }
                            />
                        </AccordionDetails>
                    </MuiAccordion>
                </Box>
            ))}
        </Box>
    );
};

Accordion.defaultProps = { data: [], type: "channel" };

export default Accordion;
