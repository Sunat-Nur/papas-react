import React, {useEffect, useState} from "react";
import "../../../css/order.css"
import {Box, Container, Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {TargetArticles} from "./targetArticles";
import {CommunityChats} from "./communityChats";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {BoArticle, SearchArticlesObj} from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";

/** Redux*/
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {Dispatch} from "@reduxjs/toolkit";
import {setTargetBoArticles} from "./slice";
import {retrieveTargetBoArticles} from "./selector"


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTargetBoArticles: (data: BoArticle[]) =>
        dispatch(setTargetBoArticles(data)),
});

/** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
    retrieveTargetBoArticles,
    (targetBoArticles) => ({
        targetBoArticles,
    })
);

export function CommunityPage(props: any) {
    /** Initializations **/
    const {setTargetBoArticles} = actionDispatch(useDispatch())
    const {targetBoArticles} = useSelector(targetBoArticlesRetriever);


    const [value, setValue] = React.useState("1");
    const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>({
        bo_id: "all",
        page: 1,
        limit: 5
    });

    useEffect(() => {
        const communityService = new CommunityApiService();
        communityService
            .getTargetArticles(searchArticlesObj)
            .then((data) => setTargetBoArticles(data))
            .catch((err) => console.log(err));
    }, [searchArticlesObj]);


    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        searchArticlesObj.page = 1;
        switch (newValue) {
            case "1":
                searchArticlesObj.bo_id = "all";
                break;
            case "2":
                searchArticlesObj.bo_id = "celebrity";
                break;
            case "3":
                searchArticlesObj.bo_id = "evaluation";
                break;
            case "4":
                searchArticlesObj.bo_id = "story";
                break;
        }
        setSearchArticlesObj({...searchArticlesObj});
        setValue(newValue);
    };


    const handlePaginationChange = (event: any, value: number) => {
        // @ts-ignore
        setSearchArticlesObj.page = value;
        setSearchArticlesObj({...searchArticlesObj });
    };

    return (
        <div className={"community_page"}>
            <div className={"community_frame"}>
                <Container sx={{mt: "50px", mb: "50px"}}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"}>
                        <CommunityChats/>
                        <Stack
                            className={"community_all_frame"}
                            inputMode={"text"}
                            style={{border: "1px solid #fff"}}
                        >
                            <TabContext value={value}>
                                <Box className={"article_tabs"}>
                                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                        <TabList
                                            // value={value}
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                            style={{borderColor: "blue"}}
                                        >
                                            <Tab label="Barcha Maqolalar" value={"1"}/>
                                            <Tab label="Mashxurlar" value={"2"}/>
                                            <Tab label="Oshhonaga baho" value={"3"}/>
                                            <Tab label="Hikoyalar" value={"4"}/>
                                        </TabList>
                                    </Box>
                                </Box>
                                <Box className={"article_main"}>
                                    <TabPanel value={"1"}>
                                        <TargetArticles targetBoArticle={targetBoArticles}/>
                                    </TabPanel>
                                    <TabPanel value={"2"}>
                                        <TargetArticles targetBoArticle={targetBoArticles}/>
                                    </TabPanel>
                                    <TabPanel value={"3"}>
                                        <TargetArticles targetBoArticle={targetBoArticles}/>
                                    </TabPanel>
                                    <TabPanel value={"4"}>
                                        <TargetArticles targetBoArticle={targetBoArticles}/>
                                    </TabPanel>
                                </Box>

                                < Box className={"article_bott"}>
                                    <Pagination
                                        count={5}
                                        page={1}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{
                                                    previous: ArrowBackIcon,
                                                    next: ArrowForwardIcon,
                                                }}
                                                {...item}
                                                color={"secondary"}
                                            />
                                        )}
                                        onChange={handlePaginationChange}
                                    />
                                </Box>
                            </TabContext>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}






















