import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "./api/client.js";
import { clearSession, getStoredSession, saveSession } from "./auth/session.js";

const navigationItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "customers", label: "Customers" },
  { id: "vendors", label: "Vendors" },
  { id: "categories", label: "Categories" },
  { id: "locations", label: "Cities & Areas" },
  { id: "bookings", label: "Bookings" },
  { id: "reviews", label: "Reviews" },
  { id: "offers", label: "Offers" }
];

const resourceConfigs = {
  categories: {
    title: "Categories",
    description: "Manage service and vendor categories.",
    endpoint: "categories",
    empty: { name: "", description: "", status: "active" },
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "description", label: "Description" },
      { name: "status", label: "Status" }
    ],
    columns: ["name", "description", "status"]
  },
  locations: {
    title: "Cities & Areas",
    description: "Manage supported cities and service areas.",
    endpoint: "locations",
    empty: { city: "", area: "", status: "active" },
    fields: [
      { name: "city", label: "City", required: true },
      { name: "area", label: "Area", required: true },
      { name: "status", label: "Status" }
    ],
    columns: ["city", "area", "status"]
  },
  bookings: {
    title: "Bookings",
    description: "Track and update appointment requests.",
    endpoint: "bookings",
    empty: {
      customerName: "",
      vendorName: "",
      serviceName: "",
      date: "",
      status: "pending"
    },
    fields: [
      { name: "customerName", label: "Customer", required: true },
      { name: "vendorName", label: "Vendor", required: true },
      { name: "serviceName", label: "Service" },
      { name: "date", label: "Date" },
      { name: "status", label: "Status" }
    ],
    columns: ["customerName", "vendorName", "serviceName", "date", "status"]
  },
  reviews: {
    title: "Reviews",
    description: "Moderate customer reviews.",
    endpoint: "reviews",
    empty: {
      customerName: "",
      vendorName: "",
      rating: "5",
      comment: "",
      status: "pending"
    },
    fields: [
      { name: "customerName", label: "Customer", required: true },
      { name: "vendorName", label: "Vendor", required: true },
      { name: "rating", label: "Rating" },
      { name: "comment", label: "Comment" },
      { name: "status", label: "Moderation status" }
    ],
    columns: ["customerName", "vendorName", "rating", "comment", "status"]
  },
  offers: {
    title: "Offers",
    description: "Create and manage vendor promotions.",
    endpoint: "offers",
    empty: {
      title: "",
      vendorName: "",
      discount: "",
      validUntil: "",
      status: "active"
    },
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "vendorName", label: "Vendor" },
      { name: "discount", label: "Discount" },
      { name: "validUntil", label: "Valid until" },
      { name: "status", label: "Status" }
    ],
    columns: ["title", "vendorName", "discount", "validUntil", "status"]
  }
};

function titleCase(value) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function EmptyState({ message }) {
  return <div className="empty-state">{message}</div>;
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@stylebuddy.com");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password }
      });

      if (result.user?.role !== "admin") {
        throw new Error("Only admin users can access this dashboard");
      }

      saveSession(result);
      onLogin(result);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="brand-mark">S</div>
        <p className="eyebrow">Style Buddy</p>
        <h1>Admin dashboard</h1>
        <p className="muted">
          Sign in with an admin account to manage customers, vendors, approvals,
          bookings, reviews, offers, and platform data.
        </p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </label>

          {error ? <p className="error">{error}</p> : null}

          <button className="primary-button" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

function AdminShell({ activePage, children, onLogout, onNavigate, session }) {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div>
          <div className="sidebar-brand">
            <span className="brand-mark small">S</span>
            <div>
              <strong>Style Buddy</strong>
              <small>Admin panel</small>
            </div>
          </div>

          <nav className="nav-list">
            {navigationItems.map((item) => (
              <button
                className={activePage === item.id ? "active" : ""}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button className="ghost-button" onClick={onLogout} type="button">
          Logout
        </button>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Admin console</p>
            <h1>{navigationItems.find((item) => item.id === activePage)?.label}</h1>
          </div>
          <div className="admin-pill">
            <span>{session.user.name}</span>
            <small>{session.user.email}</small>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}

function DashboardPage({ token }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/admin/summary", { token })
      .then(setSummary)
      .catch((apiError) => setError(apiError.message));
  }, [token]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!summary) {
    return <p className="muted">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-grid">
      {Object.entries(summary).map(([key, value]) => (
        <article className="metric-card" key={key}>
          <span>{titleCase(key)}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </div>
  );
}

function CustomersPage({ token }) {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  async function loadCustomers() {
    const data = await apiRequest("/admin/customers", { token });
    setCustomers(data.customers || []);
  }

  useEffect(() => {
    loadCustomers().catch((apiError) => setError(apiError.message));
  }, [token]);

  async function updateStatus(customer, status) {
    const data = await apiRequest(`/admin/customers/${customer.id}/status`, {
      method: "PATCH",
      token,
      body: { status }
    });
    setCustomers((current) =>
      current.map((item) => (item.id === customer.id ? data.customer : item))
    );
  }

  return (
    <section className="page-card">
      <PageHeader
        title="Customers"
        description="View customers and control local account status."
      />
      {error ? <p className="error">{error}</p> : null}
      {customers.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || "-"}</td>
                  <td>
                    <StatusBadge status={customer.status || "active"} />
                  </td>
                  <td className="actions">
                    <button onClick={() => updateStatus(customer, "active")}>
                      Activate
                    </button>
                    <button onClick={() => updateStatus(customer, "suspended")}>
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message="No customers yet." />
      )}
    </section>
  );
}

function VendorsPage({ token }) {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState("");

  async function loadVendors() {
    const data = await apiRequest("/admin/vendors", { token });
    setVendors(data.vendors || []);
  }

  useEffect(() => {
    loadVendors().catch((apiError) => setError(apiError.message));
  }, [token]);

  async function updateVendor(vendor, body) {
    const data = await apiRequest(`/admin/vendors/${vendor.id}/approval`, {
      method: "PATCH",
      token,
      body
    });
    setVendors((current) =>
      current.map((item) => (item.id === vendor.id ? data.vendor : item))
    );
  }

  return (
    <section className="page-card">
      <PageHeader
        title="Vendors"
        description="Review vendor business profiles, approvals, and featured state."
      />
      {error ? <p className="error">{error}</p> : null}
      {vendors.length ? (
        <div className="vendor-grid">
          {vendors.map((vendor) => {
            const profile = vendor.vendorProfile || {};
            const status = profile.status || "pending";

            return (
              <article className="vendor-card" key={vendor.id}>
                <div className="vendor-card-header">
                  <div>
                    <h3>{profile.businessName || vendor.name}</h3>
                    <p>{vendor.email}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <dl>
                  <dt>Owner</dt>
                  <dd>{vendor.name}</dd>
                  <dt>Type</dt>
                  <dd>{profile.businessType || "-"}</dd>
                  <dt>City</dt>
                  <dd>{profile.businessCity || "-"}</dd>
                  <dt>Address</dt>
                  <dd>{profile.businessAddress || "-"}</dd>
                  <dt>Description</dt>
                  <dd>{profile.businessDescription || "-"}</dd>
                </dl>
                {profile.rejectionReason ? (
                  <p className="warning">Reason: {profile.rejectionReason}</p>
                ) : null}
                <div className="actions wrap">
                  <button
                    onClick={() => updateVendor(vendor, { status: "approved" })}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateVendor(vendor, { status: "pending" })}
                  >
                    Mark pending
                  </button>
                  <button
                    onClick={() => {
                      const rejectionReason = window.prompt(
                        "Reason for rejection",
                        profile.rejectionReason || ""
                      );

                      if (rejectionReason !== null) {
                        updateVendor(vendor, {
                          status: "rejected",
                          rejectionReason
                        });
                      }
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      updateVendor(vendor, {
                        status,
                        featured: !profile.featured
                      })
                    }
                  >
                    {profile.featured ? "Unfeature" : "Feature"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState message="No vendors yet." />
      )}
    </section>
  );
}

function PageHeader({ description, title }) {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

function ResourcePage({ config, token }) {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(config.empty);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");

  async function loadRecords() {
    const data = await apiRequest(`/admin/${config.endpoint}`, { token });
    setRecords(data[config.endpoint] || []);
  }

  useEffect(() => {
    setForm(config.empty);
    setEditingId("");
    loadRecords().catch((apiError) => setError(apiError.message));
  }, [config.endpoint, token]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(config.empty);
    setEditingId("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (editingId) {
        await apiRequest(`/admin/${config.endpoint}/${editingId}`, {
          method: "PATCH",
          token,
          body: form
        });
      } else {
        await apiRequest(`/admin/${config.endpoint}`, {
          method: "POST",
          token,
          body: form
        });
      }

      resetForm();
      await loadRecords();
    } catch (apiError) {
      setError(apiError.message);
    }
  }

  async function deleteRecord(record) {
    if (!window.confirm("Delete this record?")) {
      return;
    }

    await apiRequest(`/admin/${config.endpoint}/${record.id}`, {
      method: "DELETE",
      token
    });
    setRecords((current) => current.filter((item) => item.id !== record.id));
  }

  return (
    <section className="page-card">
      <PageHeader title={config.title} description={config.description} />
      <div className="resource-layout">
        <form className="resource-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit record" : "Add record"}</h3>
          {config.fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                required={field.required}
                value={form[field.name] || ""}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
            </label>
          ))}
          {error ? <p className="error">{error}</p> : null}
          <div className="actions">
            <button className="primary-button" type="submit">
              {editingId ? "Save changes" : "Add"}
            </button>
            {editingId ? (
              <button onClick={resetForm} type="button">
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="table-wrap">
          {records.length ? (
            <table>
              <thead>
                <tr>
                  {config.columns.map((column) => (
                    <th key={column}>{titleCase(column)}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    {config.columns.map((column) => (
                      <td key={column}>{record[column] || "-"}</td>
                    ))}
                    <td className="actions">
                      <button
                        onClick={() => {
                          setEditingId(record.id);
                          setForm({ ...config.empty, ...record });
                        }}
                        type="button"
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteRecord(record)} type="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState message={`No ${config.title.toLowerCase()} yet.`} />
          )}
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [session, setSession] = useState(() => getStoredSession());
  const [activePage, setActivePage] = useState("dashboard");

  const token = session?.token;
  const content = useMemo(() => {
    if (!token) {
      return null;
    }

    if (activePage === "dashboard") {
      return <DashboardPage token={token} />;
    }

    if (activePage === "customers") {
      return <CustomersPage token={token} />;
    }

    if (activePage === "vendors") {
      return <VendorsPage token={token} />;
    }

    return <ResourcePage config={resourceConfigs[activePage]} token={token} />;
  }, [activePage, token]);

  function handleLogout() {
    clearSession();
    setSession(null);
    setActivePage("dashboard");
  }

  if (!session || session.user?.role !== "admin") {
    return <LoginPage onLogin={setSession} />;
  }

  return (
    <AdminShell
      activePage={activePage}
      onLogout={handleLogout}
      onNavigate={setActivePage}
      session={session}
    >
      {content}
    </AdminShell>
  );
}
