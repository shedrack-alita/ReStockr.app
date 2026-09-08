/** Mock merchant business profile + dashboard stats — see /Merchant feature/12. Merchant - Profile Dashboard.png. */
export const mockMerchantBusiness = {
  ownerName: 'Isaac Greene',
  storeName: 'Isaac Greene',
  rating: 4.98,
  verified: true,
  addressLine: '186 Garki Road, Suite C, Abuja',
  contactEmail: 'isaac.greene@restockr.com',
  businessHours: 'Mon – Sat: 08:00 AM - 18:00 PM',
  acceptingOrders: true,
  stats: [
    { label: 'Total Sales', value: '1,248', change: '+12%' },
    { label: 'Total Revenue', value: '₦92,850', change: '+8%' },
    { label: 'Average Order Value', value: '₦200,834.33', change: '+3%' },
    { label: 'Customer Satisfaction', value: '98.2%', change: '+1.4%' },
  ],
  plan: {
    name: 'Pro Partner',
    nextRenewal: 'Oct 14, 2026',
    renewalAmount: '₦50,000/mo',
    monthlyDropVolume: 73,
    monthlyDropLimit: 100,
  },
  reviews: [
    {
      name: 'Amaka Okafor',
      when: '2 hours ago',
      rating: 5,
      quote: 'Consistent premium produce, always tracked correctly and arrived exactly on time before the morning rush. Highly recommend!',
    },
    {
      name: 'Graceful Akpan',
      when: 'Yesterday',
      rating: 4,
      quote: 'Great stock and helpful support. There was a tiny delay in the packing state, but the communication was spot-on.',
    },
  ],
}
