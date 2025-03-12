import { createContext, useContext, useState } from "react";

// 1️⃣ Tạo Toast Context
const ToastContext = createContext({ addToast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(({ id, message }) => (
          <div key={id} className="toast">{message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// 2️⃣ Hook để gọi toast ở mọi nơi
export function useToast() {
  return useContext(ToastContext);
}

// 3️⃣ Ví dụ sử dụng trong component
export default function Example() {
  const { addToast } = useToast();
  return <button onClick={() => addToast("Sản phẩm đã được thêm!")}>Thêm</button>;
}
