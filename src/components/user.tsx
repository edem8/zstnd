import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { User2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store/store";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useEffect } from "react";

export default function User() {
  const { setAddress, fullName, address, userName, fetchUser } = useStore(
    useShallow((state) => ({
      setAddress: state.setAddress,
      fullName: state.fullname,
      address: state.address,
      userName: state.userName,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    async function fetchUserData() {
      await fetchUser();
    }

    fetchUserData();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <User2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 max-h-[80vh] overflow-y-auto p-5 space-y-6 shadow-lg rounded-lg bg-white dark:bg-zinc-900">
        {/* User Info Section */}
        <div className="space-y-1">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {fullName || "No Name"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{userName || "N/A"}</span>
          </p>
        </div>

        {/* Address Input Section */}
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-800 dark:text-gray-300"
          >
            Your Address
          </Label>
          <Input
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
