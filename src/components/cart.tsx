import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChangeQtyButton from "./changeQtyButton";

export default function Cart() {
  const { reset, products, removeProduct, total } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <ShoppingCart color="black" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 max-h-[80vh] overflow-y-auto space-y-4 p-4 shadow-lg rounded-lg bg-white dark:bg-zinc-900">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Cart
          </p>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX color="black" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {products.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            products.map((item) => (
              <Card
                key={item.product.id}
                className="bg-zinc-50 dark:bg-zinc-800"
              >
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle className="text-base text-gray-900 dark:text-white">
                    {item.product.title}
                  </CardTitle>
                  <Button
                    onClick={() => removeProduct(item.product.id)}
                    size="icon"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" color="black" />
                  </Button>
                </CardHeader>

                <CardContent className="text-sm text-gray-700 dark:text-gray-300">
                  ${item.product.price.toFixed(2)}
                </CardContent>

                <CardFooter>
                  <ChangeQtyButton productId={item.product.id} />
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Total */}
        {products.length > 0 && (
          <div className="pt-4 border-t dark:border-zinc-700 flex justify-between items-center">
            <span className="text-base font-medium text-gray-800 dark:text-gray-200">
              Total:
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          
        )}
      </PopoverContent>
    </Popover>
  );
}
