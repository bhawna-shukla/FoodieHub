import "./AdminCustomers.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useMemo, useState } from "react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/customers"
        );

        const data = await response.json();

        setCustomers(data.customers || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const name = customer.name || "";
      const email = customer.email || "";
      const phone = customer.phone || "";
      const status = customer.status || "Active";

      const searchText = search.toLowerCase();

      const matchesSearch =
        name.toLowerCase().includes(searchText) ||
        email.toLowerCase().includes(searchText) ||
        phone.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  return (
    <>
      <Navbar />

      <main className="admin-customers">

        <div className="customers-header">
          <div>
            <h1>Customers</h1>
            <p>Manage and view all registered customers</p>
          </div>

          <div className="customer-count">
            <span>{filteredCustomers.length}</span>
            <small>Total Customers</small>
          </div>
        </div>

        {/* Search & Filter */}

        <div className="customers-controls">

          <div className="customer-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {(search || statusFilter !== "All") && (
            <button
              className="clear-filter"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            >
              Clear
            </button>
          )}

        </div>

        <div className="customers-table-container">
          <table className="customers-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer, index) => (

                  <tr key={customer._id || customer.id}>

                    <td>{index + 1}</td>

                    <td>
                      <div className="customer-name">

                        <div className="customer-avatar">
                          {(customer.name || "Customer")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span>
                          {customer.name || "Customer"}
                        </span>

                      </div>
                    </td>

                    <td>{customer.email || "N/A"}</td>

                    <td>{customer.phone || "N/A"}</td>

                    <td>
                      <span className="orders-badge">
                        {customer.orders || 0}
                      </span>
                    </td>

                    <td>
                      ₹{customer.spent || 0}
                    </td>

                    <td>
                      {customer.joined || "N/A"}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${
                          (customer.status || "Active").toLowerCase()
                        }`}
                      >
                        {customer.status || "Active"}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="8" className="no-customers">
                    No customers found
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default AdminCustomers;