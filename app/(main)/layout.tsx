import Header from '@/components/Header';
import SideNavBar from '@/components/SideNavBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <main className='w-full'>
                <SideNavBar />
                <div className='flex  '>

                    <SidebarTrigger />
                    <Header />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}