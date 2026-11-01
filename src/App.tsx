import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react"

type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  regular: number
  image: string
  sku: string
  specs: string[]
  stock: boolean
  rating: number
  socket?: string
  memory?: string
  watt?: number
}

type CartItem = {
  product: Product
  qty: number
}

const pcImage =
  "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85"
const setupImage =
  "https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=1600&q=85"
const componentImage =
  "https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?auto=format&fit=crop&w=1200&q=85"
const gpuImage =
  "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=85"
const serverImage =
  "https://images.unsplash.com/photo-1762163516269-3c143e04175c?auto=format&fit=crop&w=1400&q=85"
const laptopImage =
  "https://images.unsplash.com/photo-1785245566050-8aaa947c74b8?auto=format&fit=crop&w=1400&q=85"

const products: Product[] = [
  {
    id: "phantom-x15",
    name: "TechNexa Phantom X15 Custom Gaming PC",
    brand: "TechNexa",
    category: "Desktop PC",
    price: 145500,
    regular: 158000,
    image: pcImage,
    sku: "TN-PC-2026-X15",
    specs: ["Ryzen 7 7800X3D", "RTX 4070 Super 12GB", "32GB DDR5 · 1TB NVMe"],
    stock: true,
    rating: 4.9,
    watt: 485,
  },
  {
    id: "ryzen-7800x3d",
    name: "AMD Ryzen 7 7800X3D Desktop Processor",
    brand: "AMD",
    category: "Processor",
    price: 47200,
    regular: 49500,
    image: componentImage,
    sku: "AMD-7800X3D",
    specs: ["8 cores · 16 threads", "AM5 socket", "Up to 5.0GHz*"],
    stock: true,
    rating: 4.9,
    socket: "AM5",
    watt: 120,
  },
  {
    id: "rtx-4070-super",
    name: "NVIDIA RTX 4070 Super 12GB Graphics Card",
    brand: "NVIDIA",
    category: "Graphics Card",
    price: 89500,
    regular: 94000,
    image: gpuImage,
    sku: "NV-4070S-12",
    specs: ["12GB GDDR6X*", "PCIe 4.0*", "Illustrative specifications"],
    stock: true,
    rating: 4.8,
    watt: 220,
  },
  {
    id: "ddr5-32",
    name: "32GB DDR5 6000MHz RGB Memory Kit",
    brand: "Corsair",
    category: "RAM",
    price: 14200,
    regular: 15500,
    image: componentImage,
    sku: "COR-DDR5-32",
    specs: ["2 × 16GB", "DDR5 6000MHz", "RGB heat spreader"],
    stock: true,
    rating: 4.7,
    memory: "DDR5",
    watt: 10,
  },
  {
    id: "nvme-1tb",
    name: "1TB NVMe PCIe 4.0 SSD",
    brand: "Kingston",
    category: "Storage",
    price: 11800,
    regular: 12900,
    image: componentImage,
    sku: "KIN-NVME-1T",
    specs: ["1TB capacity", "PCIe 4.0 NVMe", "Illustrative performance"],
    stock: true,
    rating: 4.7,
    watt: 7,
  },
  {
    id: "psu-750",
    name: "750W 80+ Gold Modular Power Supply",
    brand: "Corsair",
    category: "Power Supply",
    price: 12800,
    regular: 13900,
    image: gpuImage,
    sku: "COR-PSU-750",
    specs: ["750W capacity", "80+ Gold", "Fully modular"],
    stock: true,
    rating: 4.8,
    watt: 750,
  },
  {
    id: "aio-360",
    name: "360mm AIO Liquid Cooler",
    brand: "DeepCool",
    category: "Cooling",
    price: 15500,
    regular: 16900,
    image: componentImage,
    sku: "DC-AIO-360",
    specs: ["360mm radiator", "ARGB fans", "Illustrative compatibility"],
    stock: false,
    rating: 4.6,
    watt: 18,
  },
  {
    id: "nexa-pro-16",
    name: "NexaBook Pro 16 Performance Laptop",
    brand: "TechNexa",
    category: "Laptop",
    price: 132000,
    regular: 145000,
    image: laptopImage,
    sku: "TN-NB-P16",
    specs: ["16-inch display*", "32GB memory*", "1TB SSD*"],
    stock: true,
    rating: 4.6,
    watt: 90,
  },
]

const categories = [
  [
    "Desktop & Custom Builds",
    "Performance systems engineered around your workflow.",
    pcImage,
    "/categories/desktop-pc",
  ],
  [
    "Components & Hardware",
    "Processors, graphics, memory, storage and power.",
    componentImage,
    "/categories/components",
  ],
  [
    "Laptops & Notebooks",
    "Portable performance for work, study and play.",
    laptopImage,
    "/categories/laptops",
  ],
  [
    "Networking & Enterprise",
    "Connected infrastructure built for scale.",
    serverImage,
    "/categories/networking",
  ],
  [
    "Peripherals & Gaming",
    "Precision gear for immersive setups.",
    setupImage,
    "/categories/peripherals",
  ],
  [
    "Smart Gadgets & Office",
    "Smarter tools for a more capable workspace.",
    laptopImage,
    "/categories/smart-gadgets",
  ],
]

const money = (value: number) =>
  `৳ ${new Intl.NumberFormat("en-IN").format(value)}`

type IconName = "search" | "user" | "heart" | "compare" | "cart" | "sun" | "moon" | "menu" | "arrow" | "close" | "check" | "bolt" | "location" | "shield" | "tools" | "phone" | "building" | "plus" | "minus" | "trash" | "grid" | "list"

type IconProps = {
  name: IconName
  size?: number
}

function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.7-5 3.3-7 8-7s7.3 2 8 7" />
      </>
    ),
    heart: (
      <path d="M20.8 4.8c-2-2-5.2-2-7.2 0L12 6.4l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 20.8l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z" />
    ),
    compare: (
      <>
        <path d="M7 3v18M17 3v18M3 7l4-4 4 4M13 17l4 4 4-4" />
      </>
    ),
    cart: (
      <>
        <path d="M3 3h2l2.2 11h10.9l2-7H6" />
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    moon: <path d="M20.5 15.5A9 9 0 0 1 8.5 3.5a9 9 0 1 0 12 12Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />,
    tools: <path d="m14 7 3-3 3 3-3 3m-3-3L4 17l3 3L17 10M4 4l6 6" />,
    phone: (
      <path d="M6.6 3h3l1.5 4-2 1.6a15 15 0 0 0 6.3 6.3l1.6-2 4 1.5v3c0 2-1.6 3.6-3.6 3.6A14.4 14.4 0 0 1 3 6.6C3 4.6 4.6 3 6.6 3Z" />
    ),
    building: (
      <path d="M4 21V5l8-3 8 3v16M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M2 21h20" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    trash: <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />,
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    list: <path d="M9 6h11M9 12h11M9 18h11M4 6h.1M4 12h.1M4 18h.1" />,
  }
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  disabled,
  type = "button",
  className = "",
}: {
  children?: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "icon" | "danger"
  icon?: IconName
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
  className?: string
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}

function LinkButton({
  to,
  children,
  className = "",
  style,
}: {
  to: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <a className={className} href={to} style={style}>
      {children}
    </a>
  )
}

function Heading({
  level = 2,
  children,
  className = "",
}: {
  level?: 1 | 2 | 3 | 4
  children: ReactNode
  className?: string
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4"
  return <Tag className={className}>{children}</Tag>
}

function Logo() {
  return (
    <LinkButton to="/" className="logo" aria-label="TechNexa home">
      <span className="logo-mark">
        <span />
      </span>
      <span className="logo-type">
        TECH<span>NEXA</span>
        <small>Systems & Engineering</small>
      </span>
    </LinkButton>
  )
}

function ProductCard({
  product,
  onAdd,
  onWish,
  wished,
  onCompare,
  compared,
  layout = "grid",
}: {
  product: Product
  onAdd: (p: Product) => void
  onWish: (p: Product) => void
  wished: boolean
  onCompare: (p: Product) => void
  compared: boolean
  layout?: "grid" | "list"
}) {
  const discount = Math.round((1 - product.price / product.regular) * 100)
  return (
    <article className={`product-card ${layout}`}>
      <div className="product-media">
        <span className="discount">−{discount}%</span>
        <Button
          variant="icon"
          className={wished ? "is-active" : ""}
          icon="heart"
          onClick={() => onWish(product)}
        />
        <LinkButton to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </LinkButton>
      </div>
      <div className="product-info">
        <span className="eyebrow">
          {product.brand} · {product.category}
        </span>
        <Heading level={3}>
          <LinkButton to={`/products/${product.id}`}>{product.name}</LinkButton>
        </Heading>
        <span className="sku">{product.sku}</span>
        <div className="rating">
          <span>★★★★★</span> {product.rating} <small>(sample)</small>
        </div>
        <ul className="mini-specs">
          {product.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="stock-row">
          <span className={product.stock ? "stock in" : "stock out"}>
            {product.stock ? "In stock" : "Out of stock"}
          </span>
          <span>EMI available*</span>
        </div>
        <div className="price">
          <strong>{money(product.price)}</strong>
          <del>{money(product.regular)}</del>
        </div>
        <div className="card-actions">
          <Button
            onClick={() => onAdd(product)}
            disabled={!product.stock}
            icon="cart"
          >
            {product.stock ? "Add to cart" : "Unavailable"}
          </Button>
          <Button
            variant="secondary"
            className={compared ? "is-active" : ""}
            icon="compare"
            onClick={() => onCompare(product)}
            aria-label="Compare"
          />
        </div>
      </div>
    </article>
  )
}

function SectionHeading({
  kicker,
  title,
  copy,
  action,
}: {
  kicker?: string
  title: string
  copy?: string
  action?: ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        {kicker && <span className="kicker">{kicker}</span>}
        <Heading>{title}</Heading>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [theme, setTheme] = useState<"dark" | "light">(
    localStorage.getItem("tn-theme") as "dark" | "light" || "dark",
  )
  const [cart, setCart] = useState<CartItem[]>(() =>
    JSON.parse(sessionStorage.getItem("tn-cart") || "[]"),
  )
  const [wishlist, setWishlist] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem("tn-wish") || "[]"),
  )
  const [compare, setCompare] = useState<string[]>([])
  const [toast, setToast] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [announcement, setAnnouncement] = useState(true)

  useEffect(() => {
    const navigate = () => {
      setPath(window.location.pathname)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    window.addEventListener("popstate", navigate)
    const click = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a")
      if (anchor?.href.startsWith(window.location.origin)) {
        event.preventDefault()
        history.pushState({}, "", anchor.getAttribute("href"))
        navigate()
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener("click", click)
    return () => {
      window.removeEventListener("popstate", navigate)
      document.removeEventListener("click", click)
    }
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("tn-theme", theme)
  }, [theme])
  useEffect(() => {
    sessionStorage.setItem("tn-cart", JSON.stringify(cart))
  }, [cart])
  useEffect(() => {
    sessionStorage.setItem("tn-wish", JSON.stringify(wishlist))
  }, [wishlist])
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(""), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const addToCart = (product: Product) => {
    setCart((items) =>
      items.some((x) => x.product.id === product.id)
        ? items.map((x) =>
            x.product.id === product.id ? { ...x, qty: x.qty + 1 } : x,
          )
        : [...items, { product, qty: 1 }],
    )
    setToast(`${product.name} added to cart`)
  }
  const toggleWish = (product: Product) => {
    setWishlist((ids) =>
      ids.includes(product.id)
        ? ids.filter((id) => id !== product.id)
        : [...ids, product.id],
    )
    setToast(
      wishlist.includes(product.id)
        ? "Removed from wishlist"
        : "Saved to wishlist",
    )
  }
  const toggleCompare = (product: Product) => {
    if (!compare.includes(product.id) && compare.length >= 4)
      return setToast("You can compare up to four products")
    setCompare((ids) =>
      ids.includes(product.id)
        ? ids.filter((id) => id !== product.id)
        : [...ids, product.id],
    )
  }
  const totalQty = cart.reduce((sum, x) => sum + x.qty, 0)
  const subtotal = cart.reduce((sum, x) => sum + x.qty * x.product.price, 0)

  const commerce = {
    cart,
    setCart,
    addToCart,
    toggleWish,
    wishlist,
    toggleCompare,
    compare,
    setToast,
  }
  let page: ReactNode
  if (path === "/") page = <Home {...commerce} />
  else if (path === "/pc-builder")
    page = <Builder addToCart={addToCart} setToast={setToast} />
  else if (path === "/cart")
    page = <CartPage cart={cart} setCart={setCart} subtotal={subtotal} />
  else if (path === "/checkout")
    page = <Checkout subtotal={subtotal} cart={cart} />
  else if (path.startsWith("/products/"))
    page = (
      <ProductDetail
        product={products.find((p) => path.endsWith(p.id)) || products[0]}
        {...commerce}
      />
    )
  else if (path === "/warranty" || path === "/warranty/lookup")
    page = <Warranty lookup={path.endsWith("lookup")} />
  else if (path === "/stores") page = <Stores />
  else if (path === "/services") page = <Services />
  else if (path === "/corporate") page = <Corporate />
  else if (path === "/about") page = <About />
  else if (path === "/contact" || path === "/support") page = <Contact />
  else if (path.startsWith("/account"))
    page = (
      <Account
        wishlist={products.filter((p) => wishlist.includes(p.id))}
        addToCart={addToCart}
      />
    )
  else
    page = (
      <Catalog
        title={
          path === "/deals"
            ? "Current Offers"
            : path === "/search"
              ? `Search${query ? `: ${query}` : ""}`
              : "Technology Catalog"
        }
        {...commerce}
        initialQuery={path === "/search" ? query : ""}
      />
    )

  const searchResults = products
    .filter((p) =>
      `${p.name} ${p.brand} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 4)
  return (
    <div className="app-shell">
      {announcement && (
        <div className="announcement">
          <span>
            Boishakhi Tech Utshob 1433 — Up to 18% OFF on selected laptops.
          </span>
          <span className="announcement-meta">Hotline 16899 · EN / বাংলা</span>
          <Button
            variant="icon"
            icon="close"
            onClick={() => setAnnouncement(false)}
          />
        </div>
      )}
      <header className="site-header">
        <div className="main-header container">
          <Button
            variant="icon"
            icon="menu"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
          />
          <Logo />
          <div className="search-wrap">
            <Icon name="search" />
            <input
              aria-label="Search products"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search processors, graphics cards, laptops, brands..."
            />
            <kbd>⌘ K</kbd>
            {searchOpen && (
              <div className="search-panel">
                <div className="search-label">
                  {query ? "Suggested products" : "Popular searches"}
                </div>
                {!query && (
                  <div className="search-chips">
                    {["Ryzen 7", "RTX 4070", "DDR5 RAM", "Gaming laptop"].map(
                      (x) => (
                        <button key={x} onClick={() => setQuery(x)}>
                          {x}
                        </button>
                      ),
                    )}
                  </div>
                )}
                {query &&
                  searchResults.map((p) => (
                    <LinkButton
                      to={`/products/${p.id}`}
                      className="search-result"
                      key={p.id}
                    >
                      <img src={p.image} alt="" />
                      <span>
                        {p.name}
                        <small>{p.category}</small>
                      </span>
                      <strong>{money(p.price)}</strong>
                    </LinkButton>
                  ))}
                {query && !searchResults.length && (
                  <div className="empty-mini">
                    No exact match. Try a category or brand.
                  </div>
                )}
                <LinkButton
                  className="search-all"
                  to={`/search?q=${encodeURIComponent(query)}`}
                >
                  View all search results <Icon name="arrow" />
                </LinkButton>
              </div>
            )}
          </div>
          <div className="header-actions">
            <LinkButton to="/account" className="header-action">
              <Icon name="user" />
              <span>Account</span>
            </LinkButton>
            <button
              className="header-action"
              onClick={() =>
                setToast(
                  compare.length
                    ? `${compare.length} products selected to compare`
                    : "Select products to compare",
                )
              }
            >
              <Icon name="compare" />
              <span>Compare</span>
              {compare.length > 0 && <b>{compare.length}</b>}
            </button>
            <LinkButton to="/account/wishlist" className="header-action">
              <Icon name="heart" />
              <span>Wishlist</span>
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </LinkButton>
            <button className="header-action" onClick={() => setCartOpen(true)}>
              <Icon name="cart" />
              <span>Cart</span>
              {totalQty > 0 && <b>{totalQty}</b>}
            </button>
            <Button
              variant="icon"
              icon={theme === "dark" ? "sun" : "moon"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <LinkButton to="/pc-builder" className="builder-cta">
              <Icon name="bolt" /> PC Builder
            </LinkButton>
          </div>
        </div>
        <nav className="category-nav">
          <div className="container nav-inner">
            <div className="mega-trigger">
              <LinkButton to="/categories/desktop-pc">
                Desktop & Custom
              </LinkButton>
            </div>
            <div className="mega-trigger has-mega">
              <LinkButton to="/categories/components">
                Components & Hardware
              </LinkButton>
              <MegaMenu />
            </div>
            <LinkButton to="/categories/laptops">Laptops</LinkButton>
            <LinkButton to="/categories/networking">
              Networking & Enterprise
            </LinkButton>
            <LinkButton to="/categories/peripherals">
              Peripherals & Gaming
            </LinkButton>
            <LinkButton to="/categories/smart-gadgets">
              Smart Gadgets
            </LinkButton>
            <LinkButton to="/deals" className="deal-link">
              Deals
            </LinkButton>
            <LinkButton to="/services">Services</LinkButton>
            <LinkButton to="/corporate">Corporate</LinkButton>
          </div>
        </nav>
      </header>
      {searchOpen && (
        <button
          className="page-scrim search-scrim"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
        />
      )}
      <main>{page}</main>
      <Footer />
      <SupportWidget setToast={setToast} />
      {toast && (
        <div className="toast">
          <Icon name="check" />
          {toast}
        </div>
      )}
      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        setCart={setCart}
      />
      <MobileDrawer open={mobileOpen} close={() => setMobileOpen(false)} />
    </div>
  )
}

function MegaMenu() {
  const groups = [
    ["Processors", "Intel Processors", "AMD Processors"],
    ["Graphics Cards", "NVIDIA GeForce", "AMD Radeon", "Intel Arc"],
    ["Motherboards", "Intel Platform", "AMD Platform"],
    ["Memory & Storage", "DDR4 Memory", "DDR5 Memory", "NVMe SSD", "SATA SSD"],
    ["Power & Cooling", "Power Supplies", "Air Coolers", "Liquid Coolers"],
  ]
  return (
    <div className="mega-menu">
      {groups.map(([title, ...items]) => (
        <div key={title}>
          <strong>{title}</strong>
          {items.map((x) => (
            <LinkButton to="/categories/components" key={x}>
              {x}
            </LinkButton>
          ))}
        </div>
      ))}
      <div
        className="mega-feature"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(8,11,18,.95),rgba(8,11,18,.25)),url(${componentImage})`,
        }}
      >
        <span>ENGINEERED TOGETHER</span>
        <strong>Find compatible hardware faster.</strong>
        <LinkButton to="/pc-builder">
          Launch PC Builder <Icon name="arrow" />
        </LinkButton>
      </div>
    </div>
  )
}

type MobileDrawerProps = {
  open: boolean
  close: () => void
}

function MobileDrawer({ open, close }: MobileDrawerProps) {
  return (
    <>
      <aside className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <Logo />
          <Button variant="icon" icon="close" onClick={close} />
        </div>
        <nav>
          {[
            ["Shop", "/shop"],
            ["Components", "/categories/components"],
            ["Laptops", "/categories/laptops"],
            ["PC Builder", "/pc-builder"],
            ["Deals", "/deals"],
            ["Warranty", "/warranty"],
            ["Stores", "/stores"],
            ["Services", "/services"],
            ["Corporate", "/corporate"],
            ["Account", "/account"],
          ].map(([x, to]) => (
            <LinkButton key={x} to={to}>
              {x}
              <Icon name="arrow" />
            </LinkButton>
          ))}
        </nav>
        <div className="drawer-contact">
          Hotline <strong>16899</strong>
          <small>English / বাংলা</small>
        </div>
      </aside>
      {open && (
        <button
          className="page-scrim"
          aria-label="Close menu"
          onClick={close}
        />
      )}
    </>
  )
}

function Home(props: any) {
  const [slide, setSlide] = useState(0)
  const slides = [
    [
      "PERFORMANCE / CUSTOM SYSTEMS",
      "POWER BEYOND LIMITS.",
      "Engineered gaming PCs. Authentic components. Performance without compromise.",
      setupImage,
      "/categories/desktop-pc",
      "Explore Gaming PCs",
      "/pc-builder",
      "Build Your Rig",
    ],
    [
      "PROCESSORS / AMD RYZEN",
      "THE NEXT ERA OF PROCESSING.",
      "Discover the latest AMD Ryzen processor lineup.",
      componentImage,
      "/categories/components",
      "Explore Processors",
      "/shop",
      "Shop AMD",
    ],
    [
      "ENTERPRISE / INFRASTRUCTURE",
      "BUILT FOR WHAT'S NEXT.",
      "Enterprise servers, networking, and intelligent workstation solutions.",
      serverImage,
      "/corporate",
      "Explore Enterprise",
      "/contact",
      "Contact Sales",
    ],
    [
      "BOISHAKHI TECH UTSHOB 1433",
      "UPGRADE YOUR DIGITAL WORLD.",
      "Enjoy up to 18% flat discount on selected laptops. 0% EMI up to 12 months with eligible City Bank Citygem and EBL cards.",
      laptopImage,
      "/deals",
      "Explore Offers",
      "/categories/laptops",
      "Shop Laptops",
    ],
  ]
  useEffect(() => {
    const id = setInterval(() => setSlide((x) => (x + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [])
  const active = slides[slide]
  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(8,11,18,.96) 0%,rgba(8,11,18,.65) 47%,rgba(8,11,18,.1) 80%),url(${active[3]})`,
        }}
      >
        <div className="hero-grid" />
        <div className="container hero-content">
          <span className="kicker">{active[0]}</span>
          <Heading level={1}>{active[1]}</Heading>
          <p>{active[2]}</p>
          <div className="hero-actions">
            <LinkButton className="btn btn-primary" to={active[4]}>
              {active[5]} <Icon name="arrow" />
            </LinkButton>
            <LinkButton className="btn btn-secondary" to={active[6]}>
              {active[7]}
            </LinkButton>
          </div>
          <div className="hero-proof">
            <span>
              <b>2011</b> Founded in Bangladesh
            </span>
            <span>
              <b>ISO</b> 9001:2015
            </span>
            <span>
              <b>16899</b> Support hotline
            </span>
          </div>
        </div>
        <Button
          variant="icon"
          className="hero-prev"
          icon="arrow"
          onClick={() => setSlide((slide + slides.length - 1) % slides.length)}
        />
        <Button
          variant="icon"
          className="hero-next"
          icon="arrow"
          onClick={() => setSlide((slide + 1) % slides.length)}
        />
        <div className="hero-dots">
          {slides.map((x, i) => (
            <button
              aria-label={`Show ${x[1]}`}
              className={i === slide ? "active" : ""}
              onClick={() => setSlide(i)}
              key={x[1]}
            />
          ))}
        </div>
      </section>
      <section className="service-rail container">
        {[
          [
            "bolt",
            "PC Builder",
            "Configure your perfect system.",
            "/pc-builder",
          ],
          [
            "shield",
            "Warranty Check",
            "Verify your product warranty.",
            "/warranty/lookup",
          ],
          [
            "location",
            "Store Locator",
            "Find your nearest TechNexa outlet.",
            "/stores",
          ],
          [
            "building",
            "Corporate Solutions",
            "Technology infrastructure for business.",
            "/corporate",
          ],
        ].map(([icon, title, copy, to]) => (
          <LinkButton to={to} className="service-tile" key={title}>
            <Icon name={icon as IconName} size={26} />
            <span>
              <strong>{title}</strong>
              <small>{copy}</small>
            </span>
            <Icon name="arrow" />
          </LinkButton>
        ))}
      </section>
      <section className="section container">
        <SectionHeading
          kicker="DISCOVER"
          title="Explore the Tech Universe"
          copy="Purpose-built categories for every kind of digital ambition."
        />
        <div className="category-grid">
          {categories.map(([title, copy, image, to], i) => (
            <LinkButton
              to={to}
              className={`category-card category-${i}`}
              key={title}
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(8,11,18,.95),rgba(8,11,18,.08)),url(${image})`,
              }}
            >
              <span>{copy}</span>
              <Heading level={3}>{title}</Heading>
              <Icon name="arrow" />
            </LinkButton>
          ))}
        </div>
      </section>
      <section className="section products-section">
        <div className="container">
          <SectionHeading
            kicker="CURATED HARDWARE"
            title="Performance Picks"
            copy="Hardware selected for performance, reliability, and value."
            action={
              <LinkButton className="text-link" to="/shop">
                View all products <Icon name="arrow" />
              </LinkButton>
            }
          />
          <div className="tabs">
            <button className="active">Trending</button>
            <button>Best Sellers</button>
            <button>New Arrivals</button>
            <button>Special Offers</button>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={props.addToCart}
                onWish={props.toggleWish}
                wished={props.wishlist.includes(p.id)}
                onCompare={props.toggleCompare}
                compared={props.compare.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>
      <Flagship addToCart={props.addToCart} />
      <section className="section container">
        <SectionHeading
          kicker="TRUSTED NAMES"
          title="Technology's Leading Brands"
          copy="Browse products from established global technology manufacturers."
        />
        <div className="brand-row">
          {[
            "intel",
            "AMD",
            "NVIDIA",
            "ASUS",
            "MSI",
            "GIGABYTE",
            "CORSAIR",
            "Kingston",
            "SAMSUNG",
            "logitech",
            "HP",
            "Lenovo",
            "Apple",
          ].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>
      <section className="promo-split container">
        <div
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(8,11,18,.96),rgba(8,11,18,.25)),url(${laptopImage})`,
          }}
        >
          <span className="kicker">BOISHAKHI TECH UTSHOB</span>
          <Heading level={2}>
            UPGRADE MORE.
            <br />
            SPEND SMARTER.
          </Heading>
          <p>
            Selected laptop offers and indicative EMI options for eligible
            cards.
          </p>
          <LinkButton className="btn btn-primary" to="/deals">
            Explore offers <Icon name="arrow" />
          </LinkButton>
        </div>
        <div className="offer-stack">
          <article>
            <span>GAMING ESSENTIALS</span>
            <strong>Bundle your setup</strong>
            <small>Illustrative promotional bundle pricing.</small>
          </article>
          <article>
            <span>FLEXIBLE PAYMENTS</span>
            <strong>EMI up to 36 months*</strong>
            <small>Subject to product and bank eligibility.</small>
          </article>
        </div>
      </section>
      <TrustAndStores />
    </>
  )
}

function Flagship({ addToCart }: { addToCart: (p: Product) => void }) {
  const p = products[0]
  return (
    <section className="flagship">
      <div className="container flagship-inner">
        <div className="flagship-image">
          <span className="flagship-number">X15</span>
          <img src={p.image} alt={p.name} />
        </div>
        <div className="flagship-copy">
          <span className="kicker">NEXA SIGNATURE SYSTEM / 01</span>
          <Heading level={2}>PHANTOM X15</Heading>
          <p className="lead">
            Elite performance, precisely assembled. A flagship AM5 gaming system
            engineered for high-refresh play and demanding creative workloads.
          </p>
          <div className="spec-chips">
            {[
              "Ryzen 7 7800X3D",
              "RTX 4070 Super 12GB",
              "32GB DDR5 6000MHz",
              "1TB NVMe PCIe 4.0",
              "750W 80+ Gold",
              "360mm AIO",
            ].map((x) => (
              <span key={x}>
                <Icon name="check" />
                {x}
              </span>
            ))}
          </div>
          <div className="flagship-price">
            <div>
              <del>{money(p.regular)}</del>
              <strong>{money(p.price)}</strong>
            </div>
            <span className="stock in">In Stock · Elephant Road & Online</span>
          </div>
          <div className="hero-actions">
            <LinkButton className="btn btn-primary" to={`/products/${p.id}`}>
              View details <Icon name="arrow" />
            </LinkButton>
            <Button
              variant="secondary"
              onClick={() => addToCart(p)}
              icon="cart"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustAndStores() {
  const stores = [
    ["Elephant Road", "Custom Gaming & Components"],
    ["Agargaon", "Laptops & Official Accessories"],
    ["Uttara", "Premium Audio & Smart Home"],
    ["Chattogram", "Full Range & Regional Hub"],
    ["Sylhet", "Retail & Student Solutions"],
  ]
  return (
    <>
      <section className="section container">
        <SectionHeading
          kicker="WHY TECHNEXA"
          title="Confidence, built into every purchase."
        />
        <div className="trust-grid">
          {[
            [
              "shield",
              "Authentic Products",
              "A catalog designed around transparent sourcing and clear product identification.",
            ],
            [
              "check",
              "Official Brand Warranty",
              "Warranty information presented clearly at the point of purchase.",
            ],
            [
              "tools",
              "Expert Technical Support",
              "Guidance from product selection through system configuration.",
            ],
            [
              "location",
              "Nationwide Retail Presence",
              "A growing physical network supported by central fulfilment.",
            ],
          ].map(([icon, title, copy]) => (
            <article key={title}>
              <Icon name={icon as IconName} />
              <Heading level={3}>{title}</Heading>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="testimonial">
        <div className="container testimonial-inner">
          <span className="quote-mark">“</span>
          <div>
            <span className="kicker">
              SUPPLIED SAMPLE TESTIMONIAL · PROTOTYPE DATA
            </span>
            <blockquote>
              Ordered a custom workstation through the PC Builder tool on
              Tuesday night. Received all parts with original brand warranties
              delivered right to my home via TechNexa Express by Thursday
              afternoon. Extremely satisfied with the packaging and cable
              management!
            </blockquote>
            <strong>Tanvir Ahmed</strong>
            <small>
              Senior Software Engineer · Mirpur-10, Dhaka · 5/5 sample rating
            </small>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          kicker="RETAIL NETWORK"
          title="Technology, Closer to You."
          copy="Expert advice, products and technical support at selected locations."
          action={
            <LinkButton className="text-link" to="/stores">
              View all stores <Icon name="arrow" />
            </LinkButton>
          }
        />
        <div className="store-preview">
          {stores.map(([name, focus], i) => (
            <LinkButton to="/stores" key={name}>
              <span>0{i + 1}</span>
              <Heading level={3}>{name}</Heading>
              <small>{focus}</small>
              <Icon name="arrow" />
            </LinkButton>
          ))}
        </div>
      </section>
      <section className="newsletter container">
        <div>
          <span className="kicker">THE NEXA SIGNAL</span>
          <Heading level={2}>Stay Ahead of Technology.</Heading>
          <p>Product launches, useful buying guides and selected offers.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Email address" />
          <Button type="submit">Join TechNexa Updates</Button>
        </form>
      </section>
    </>
  )
}

function Catalog({
  title,
  addToCart,
  toggleWish,
  wishlist,
  toggleCompare,
  compare,
  initialQuery = "",
}: any) {
  const [brand, setBrand] = useState("All")
  const [stockOnly, setStockOnly] = useState(false)
  const [sort, setSort] = useState("featured")
  const [density, setDensity] = useState(3)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [q, setQ] = useState(initialQuery)
  const filtered = useMemo(() => {
    let data = products.filter(
      (p) =>
        (brand === "All" || p.brand === brand) &&
        (!stockOnly || p.stock) &&
        (!q ||
          `${p.name} ${p.category} ${p.brand}`
            .toLowerCase()
            .includes(q.toLowerCase())),
    )
    if (sort === "low") data = [...data].sort((a, b) => a.price - b.price)
    if (sort === "high") data = [...data].sort((a, b) => b.price - a.price)
    if (sort === "rating") data = [...data].sort((a, b) => b.rating - a.rating)
    return data
  }, [brand, stockOnly, sort, q])
  return (
    <div className="page container">
      <div className="breadcrumbs">
        Home / Catalog / <span>{title}</span>
      </div>
      <div className="catalog-hero">
        <div>
          <span className="kicker">TECHNEXA CATALOG / 2026</span>
          <Heading level={1}>{title}</Heading>
          <p>
            Explore specialist hardware with technical context, transparent
            pricing and practical compatibility guidance.
          </p>
        </div>
        <div
          className="catalog-visual"
          style={{ backgroundImage: `url(${componentImage})` }}
        />
      </div>
      <div className="catalog-layout">
        <aside className="filters">
          <div className="filter-head">
            <strong>Filter products</strong>
            <button
              onClick={() => {
                setBrand("All")
                setStockOnly(false)
                setQ("")
              }}
            >
              Clear all
            </button>
          </div>
          <label className="filter-search">
            <Icon name="search" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter catalog"
            />
          </label>
          <fieldset>
            <legend>Brand</legend>
            {[
              "All",
              "TechNexa",
              "AMD",
              "NVIDIA",
              "Corsair",
              "Kingston",
              "DeepCool",
            ].map((b) => (
              <label key={b}>
                <input
                  type="radio"
                  checked={brand === b}
                  onChange={() => setBrand(b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Availability</legend>
            <label>
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
              />
              <span>In stock only</span>
            </label>
          </fieldset>
          <fieldset>
            <legend>Price range</legend>
            <input type="range" min="0" max="160000" defaultValue="160000" />
            <div className="range-labels">
              <span>৳ 0</span>
              <span>৳ 1,60,000</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Platform filters</legend>
            {["AM5 Socket", "DDR5", "PCIe 4.0", "80+ Gold"].map((x) => (
              <label key={x}>
                <input type="checkbox" />
                <span>{x}</span>
              </label>
            ))}
          </fieldset>
          <small className="prototype-note">
            Prototype filters use illustrative local product data.
          </small>
        </aside>
        <div className="catalog-main">
          <div className="catalog-toolbar">
            <div>
              <strong>{filtered.length} results</strong>
              {brand !== "All" && (
                <span className="filter-chip">{brand} ×</span>
              )}
            </div>
            <div className="toolbar-controls">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
              <div className="density">
                {[2, 3, 4].map((x) => (
                  <button
                    key={x}
                    className={density === x ? "active" : ""}
                    onClick={() => {
                      setDensity(x)
                      setView("grid")
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <Button
                variant="icon"
                icon={view === "grid" ? "list" : "grid"}
                onClick={() => setView(view === "grid" ? "list" : "grid")}
              />
            </div>
          </div>
          {filtered.length ? (
            <div
              className={`product-grid catalog-products density-${density} ${view}`}
            >
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={addToCart}
                  onWish={toggleWish}
                  wished={wishlist.includes(p.id)}
                  onCompare={toggleCompare}
                  compared={compare.includes(p.id)}
                  layout={view}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={40} />
              <Heading level={2}>No matching hardware</Heading>
              <p>Try removing a filter or broadening your search.</p>
              <Button
                onClick={() => {
                  setBrand("All")
                  setStockOnly(false)
                  setQ("")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductDetail({
  product,
  addToCart,
  toggleWish,
  wishlist,
  toggleCompare,
  compare,
}: {
  product: Product
  addToCart: (p: Product) => void
  toggleWish: (p: Product) => void
  wishlist: string[]
  toggleCompare: (p: Product) => void
  compare: string[]
}) {
  const [tab, setTab] = useState("Overview")
  const [qty, setQty] = useState(1)
  const [tenure, setTenure] = useState(12)
  return (
    <div className="page container">
      <div className="breadcrumbs">
        Home / {product.category} / <span>{product.name}</span>
      </div>
      <div className="pdp">
        <div className="gallery">
          <div className="gallery-main">
            <img src={product.image} alt={product.name} />
            <span>Move pointer to inspect</span>
          </div>
          <div className="thumbnails">
            {[product.image, componentImage, gpuImage].map((img, i) => (
              <button className={i === 0 ? "active" : ""} key={img}>
                <img src={img} alt={`${product.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="pdp-info">
          <span className="eyebrow">
            {product.brand} · {product.sku}
          </span>
          <Heading level={1}>{product.name}</Heading>
          <div className="pdp-meta">
            <span className="rating">
              <span>★★★★★</span> {product.rating} · Sample reviews
            </span>
            <span className={product.stock ? "stock in" : "stock out"}>
              {product.stock ? "In stock" : "Out of stock"}
            </span>
          </div>
          <p className="pdp-summary">
            A high-performance system configured for responsive gaming and
            demanding creative workloads. Product imagery and unspecified
            attributes are illustrative prototype content.
          </p>
          <ul className="pdp-specs">
            {product.specs.map((x) => (
              <li key={x}>
                <Icon name="check" />
                {x}
              </li>
            ))}
          </ul>
          <div className="pdp-price">
            <strong>{money(product.price)}</strong>
            <del>{money(product.regular)}</del>
            <span>Save {money(product.regular - product.price)}</span>
          </div>
          <div className="emi-line">
            <Icon name="bolt" />
            <span>
              <strong>
                Indicative EMI from {money(Math.ceil(product.price / tenure))}
                /month
              </strong>
              <small>Illustrative calculation; not a bank quotation.</small>
            </span>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            >
              {[3, 6, 9, 12, 18, 24, 36].map((x) => (
                <option key={x} value={x}>
                  {x} months
                </option>
              ))}
            </select>
          </div>
          <div className="purchase-row">
            <div className="quantity">
              <Button
                variant="icon"
                icon="minus"
                onClick={() => setQty(Math.max(1, qty - 1))}
              />
              <strong>{qty}</strong>
              <Button
                variant="icon"
                icon="plus"
                onClick={() => setQty(qty + 1)}
              />
            </div>
            <Button
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(product)
              }}
              icon="cart"
            >
              Add to cart
            </Button>
            <Button variant="secondary">Buy now</Button>
          </div>
          <div className="pdp-secondary">
            <Button
              variant="ghost"
              icon="heart"
              onClick={() => toggleWish(product)}
            >
              {wishlist.includes(product.id) ? "Saved" : "Save to wishlist"}
            </Button>
            <Button
              variant="ghost"
              icon="compare"
              onClick={() => toggleCompare(product)}
            >
              {compare.includes(product.id) ? "Selected" : "Compare"}
            </Button>
          </div>
          <div className="reassurance">
            {[
              [
                "location",
                "Elephant Road & online",
                "Sample availability state",
              ],
              [
                "shield",
                "Warranty & support",
                "See supplied product documentation",
              ],
              [
                "tools",
                "Technical assistance",
                "Configuration guidance available",
              ],
            ].map(([icon, title, copy]) => (
              <span key={title}>
                <Icon name={icon as IconName} />
                <b>{title}</b>
                <small>{copy}</small>
              </span>
            ))}
          </div>
        </div>
      </div>
      <section className="pdp-tabs">
        <div className="tab-list">
          {[
            "Overview",
            "Specifications",
            "Warranty & Support",
            "Reviews",
            "Questions & Answers",
          ].map((x) => (
            <button
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="tab-panel">
          {tab === "Specifications" ? (
            <table>
              <tbody>
                {[
                  ["Processor", "AMD Ryzen 7 7800X3D"],
                  ["Graphics", "NVIDIA RTX 4070 Super 12GB"],
                  ["Memory", "32GB DDR5 6000MHz RGB RAM"],
                  ["Storage", "1TB NVMe PCIe 4.0 SSD"],
                  ["Power supply", "750W 80+ Gold Modular PSU"],
                  ["Cooling", "360mm AIO Liquid Cooler"],
                  ["Dimensions", "Not supplied"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <th>{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : tab === "Warranty & Support" ? (
            <div>
              <Heading level={3}>Clear support information</Heading>
              <p>
                Warranty terms depend on the supplied brand documentation and
                invoice. No product-specific duration is asserted in this
                prototype.
              </p>
            </div>
          ) : tab === "Reviews" ? (
            <div>
              <Heading level={3}>Sample review experience</Heading>
              <p>
                Prototype review cards and verified-purchase states would be
                connected to authenticated order data in production.
              </p>
            </div>
          ) : (
            <div>
              <Heading level={3}>{tab}</Heading>
              <p>
                Every TechNexa product page is structured to make technical
                information easy to scan and purchasing conditions easy to
                understand.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const builderOptions: Record<string, Product[]> = {
  CPU: [
    products[1],
    {
      ...products[1],
      id: "intel-14700",
      name: "Intel Core i7 Performance Processor",
      brand: "Intel",
      sku: "INT-14700",
      socket: "LGA1700",
      price: 46500,
      regular: 48000,
    },
  ],
  Motherboard: [
    {
      ...products[4],
      id: "b650",
      name: "B650M AM5 DDR5 Motherboard",
      category: "Motherboard",
      price: 19200,
      regular: 20500,
      socket: "AM5",
      memory: "DDR5",
      watt: 50,
    },
    {
      ...products[4],
      id: "b760",
      name: "B760 LGA1700 DDR5 Motherboard",
      category: "Motherboard",
      price: 21500,
      regular: 23000,
      socket: "LGA1700",
      memory: "DDR5",
      watt: 50,
    },
  ],
  RAM: [products[3]],
  Storage: [products[4]],
  GPU: [products[2]],
  PSU: [products[5]],
  Cooler: [products[6]],
}

function Builder({
  addToCart,
  setToast,
}: {
  addToCart: (p: Product) => void
  setToast: (s: string) => void
}) {
  const slots: [string, string, boolean][] = [
    ["CPU", "Processor (CPU)", true],
    ["Motherboard", "Motherboard", true],
    ["Cooler", "CPU Cooler", false],
    ["RAM", "Desktop RAM", true],
    ["Storage", "Primary Storage", false],
    ["GPU", "Graphics Card", false],
    ["PSU", "Power Supply", true],
    ["Case", "Computer Case", false],
    ["Fans", "Case Fans", false],
  ]
  const [selected, setSelected] = useState<Record<string, Product>>({
    CPU: products[1],
    Motherboard: builderOptions.Motherboard[0],
    RAM: products[3],
    GPU: products[2],
    PSU: products[5],
  })
  const [choosing, setChoosing] = useState("")
  const draw = Math.round(
    Object.entries(selected)
      .filter(([key]) => key !== "PSU")
      .reduce((sum, [, p]) => sum + (p.watt || 20), 0) * 1.2,
  )
  const psu = selected.PSU?.watt || 0
  const socketOk =
    !selected.CPU ||
    !selected.Motherboard ||
    selected.CPU.socket === selected.Motherboard.socket
  const memoryOk =
    !selected.RAM ||
    !selected.Motherboard ||
    selected.RAM.memory === selected.Motherboard.memory
  const powerOk = !selected.PSU || psu >= draw
  const compatible = socketOk && memoryOk && powerOk
  const total = Object.values(selected).reduce((s, p) => s + p.price, 0)
  const requiredDone = ["CPU", "Motherboard", "RAM", "PSU"].filter(
    (x) => selected[x],
  ).length
  return (
    <div className="builder-page">
      <div className="builder-hero">
        <div className="container">
          <span className="kicker">NEXA SYSTEM CONFIGURATOR / PROTOTYPE</span>
          <Heading level={1}>BUILD YOUR PERFECT RIG.</Heading>
          <p>
            Choose your components. Check compatibility. Configure your
            performance.
          </p>
          <div className="build-metrics">
            <span>
              <small>BUILD PROGRESS</small>
              <strong>{Math.round((requiredDone / 4) * 100)}%</strong>
            </span>
            <span>
              <small>SELECTED</small>
              <strong>{Object.keys(selected).length} / 9</strong>
            </span>
            <span>
              <small>ESTIMATED POWER</small>
              <strong>{draw}W</strong>
            </span>
            <span>
              <small>COMPATIBILITY</small>
              <strong className={compatible ? "good" : "bad"}>
                {compatible ? "Compatible" : "Attention"}
              </strong>
            </span>
          </div>
        </div>
      </div>
      <div className="container builder-layout">
        <div className="builder-workspace">
          {!compatible && (
            <div className="compat-alert">
              <Icon name="shield" />
              <div>
                <strong>Compatibility requires attention</strong>
                <p>
                  {!socketOk
                    ? `Incompatible CPU socket. This processor uses ${selected.CPU?.socket}, but the selected motherboard supports ${selected.Motherboard?.socket}.`
                    : !memoryOk
                      ? "The selected memory generation does not match the motherboard."
                      : `Estimated demand with safety margin is ${draw}W, above the selected PSU capacity.`}
                </p>
              </div>
            </div>
          )}
          <div className="component-slots">
            {slots.map(([key, label, required], i) => {
              const p = selected[(key as string)]
              return (
                <article
                  className={`component-slot ${p ? "selected" : ""}`}
                  key={key}
                >
                  <span className="slot-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="slot-icon">
                    <Icon
                      name={
                        key === "PSU"
                          ? "bolt"
                          : key === "Case"
                            ? "grid"
                            : "tools"
                      }
                    />
                  </div>
                  <div className="slot-title">
                    <small>{required ? "REQUIRED" : "OPTIONAL"}</small>
                    <strong>{label}</strong>
                  </div>
                  {p ? (
                    <>
                      <img src={p.image} alt="" />
                      <div className="slot-product">
                        <strong>{p.name}</strong>
                        <small>
                          {p.sku} · {p.specs[0]}
                        </small>
                      </div>
                      <span className="slot-price">{money(p.price)}</span>
                      <span
                        className={`compat-dot ${
                          (key === "PSU" && !powerOk) ||
                          (key === "Motherboard" && !socketOk)
                            ? "bad"
                            : "good"
                        }`}
                        title="Compatibility state"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setChoosing(key as string)}
                      >
                        Change
                      </Button>
                      <Button
                        variant="icon"
                        icon="trash"
                        onClick={() =>
                          setSelected((s) => {
                            const n = { ...s }
                            delete n[(key as string)]
                            return n
                          })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <div className="slot-empty">No component selected</div>
                      <Button
                        onClick={() => setChoosing(key as string)}
                        icon="plus"
                      >
                        Choose
                      </Button>
                    </>
                  )}
                </article>
              )
            })}
          </div>
        </div>
        <aside className="build-summary">
          <span className="kicker">LIVE BUILD SUMMARY</span>
          <Heading level={2}>{money(total)}</Heading>
          <div className="power-gauge">
            <div>
              <span
                style={{ width: `${Math.min(100, (draw / psu) * 100 || 0)}%` }}
              />
            </div>
            <small>
              <b>{draw}W</b> estimated · {psu || "—"}W capacity
            </small>
          </div>
          <dl>
            <div>
              <dt>Components</dt>
              <dd>{Object.keys(selected).length}</dd>
            </div>
            <div>
              <dt>Required slots</dt>
              <dd>{requiredDone}/4</dd>
            </div>
            <div>
              <dt>Safety margin</dt>
              <dd>20%</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className={compatible ? "good" : "bad"}>
                {compatible ? "Compatible" : "Attention"}
              </dd>
            </div>
          </dl>
          <p className="prototype-note">
            Simplified rule-based prototype. Does not validate every real-world
            combination.
          </p>
          <Button
            disabled={!compatible || requiredDone < 4}
            onClick={() => {
              Object.values(selected).forEach(addToCart)
              setToast("Complete build added to cart")
            }}
          >
            Add All to Cart
          </Button>
          <Button
            variant="secondary"
            onClick={() => setToast("Build saved for this prototype session")}
          >
            Save Build
          </Button>
          <Button variant="ghost" onClick={() => window.print()}>
            Export / Print Quote
          </Button>
          <Button variant="ghost" onClick={() => setSelected({})}>
            Clear Build
          </Button>
        </aside>
      </div>
      {choosing && (
        <div className="selector-shell">
          <button
            className="page-scrim"
            aria-label="Close selector"
            onClick={() => setChoosing("")}
          />
          <aside className="selector">
            <div className="selector-head">
              <div>
                <span className="kicker">SELECT COMPONENT</span>
                <Heading level={2}>
                  {slots.find((x) => x[0] === choosing)?.[1]}
                </Heading>
              </div>
              <Button
                variant="icon"
                icon="close"
                onClick={() => setChoosing("")}
              />
            </div>
            {builderOptions[choosing]?.length ? (
              <div className="selector-products">
                {builderOptions[choosing].map((p) => (
                  <article key={p.id}>
                    <img src={p.image} alt="" />
                    <div>
                      <span className="eyebrow">{p.brand}</span>
                      <Heading level={3}>{p.name}</Heading>
                      <p>{p.specs.join(" · ")}</p>
                      <span className="stock in">Compatible option*</span>
                    </div>
                    <strong>{money(p.price)}</strong>
                    <Button
                      onClick={() => {
                        setSelected((s) => ({ ...s, [choosing]: p }))
                        setChoosing("")
                      }}
                    >
                      Select
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="tools" size={40} />
                <Heading level={3}>Options coming into view</Heading>
                <p>This category is represented as an empty prototype state.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

type CartPageProps = {
  cart: CartItem[]
  setCart: any
  subtotal: number
}

function CartPage({ cart, setCart, subtotal }: CartPageProps) {
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  if (!cart.length)
    return (
      <div className="page container empty-state large">
        <Icon name="cart" size={48} />
        <Heading level={1}>Your cart is ready for a build.</Heading>
        <p>Explore performance hardware or configure a complete system.</p>
        <div>
          <LinkButton to="/shop" className="btn btn-primary">
            Browse products
          </LinkButton>
          <LinkButton to="/pc-builder" className="btn btn-secondary">
            Launch PC Builder
          </LinkButton>
        </div>
      </div>
    )
  return (
    <div className="page container">
      <div className="breadcrumbs">
        Home / <span>Shopping Cart</span>
      </div>
      <SectionHeading
        kicker="YOUR SELECTION"
        title={`Shopping Cart (${cart.reduce((s, x) => s + x.qty, 0)})`}
        copy="Review availability, quantities and pricing before checkout."
      />
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(({ product, qty }) => (
            <article key={product.id}>
              <img src={product.image} alt="" />
              <div className="cart-product">
                <span className="eyebrow">
                  {product.brand} · {product.sku}
                </span>
                <Heading level={3}>{product.name}</Heading>
                <span className="stock in">
                  Available online · illustrative
                </span>
                <button>Save for later</button>
              </div>
              <div className="quantity">
                <Button
                  variant="icon"
                  icon="minus"
                  onClick={() =>
                    setCart((xs: any) =>
                      xs.map((x: any) =>
                        x.product.id === product.id
                          ? { ...x, qty: Math.max(1, x.qty - 1) }
                          : x,
                      ),
                    )
                  }
                />
                <strong>{qty}</strong>
                <Button
                  variant="icon"
                  icon="plus"
                  onClick={() =>
                    setCart((xs: any) =>
                      xs.map((x: any) =>
                        x.product.id === product.id
                          ? { ...x, qty: x.qty + 1 }
                          : x,
                      ),
                    )
                  }
                />
              </div>
              <strong className="cart-price">
                {money(product.price * qty)}
              </strong>
              <Button
                variant="icon"
                icon="trash"
                onClick={() =>
                  setCart((xs: any) =>
                    xs.filter((x: any) => x.product.id !== product.id),
                  )
                }
              />
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <Heading level={2}>Order summary</Heading>
          <label>
            Promo code
            <div>
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter code"
              />
              <Button
                variant="secondary"
                onClick={() =>
                  setDiscount(
                    coupon.toUpperCase() === "NEXA5"
                      ? Math.round(subtotal * 0.05)
                      : 0,
                  )
                }
              >
                Apply
              </Button>
            </div>
          </label>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>− {money(discount)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>Calculated at checkout</dd>
            </div>
            <div className="total">
              <dt>Total payable</dt>
              <dd>{money(subtotal - discount)}</dd>
            </div>
          </dl>
          <LinkButton className="btn btn-primary full" to="/checkout">
            Proceed to checkout <Icon name="arrow" />
          </LinkButton>
          <LinkButton className="continue" to="/shop">
            Continue shopping
          </LinkButton>
          <small>
            Secure payment interface simulation. No transaction is processed.
          </small>
        </aside>
      </div>
    </div>
  )
}

type CheckoutProps = {
  subtotal: number
  cart: any[]
}

function Checkout({ subtotal, cart }: CheckoutProps) {
  const [step, setStep] = useState(1)
  const [payment, setPayment] = useState("bKash")
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    division: "Dhaka",
    district: "Dhaka",
    area: "",
    address: "",
  })
  const valid =
    form.name &&
    /^01\d{9}$/.test(form.phone) &&
    form.email &&
    form.area &&
    form.address
  const codEligible =
    subtotal <= 50000 &&
    (form.district === "Dhaka" || form.district === "Chattogram")
  if (submitted)
    return (
      <div className="page container confirmation">
        <div className="success-ring">
          <Icon name="check" size={44} />
        </div>
        <span className="kicker">SIMULATED ORDER CONFIRMATION</span>
        <Heading level={1}>Order request received.</Heading>
        <p>
          No payment was processed. This screen demonstrates the intended
          confirmation workflow.
        </p>
        <div className="confirmation-card">
          <span>ORDER REFERENCE</span>
          <strong>TNX-PROT-260418</strong>
          <dl>
            <div>
              <dt>Products</dt>
              <dd>{cart.length}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{payment}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>Illustrative estimate shown after review</dd>
            </div>
          </dl>
        </div>
        <LinkButton className="btn btn-primary" to="/account/orders">
          Track order
        </LinkButton>
        <Button variant="secondary" onClick={() => window.print()}>
          Print invoice preview
        </Button>
      </div>
    )
  return (
    <div className="page container checkout">
      <div className="breadcrumbs">
        Cart / <span>Checkout</span>
      </div>
      <div className="checkout-progress">
        {["Delivery Information", "Payment Method", "Order Review"].map(
          (x, i) => (
            <div className={step >= i + 1 ? "active" : ""} key={x}>
              <span>{i + 1}</span>
              <strong>{x}</strong>
            </div>
          ),
        )}
      </div>
      <div className="checkout-layout">
        <section className="checkout-form">
          {step === 1 && (
            <>
              <SectionHeading
                kicker="STEP 01"
                title="Delivery Information"
                copy="Use Bangladesh-specific delivery details."
              />
              <div className="form-grid">
                {[
                  ["name", "Full name"],
                  ["phone", "Phone number"],
                  ["email", "Email address"],
                  ["division", "Division"],
                  ["district", "District"],
                  ["area", "Thana / Upazila or Area"],
                  ["address", "House / Road"],
                ].map(([key, label]) => (
                  <label className={key === "address" ? "wide" : ""} key={key}>
                    {label}
                    {key === "division" ? (
                      <select
                        value={form.division}
                        onChange={(e) =>
                          setForm({ ...form, division: e.target.value })
                        }
                      >
                        <option>Dhaka</option>
                        <option>Chattogram</option>
                        <option>Sylhet</option>
                      </select>
                    ) : key === "district" ? (
                      <select
                        value={form.district}
                        onChange={(e) =>
                          setForm({ ...form, district: e.target.value })
                        }
                      >
                        <option>Dhaka</option>
                        <option>Chattogram</option>
                        <option>Sylhet</option>
                        <option>Other</option>
                      </select>
                    ) : (
                      <input
                        type={key === "email" ? "email" : "text"}
                        value={(form as any)[key]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        placeholder={key === "phone" ? "01XXXXXXXXX" : ""}
                      />
                    )}
                  </label>
                ))}
              </div>
              {form.phone && !/^01\d{9}$/.test(form.phone) && (
                <p className="form-error">
                  Enter a valid 11-digit Bangladesh mobile number.
                </p>
              )}
              <div className="delivery-note">
                <Icon name="location" />
                <div>
                  <strong>Illustrative delivery estimates</strong>
                  <p>
                    Inside Dhaka: same-day for eligible orders placed before 12
                    PM. Outside Dhaka: 48–72 hours through partner courier
                    networks.
                  </p>
                </div>
              </div>
              <Button disabled={!valid} onClick={() => setStep(2)}>
                Continue to payment <Icon name="arrow" />
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <SectionHeading
                kicker="STEP 02"
                title="Select Payment Method"
                copy="Gateway screens and results are simulated."
              />
              <div className="payment-groups">
                {[
                  ["Mobile Financial Services", ["bKash", "Nagad", "Rocket"]],
                  [
                    "Card & Internet Banking",
                    ["Visa / Mastercard / AMEX", "Q-Cash"],
                  ],
                  [
                    "EMI — subject to eligibility",
                    [
                      "City Bank",
                      "Eastern Bank Limited",
                      "BRAC Bank",
                      "Dutch-Bangla Bank",
                    ],
                  ],
                  [
                    "Pay on delivery",
                    [`Cash on Delivery${codEligible ? "" : " — Not eligible"}`],
                  ],
                ].map(([group, opts]: any) => (
                  <fieldset key={group}>
                    <legend>{group}</legend>
                    {opts.map((x: string) => (
                      <label
                        className={
                          !codEligible && x.startsWith("Cash") ? "disabled" : ""
                        }
                        key={x}
                      >
                        <input
                          type="radio"
                          name="payment"
                          disabled={!codEligible && x.startsWith("Cash")}
                          checked={payment === x}
                          onChange={() => setPayment(x)}
                        />
                        <span>
                          {x}
                          <small>
                            {x.startsWith("Cash")
                              ? "Eligible cart values up to ৳ 50,000 in Dhaka and Chattogram metro."
                              : "Simulated payment method"}
                          </small>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                ))}
              </div>
              <div className="step-actions">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Review order <Icon name="arrow" />
                </Button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <SectionHeading
                kicker="STEP 03"
                title="Review Your Order"
                copy="Confirm the prototype details before simulated submission."
              />
              <div className="review-block">
                <Heading level={3}>Delivery to</Heading>
                <p>
                  {form.name}
                  <br />
                  {form.address}, {form.area}, {form.district}
                  <br />
                  {form.phone}
                </p>
              </div>
              <div className="review-block">
                <Heading level={3}>Payment</Heading>
                <p>{payment}</p>
              </div>
              <div className="review-items">
                {cart.map((x) => (
                  <div key={x.product.id}>
                    <img src={x.product.image} alt="" />
                    <span>
                      {x.product.name}
                      <small>Qty {x.qty}</small>
                    </span>
                    <strong>{money(x.product.price * x.qty)}</strong>
                  </div>
                ))}
              </div>
              <div className="step-actions">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setSubmitted(true)}>
                  Simulate order placement
                </Button>
              </div>
            </>
          )}
        </section>
        <aside className="order-summary">
          <Heading level={2}>Your order</Heading>
          <dl>
            <div>
              <dt>Items</dt>
              <dd>{cart.reduce((s, x) => s + x.qty, 0)}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>At review</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>{money(subtotal)}</dd>
            </div>
          </dl>
          <small>
            <Icon name="shield" /> Secure checkout prototype. No real payment or
            order submission.
          </small>
        </aside>
      </div>
    </div>
  )
}

function Warranty({ lookup }: { lookup: boolean }) {
  const [searched, setSearched] = useState(false)
  const [ticket, setTicket] = useState(false)
  return (
    <div className="page">
      <section className="inner-hero container">
        <div>
          <span className="kicker">TECHNEXA CARE</span>
          <Heading level={1}>
            YOUR HARDWARE.
            <br />
            OUR COMMITMENT.
          </Heading>
          <p>
            Verify product authenticity, check warranty coverage, and manage
            service requests in one place.
          </p>
        </div>
        <Icon name="shield" size={96} />
      </section>
      <div className="container">
        {!lookup && !ticket && (
          <>
            <div className="portal-cards">
              {[
                [
                  "shield",
                  "Warranty Lookup",
                  "Check sample coverage using an invoice or serial number.",
                  "/warranty/lookup",
                ],
                [
                  "tools",
                  "RMA Service Request",
                  "Submit a structured prototype service request",
                  "#rma",
                ],
                [
                  "location",
                  "Service Center Locations",
                  "Find your preferred TechNexa branch.",
                  "/stores",
                ],
              ].map(([icon, title, copy, to]) => (
                <LinkButton to={to} className="portal-card" key={title}>
                  <Icon name={icon as IconName} />
                  <Heading level={3}>{title}</Heading>
                  <p>{copy}</p>
                  <span>
                    Open service <Icon name="arrow" />
                  </span>
                </LinkButton>
              ))}
            </div>
            <section id="rma" className="form-section">
              <SectionHeading
                kicker="SERVICE REQUEST"
                title="Book RMA Assistance"
                copy="This form creates a sample ticket only."
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setTicket(true)
                }}
                className="form-grid"
              >
                {[
                  "Customer name",
                  "Contact number",
                  "Invoice number",
                  "Serial number",
                  "Product category",
                  "Preferred branch",
                  "Preferred appointment date",
                ].map((x) => (
                  <label key={x}>
                    {x}
                    <input
                      required
                      type={x.includes("date") ? "date" : "text"}
                    />
                  </label>
                ))}
                <label className="wide">
                  Issue description
                  <textarea required rows={4} />
                </label>
                <Button type="submit">Submit sample request</Button>
              </form>
            </section>
          </>
        )}
        {(lookup || searched) && (
          <section className="lookup-section">
            <SectionHeading
              kicker="WARRANTY LOOKUP"
              title="Check coverage status"
              copy="Enter either reference below. Results are sample prototype data."
            />
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSearched(true)
              }}
            >
              <label>
                Invoice Number
                <input required placeholder="e.g. TNX-SAMPLE-001" />
              </label>
              <span>OR</span>
              <label>
                Product Serial Number
                <input required placeholder="e.g. SN-PROTOTYPE-2026" />
              </label>
              <Button type="submit" icon="search">
                Check warranty
              </Button>
            </form>
            {searched && (
              <article className="warranty-result">
                <div className="result-status">
                  <Icon name="check" />
                  <span>
                    <strong>Active</strong>
                    <small>Sample data — not a live warranty record</small>
                  </span>
                </div>
                <img src={pcImage} alt="TechNexa Phantom X15" />
                <div>
                  <span className="eyebrow">TN-PC-2026-X15</span>
                  <Heading level={3}>
                    TechNexa Phantom X15 Custom Gaming PC
                  </Heading>
                  <dl>
                    <div>
                      <dt>Serial</dt>
                      <dd>SN-PROTOTYPE-2026</dd>
                    </div>
                    <div>
                      <dt>Purchase date</dt>
                      <dd>Sample: 18 April 2026</dd>
                    </div>
                    <div>
                      <dt>Expiration</dt>
                      <dd>Refer to supplied warranty documentation</dd>
                    </div>
                    <div>
                      <dt>Service eligibility</dt>
                      <dd>Pending physical verification</dd>
                    </div>
                  </dl>
                </div>
                <Button variant="secondary">Start service request</Button>
              </article>
            )}
          </section>
        )}
        {ticket && (
          <div className="confirmation">
            <div className="success-ring">
              <Icon name="check" />
            </div>
            <Heading level={2}>Sample request created</Heading>
            <p>
              Ticket reference: <strong>RMA-PROT-260418</strong>. No request was
              sent to TechNexa.
            </p>
            <Button onClick={() => setTicket(false)}>Create another</Button>
          </div>
        )}
      </div>
    </div>
  )
}

const storeData = [
  [
    "Elephant Road Flagship",
    "Dhaka",
    "Shop 602–608, Level-6, Suvastu Arcade Plaza, New Elephant Road, Dhaka-1205.",
    "Custom Gaming Rig Showcase & Components",
    "Retail",
  ],
  [
    "Agargaon Branch",
    "Dhaka",
    "Shop 114–116, Ground Floor, Bhaban-2, BCS Computer City, Agargaon, Dhaka.",
    "Laptops, MacBooks & Official Accessories",
    "Retail",
  ],
  [
    "Uttara Experience Zone",
    "Dhaka",
    "Plot 18, Sector 11, Sonargaon Janapath Road, Uttara, Dhaka-1230.",
    "Premium Audio & Smart Home Gadgets",
    "Retail",
  ],
  [
    "Chattogram Hub",
    "Chattogram",
    "3rd Floor, Central Plaza, GEC Circle, CDA Avenue, Chattogram.",
    "Full Product Range & Regional Hub",
    "Retail",
  ],
  [
    "Sylhet Outlet",
    "Sylhet",
    "2nd Floor, Millennium Shopping Complex, Zindabazar, Sylhet.",
    "Retail & University Student Solutions",
    "Retail",
  ],
  [
    "Central Fulfilment Center",
    "Dhaka",
    "Plot 45, Block C, Tejgaon Industrial Area, Dhaka-1208.",
    "E-commerce Shipping & Central Inventory",
    "Fulfilment",
  ],
]
function Stores() {
  const [q, setQ] = useState("")
  const shown = storeData.filter((x) =>
    x.join(" ").toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <div className="page container">
      <div className="store-hero">
        <div>
          <span className="kicker">TECHNEXA RETAIL NETWORK</span>
          <Heading level={1}>EXPERIENCE TECHNEXA.</Heading>
          <p>
            Find expert advice, authentic products, and technical support at a
            TechNexa location near you.
          </p>
          <label className="store-search">
            <Icon name="search" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by city or branch"
            />
          </label>
        </div>
        <div className="map-visual">
          {storeData.slice(0, 5).map((x, i) => (
            <span
              key={x[0]}
              style={{ left: `${18 + i * 14}%`, top: `${30 + (i % 2) * 30}%` }}
            >
              <b>{i + 1}</b>
            </span>
          ))}
          <strong>
            BANGLADESH
            <br />
            <small>Store network visualization</small>
          </strong>
        </div>
      </div>
      <div className="store-list">
        {shown.map((x, i) => (
          <article
            className={x[4] === "Fulfilment" ? "fulfilment" : ""}
            key={x[0]}
          >
            <span className="store-index">0{i + 1}</span>
            <div>
              <span className="eyebrow">
                {x[1]} · {x[4]}
              </span>
              <Heading level={3}>{x[0]}</Heading>
              <p>{x[2]}</p>
              <strong>Focus: {x[3]}</strong>
            </div>
            <Button variant="secondary" icon="location">
              View details
            </Button>
          </article>
        ))}
      </div>
      <div className="network-note">
        <Icon name="location" />
        <div>
          <strong>14 physical flagship outlets stated</strong>
          <p>
            Five supplied retail branches are shown. Details for the remaining
            locations require verification before publication. The Central
            Fulfilment Center is not customer-facing retail.
          </p>
        </div>
      </div>
    </div>
  )
}

function Services() {
  const rows = [
    [
      "Store-purchased component build",
      "Free",
      "Subject to stated eligibility conditions",
    ],
    [
      "Customer-supplied assembly",
      "৳ 500",
      "Assembly and basic cable management",
    ],
    [
      "High-end / workstation assembly",
      "Starting at ৳ 1,500",
      "Complex professional configurations",
    ],
    [
      "Custom water-cooling",
      "Starting at ৳ 2,000",
      "Scope assessed before service",
    ],
    ["Basic desktop servicing", "৳ 500", "Routine maintenance"],
    [
      "Complete disassembly deep clean",
      "৳ 1,000",
      "Detailed internal cleaning",
    ],
  ]
  return (
    <StandardPage
      kicker="TECHNICAL SERVICES"
      title="PRECISION CARE FOR EVERY SYSTEM."
      copy="Assembly, diagnostics, configuration and maintenance from a team that understands hardware."
      image={componentImage}
    >
      <div className="service-grid">
        {[
          "PC Assembly",
          "Hardware Diagnostics",
          "System Maintenance",
          "Gaming PC Configuration",
          "Workstation Configuration",
          "Technical Consultation",
          "Warranty & RMA Assistance",
        ].map((x, i) => (
          <article key={x}>
            <span>0{i + 1}</span>
            <Icon name={i % 2 ? "tools" : "bolt"} />
            <Heading level={3}>{x}</Heading>
            <p>
              Structured technical assistance with clear scope and transparent
              next steps.
            </p>
          </article>
        ))}
      </div>
      <section className="pricing-section">
        <SectionHeading
          kicker="TRANSPARENT PRICING"
          title="Service pricing"
          copy="Final scope is confirmed before work begins."
        />
        <div className="pricing-table">
          {rows.map((x) => (
            <div key={x[0]}>
              <strong>{x[0]}</strong>
              <span>{x[2]}</span>
              <b>{x[1]}</b>
            </div>
          ))}
        </div>
        <LinkButton className="btn btn-primary" to="/contact">
          Book a service consultation
        </LinkButton>
      </section>
    </StandardPage>
  )
}

function Corporate() {
  return (
    <StandardPage
      kicker="TECHNEXA ENTERPRISE"
      title="ENGINEERING THE INFRASTRUCTURE BEHIND YOUR BUSINESS."
      copy="Scalable technology, intelligent infrastructure, and professional IT solutions for modern organizations."
      image={serverImage}
    >
      <div className="enterprise-grid">
        {[
          "Enterprise Workstations",
          "Server Infrastructure",
          "Networking Solutions",
          "AI & GPU Workstations",
          "Business Computing",
          "Storage & Data Infrastructure",
        ].map((x, i) => (
          <article key={x}>
            <span>0{i + 1}</span>
            <Heading level={3}>{x}</Heading>
            <p>
              Consultative planning and procurement structured around
              organizational requirements.
            </p>
            <Icon name="arrow" />
          </article>
        ))}
      </div>
      <section className="form-section corporate-form">
        <SectionHeading
          kicker="PROJECT INQUIRY"
          title="Talk to Our Enterprise Team"
          copy="corporate@technexa.com.bd · +880 9612-443322"
        />
        <form onSubmit={(e) => e.preventDefault()} className="form-grid">
          {[
            "Organization name",
            "Contact name",
            "Work email",
            "Phone number",
          ].map((x) => (
            <label key={x}>
              {x}
              <input required />
            </label>
          ))}
          <label>
            Company size
            <select>
              <option>1–20</option>
              <option>21–100</option>
              <option>101–500</option>
              <option>500+</option>
            </select>
          </label>
          <label>
            Solution category
            <select>
              {[
                "Workstations",
                "Server Infrastructure",
                "Networking",
                "AI & GPU",
                "Storage",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="wide">
            Project description
            <textarea rows={5} required />
          </label>
          <Button type="submit">Request a consultation</Button>
        </form>
      </section>
    </StandardPage>
  )
}

function About() {
  return (
    <StandardPage
      kicker="ESTABLISHED 2011 · BANGLADESH"
      title="POWERING YOUR DIGITAL WORLD."
      copy="TechNexa Systems & Engineering Bangladesh PLC is a technology retail and engineering enterprise serving consumer and professional computing needs."
      image={serverImage}
    >
      <section className="about-grid">
        <div>
          <span className="kicker">OUR PURPOSE</span>
          <Heading level={2}>Technology with engineering depth.</Heading>
        </div>
        <div>
          <p>
            TechNexa brings together specialist technology retail, custom
            computing and enterprise infrastructure under one trusted identity.
            The experience is designed for students, gamers, creators,
            professionals and organizational IT teams.
          </p>
          <p>
            Our mission is to make capable technology easier to understand,
            configure and support—online and across our physical network.
          </p>
        </div>
      </section>
      <div className="timeline">
        <span>
          <b>2011</b>
          <strong>TechNexa founded</strong>
          <small>
            Bangladesh technology retail and engineering enterprise.
          </small>
        </span>
        <i />
        <span>
          <b>Today</b>
          <strong>Integrated technology ecosystem</strong>
          <small>
            Consumer retail, custom computing and enterprise solutions.
          </small>
        </span>
      </div>
      <section className="credential-panel">
        <Icon name="shield" />
        <div>
          <span>QUALITY MANAGEMENT</span>
          <Heading level={2}>ISO 9001:2015</Heading>
          <p>Trade License: TRAD/DNCC/014892/2012 · BIN: 004928172-0101</p>
        </div>
      </section>
    </StandardPage>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="page container">
      <div className="contact-grid">
        <div>
          <span className="kicker">CONTACT & SUPPORT</span>
          <Heading level={1}>LET'S SOLVE WHAT'S NEXT.</Heading>
          <p>
            Product guidance, order support, warranty assistance and enterprise
            consultation—all through a clear point of contact.
          </p>
          <div className="contact-cards">
            {[
              ["phone", "Hotline", "16899 · +880 9612-443322"],
              [
                "location",
                "Head Office",
                "TechNexa Tower, 8th & 9th Floor, 42 Kemal Ataturk Avenue, Banani C/A, Dhaka-1213",
              ],
              ["shield", "Support", "support@technexa.com.bd"],
              ["building", "Corporate", "corporate@technexa.com.bd"],
            ].map(([icon, title, copy]) => (
              <article key={title}>
                <Icon name={icon as IconName} />
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
              </article>
            ))}
          </div>
        </div>
        <div className="form-section">
          {sent ? (
            <div className="confirmation">
              <Icon name="check" size={40} />
              <Heading level={2}>Message captured</Heading>
              <p>This is a prototype confirmation. No message was sent.</p>
              <Button onClick={() => setSent(false)}>Send another</Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="form-grid"
            >
              <label>
                Name
                <input required />
              </label>
              <label>
                Email
                <input type="email" required />
              </label>
              <label>
                Phone
                <input required />
              </label>
              <label>
                Inquiry type
                <select>
                  {[
                    "Product Inquiry",
                    "Order Support",
                    "Warranty & RMA",
                    "Technical Support",
                    "Corporate Inquiry",
                    "General Inquiry",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label className="wide">
                Subject
                <input required />
              </label>
              <label className="wide">
                Message
                <textarea rows={5} required />
              </label>
              <Button type="submit">Send prototype message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Account({
  wishlist,
  addToCart,
}: {
  wishlist: Product[]
  addToCart: (p: Product) => void
}) {
  return (
    <div className="page container account">
      <aside>
        <div className="account-avatar">TA</div>
        <Heading level={3}>Tanvir Ahmed</Heading>
        <small>Prototype customer account</small>
        <nav>
          {[
            "Overview",
            "Orders",
            "Wishlist",
            "Saved Builds",
            "Addresses",
            "Warranty",
            "Support Tickets",
            "Settings",
          ].map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              {x}
            </button>
          ))}
        </nav>
      </aside>
      <div className="account-main">
        <span className="kicker">CUSTOMER DASHBOARD</span>
        <Heading level={1}>Welcome back, Tanvir.</Heading>
        <p>
          Track purchases, saved builds, warranty records and support requests
          from one place.
        </p>
        <div className="account-stats">
          {[
            ["03", "Orders"],
            ["01", "Active build"],
            [String(wishlist.length).padStart(2, "0"), "Wishlist"],
            ["01", "Warranty records"],
          ].map((x) => (
            <span key={x[1]}>
              <strong>{x[0]}</strong>
              <small>{x[1]}</small>
            </span>
          ))}
        </div>
        <section className="account-section">
          <SectionHeading
            title="Recent order"
            action={
              <LinkButton to="/account/orders" className="text-link">
                View all <Icon name="arrow" />
              </LinkButton>
            }
          />
          <article className="order-card">
            <div>
              <span>ORDER ID</span>
              <strong>TNX-SAMPLE-0418</strong>
              <small>Prototype data · 18 April 2026</small>
            </div>
            <div className="order-track">
              {[
                "Placed",
                "Payment",
                "Processing",
                "Packing",
                "Dispatched",
                "Delivered",
              ].map((x, i) => (
                <span className={i < 4 ? "done" : ""} key={x}>
                  <i />
                  <small>{x}</small>
                </span>
              ))}
            </div>
            <strong>{money(145500)}</strong>
          </article>
        </section>
        <section className="account-section">
          <SectionHeading title="Saved products" />
          {wishlist.length ? (
            <div className="saved-list">
              {wishlist.map((p) => (
                <article key={p.id}>
                  <img src={p.image} alt="" />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{money(p.price)}</small>
                  </span>
                  <Button onClick={() => addToCart(p)}>Add to cart</Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-mini">
              No saved products yet. Use the heart control on any product card.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function StandardPage({
  kicker,
  title,
  copy,
  image,
  children,
}: {
  kicker: string
  title: string
  copy: string
  image: string
  children: ReactNode
}) {
  return (
    <div className="page standard-page">
      <section
        className="standard-hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(8,11,18,.96),rgba(8,11,18,.7),rgba(8,11,18,.18)),url(${image})`,
        }}
      >
        <div className="container">
          <span className="kicker">{kicker}</span>
          <Heading level={1}>{title}</Heading>
          <p>{copy}</p>
        </div>
      </section>
      <div className="container standard-content">{children}</div>
    </div>
  )
}

function CartDrawer({ open, close, cart, subtotal, setCart }: any) {
  return (
    <>
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div>
            <span className="kicker">YOUR CART</span>
            <Heading level={2}>{cart.length} selections</Heading>
          </div>
          <Button variant="icon" icon="close" onClick={close} />
        </div>
        <div className="drawer-items">
          {cart.map((x: any) => (
            <article key={x.product.id}>
              <img src={x.product.image} alt="" />
              <span>
                <strong>{x.product.name}</strong>
                <small>
                  {x.qty} × {money(x.product.price)}
                </small>
              </span>
              <Button
                variant="icon"
                icon="trash"
                onClick={() =>
                  setCart((xs: any) =>
                    xs.filter((i: any) => i.product.id !== x.product.id),
                  )
                }
              />
            </article>
          ))}
          {!cart.length && (
            <div className="empty-mini">Your cart is empty.</div>
          )}
        </div>
        <div className="drawer-total">
          <span>
            Subtotal<strong>{money(subtotal)}</strong>
          </span>
          <LinkButton className="btn btn-primary full" to="/cart">
            View cart & checkout
          </LinkButton>
        </div>
      </aside>
      {open && (
        <button
          className="page-scrim"
          aria-label="Close cart"
          onClick={close}
        />
      )}
    </>
  )
}

function SupportWidget({ setToast }: { setToast: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`support-widget ${open ? "open" : ""}`}>
      <div className="support-menu">
        <strong>How can we help?</strong>
        <button
          onClick={() =>
            setToast("WhatsApp contact requires a verified number")
          }
        >
          <span className="wa">W</span>WhatsApp <small>Prototype link</small>
        </button>
        <a href="tel:16899">
          <Icon name="phone" />
          Call 16899
        </a>
        <button onClick={() => setToast("Messenger URL requires verification")}>
          <span>M</span>Messenger <small>Prototype link</small>
        </button>
      </div>
      <Button icon={open ? "close" : "phone"} onClick={() => setOpen(!open)}>
        {open ? "Close" : "Support"}
      </Button>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Premium technology retail and systems engineering for Bangladesh.
          </p>
          <strong>Powering Your Digital World</strong>
          <div className="footer-contact">
            <span>
              Hotline <b>16899</b>
            </span>
            <span>support@technexa.com.bd</span>
          </div>
        </div>
        {[
          [
            "Company",
            [
              ["About TechNexa", "/about"],
              ["Our Stores", "/stores"],
              ["Contact Us", "/contact"],
              ["Corporate Solutions", "/corporate"],
              ["Careers", "/about"],
            ],
          ],
          [
            "Customer Support",
            [
              ["Help Center", "/support"],
              ["Warranty Lookup", "/warranty/lookup"],
              ["RMA Support", "/warranty"],
              ["Order Tracking", "/account/orders"],
              ["Delivery Information", "/support"],
            ],
          ],
          [
            "Shopping",
            [
              ["Desktop PCs", "/categories/desktop-pc"],
              ["PC Components", "/categories/components"],
              ["Laptops", "/categories/laptops"],
              ["Networking", "/categories/networking"],
              ["Peripherals", "/categories/peripherals"],
            ],
          ],
        ].map(([title, links]: any) => (
          <div className="footer-links" key={title}>
            <strong>{title}</strong>
            {links.map((x: any) => (
              <LinkButton to={x[1]} key={x[0]}>
                {x[0]}
              </LinkButton>
            ))}
          </div>
        ))}
        <div className="footer-legal">
          <strong>Corporate Information</strong>
          <p>TechNexa Systems & Engineering Bangladesh PLC</p>
          <small>
            Trade License: TRAD/DNCC/014892/2012
            <br />
            BIN: 004928172-0101
            <br />
            ISO 9001:2015
          </small>
          <p>
            TechNexa Tower
            <br />
            8th & 9th Floor, 42 Kemal Ataturk Avenue
            <br />
            Banani C/A, Dhaka-1213
          </p>
        </div>
      </div>
      <div className="container partner-row">
        <span>PAYMENT METHODS</span>
        {[
          "bKash",
          "Nagad",
          "Rocket",
          "VISA",
          "Mastercard",
          "AMEX",
          "SSLCommerz",
        ].map((x) => (
          <b key={x}>{x}</b>
        ))}
        <i />
        <span>LOGISTICS</span>
        {["Paperfly", "Steadfast", "Pathao", "SA Paribahan"].map((x) => (
          <b key={x}>{x}</b>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 TechNexa Systems & Engineering Bangladesh PLC.</span>
        <div>
          <LinkButton to="/about">Privacy Policy</LinkButton>
          <LinkButton to="/about">Terms & Conditions</LinkButton>
          <button>Cookie Preferences</button>
        </div>
      </div>
    </footer>
  )
}

export default App
