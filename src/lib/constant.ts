import {
  HomeIcon,
  ActiveHomeIcon,
  MembersIcon,
  UserIcon,
  SettingIcon,
  CigarTabIcon,
  ActiveCigarTabIcon,
} from "@/components/icons";

export const routes = [
  {
    href: "/admin/dashboard",
    label: "HOME",
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    href: "/members",
    label: "MEMBERS",
    icon: MembersIcon,
    disabled: true,
  },
  {
    href: "/admin/cigars",
    label: "CIGARS",
    icon: CigarTabIcon,
    activeIcon: ActiveCigarTabIcon,
    subMenu: [
      { href: "/admin/cigars", label: "CIGAR DB" },
      { href: "/admin/cigar-users", label: "Added by Users", disabled: true },
    ],
  },
  {
    href: "/roles",
    label: "ROLES",
    icon: UserIcon,
    disabled: true,
  },
  {
    href: "/settings",
    label: "SETTINGS",
    icon: SettingIcon,
    disabled: true,
  },
];
