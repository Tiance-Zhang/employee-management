import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class API {
  async getEmployees() {
    const res = await axios.get(EMPLOYEE_API_BASE_URL);
    return res.data;
  }

  async createEmployee(employee) {
    await axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  async getEmployeeById(employeeId) {
    const res = await axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    return res.data;
  }

  async updateEmployeeById(employee, employeeId) {
    await axios.put(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, employee);
  }

  async deleteEmployeeById(employeeId) {
    await axios.delete(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
  }
}

export default new API();
