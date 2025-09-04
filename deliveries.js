// deliveries.js

// Delivery data
const deliveries = [
  {
    trackingCode: "R6789654RFE", 
    estimatedDelivery: "Aug 25, 2025 12:00",
    customs: "Custom cleared, Via Roma 20, Rome, Italy, 00100",
    shipper: {
      name: "Italia Shipping",
      phone: "+39 06 1234567",
      address: "Via Roma 20, Rome, Italy",
      email: "support@italiashipping.it"
    },
    receiver: {
      name: "Olena Kovalenko",
      phone: "+380 50 876 5432",
      address: "Dniprovska St, 8, Kyiv, Ukraine, 02000",
      email: "olena.k@example.com"
    },
    shipment: {
      weight: "3.5 kg",
      courier: "ItalyFast",
      packages: "Box",
      mode: "Air",
      product: "Gifts",
      quantity: 3,
      paymentMode: "Bank transfer",
      totalFreight: "$120",
      carrier: "Alitalia Cargo",
      carrierRef: "IT55667788",
      departureTime: "07:00",
      origin: "Rome",
      destination: "Kyiv",
      pickupDate: "15, Aug 2025",
      pickupTime: "05:00",
      status: "pending",
      comments: "Package prepared for shipment",
      agentName: "Luca Rossi",
      shipmentType: "Air"
    },
  }
];



