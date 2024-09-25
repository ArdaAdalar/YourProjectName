import { useState } from "react";

export default function useCounter() {
  const [count, setCount] = useState(0);

  const decrement = () => setCount(count => (count > 0 ? count - 1 : 0)); // 0'ın altına düşmesini engeller
  const increment = () => setCount(count => count + 1);

  return {
    count,
    increment,
    decrement
  };
}
