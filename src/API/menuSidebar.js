import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdOutlineRequestQuote, MdTune, MdInsights } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { BiHistory } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

const menuSidebar = [
  {
    menu: [
      {
        role: "ADMIN",
        menu: "Data Item",
        type: "dropdown",
        icon: <RiDashboardHorizontalLine className="w-4" />,
        subMenu: [
          { menu: "Mata Pelajaran", href: "/data-item/mata-pelajaran" },
          { menu: "Majalah", href: "/data-item/majalah" },
          { menu: "Jurnal", href: "/data-item/jurnal" },
        ],
      },
      {
        role: "ADMIN",
        menu: "Data Anggota",
        href: "/anggota",
        type: "link",
        icon: <MdOutlineRequestQuote className="w-4" />,
      },
      {
        role: "ADMIN",
        menu: "Peminjaman",
        href: "/peminjaman",
        type: "link",
        icon: <MdTune className="w-4" />,
      },
      {
        role: "ADMIN",
        menu: "Setting",
        type: "dropdown",
        icon: <MdInsights className="w-4" />,
        subMenu: [{ menu: "Profile", href: "/setting/profile" }],
      },
      {
        role: "USER",
        menu: "Beranda",
        type: "link",
        href: "/beranda",
        icon: <GoHome className="w-4" />,
      },
      {
        role: "USER",
        menu: "Pinjam Buku",
        type: "dropdown",
        icon: <IoMdBook className="w-4" />,
        subMenu: [
          { menu: "Mata Pelajaran", href: "/buku/mata-pelajaran" },
          { menu: "Jurnal", href: "/buku/jurnal" },
          { menu: "Majalah", href: "/buku/majalah" },
        ],
      },
      {
        role: "USER",
        menu: "Keranjang",
        type: "link",
        href: "/keranjang",
        icon: <FiShoppingCart className="w-4" />,
      },
      {
        role: "USER",
        menu: "Riwayat Peminjaman",
        type: "link",
        href: "/riwayat-peminjaman",
        icon: <BiHistory className="w-4" />,
      },
      {
        role: "USER",
        menu: "Setting",
        type: "dropdown",
        icon: <BsGear className="w-4" />,
        subMenu: [{ menu: "Profile", href: "/profile" }],
      },
    ],
  },
];

export default menuSidebar;
