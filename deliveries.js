// deliveries.js

// Delivery data
const deliveries = [
  {
    trackingCode: "R6555554RFE", 
    estimatedDelivery: "September 09, 2025",
    customs: "Custom cleared, Liubinska St, 168, Lviv, Ukraine, 79000",
    shipper: {
      name: "Laneige",
      phone: "+1 (929) 330-9752",
      address: "1407 Broadway, Suite 210, New York, NY 10018",
      email: "uslaneigecollaboration@gmail.com"
    },
    receiver: {
      name: "Maria Garcia",
      phone: "+1 (903) 372-8271",
      address: "3205 Duke Ave, Big Spring TX 79720",
      email: ""
    },
    shipment: {
      weight: "5.6 kg",
      courier: "NOVA",
      packages: "Pr package",
      mode: "Freight",
      product: "Pr package",
      quantity: 1,
      paymentMode: "Zelle",
      totalFreight: "$219",
      carrier: "Air carrier (Nova445763222)",
      carrierRef: "",
      departureTime: "",
      origin: "USA-USA",
      destination: "",
      pickupDate: "",
      pickupTime: "September 09, 2025",
      status: "Order Processing",
      comments: "Item has been held by custom authority",
      agentName: "",
      shipmentType: "Freight"
    }
  },

  {
    trackingCode: "F56789UJ678", 
    estimatedDelivery: "Aug 12, 2025 14:30",
    customs: "Custom cleared, 5th Avenue, New York, NY, USA, 10001",
    shipper: {
      name: "Global Ship Co",
      phone: "+1 212-555-7890",
      address: "123 5th Avenue, New York, NY 10001",
      email: "support@globalshipco.com"
    },
    receiver: {
      name: "John Doe",
      phone: "+380 50 123 4567",
      address: "Shevchenko St, 45, Kyiv, Ukraine, 01001",
      email: "johndoe@example.com"
    },
    shipment: {
      weight: "2.3 kg",
      courier: "FastTrack",
      packages: "Box",
      mode: "Air",
      product: "Electronics",
      quantity: 1,
      paymentMode: "Credit Card",
      totalFreight: "$85",
      carrier: "Airline Express",
      carrierRef: "FT123456789",
      departureTime: "09:00",
      origin: "New York",
      destination: "Kyiv",
      pickupDate: "01, Aug 2025",
      pickupTime: "07:00",
      status: "In Transit",
      comments: "Package left origin facility",
      agentName: "Alice Smith",
      shipmentType: "Air"
    }
  }
];
