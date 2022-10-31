import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import { IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { Input, InputLabel } from "@mui/material";

const useStyles = makeStyles((theme) => {
  return {
    tableHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    tableHeading: {
      display: "flex",
      alignItems: "center"
    },
    tableActions: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    tableFilters: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      margin: "0 10px",
      gap: "20px"
    }
  };
});

function ReceiptsTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const columns = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
      width: "110px"
    },
    {
      name: "5kg",
      selector: "_5kg",
      sortable: true,
      width: "80px"
    },
    {
      name: "14kg",
      selector: "_14kg",
      sortable: true,
      width: "80px"
    },
    {
      name: "19kg",
      selector: "_19kg",
      sortable: true,
      width: "80px"
    },

    {
      name: "47kg",
      selector: "_47kg",
      sortable: true,
      width: "80px"
    },
    {
      name: "Stoves",
      selector: "stoves"
    },
    {
      name: "Others",
      selector: "others"
    }
  ];

  const data = [
    {
      id: 1,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 2,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 3,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 4,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 5,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 6,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    },
    {
      id: 7,
      date: "31/10/2022",
      _5kg: "33",
      _14kg: "80",
      _19kg: "62",
      _47kg: "6",
      stoves: `
        Rs 990 - 9,
        Rs 1900 - 3,
        Rs 2200 - 5
      `,
      others: `
        Suraksha Pipe - 20,
        PM UY Pipe - 25
      `
    }
  ];

  // stoves: `{
  //   rs990: "9",
  //   rs1900: "3",
  //   rs2200: "5",
  //   rs2350: "8",
  //   rs4000: "5",
  //   rs4500: "2"
  // }`,
  // others: `{
  //   suraksha_pipe: "20",
  //   pm_uy_pipe: "25"
  // }`

  let componentRef = useRef();
  return (
    <>
      <div className={classes.tableHeader}>
        <div className={classes.tableHeading}>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body1" display="inline" color="inherit">
            Daily Receipts
          </Typography>
        </div>
        <div className={classes.tableActions}>
          <div className={classes.tableFilters}>
            <InputLabel>
              Start Date :
              <Input type="date" placeholder="Start Date" />
            </InputLabel>
            <InputLabel>
              End Date :
              <Input type="date" placeholder="Start Date" />
            </InputLabel>
          </div>

          <ReactToPrint
            trigger={() => (
              <IconButton>
                <PrintIcon />
              </IconButton>
            )}
            content={() => componentRef}
          />
          <CSVLink
            data={data}
            filename={"my-file.csv"}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <IconButton>
              <GetAppIcon />
            </IconButton>
          </CSVLink>
        </div>
      </div>
      <div className="receipts_table" ref={(el) => (componentRef = el)}>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
}

export default ReceiptsTable;
