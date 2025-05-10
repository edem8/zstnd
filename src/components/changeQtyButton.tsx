import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { useShallow } from "zustand/shallow";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type Props = {
  productId: string;
};

export default function ChangeQtyButton({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.product.price * item.qty, 0)
        ),
          { fireImmediately: true };
      }
    );

    return unSub;
  }, [setTotal]);
  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decQty(productId)} size={"icon"}>
            <Minus color="black" />
          </Button>
          <span>{product?.qty}</span>
          <Button
            onClick={() => incQty(productId)}
            size={"icon"}
            variant={"outline"}
          >
            <Plus color="black" />
          </Button>
        </div>
      )}
    </>
  );
}
