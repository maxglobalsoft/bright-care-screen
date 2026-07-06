import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Search, Plus, Minus, Trash2, Check, Truck } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { BottomTabBar } from "@/mobile/home/BottomTabBar";
import { PedestalButton } from "@/mobile/components/PedestalButton";
import { categories, products, type Category, type Product } from "./data";

type CartMap = Record<string, number>;

const money = (n: number) => `CA$ ${n.toFixed(2)}`;

export function PharmacyScreen() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");
  const [cart, setCart] = useState<CartMap>({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, cat]);

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p ? p.priceCad * qty : 0);
  }, 0);
  const freeDelivery = subtotal >= 35;
  const delivery = itemCount === 0 ? 0 : freeDelivery ? 0 : 4.99;
  const total = subtotal + delivery;

  const add = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    toast.success("Added to cart", { description: p.name });
  };
  const dec = (id: string) =>
    setCart((c) => {
      const n = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  const inc = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const openCart = () => {
    if (itemCount === 0) {
      toast.info("Your cart is empty", { description: "Add items to get started." });
      return;
    }
    setPlaced(false);
    setSheetOpen(true);
  };

  const checkout = () => setPlaced(true);
  const closeSheet = () => {
    setSheetOpen(false);
    if (placed) {
      setCart({});
      setPlaced(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col" style={{ backgroundColor: "#F3F6F2" }}>
      <div className="h-11 shrink-0" />
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-2" style={{ backgroundColor: "#3C4F3D" }}>
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.9 }}
          onClick={() => navigate({ to: "/home" })}
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
        >
          <ArrowLeft size={18} color="#FFFFFF" />
        </motion.button>
        <h1 className="text-[16px] font-bold" style={{ color: "#FFFFFF" }}>Pharmacy</h1>
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="wcc-orb relative h-10 w-10"
        >
          <ShoppingCart size={18} color="#FFFFFF" style={{ position: "relative", zIndex: 1 }} />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-1 -top-1 z-10 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold"
                style={{ backgroundColor: "#FFFFFF", color: "#C4671A", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none", paddingBottom: itemCount > 0 ? 176 : 112 }}
      >
        {/* Search */}
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5" style={{ backgroundColor: "#FFFFFF" }}>
            <Search size={16} color="#6B7280" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines & products…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#6B7280]"
              style={{ color: "#23291F" }}
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => {
            const active = cat === c;
            return (
              <motion.button
                key={c}
                whileTap={reduce ? undefined : { scale: 0.93 }}
                onClick={() => setCat(c)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                style={{
                  backgroundColor: active ? "#567257" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#23291F",
                  boxShadow: active ? "0 4px 12px -6px rgba(86,114,87,0.6)" : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {c}
              </motion.button>
            );
          })}
        </div>

        {/* Promo strip */}
        <div className="px-4 pt-3">
          <button
            type="button"
            onClick={() => toast.info("Free delivery", { description: "On every order over CA$ 35" })}
            className="wcc-grad-banner flex w-full items-center gap-3 rounded-2xl px-4 py-3"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.28)" }}>
              <Truck size={16} color="#FFFFFF" />
            </div>
            <div className="text-[13px] font-semibold" style={{ color: "#FFFFFF" }}>
              Free delivery on orders over CA$ 35
            </div>
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const qty = cart[p.id] ?? 0;
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.03 } }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex flex-col overflow-hidden rounded-2xl"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #EEF1EE", boxShadow: "0 2px 10px -6px rgba(0,0,0,0.08)" }}
                >
                  <div className="grid h-[92px] w-full place-items-center" style={{ backgroundColor: "#F3F6F2" }}>
                    <Icon size={38} color="#567257" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <div className="line-clamp-2 text-[12.5px] font-semibold leading-tight" style={{ color: "#23291F" }}>{p.name}</div>
                    <div className="text-[10.5px]" style={{ color: "#6B7280" }}>{p.pack}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-[13px] font-bold" style={{ color: "#3C4F3D" }}>{money(p.priceCad)}</div>
                      {qty === 0 ? (
                        <motion.button
                          whileTap={reduce ? undefined : { scale: 0.9 }}
                          whileHover={reduce ? undefined : { scale: 1.06 }}
                          onClick={() => add(p)}
                          aria-label={`Add ${p.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full"
                          style={{ backgroundColor: "#E8912D" }}
                        >
                          <Plus size={14} color="#FFFFFF" />
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-1.5 rounded-full px-1.5 py-1" style={{ backgroundColor: "#567257" }}>
                          <motion.button whileTap={reduce ? undefined : { scale: 0.85 }} onClick={() => dec(p.id)} aria-label="Decrease">
                            <Minus size={12} color="#FFFFFF" />
                          </motion.button>
                          <span className="min-w-[14px] text-center text-[11px] font-bold" style={{ color: "#FFFFFF" }}>{qty}</span>
                          <motion.button whileTap={reduce ? undefined : { scale: 0.85 }} onClick={() => inc(p.id)} aria-label="Increase">
                            <Plus size={12} color="#FFFFFF" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-2 py-10 text-center text-[13px]" style={{ color: "#6B7280" }}>
              No products match your search.
            </div>
          )}
        </div>
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {itemCount > 0 && !sheetOpen && (
          <motion.button
            key="cartbar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            onClick={openCart}
            className="absolute inset-x-4 z-10 flex items-center justify-between rounded-2xl px-4 py-3"
            style={{
              bottom: 88,
              backgroundColor: "#567257",
              boxShadow: "0 14px 30px -10px rgba(0,0,0,0.28)",
            }}
          >
            <span className="text-[13px] font-semibold" style={{ color: "#FFFFFF" }}>
              View cart · {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="text-[13px] font-bold" style={{ color: "#FFFFFF" }}>{money(subtotal)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30"
              style={{ backgroundColor: "rgba(35,41,31,0.45)" }}
              onClick={closeSheet}
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute inset-x-0 bottom-0 z-40 max-h-[85%] overflow-hidden rounded-t-3xl"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="mx-auto mt-2 h-1 w-10 rounded-full" style={{ backgroundColor: "#EEF1EE" }} />
              {!placed ? (
                <div className="flex max-h-[80vh] flex-col">
                  <div className="px-5 pb-2 pt-3 text-[15px] font-bold" style={{ color: "#3C4F3D" }}>Your Cart</div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-5" style={{ scrollbarWidth: "none" }}>
                    <AnimatePresence>
                      {Object.entries(cart).map(([id, qty]) => {
                        const p = products.find((x) => x.id === id);
                        if (!p) return null;
                        const Icon = p.icon;
                        return (
                          <motion.div
                            key={id}
                            layout
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="flex items-center gap-3 border-b py-3"
                            style={{ borderColor: "#EEF1EE" }}
                          >
                            <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: "#F3F6F2" }}>
                              <Icon size={22} color="#567257" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[13px] font-semibold" style={{ color: "#23291F" }}>{p.name}</div>
                              <div className="text-[11px]" style={{ color: "#6B7280" }}>{money(p.priceCad)}</div>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full px-1.5 py-1" style={{ backgroundColor: "#567257" }}>
                              <motion.button whileTap={reduce ? undefined : { scale: 0.85 }} onClick={() => dec(id)} aria-label="Decrease">
                                <Minus size={12} color="#FFFFFF" />
                              </motion.button>
                              <span className="min-w-[14px] text-center text-[11px] font-bold" style={{ color: "#FFFFFF" }}>{qty}</span>
                              <motion.button whileTap={reduce ? undefined : { scale: 0.85 }} onClick={() => inc(id)} aria-label="Increase">
                                <Plus size={12} color="#FFFFFF" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileTap={reduce ? undefined : { scale: 0.85 }}
                              onClick={() => remove(id)}
                              aria-label="Remove"
                              className="grid h-8 w-8 place-items-center rounded-full"
                              style={{ backgroundColor: "#FFF0F0" }}
                            >
                              <Trash2 size={14} color="#DC4B4B" />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    {itemCount === 0 && (
                      <div className="py-10 text-center text-[13px]" style={{ color: "#6B7280" }}>Your cart is empty.</div>
                    )}
                  </div>
                  <div className="border-t px-5 py-4" style={{ borderColor: "#EEF1EE" }}>
                    <div className="flex justify-between text-[12.5px]" style={{ color: "#6B7280" }}>
                      <span>Subtotal</span><span>{money(subtotal)}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-[12.5px]" style={{ color: "#6B7280" }}>
                      <span>Delivery</span>
                      <span style={{ color: freeDelivery ? "#567257" : "#6B7280", fontWeight: freeDelivery ? 700 : 400 }}>
                        {freeDelivery ? "FREE" : money(delivery)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-[15px] font-bold" style={{ color: "#3C4F3D" }}>
                      <span>Total</span><span>{money(total)}</span>
                    </div>
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      onClick={checkout}
                      disabled={itemCount === 0}
                      className="mt-3 w-full rounded-2xl py-3 text-[14px] font-bold disabled:opacity-50"
                      style={{ backgroundColor: "#567257", color: "#FFFFFF" }}
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center px-6 py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="grid h-20 w-20 place-items-center rounded-full"
                    style={{ backgroundColor: "#EAF2EA", border: "3px solid #567257" }}
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                    >
                      <Check size={40} color="#567257" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                  <div className="mt-4 text-[18px] font-bold" style={{ color: "#23291F" }}>Order Placed!</div>
                  <div className="mt-1 text-[12px]" style={{ color: "#6B7280" }}>
                    Order #WCC-{Math.floor(100000 + Math.random() * 899999)}
                  </div>
                  <motion.button
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    onClick={closeSheet}
                    className="mt-6 w-full rounded-2xl py-3 text-[14px] font-bold"
                    style={{ backgroundColor: "#E8912D", color: "#FFFFFF" }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="pharmacy" />
    </div>
  );
}
