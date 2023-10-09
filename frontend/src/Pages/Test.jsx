import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Test = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const environment = process.env.REACT_APP_ENV;
  const [devdata, setDevdata] = useState([]);
  const [formdata, setFormdata] = useState({
    days: "",
    year: "",
    type: "",
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      if (!apiUrl) {
        console.error("API URL is undefined or empty.");
        return;
      }

      const response = await axios.get(apiUrl);
      setDevdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const handleAddButtonClick = async () => {
    try {
      if (
        formdata.days === "" ||
        formdata.type === "" ||
        formdata.year === ""
      ) {
        toast.error("Enter the data.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "toast-message",
        });
        return;
      }
      const response = await axios.post(apiUrl, {
        LeaveType: formdata.type,
        Days: formdata.days,
        FiscalYear: formdata.year,
      });
      console.log("Data added successfully:", response.data);
      fetchData();
      setFormdata({
        days: "",
        year: "",
        type: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!apiUrl) {
        console.error("API URL is undefined or empty.");
        return;
      }
      const response = await axios.delete(`${apiUrl}/${id}`);
      console.log("Data deleted successfully:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <p>API URL: {apiUrl}</p>
      <p>Environment: {environment}</p>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <th scope="col">Id</th>
          <th scope="col">Days</th>

          <th scope="col">Year</th>
          <th scope="col" colSpan="2">
            Leave Type
          </th>
        </thead>
        <tbody>
          {Array.isArray(devdata) &&
            devdata.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.Days}</td>
                <td>{user.FiscalYear}</td>
                <td>{user.LeaveType}</td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-outline-danger btn-hover"
                  />
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="2">
              <input
                type="number"
                min="0"
                name="days"
                id="days"
                className="form-control"
                placeholder="Enter Number of Days"
                value={formdata.days || ""}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="year"
                id="year"
                value={formdata.year || ""}
                className="form-control"
                placeholder="Enter the Year"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                type="text"
                name="type"
                className="form-control"
                value={formdata.type || ""}
                onChange={handleInputChange}
                id="type"
              >
                <option value="">--Select Type</option>
                <option value="Sick">Sick</option>
                <option value="Privillege">Privillege</option>
                <option value="Casual">Casual</option>
              </select>
            </td>
            <td>
              <input
                type="button"
                className="btn btn-outline-primary"
                value="ADD"
                onClick={handleAddButtonClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
