import React, {useRef} from "react";
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
    Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField
} from "@mui/material";

export const TuiEditor = (props: any) => {
    const editorRef = useRef<Editor | null>(null);

    return (
        <Stack>
            <Stack>
                <Stack
                    className={"edit_page"}
                    direction="row"
                    style={{margin: "40px"}}
                    justifyContent="space-evenly"
                >
                    <Box className={"form_row"} sx={{width: "300px"}}>
                        <Typography
                            style={{color: "rgb(225 255 233)", margin: "10px"}}
                            variant="h3"
                        >
                            Category
                        </Typography>
                        <FormControl sx={{width: "100%", background: "white"}}>
                            <Select
                                value={"celebrity"}
                                displayEmpty
                                inputProps={{"aria-label": "Without label"}}
                            >
                                <MenuItem value="">
                                    <span>Categoryni tanalng</span>
                                </MenuItem>
                                <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
                                <MenuItem value={"evaluation"}>Restoranga baho</MenuItem>
                                <MenuItem value={"story"}>Mening hikoyam</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={"form_row"} style={{width: "300px"}}>
                        <Typography
                            style={{color: "rgb(225 255 233)", margin: "10px"}}
                            variant="h3"
                        >
                            Mavzu
                        </Typography>
                        <TextField
                            id="filled-basic"
                            label="Mavzu"
                            variant="filled"
                            style={{width: "300px", background: "white"}}
                        />
                    </Box>
                </Stack>
                <Box
                    className={"edit_box"}
                >
                    <Editor
                        ref={(ref) => editorRef.current = ref}
                        placeholder="Type here"
                        previewStyle="vertical"
                        height="640px"

                        initialEditType="wysiwyg"
                        toolbarItems={[
                            ["heading", "bold", "italic", "strike"],
                            ["image", "table", "link"],
                            ["ul", "ol", "task"],
                        ]}
                        hooks={{
                            addImageBlobHook: async (image: any, callback: any) => {
                                return false;
                            },
                        }}
                        events={{
                            load: function (param: any) {
                            },
                        }}
                    />
                </Box>
                <Stack direction="row" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{margin: "30px", width: "250px", height: "45px"}}
                    >
                        Register

                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};