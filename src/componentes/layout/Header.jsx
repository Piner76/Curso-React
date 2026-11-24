import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useCategorias } from "../../context/CategoriasContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Header() {
  const { getCartQuantity } = useCart();
  const { categorias } = useCategorias();
  const { user, logout } = useAuth();
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);
  const navigate = useNavigate();

  const totalItems = getCartQuantity();

  const handleCategoriaClick = (categoriaId) => {
    setMostrarMenu(false);
    setMenuMovil(false);
    navigate(`/comprar?categoria=${categoriaId}`);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-1 text-sm font-medium no-underline transition-colors ${
      isActive ? "text-[#ffb703]" : "text-[#e0e0e0] hover:text-[#ffb703]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#131518] border-b border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <span className="text-2xl">🍷</span>
          <h1 className="text-lg sm:text-xl font-semibold text-[#ffb703] group-hover:text-[#ffc933] transition-colors">
            El Rincón del Brindis
          </h1>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>

          {/* Dropdown Comprar */}
          <div
            className="relative py-2"
            onMouseEnter={() => setMostrarMenu(true)}
            onMouseLeave={() => setMostrarMenu(false)}
          >
            <NavLink to="/comprar" className={navLinkClass}>
              Comprar <span className="text-xs">▾</span>
            </NavLink>

            {mostrarMenu && (
              <ul className="absolute top-full left-0 mt-1 w-56 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden py-2 list-none">
                {categorias.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-[#e0e0e0]">
                    Cargando...
                  </li>
                ) : (
                  categorias.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoriaClick(cat.id)}
                        className="w-full text-left px-4 py-2 text-sm text-[#e0e0e0] hover:bg-[#333] hover:text-[#ffb703] transition-colors bg-transparent border-none cursor-pointer"
                      >
                        {cat.CatNom}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          {/* Admin */}
          {user && user.rol === "admin" && (
            <>
              <NavLink to="/alta" className={navLinkClass}>
                Gestión
              </NavLink>
              <span className="bg-[#ffb703] text-[#131518] px-2.5 py-1 text-xs font-semibold rounded-md">
                ¡Hola, {user.email}!
              </span>
              <button
                onClick={logout}
                className="bg-[#ff4d4d] hover:bg-[#ff6666] text-white text-xs font-semibold px-3 py-1.5 rounded-md border-none cursor-pointer transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          )}

          {/* Carrito desktop */}
          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] text-white border border-[#ffb703] no-underline text-sm font-bold transition-colors hover:text-[#ffb703] ${
                isActive ? "text-[#ffb703]" : ""
              }`
            }
          >
            <span className="text-base">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 flex items-center justify-center bg-[#ffb703] text-[#131518] text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Login desktop */}
          {!user && (
            <NavLink to="/login" className={navLinkClass}>
              Iniciar Sesión
            </NavLink>
          )}
        </nav>

        {/* Botón hamburguesa (móvil) */}
        <button
          className="md:hidden p-2 text-[#e0e0e0] hover:text-[#ffb703] transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => setMenuMovil(!menuMovil)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuMovil ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuMovil && (
        <div className="md:hidden border-t border-[#333] bg-[#131518] px-4 py-3 space-y-2">
          <NavLink
            to="/"
            onClick={() => setMenuMovil(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                isActive
                  ? "bg-[#1a1a1a] text-[#ffb703]"
                  : "text-[#e0e0e0] hover:bg-[#1a1a1a] hover:text-[#ffb703]"
              }`
            }
          >
            Inicio
          </NavLink>

          <div>
            <NavLink
              to="/comprar"
              onClick={() => setMenuMovil(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                  isActive
                    ? "bg-[#1a1a1a] text-[#ffb703]"
                    : "text-[#e0e0e0] hover:bg-[#1a1a1a] hover:text-[#ffb703]"
                }`
              }
            >
              Comprar
            </NavLink>
            <div className="mt-1 ml-3 border-l border-[#333] pl-3 space-y-1">
              {categorias.length === 0 ? (
                <p className="text-xs text-[#e0e0e0] py-1">Cargando...</p>
              ) : (
                categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoriaClick(cat.id)}
                    className="block w-full text-left px-2 py-1.5 text-sm text-[#e0e0e0] hover:text-[#ffb703] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {cat.CatNom}
                  </button>
                ))
              )}
            </div>
          </div>

          {user && user.rol === "admin" && (
            <div className="space-y-2 pt-2 border-t border-[#333]">
              <NavLink
                to="/alta"
                onClick={() => setMenuMovil(false)}
                className="block px-3 py-2 rounded-lg text-sm text-[#e0e0e0] no-underline hover:bg-[#1a1a1a] hover:text-[#ffb703] transition-colors"
              >
                Gestión
              </NavLink>
              <div className="flex items-center justify-between px-3">
                <span className="text-xs font-semibold text-[#ffb703] truncate">
                  {user.email}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMenuMovil(false);
                  }}
                  className="bg-[#ff4d4d] hover:bg-[#ff6666] text-white text-xs font-semibold px-3 py-1.5 rounded-md border-none cursor-pointer transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}

          <NavLink
            to="/carrito"
            onClick={() => setMenuMovil(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg text-sm no-underline bg-[#1a1a1a] text-white border border-[#ffb703] transition-colors hover:text-[#ffb703] ${
                isActive ? "text-[#ffb703]" : ""
              }`
            }
          >
            <span>🛒 Carrito</span>
            {totalItems > 0 && (
              <span className="min-w-[22px] h-5 px-1.5 flex items-center justify-center bg-[#ffb703] text-[#131518] text-xs font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>

          {!user && (
          <NavLink
            to="/login"
            onClick={() => setMenuMovil(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                isActive
                  ? "bg-[#1a1a1a] text-[#ffb703]"
                  : "text-[#e0e0e0] hover:bg-[#1a1a1a] hover:text-[#ffb703]"
              }`
            }
          >
            Iniciar Sesión
          </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;