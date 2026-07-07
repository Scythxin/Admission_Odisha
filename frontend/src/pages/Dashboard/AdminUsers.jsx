import { useState, useEffect } from "react";
import API_BASE from "../../config/api";
import { FaSearch, FaEye, FaEdit, FaTrash, FaUserPlus, FaFileImport, FaFilter, FaUndo } from "react-icons/fa";
import Pagination from "../../components/admin/Pagination";

const STATUS_STYLE = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-orange-50 text-orange-700",
  Blocked: "bg-red-50 text-red-700",
};

export default function AdminUsers({ setActiveNav }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [status, setStatus] = useState("All Status");
  const [gender, setGender] = useState("All Gender");
  const [activePage, setActivePage] = useState(1);

  const [users, setUsers] = useState([]);
  const [statsData, setStatsData] = useState({ total: 0, active: 0, inactive: 0, blocked: 0, newMonth: 0 });
  const [loading, setLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("View");
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user, mode) => {
    setSelectedUser({ ...user });
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}?r=dashboard/update-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser)
      });
      const result = await res.json();
      if (result.status === "success") {
        closeModal();
        fetchUsers();
      } else {
        alert(result.message || "Failed to update user");
      }
    } catch (err) {
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}?r=dashboard/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const result = await res.json();
      if (result.status === "success") {
        fetchUsers();
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const fetchUsers = async (pSearch = search, pCity = city, pStatus = status, pGender = gender, pPage = activePage, pPerPage = perPage) => {
    setLoading(true);
    try {
      const qSearch = encodeURIComponent(pSearch);
      const qCity = encodeURIComponent(pCity);
      const qStatus = encodeURIComponent(pStatus);
      const qGender = encodeURIComponent(pGender);

      const res = await fetch(`${API_BASE}?r=dashboard/get-users&search=${qSearch}&city=${qCity}&status=${qStatus}&gender=${qGender}&page=${pPage}&perPage=${pPerPage}`);
      const result = await res.json();

      if (result.status === 'success') {
        const d = result.data;
        const colors = ["bg-pink-400", "bg-blue-400", "bg-purple-400", "bg-emerald-400", "bg-orange-400", "bg-sky-400"];

        const mappedUsers = (d.users || []).map(u => {
          const initial = u.name ? u.name.charAt(0).toUpperCase() : '?';
          const colorIdx = u.name ? u.name.charCodeAt(0) % colors.length : 0;
          return {
            ...u,
            initials: initial,
            avatarBg: colors[colorIdx]
          };
        });

        setUsers(mappedUsers);
        setStatsData(d.stats || { total: 0, active: 0, inactive: 0, blocked: 0, newMonth: 0 });
        setTotalEntries(d.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activePage, perPage]);

  const handleFilter = () => {
    setActivePage(1);
    fetchUsers(search, city, status, gender, 1, perPage);
  };

  const reset = () => {
    setSearch("");
    setCity("All Cities");
    setStatus("All Status");
    setGender("All Gender");
    setActivePage(1);
    fetchUsers("", "All Cities", "All Status", "All Gender", 1, perPage);
  };

  const totalPages = Math.max(Math.ceil(totalEntries / perPage), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-500">
            Dashboard &gt; Users
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Users</h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <FaFileImport className="h-4 w-4" /> Import Users
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition"
          >
            <FaUserPlus className="h-4 w-4" /> Add New User
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <span className="text-lg font-bold">T</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{statsData.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <span className="text-lg font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{statsData.active.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <span className="text-lg font-bold">I</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Inactive</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{statsData.inactive.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <span className="text-lg font-bold">B</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Blocked</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{statsData.blocked.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <span className="text-lg font-bold">N</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">New Month</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{statsData.newMonth.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] xl:items-end">
          <div className="relative">
            <label className="block text-sm font-medium text-slate-600 mb-2">Search</label>
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email or phone..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            >
              {["All Cities", "Bhadrak", "Cuttack", "Bhubaneswar", "Puri", "Berhampur", "Sambalpur", "Rourkela", "Balasore"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            >
              {["All Status", "Active", "Inactive", "Blocked"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            >
              {["All Gender", "Male", "Female"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={handleFilter}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition"
            >
              <FaFilter className="inline mr-2" /> Filter
            </button>
            <button
              onClick={reset}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <FaUndo className="inline mr-2" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-500">#</th>
                <th className="px-5 py-4 font-semibold text-slate-500">User</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Email</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Phone</th>
                <th className="px-5 py-4 font-semibold text-slate-500">City</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Gender</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Status</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Joined On</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center text-slate-500">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center text-slate-400">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-slate-600">{u.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${u.avatarBg}`}>
                          {u.initials}
                        </div>
                        <span className="font-semibold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{u.email}</td>
                    <td className="px-5 py-4 text-slate-600">{u.phone}</td>
                    <td className="px-5 py-4 text-slate-600">{u.city}</td>
                    <td className="px-5 py-4 text-slate-600">{u.gender}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[u.status] || "bg-slate-100 text-slate-700"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{u.joinedOn}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(u, 'View')}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          title="View"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal(u, 'Edit')}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                          title="Edit"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          currentPage={activePage}
          totalPages={totalPages}
          setPage={setActivePage}
          rowsPerPage={perPage}
          setRowsPerPage={setPerPage}
          totalItems={totalEntries}
        />
      </div>

      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">{modalMode} User</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <FaTrash className="hidden" /> 
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            
            <form onSubmit={modalMode === "Edit" ? handleSaveUser : (e) => { e.preventDefault(); closeModal(); }}>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${selectedUser.avatarBg || 'bg-blue-500'}`}>
                    {selectedUser.initials}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">{selectedUser.name}</div>
                    <div className="text-sm text-slate-500">{selectedUser.email}</div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                  <input required disabled={modalMode === "View"} type="text" value={selectedUser.name || ""} onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
                    <input required disabled={modalMode === "View"} type="text" value={selectedUser.phone || ""} onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
                    <input disabled={modalMode === "View"} type="text" value={selectedUser.city || ""} onChange={(e) => setSelectedUser({...selectedUser, city: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
                    <select disabled={modalMode === "View"} value={selectedUser.gender || ""} onChange={(e) => setSelectedUser({...selectedUser, gender: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500">
                      <option value="">- Select -</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
                    <select disabled={modalMode === "View"} value={selectedUser.status || ""} onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 rounded-b-2xl bg-slate-50 px-6 py-4 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  {modalMode === "View" ? "Close" : "Cancel"}
                </button>
                {modalMode === "Edit" && (
                  <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
