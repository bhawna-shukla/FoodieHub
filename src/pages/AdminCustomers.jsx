import "./AdminCustomers.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useState } from "react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  // Temporary customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/customers"
        );

        const data = await response.json();

        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

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
            <span>{customers.length}</span>
            <small>Total Customers</small>
          </div>
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
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="customer-name">
                        <div className="customer-avatar">
                          {(customer.name || "Customer").charAt(0).toUpperCase()}
                        </div>

                        <span>{customer.name || "Customer"}</span>
                      </div>
                    </td>

                    <td>{customer.email}</td>

                    <td>{customer.phone}</td>

                    <td>
                      <span className="orders-badge">
                        {customer.orders}
                      </span>
                    </td>

                    <td>₹{customer.spent}</td>

                    <td>{customer.joined}</td>

                    <td>
                      <span
                        className={`status-badge ${(customer.status || "Active").toLowerCase()
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