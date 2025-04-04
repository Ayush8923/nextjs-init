"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Route = {
  href: string;
  label: string;
  icon: React.ComponentType;
  activeIcon: React.ComponentType;
  disabled?: boolean;
};

type BottomTabBarProps = {
  routes: Route[];
};

const BottomTabBar = ({ routes }: BottomTabBarProps) => {
  const pathname = usePathname();
  const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-between max-w-lg mx-auto px-6">
        {routes.map(
          (
            {
              href,
              label,
              icon: Icon,
              activeIcon: ActiveIcon,
              disabled = false,
            },
            index
          ) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={index}
                href={disabled ? "#" : href}
                className={`flex flex-col items-center py-3 ${disabled && disabledClass}`}
              >
                {isActive ? <ActiveIcon /> : <Icon />}
                <span
                  className={`text-[10px] font-normal mt-2.5 ${isActive ? "text-gray-800" : "text-gray-400"}`}
                >
                  {label}
                </span>
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
};

export default BottomTabBar;
