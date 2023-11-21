import React from "react";
import {Avatar, Box, Container, Stack} from "@mui/material";
import { url } from "inspector";
import { Directions } from "@mui/icons-material";



export function Recommendations() {
    return(
        <div className="top_article_frame">
            <Container
                maxWidth="lg"
                sx={{ mb: "50px", mt: "60px" }}
                style={{ position: "relative" }}
            >
                <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    sx={{ mt: "45px"}}
                >
                    <Box className={"category_title"}>Tafsiya qilingan maqolalar</Box>
                    <Stack className={"article_main"} flexDirection={"row"}>
                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Ko'p ko'rilgan</Box>


                            <Stack className={"article_box"}>
                                <Box
                                    className={"article_img"}
                                    sx={{
                                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMUdiDK_eNdvqKz7NhCKFdG2MeDQ4g6eHlA&usqp=CAU)`,
                                    }}
                                ></Box>
                                <Box className={"article_info"}>
                                    <Box className={"article_main_info"}>
                                        <div className={"article_author"}>
                                            <Avatar
                                                alt="Author_photo"
                                                src={"/community/r.Komilov.jpeg"}
                                                sx={{ width: "35px", height: "35px" }}
                                            />
                                            <span className={"author_username"}>R.Komilov</span>
                                        </div>
                                        <span className={"article_title"}>
                                      Eng qiziqarli va shirin taomlar
                                  </span>
                                        <p className={"article_desc"}></p>
                                    </Box>
                                </Box>
                            </Stack>


                            <Stack className={"article_box"}>
                                <Box
                                    className={"article_img"}
                                    sx={{
                                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMUdiDK_eNdvqKz7NhCKFdG2MeDQ4g6eHlA&usqp=CAU)`,
                                    }}
                                ></Box>
                                <Box className={"article_info"}>
                                    <Box className={"article_main_info"}>
                                        <div className={"article_author"}>
                                            <Avatar
                                                alt="Author_photo"
                                                src={"/community/ulug_mitti.jpeg"}
                                                sx={{ width: "35px", height: "35px" }}
                                            />
                                            <span className={"author_username"}>Mitti_vine</span>
                                        </div>
                                        <span className={"article_title"}>
                                      Eng qiziqarli va shirin taomlar
                                  </span>
                                        <p className={"article_desc"}></p>
                                    </Box>
                                </Box>
                            </Stack>

                            <Box className={"article_category"} sx={{ marginTop: "10px" }}>
                                Ko'p yoqtirilgan
                            </Box>


                            <Stack className={"article_box"}>
                                <Box
                                    className={"article_img"}
                                    sx={{
                                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMUdiDK_eNdvqKz7NhCKFdG2MeDQ4g6eHlA&usqp=CAU)`,
                                    }}
                                ></Box>
                                <Box className={"article_info"}>
                                    <Box className={"article_main_info"}>
                                        <div className={"article_author"}>
                                            <Avatar
                                                alt="Author_photo"
                                                src={"/community/Dilnoza_K.jpeg"}
                                                sx={{ width: "35px", height: "35px" }}
                                            />
                                            <span className={"author_username"}>Dilnoza</span>
                                        </div>
                                        <span className={"article_title"}>
                                      Surxondandiriga marhamamt
                                  </span>
                                        <p className={"article_desc"}></p>
                                    </Box>
                                </Box>
                            </Stack>


                            <Stack className={"article_box"}>
                                <Box
                                    className={"article_img"}
                                    sx={{
                                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSMUdiDK_eNdvqKz7NhCKFdG2MeDQ4g6eHlA&usqp=CAU`,
                                    }}
                                ></Box>
                                <Box className={"article_info"}>
                                    <Box className={"article_main_info"}>
                                        <div className={"article_author"}>
                                            <Avatar
                                                alt="Author_photo"
                                                src={"/community/ulug_mitti.jpeg"}
                                                sx={{ width: "35px", height: "35px" }}
                                            />
                                            <span className={"author_username"}>ulug'bek_mitti</span>
                                        </div>
                                        <span className={"article_title"}>
                                      Surxondandiriga marhamamt
                                  </span>
                                        <p className={"article_desc"}></p>
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>

                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Mashhurlar</Box>
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange"}}>Mashhurlar etirofi</h1>

                            </Box>
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange"}}>Mashhurlar etirofi</h1>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}