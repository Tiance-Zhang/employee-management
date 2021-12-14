import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import API from "../api";
import FormDialog from "./FormDialog";

const Main = () => {
  const initialValue = { id: "", firstName: "", lastName: "", emailId: "" };
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState(initialValue);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  const columnDefs = [
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Email", field: "emailId" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={async () => await handleDelete(params.value)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const employees = await API.getEmployees();
    setEmployees(employees);
  };

  const handleUpdate = (oldData) => {
    setEmployee(oldData);
    openDialog();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row?"
    );
    if (confirm) {
      await API.deleteEmployeeById(id);
      await getEmployees();
    }
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setEmployee({ ...employee, [id]: value });
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmployee(initialValue);
  };

  const handleSubmit = async () => {
    if (employee.id) {
      const confirm = window.confirm(
        "Are you sure, you want to update this row?"
      );
      if (confirm) {
        await API.updateEmployeeById(employee, employee.id);
        handleClose();
        await getEmployees();
      }
    } else {
      await API.createEmployee(employee);
      handleClose();
      await getEmployees();
    }
  };

  return (
    <>
      <h1 align="center">CRUD Operation in ag-Grid</h1>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={openDialog}>
          Add Employee
        </Button>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: "400px" }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <FormDialog
        data={employee}
        isOpen={isOpen}
        onChange={onChange}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Main;
