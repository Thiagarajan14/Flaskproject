const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const mysql = require("mysql");
const port = 5000;

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "leave_application",
});

// Use the router for routes
app.use("/", router);

// Handle connection events
con.connect(function (err) {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database");

  // Once connected, start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Define a route using the router
router.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

router.get("/leave_types", (req, res) => {
  con.query("SELECT * FROM leave_type", function (err, result, fields) {
    if (err) {
      console.error("Error querying the database: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

router.post("/leave_types", (req, res) => {
  const { LeaveType, Days, FiscalYear } = req.body;

  if (!LeaveType || !Days || !FiscalYear) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  con.query(
    "INSERT INTO leave_type (LeaveType, Days, FiscalYear) VALUES (?,?,?)",
    [LeaveType, Days, FiscalYear],
    function (err, result, fields) {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(result);
    }
  );
});

router.delete("/leave_types/:id", (req, res) => {
  const leaveId = req.params.id;

  if (!leaveId) {
    return res.status(400).json({ error: "Leave ID is required" });
  }

  con.query(
    "DELETE FROM leave_type WHERE id = ?",
    [leaveId],
    function (err, result, fields) {
      if (err) {
        console.error("Error querying the database: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(result);
    }
  );
});

