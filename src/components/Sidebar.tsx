"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApplicationLogo, LogoutIcon } from "./icons";
import Image from "next/image";

type Route = {
  href: string;
  label: string;
  icon: React.ComponentType;
  activeIcon?: React.ComponentType;
  subMenu?: {
    href: string;
    label: string;
    disabled?: boolean;
  }[];
  disabled?: boolean;
};

type SidebarProps = {
  handleLogout: () => void;
  userName: string;
  routes: Route[];
  userProfile?: string;
};

const Sidebar = ({
  handleLogout,
  userName,
  routes,
  userProfile,
}: SidebarProps) => {
  const pathname = usePathname();
  const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <div className="pl-6 md:pl-12 h-full w-full border-r border-gray-200 flex flex-col text-xs font-normal">
      <div className="pt-12 border-gray-200">
        <ApplicationLogo />
      </div>
      <nav className="flex-1 pt-12 overflow-y-auto">
        {routes.map(
          ({
            href,
            label,
            icon: Icon,
            activeIcon: ActiveIcon,
            subMenu,
            disabled = false,
          }) => {
            const isParentActive = pathname.startsWith(href);
            return (
              <div key={href}>
                <Link
                  href={disabled ? "#" : href}
                  className={`flex items-center rounded-md py-3 transition-all text-sm ${
                    isParentActive
                      ? "text-primary-100"
                      : "text-gray-500 hover:text-primary-100"
                  } ${disabled && disabledClass}`}
                >
                  <div className="mr-3 md:mr-5">
                    {isParentActive && ActiveIcon ? <ActiveIcon /> : <Icon />}
                  </div>
                  <span>{label}</span>
                </Link>
                {subMenu && (
                  <div className="ml-8 mb-6 mt-2 border-l">
                    {subMenu.map(
                      ({
                        href: subHref,
                        label: subLabel,
                        disabled = false,
                      }) => {
                        const isSubmenuActive = pathname === subHref;
                        return (
                          <Link
                            key={subHref}
                            href={disabled ? "#" : subHref}
                            className={`block pl-6 text-gray-500 hover:text-primary-100 mb-6 ${
                              isSubmenuActive
                                ? "text-primary-100 font-semibold"
                                : ""
                            } ${disabled && disabledClass} `}
                          >
                            {subLabel}
                          </Link>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            );
          }
        )}
      </nav>
      <div className="mb-8 flex items-center justify-between mr-6">
        <div className="flex items-center">
          {!userProfile ? (
            <div className="h-[35px] w-[35px] bg-gray-200 rounded-full relative"></div>
          ) : (
            <Image
              src={userProfile}
              alt="Profile"
              width={35}
              height={35}
              className="rounded-full h-[35px]"
            />
          )}
          <span className="ml-2 text-gray-600">{userName}</span>
        </div>
        <div
          className="cursor-pointer hover:text-primary-100"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
