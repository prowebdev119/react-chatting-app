import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  Collapse,
  Box,
  FormControlLabel,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  Menu,
  CssBaseline,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    components={Box}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: theme.spacing(1),
    minWidth: 180,
    left: "0px !important",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function App() {
  const [data, setData] = useState([
    {
      value: "profile1",
      date: { lable: ["Dkmen", "Mend", "MDas"], select: [false, false, false] },
      open: false,
    },
    {
      value: "profile2",
      date: { lable: ["Dkmen", "Mend", "MDas"], select: [false, false, false] },
      open: false,
    },
    {
      value: "profile3",
      date: { lable: ["Dkmen", "Mend", "MDas"], select: [false, false, false] },
      open: false,
    },
  ]);
  const [count, setCount] = useState(0);

  function checkedValue(item) {
    let checkBool = true;
    item.date.select.map((item) => {
      checkBool = checkBool && item;
      return item;
    });
    return checkBool;
  }
  return (
    <>
      <CssBaseline />
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <Box>
            <div {...bindTrigger(popupState)}>
              <Box
                border={1}
                borderColor="blue"
                borderRadius={2}
                py={1}
                px={1}
                width={320}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {count === 0 ? "Select Profile" : `${count} selected`}
                </Typography>
                <IconButton>
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            </div>
            <StyledMenu sx={{ left: 0 }} {...bindMenu(popupState)}>
              <Box
                border={1}
                borderRadius={2}
                p={1}
                style={{ width: 320, overflowY: "scroll" }}
                maxHeight={200}
                borderColor="blue"
              >
                <List>
                  <ListItem>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "16px",
                        height: "16px",
                        overflow: "hidden",
                        borderRadius: 50,
                        border: "2px solid blue",
                        marginRight: 20,
                      }}
                    >
                      <Checkbox
                        onChange={(event) => {
                          let modifyData = data;
                          let count = 0;
                          modifyData = modifyData.map((item) => {
                            item.date.select = item.date.select.map((_) => {
                              if (event.target.checked) count++;
                              return event.target.checked;
                            });
                            return item;
                          });
                          setData([...modifyData]);
                          setCount(count);
                        }}
                      />
                    </Box>
                    <ListItemText primary="All selceted" />
                  </ListItem>
                  <Divider sx={{ borderColor: "blue" }} />
                  {data.map((items, index) => {
                    let checkBool = checkedValue(items);
                    return (
                      <>
                        <ListItem>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "16px",
                              height: "16px",
                              overflow: "hidden",
                              borderRadius: 50,
                              border: "2px solid blue",
                              marginRight: 20,
                            }}
                          >
                            <Checkbox
                              checked={checkBool}
                              onChange={(event) => {
                                const modifyData = data;
                                let c = count;
                                modifyData[index].date.select = modifyData[
                                  index
                                ].date.select.map((_) => {
                                  if (event.target.checked) c++;
                                  else c--;
                                  return event.target.checked;
                                });
                                modifyData[index].open = event.target.checked;
                                setData([...modifyData]);
                                setCount(c);
                              }}
                            />
                          </Box>
                          <ListItemText primary={items.value} />
                          <IconButton
                            onClick={() => {
                              const modifyData = data;
                              modifyData[index].open = !modifyData[index].open;
                              setData([...modifyData]);
                            }}
                          >
                            <ArrowDropDownIcon />
                          </IconButton>
                        </ListItem>
                        <Divider sx={{ borderColor: "blue" }} />
                        <Collapse in={items.open}>
                          <Box ml={2}>
                            <List disablePadding>
                              {items.date.lable.map((item, ind) => (
                                <ListItem>
                                  <Box
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "16px",
                                      height: "16px",
                                      overflow: "hidden",
                                      borderRadius: 50,
                                      border: "2px solid blue",
                                      marginRight: 20,
                                    }}
                                  >
                                    <Checkbox
                                      checked={items.date.select[ind]}
                                      onChange={(event) => {
                                        const modifyData = data;
                                        let c = count;
                                        if (event.target.checked) c++;
                                        else c--;
                                        modifyData[index].date.select[ind] =
                                          event.target.checked;
                                        setData([...modifyData]);
                                        setCount(c);
                                      }}
                                    />
                                  </Box>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Collapse>
                      </>
                    );
                  })}
                </List>
              </Box>
            </StyledMenu>
          </Box>
        )}
      </PopupState>
    </>
  );
}
