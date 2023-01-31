import Link from "next/link";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "./DropdownMenu";

import { type Session } from "@acme/auth";
import { Avatar } from "./Avatar";

type UserDropdownProps = {
  session: Session;
  handleSignOut: () => Promise<undefined>;
};

export const UserDropdown: React.FC<UserDropdownProps> = ({
  session,
  handleSignOut,
}) => {
  const getAvatarFallback = (name?: string | null) => {
    if (name) {
      const splitName = name.split(" ");
      const stripedCharacters = splitName.map((word) => word.charAt(0));
      return stripedCharacters.join("").toUpperCase();
    }
    return "";
  };
  return (
    <DropdownMenu
      trigger={
        <button className="rounded-full">
          <Avatar
            image={session.user?.image}
            imageAlt={`Avatar for ${session.user?.name}`}
            fallback={`${getAvatarFallback(
              session.user?.name || session.user?.email,
            )}`}
          />
        </button>
      }
      modal={false}
    >
      <div className="py-3 px-4">
        <p className="text-base font-bold">{session.user?.name}</p>
        <p className="text-sm">{session.user?.email}</p>
      </div>
      <DropdownSeparator
        style={{ height: 1 }}
        className="w-full bg-slate-300/50"
      />
      <div className="h-full w-full">
        <DropdownItem
          asChild
          className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        >
          <Link
            href="/dashboard"
            className="block h-full w-full bg-transparent py-2 px-4 text-left text-sm text-slate-900"
          >
            Dashboard
          </Link>
        </DropdownItem>
        <DropdownItem
          asChild
          className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        >
          <Link
            href="/dashboard/settings"
            className="block h-full w-full bg-transparent py-2 px-4 text-left text-sm text-slate-900"
          >
            Settings
          </Link>
        </DropdownItem>
        <DropdownSeparator
          style={{ height: 1 }}
          className="w-full bg-slate-300/50"
        />
        <DropdownItem
          asChild
          className="transition duration-100 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        >
          <button
            className="w-full cursor-pointer bg-transparent py-2 px-4 text-left text-sm text-slate-900 transition duration-100 hover:bg-slate-100 focus:outline-none"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </DropdownItem>
      </div>
    </DropdownMenu>
  );
};
