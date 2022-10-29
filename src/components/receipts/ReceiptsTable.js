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
    }
  };
});

function ReceiptsTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true
    },
    {
      name: "Year",
      selector: "year",
      sortable: true
    }
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988"
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984"
    }
  ];

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
