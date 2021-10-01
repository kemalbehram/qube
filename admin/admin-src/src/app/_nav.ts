interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}
import { environment } from '../environments/environment';

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/'+environment.adminurl+'/dashboard',
    icon: 'icon-home',
  },
  // need
    {
      name: 'Settings',
      url: '/'+environment.adminurl+'/settings',
      icon: 'icon-settings'
    },
    {
      name: 'Site Settings',
      url: '/'+environment.adminurl+'/sitesetting',
      icon: 'icon-settings'
    },
    {
      name: 'Pairs Management',
      url: '/'+environment.adminurl+'/pairs',  
      icon: 'icon-settings'
    },
    // {
    //   name: 'CMS Management',
    //   url: '/'+environment.adminurl+'/static',  
    //   icon: 'icon-settings'
    // },
    {
      name: 'Banner Management',
      url: '/'+environment.adminurl+'/banner',  
      icon: 'icon-settings'
    },
    {
      name: 'FAQ Management',
      url: '/'+environment.adminurl+'/faq',  
      icon: 'icon-settings'
    },
    {
     name: 'Exchange History',
     url: '/'+environment.adminurl+'/exchangehistory',  
     icon: 'icon-support'
    },
    {
     name: 'Pool History',
     url: '/'+environment.adminurl+'/poollog',  
     icon: 'icon-support'
    },
    {
     name: 'Remove Pool History',
     url: '/'+environment.adminurl+'/removepool',  
     icon: 'icon-support'
    },
    // {
    //  name: 'Lending Assets',
    //  url: '/'+environment.adminurl+'/lending-assets',  
    //  icon: 'icon-support'
    // },
    //  {
    //  name: 'Lending',
    //  url: '/'+environment.adminurl+'/lending',  
    //  icon: 'icon-support'
    // },
    //  {
    //  name: 'Lending Borrow History',
    //  url: '/'+environment.adminurl+'/lending-borrow',  
    //  icon: 'icon-support'
    // },
    //  {
    //  name: 'Lending Withdraw History',
    //  url: '/'+environment.adminurl+'/lending-withdraw',  
    //  icon: 'icon-support'
    // },
    {
     name: 'Stake History',
     url: '/'+environment.adminurl+'/deposithistory',  
     icon: 'icon-support'
    },
    {
     name: 'Unstake History',
     url: '/'+environment.adminurl+'/withdrawhistory',  
     icon: 'icon-support'
    },
    {
     name: 'Currency',
     url: '/'+environment.adminurl+'/currency',  
     icon: 'icon-support'
    },
    {
     name: 'Claim History',
     url: '/'+environment.adminurl+'/harvesthistory',  
     icon: 'icon-support'
    },
    {
      name: 'IP Block Management',
      url: '/'+environment.adminurl+'/ipblock',
      icon: 'icon-ban'
    },
    {
      name: 'Admin logged History',
      url: '/'+environment.adminurl+'/adminlog',
      icon: 'icon-settings'
    },
];
