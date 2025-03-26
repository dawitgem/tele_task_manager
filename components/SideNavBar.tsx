import { Calendar, Home, Search, Settings, ListTodo, Layers } from "lucide-react"
import { GoTasklist, GoStack } from "react-icons/go"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Projects",
    url: "#",
    icon: Layers,
  },
  {
    title: "Tasks",
    url: "#",
    icon: ListTodo,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const SideNavBar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-300  flex flex-col h-full justify-between !important ">
        <SidebarGroup className="flex flex-col h-full ">
          <SidebarGroupLabel className="font-extrabold text-3xl h-18  flex flex-col items-center w-full justify-center align-middle !important">
            <h1 className="">
              <span className="text-sushi">T</span>
              <span className="text-curious-blue">T</span>
              <span className="text-black">M</span>
            </h1>

          </SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent className=" w-full h-full px-5 pt-8 !important">
            <SidebarMenu className="flex flex-col gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                    <Link href={item.url}>
                      <item.icon size={80} className={"text-xl"} />
                      <span className="text-lg " >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="relative self-end justify-self-end bottom-0 h-24 bg-white w-full border-2">
          footer
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideNavBar
