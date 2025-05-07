// import { useStore } from "./store/store";
// import { useShallow } from "zustand/react/shallow";

import Cart from "./components/cart";
import ChangeQtyButton from "./components/changeQtyButton";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import User from "./components/user";
import { PRODUCT_DATA } from "./lib/mock";
import { useStore } from "./store/store";

export default function App() {
  // const store = useStore();
  // A more optimized way to use store data is to memoize with useShallow- render only when necessary
  // const { address, fullName } = useStore(
  //   useShallow((state) => ({
  //     address: state.address,
  //     fullName: state.fullname,
  //   }))
  // );

  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <main className="flex  items-center justify-center min-h-screen bg-background dark space-y-4 p-6">
      <div className="min-w-[320px] w-full space-y-2">
        <div className="flex justify-between items-center">
          <User />
          <Cart />
        </div>
        <p className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Products
        </p>
        <div className="space-y-4">
          {PRODUCT_DATA.map((product) => (
            <Card key={product.id} className="shadow-lg rounded-lg p-4">
              <CardHeader className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {product.title}
              </CardHeader>
              <CardContent className="text-lg text-gray-700 dark:text-gray-300">
                ${product.price.toFixed(2)}
              </CardContent>
              <CardFooter>
                {cartProducts.find((item) => item.product.id === product.id) ? (
                  <ChangeQtyButton productId={product.id} />
                ) : (
                  <Button
                    onClick={() => addProduct(product)}
                    className="bg-white text-gray-600 border-2 border-gray-300 rounded-lg px-4 py-2 w-full hover:border-gray-600 transition-all"
                  >
                    Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
