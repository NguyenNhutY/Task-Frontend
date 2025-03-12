import create from "zustand";

// 1️⃣ Tạo store Zustand cho đơn hàng
const useOrderStore = create((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
}));

// 2️⃣ Lắng nghe WebSocket
export default function LiveOrders() {
  const { orders, addOrder } = useOrderStore();

  useEffect(() => {
    const ws = new WebSocket("wss://your-api.com/orders");
    ws.onmessage = (event) => addOrder(JSON.parse(event.data));
    return () => ws.close();
  }, [addOrder]);

  return <div>{orders.map((o, i) => <div key={i}>{o.name}</div>)}</div>;
}
