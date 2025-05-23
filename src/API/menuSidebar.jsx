// menu.js
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdOutlineRequestQuote, MdTune, MdInsights } from "react-icons/md";

const menuSidebar = [
  {
    headMenu: "Overview",
    menu: [
      {
        menu: "Data Item",
        type: "dropdown",
        icon: <RiDashboardHorizontalLine className="w-4" />,
        subMenu: [
          {
            menu: "Mata Pelajaran",
            href: "/data-item/mata-pelajaran",
          },
          {
            menu: "Majalah",
            href: "/data-item/majalah",
          },
          {
            menu: "Jurnal",
            href: "/data-item/jurnal",
          },
        ],
      },
      {
        menu: "Data Anggota",
        href: "/anggota",
        type: "link",
        icon: <MdOutlineRequestQuote className="w-4" />,
      },
      {
        menu: "Peminjaman",
        href: "/peminjaman",
        type: "link",
        icon: <MdTune className="w-4" />,
      },
      {
        menu: "Setting",
        type: "dropdown",
        icon: <MdInsights className="w-4" />,
        subMenu: [
          {
            menu: "Profile",
            href: "/setting/profile",
          },
        ],
      },
    ],
  },
];

export default menuSidebar;
