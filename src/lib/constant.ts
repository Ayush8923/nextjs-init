import {
  HomeIcon,
  ActiveHomeIcon,
  MembersIcon,
  UserIcon,
  SettingIcon,
  CigarTabIcon,
  ActiveCigarTabIcon,
  ActiveHomeTabIcon,
  CommunityIcon,
  HomeTabIcon,
  CollectionIcon,
  JournalIcon,
  ActiveCommunityIcon,
  ActiveCollectionIcon,
  ActiveJournalIcon,
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

export const bottomTabBarRoutes = [
  {
    href: "/dashboard",
    label: "HOME",
    icon: HomeTabIcon,
    activeIcon: ActiveHomeTabIcon,
  },
  {
    href: "/community",
    label: "COMMUNITY",
    icon: CommunityIcon,
    activeIcon: ActiveCommunityIcon,
    disabled: true,
  },
  {
    href: "/collection",
    label: "COLLECTION",
    icon: CollectionIcon,
    activeIcon: ActiveCollectionIcon,
    disabled: true,
  },
  {
    href: "/journal",
    label: "JOURNAL",
    icon: JournalIcon,
    activeIcon: ActiveJournalIcon,
    disabled: true,
  },
];
