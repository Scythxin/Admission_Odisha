import React, { useState, useEffect, useRef } from "react";
import { FaUpload, FaTrash, FaImage, FaUserCircle, FaUniversity, FaCameraRetro, FaSyncAlt, FaFolder, FaFolderPlus, FaArrowLeft, FaSearch } from "react-icons/fa";
import Pagination from "../../components/admin/Pagination";
import API_BASE, { ASSETS_BASE, fetchWithAuth } from "../../config/api";

const tabs = [
  { id: "banners", label: "Banners", icon: <FaImage /> },
  { id: "avatars", label: "Avatars", icon: <FaUserCircle /> },
  { id: "college_gallery", label: "College Gallery", icon: <FaCameraRetro /> },
  { id: "colleges", label: "Colleges", icon: <FaUniversity /> },
];

export default function AdminBanners({ setActiveNav }) {
  const [activeTab, setActiveTab] = useState("banners");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const updateFileInputRef = useRef(null);
  const [updatingImage, setUpdatingImage] = useState(null);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  useEffect(() => {
    setCurrentFolder(null); // Reset folder when tab changes
  }, [activeTab]);

  useEffect(() => {
    fetchImages(activeTab, currentFolder);
  }, [activeTab, currentFolder]);

  const fetchImages = async (type, folder = null) => {
    setLoading(true);
    try {
      const url = `${API_BASE}?r=dashboard/list-media&type=${type}${folder ? `&folder=${folder}` : ""}`;
      const res = await fetchWithAuth(url);
      const json = await res.json();
      if (json.status === "success") {
        setImages(json.data || []);
      } else {
        console.error("Failed to load images:", json.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadFile(file, activeTab, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file || !updatingImage) return;

    await uploadFile(file, activeTab, updatingImage.filename);
    setUpdatingImage(null);
    if (updateFileInputRef.current) updateFileInputRef.current.value = "";
  };

  const uploadFile = async (file, type, oldFilename) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("type", type);
    if (currentFolder) {
      formData.append("folder", currentFolder);
    }
    formData.append("image", file);
    if (oldFilename) {
      formData.append("old_filename", oldFilename);
    }

    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/upload-media`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.status === "success") {
        fetchImages(activeTab, currentFolder); // refresh list
      } else {
        alert(json.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/delete-media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, filename, folder: currentFolder || "" }),
      });
      const json = await res.json();
      if (json.status === "success") {
        fetchImages(activeTab, currentFolder);
      } else {
        alert(json.message || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting item.");
    }
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter new folder name:");
    if (!folderName || !folderName.trim()) return;

    try {
      const res = await fetchWithAuth(`${API_BASE}?r=dashboard/create-media-folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, folder: folderName }),
      });
      const json = await res.json();
      if (json.status === "success") {
        fetchImages(activeTab, currentFolder);
      } else {
        alert(json.message || "Failed to create folder.");
      }
    } catch (err) {
      console.error("Folder creation error:", err);
      alert("Error creating folder.");
    }
  };

  const filteredData = images.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);
  const currentPage = Math.min(page, totalPages);
  const displayedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">
            Dashboard &gt; Media Manager
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Media Manager
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {!currentFolder && (
            <button
              type="button"
              onClick={handleCreateFolder}
              className="inline-flex items-center justify-center rounded-2xl bg-white border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FaFolderPlus className="mr-2 text-slate-400" /> 
              Create Folder
            </button>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-70"
          >
            <FaUpload className="mr-2" /> 
            {uploading ? "Uploading..." : "Upload New File"}
          </button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/png, image/jpeg, image/jpg, image/webp" 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={updateFileInputRef} 
          onChange={handleUpdate} 
          accept="image/png, image/jpeg, image/jpg, image/webp" 
          className="hidden" 
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 border border-slate-200 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search by file name..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm min-h-[400px]">
        {currentFolder && (
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <button
              onClick={() => setCurrentFolder(null)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              title="Back to root"
            >
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <FaFolder className="text-indigo-400" /> {currentFolder}
            </span>
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center text-slate-400">
            <div className="flex flex-col items-center gap-3">
              <FaSyncAlt className="animate-spin text-3xl text-indigo-300" />
              <p>Loading media...</p>
            </div>
          </div>
        ) : displayedData.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <FaImage className="mb-4 text-5xl text-slate-300" />
            <p className="text-lg font-semibold text-slate-600">No items found</p>
            <p className="mt-1 text-sm text-slate-400">Upload files or create folders here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedData.map((item) => (
              item.is_dir ? (
                <div 
                  key={item.filename}
                  className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md flex flex-col items-center justify-center gap-3"
                  onClick={() => setCurrentFolder(item.filename)}
                >
                  <FaFolder className="text-5xl text-indigo-300 transition group-hover:text-indigo-400" />
                  <p className="truncate w-full text-center text-sm font-semibold text-slate-700" title={item.filename}>
                    {item.filename}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.filename);
                    }}
                    className="mt-2 rounded-xl bg-rose-50 px-3 py-1.5 text-xs text-rose-600 transition hover:bg-rose-100"
                    title="Delete Folder"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div 
                  key={item.filename} 
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img 
                      src={`${ASSETS_BASE}${item.url}`} 
                      alt={item.filename} 
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col p-3">
                    <p className="truncate text-xs font-medium text-slate-700" title={item.filename}>
                      {item.filename}
                    </p>
                    
                    <div className="mt-3 flex justify-between gap-2">
                      <button
                        onClick={() => {
                          setUpdatingImage(item);
                          updateFileInputRef.current?.click();
                        }}
                        className="flex-1 rounded-xl bg-blue-50 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                        title="Update Image (Preserve Name)"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item.filename)}
                        className="flex-none rounded-xl bg-rose-50 px-3 py-1.5 text-xs text-rose-600 transition hover:bg-rose-100"
                        title="Delete Image"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && displayedData.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalItems={filteredData.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}
