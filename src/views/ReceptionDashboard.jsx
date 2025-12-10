import { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import { OrderCard } from "../components/OrderCard";
import { ReceptionForm } from "../components/ReceptionForm";
import { Search, Monitor, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export function ReceptionDashboard() {
  const { orders, addOrder, updateOrder, deleteOrder, completeOrder } =
    useOrder();
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme to HTML element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const activeOrders = orders.filter(
    (o) =>
      o.status !== "completed" &&
      (o.plate.includes(filter.toUpperCase()) ||
        o.clientName.toLowerCase().includes(filter.toLowerCase()))
  );

  const completedOrders = orders.filter(
    (o) =>
      o.status === "completed" &&
      (o.plate.includes(filter.toUpperCase()) ||
        o.clientName.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleCreateOrUpdate = (orderData) => {
    if (editingId) {
      updateOrder(editingId, orderData);
      setEditingId(null); // Exit edit mode
    } else {
      addOrder(orderData);
    }
  };

  const handleEditClick = (order) => {
    setEditingId(order.id);
    // Scroll to top mobile friendliness
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const editingOrder = orders.find((o) => o.id === editingId);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6 font-sans transition-colors duration-500">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            Taller<span className="text-blue-600">Flow</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Panel de Recepción
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-yellow-300 font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-300 dark:border-slate-600"
            title={
              theme === "light" ? "Activar Modo Oscuro" : "Activar Modo Claro"
            }
            aria-label="Cambiar tema"
          >
            <span className="transition-transform duration-300">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </span>
            <span className="text-sm hidden sm:inline">
              {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
            </span>
          </button>
          <Link
            to="/tv"
            target="_blank"
            className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition shadow-lg shadow-slate-900/20 dark:shadow-blue-500/20"
          >
            <Monitor size={20} />
            Abrir TV Taller
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-1 space-y-6">
          <ReceptionForm
            onSubmit={handleCreateOrUpdate}
            initialData={editingOrder}
            onCancel={handleCancelEdit}
          />

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
            <h3 className="font-bold text-lg mb-2">Autos en Espera</h3>
            <p className="text-5xl font-black">{activeOrders.length}</p>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por Patente o Cliente..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              En Proceso{" "}
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {activeOrders.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  variant="admin"
                  onEdit={handleEditClick}
                  onDelete={deleteOrder}
                  onComplete={completeOrder}
                />
              ))}
              {activeOrders.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  No hay autos en espera. Agrega uno nuevo.
                </div>
              )}
            </div>
          </div>

          {completedOrders.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-4">
                Completados Hoy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="opacity-60 grayscale hover:grayscale-0 transition-all"
                  >
                    <OrderCard
                      order={order}
                      variant="admin"
                      onDelete={deleteOrder}
                      onEdit={handleEditClick}
                      onComplete={() => {}} // Already complete
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
