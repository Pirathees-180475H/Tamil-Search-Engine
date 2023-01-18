import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Container,
  Menu,
  MenuItem,
  ListItemText,
  CloseIcon,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from 'axios';
import {paramProvider} from "./ParamProvider";


const checkboxLabels = ["song", "movie", "year", "musician", "lyricst",
 "singers","metopher","meaning","sourceDomain","targetDomain"];


const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(5),
      backgroundColor: "#fafafa",
      padding: theme.spacing(3)
    },
    menu1:{
      position:"fixed",
      right:400,
      top:100
    },
    menu2:{
      position:"fixed",
      right:200,
      top:100
    },
    backButton: {
      position: "absolute",
      backgroundColor: "#32CD32",
      top: theme.spacing(2),
      left: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(3)
    },
    radioGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    searchBtn: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#4caf50",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#3e8e41"
      }
    },
    searchBox: {
      width: "50%",
      margin: theme.spacing(3, 0, 2)
    },
    table: {
      marginTop: theme.spacing(3),
      width: "100%",
      "& th": {
        backgroundColor: "#3f51b5",
        color: "#fff"
      }
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: "flex",
        justifyContent: "flex-end"
      },
      checkboxes: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: theme.spacing(2, 0, 2)
      },
      warning: {
        backgroundColor: "#ff9800",
        color: "#fff",
        padding: theme.spacing(2),
        textAlign: "center",
        marginTop: theme.spacing(2)
      },
      showWarning: {
        visibility: "visible"
      },
      info: {
        backgroundColor: "#32CD32",
        color: "#fff",
        padding: theme.spacing(2),
        textAlign: "center",
        marginTop: theme.spacing(2),
      }
  }));


export default function SearchPage() {
  const classes = useStyles();
  const [value, setValue] = useState("option1");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults,setFilteredResults]=useState([]);

  //Used in display results
  const [checkboxes, setCheckboxes] = useState([]);

  // Menu & checkBox - Query Type
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQueryTypes, setSelectedQueryTypes] = useState([]);
  const queryTypes = ['Match','Match Phrase' ,'Multi Match Most Fields','Multi Match Phrase','Wild Card','Aggregation'];

   // Menu & checkBox - Fields
   const [anchorE2, setAnchorE2] = useState(null);
   const [selectedFields, setSelectedFields] = useState([]);
   const fields = ['metopher', 'meaning'];

  //warnig and information
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowinfo] = useState(true);


  const handleChange = event => {
    setValue(event.target.value);
  };

  //Request and Response Handler
  const handleSearch = async () => {
    setResults([]);  
    try {
     // const response = await axios.get(`your-endpoint/${searchTerm}`);
      const param=paramProvider(searchTerm,selectedQueryTypes,selectedFields);
      console.log(param)
      const response = await axios.post(`http://localhost:9200/tamilsonglyrics/_search`,param);
      setResults(response.data.hits.hits.map(hit=>hit._source))
      console.log(results)
    } catch (error) {
      console.error(error);
    }

    //Filter The data accordingto the checkBox
    setFilteredResults([]);

    // Warning OR InfoData Showing
    if (results.length === 0) {
      setShowWarning(true);
      setShowinfo(false);
    }else{
      setShowWarning(false);
      setShowinfo(false);
    }
  };


 //Used In Table Display
  const handleCheckboxChange = (event, label) => {
    if (event.target.checked) {
      setCheckboxes([...checkboxes, label]);
    } else {
      setCheckboxes(checkboxes.filter(checkboxLabel => checkboxLabel !== label));
    }
  };
 
 //Used in Menu and checkBoxes -Query
const handleMenuQueryClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuQueryClose = () => {
  setAnchorEl(null);
};

const handleMenuCheckboxQueryChange = (field) => (event) => {
  if (event.target.checked && selectedQueryTypes.length===0) {
    setSelectedQueryTypes([...selectedQueryTypes, field]);
  } else {
    setSelectedQueryTypes(selectedQueryTypes.filter((f) => f !== field));
  }
};

 //Used in Menu and checkBoxes - For Field
 const handleMenuFieldClick = (event) => {
  setAnchorE2(event.currentTarget);
};

const handleMenuFieldClose = () => {
  setAnchorE2(null);
};

const handleMenuFieldCheckboxChange = (field) => (event) => {
  if (event.target.checked) {
    setSelectedFields([...selectedFields, field]);
  } else {
    setSelectedFields(selectedFields.filter((f) => f !== field));
  }
};

  return (
    <div className={classes.root}>
      <Button
        className={classes.backButton}
        variant="outlined"
        color="default"
        component={Link}
        to="/"
      >
        Back
      </Button>

      <Typography variant="h5">தமிழ் பாடல் தேடல்</Typography>
     
      <div > {/** Start of the checkbox Menu */}
          {/**Query Type */}
          <div className={classes.menu1}>
            <Button
              aria-controls="nested-menu"
              aria-haspopup="true"
              onClick={handleMenuQueryClick}
              className={classes.button}
            >
              Select Query Type
            </Button>
            <Menu
              id="nested-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuQueryClose}
            >
              {queryTypes.map((field) => (
                <MenuItem key={field}>
                  <Checkbox
                    checked={selectedQueryTypes.includes(field)}
                    onChange={handleMenuCheckboxQueryChange(field)}
                    value={field}
                  />
                  <ListItemText primary={field} />
                </MenuItem>
              ))}

              <MenuItem>
                <IconButton onClick={handleMenuQueryClose}>
                  close
                </IconButton>
              </MenuItem>
            </Menu>
          </div>

          {/**Field Type */}

          <div className={classes.menu2}>
            <Button
              aria-controls="nested-menu"
              aria-haspopup="true"
              onClick={handleMenuFieldClick}
              className={classes.button}
            >
              Select Field
            </Button>
            <Menu
              id="nested-menu"
              anchorEl={anchorE2}
              keepMounted
              open={Boolean(anchorE2)}
              onClose={handleMenuFieldClose}
            >
              {fields.map((field) => (
                <MenuItem key={field}>
                  <Checkbox
                    checked={selectedFields.includes(field)}
                    onChange={handleMenuFieldCheckboxChange(field)}
                    value={field}
                  />
                  <ListItemText primary={field} />
                </MenuItem>
              ))}

              <MenuItem>
                <IconButton onClick={handleMenuFieldClose}>
                  close
                </IconButton>
              </MenuItem>
            </Menu>
          </div>
    </div>{/** End of the checkbox Menu */}
      
      <TextField
        label="Search"
        variant="outlined"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.searchBtn}
        onClick={handleSearch}
      >
        Search
      </Button>

      <div className={classes.checkboxes}>
        {checkboxLabels.map((label, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkboxes.includes(label)}
                onChange={e => handleCheckboxChange(e, label)}
              />
            }
            label={label}
          />
        ))}
      </div>


      <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {checkboxes.map((name) => (
            <TableCell key={name}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map((result,index) => (
          <TableRow key={index}>
            {checkboxes.map((name) => (
              <TableCell key={name}>{result[name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
     </Table>
  

    {!showInfo && showWarning && (
      <Container className={classes.warning}>
        No results found. Please try a different search.
      </Container>
    )}
 
    {showInfo && !showWarning && (
      <Container className={classes.info}>
      Search Songs
    </Container>
    )}
  
  </div> ) 
  
}
