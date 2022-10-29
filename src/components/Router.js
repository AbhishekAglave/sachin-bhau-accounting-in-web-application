import React from "react";
import { Routes, Route } from "react-router-dom";
import ReceiptsTable from "./receipts/ReceiptsTable";
import ReceiptsForm from "./receipts/ReceiptsForm";


function Router() {
  return (
    <Routes>
      <Route path="receipts">
        <Route index element={<ReceiptsTable />}></Route>
        <Route path="new" element={<ReceiptsForm />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
