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
  RightArrowIcon,
  ActiveMembershipIcon,
} from "@/components/icons";

export const routes = [
  {
    href: "/admin/dashboard",
    label: "HOME",
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    href: "/admin/members",
    label: "MEMBERS",
    icon: MembersIcon,
    activeIcon: ActiveMembershipIcon,
  },
  {
    href: "/admin/cigars",
    label: "CIGARS",
    icon: CigarTabIcon,
    activeIcon: ActiveCigarTabIcon,
    subMenu: [
      { href: "/admin/cigars", label: "CIGAR DB" },
      { href: "/admin/cigars/cigars-by-user", label: "Added by Users" },
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
    activePath: "/collection",
    icon: CollectionIcon,
    activeIcon: ActiveCollectionIcon,
  },
  {
    href: "/journal",
    label: "JOURNAL",
    icon: JournalIcon,
    activeIcon: ActiveJournalIcon,
    disabled: true,
  },
];

export const profileOptions = [
  {
    label: "Account Information",
    icon: RightArrowIcon,
    href: "/profile",
    disable: true,
  },
  {
    label: "Password Settings",
    icon: RightArrowIcon,
    href: "/profile/password",
    disable: true,
  },
  {
    label: "Cigar Preferences",
    icon: RightArrowIcon,
    href: "/profile/cigar-preferences",
    disable: true,
  },
];

export const humidorTypes = [
  { label: "Desktop Humidors", value: "desktop_humidors" },
  { label: "Travel Humidors", value: "travel_humidors" },
  { label: "Cabinet Humidors", value: "cabinet_humidors" },
];

export const humidificationMethods = [
  { label: "Passive", value: "passive" },
  { label: "Humidity Packs", value: "humidity_packs" },
  { label: "Electronic", value: "electronic" },
  { label: "Other", value: "other" },
];
