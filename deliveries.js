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
  },

  {
    trackingCode: "US99887766",
    estimatedDelivery: "Sep 02, 2025 14:00",
    customs: "Awaiting clearance, New York JFK",
    shipper: {
      name: "FedEx USA",
      phone: "+1 212 555 0199",
      address: "45 Madison Ave, New York, USA",
      email: "help@fedex.com"
    },
    receiver: {
      name: "Maria Lopez",
      phone: "+34 612 334455",
      address: "Calle Mayor 10, Madrid, Spain",
      email: "maria.lopez@example.es"
    },
    shipment: {
      weight: "12 kg",
      courier: "FedEx",
      packages: "Carton",
      mode: "Air",
      product: "Electronics",
      quantity: 1,
      paymentMode: "Credit Card",
      totalFreight: "$450",
      carrier: "Delta Cargo",
      carrierRef: "DL33221",
      departureTime: "09:30",
      origin: "New York",
      destination: "Madrid",
      pickupDate: "20, Aug 2025",
      pickupTime: "08:00",
      status: "Order Processing",
      comments: "On the way to airport",
      agentName: "John Smith",
      shipmentType: "Air Express"
    },
  },

  {
    trackingCode: "UK44556677",
    estimatedDelivery: "Aug 28, 2025 17:00",
    customs: "Heathrow cleared",
    shipper: {
      name: "London Logistics",
      phone: "+44 20 7946 0991",
      address: "Baker St 221B, London",
      email: "support@londonlog.com"
    },
    receiver: {
      name: "Kenji Tanaka",
      phone: "+81 90 1234 5678",
      address: "Shinjuku 5-10, Tokyo, Japan",
      email: "kenji.t@example.jp"
    },
    shipment: {
      weight: "5 kg",
      courier: "DHL",
      packages: "Parcel",
      mode: "Air",
      product: "Books",
      quantity: 10,
      paymentMode: "PayPal",
      totalFreight: "$200",
      carrier: "British Airways",
      carrierRef: "BA556677",
      departureTime: "11:15",
      origin: "London",
      destination: "Tokyo",
      pickupDate: "17, Aug 2025",
      pickupTime: "10:00",
      status: "Accepted",
      comments: "Label printed",
      agentName: "Emily Brown",
      shipmentType: "Air"
    },
  },

  {
    trackingCode: "CA88997766",
    estimatedDelivery: "Sep 05, 2025 09:00",
    customs: "Pending clearance, Toronto",
    shipper: {
      name: "Canada Express",
      phone: "+1 416 555 2299",
      address: "123 King St W, Toronto",
      email: "info@canexpress.ca"
    },
    receiver: {
      name: "Ahmed Hassan",
      phone: "+20 100 222 3344",
      address: "Tahrir Square, Cairo, Egypt",
      email: "ahmed.h@example.eg"
    },
    shipment: {
      weight: "25 kg",
      courier: "UPS",
      packages: "Crate",
      mode: "Air",
      product: "Machinery parts",
      quantity: 2,
      paymentMode: "Wire Transfer",
      totalFreight: "$1,200",
      carrier: "Air Canada",
      carrierRef: "AC8899",
      departureTime: "15:20",
      origin: "Toronto",
      destination: "Cairo",
      pickupDate: "22, Aug 2025",
      pickupTime: "07:00",
      status: "Shipment Pending",
      comments: "Awaiting customs documents",
      agentName: "Sophia Johnson",
      shipmentType: "Air Cargo"
    },
  },

  {
    trackingCode: "DE55443322",
    estimatedDelivery: "Aug 30, 2025 19:00",
    customs: "Cleared, Berlin",
    shipper: {
      name: "Berlin Freight",
      phone: "+49 30 123456",
      address: "Alexanderplatz, Berlin",
      email: "support@berlinfreight.de"
    },
    receiver: {
      name: "Pierre Dubois",
      phone: "+33 612 998877",
      address: "Rue de Rivoli, Paris",
      email: "pierre.d@example.fr"
    },
    shipment: {
      weight: "7 kg",
      courier: "Hermes",
      packages: "Envelope",
      mode: "Ground",
      product: "Documents",
      quantity: 1,
      paymentMode: "Cash on delivery",
      totalFreight: "€90",
      carrier: "DB Schenker",
      carrierRef: "DB5566",
      departureTime: "06:00",
      origin: "Berlin",
      destination: "Paris",
      pickupDate: "18, Aug 2025",
      pickupTime: "05:30",
      status: "Custom cleared",
      comments: "In transit",
      agentName: "Hans Müller",
      shipmentType: "Ground"
    },
  },

  {
    trackingCode: "FR11223344",
    estimatedDelivery: "Sep 01, 2025 13:00",
    customs: "Orly Airport, Paris",
    shipper: {
      name: "Paris Couriers",
      phone: "+33 145 678901",
      address: "Boulevard St-Germain, Paris",
      email: "contact@parcouriers.fr"
    },
    receiver: {
      name: "Sarah Johnson",
      phone: "+1 415 223344",
      address: "Market St, San Francisco, USA",
      email: "sarah.j@example.com"
    },
    shipment: {
      weight: "2 kg",
      courier: "Chronopost",
      packages: "Small Box",
      mode: "Air",
      product: "Perfume",
      quantity: 5,
      paymentMode: "Credit Card",
      totalFreight: "€150",
      carrier: "Air France",
      carrierRef: "AF2233",
      departureTime: "08:15",
      origin: "Paris",
      destination: "San Francisco",
      pickupDate: "19, Aug 2025",
      pickupTime: "07:30",
      status: "Order Processing",
      comments: "At warehouse",
      agentName: "Claire Dupont",
      shipmentType: "Air Express"
    },
  },

  {
    trackingCode: "IN77889900",
    estimatedDelivery: "Sep 03, 2025 18:00",
    customs: "Mumbai port",
    shipper: {
      name: "IndiaCargo",
      phone: "+91 22 22334455",
      address: "Marine Lines, Mumbai",
      email: "support@indiacargo.in"
    },
    receiver: {
      name: "David Miller",
      phone: "+61 400 778899",
      address: "George St, Sydney, Australia",
      email: "david.m@example.au"
    },
    shipment: {
      weight: "15 kg",
      courier: "BlueDart",
      packages: "Carton",
      mode: "Sea",
      product: "Textiles",
      quantity: 50,
      paymentMode: "Letter of Credit",
      totalFreight: "$600",
      carrier: "Maersk",
      carrierRef: "MS7788",
      departureTime: "10:45",
      origin: "Mumbai",
      destination: "Sydney",
      pickupDate: "21, Aug 2025",
      pickupTime: "09:30",
      status: "Accepted",
      comments: "Onboard vessel",
      agentName: "Ravi Kumar",
      shipmentType: "Sea Freight"
    },
  },

  {
    trackingCode: "BR00998877",
    estimatedDelivery: "Sep 08, 2025 16:00",
    customs: "Sao Paulo airport",
    shipper: {
      name: "Brasil Express",
      phone: "+55 11 987654321",
      address: "Av Paulista, Sao Paulo",
      email: "contact@br-express.com"
    },
    receiver: {
      name: "Anna Schmidt",
      phone: "+49 176 556677",
      address: "Hauptstrasse, Munich, Germany",
      email: "anna.s@example.de"
    },
    shipment: {
      weight: "9 kg",
      courier: "LATAM Cargo",
      packages: "Box",
      mode: "Air",
      product: "Shoes",
      quantity: 20,
      paymentMode: "Credit Card",
      totalFreight: "$350",
      carrier: "LATAM Airlines",
      carrierRef: "LA8899",
      departureTime: "14:00",
      origin: "Sao Paulo",
      destination: "Munich",
      pickupDate: "23, Aug 2025",
      pickupTime: "08:30",
      status: "Shipment Pending",
      comments: "Scheduled for flight",
      agentName: "Carlos Silva",
      shipmentType: "Air Express"
    },
  },

  {
    trackingCode: "AU66554433",
    estimatedDelivery: "Sep 10, 2025 11:00",
    customs: "Sydney Airport, Cleared",
    shipper: {
      name: "Aussie Couriers",
      phone: "+61 2 99887766",
      address: "George St, Sydney",
      email: "help@aussiecouriers.au"
    },
    receiver: {
      name: "Mark Thompson",
      phone: "+1 917 445566",
      address: "5th Ave, New York, USA",
      email: "mark.t@example.com"
    },
    shipment: {
      weight: "4 kg",
      courier: "Qantas Cargo",
      packages: "Envelope",
      mode: "Air",
      product: "Contracts",
      quantity: 1,
      paymentMode: "Bank Transfer",
      totalFreight: "$100",
      carrier: "Qantas",
      carrierRef: "QF4455",
      departureTime: "12:00",
      origin: "Sydney",
      destination: "New York",
      pickupDate: "24, Aug 2025",
      pickupTime: "07:15",
      status: "Estimated Delivery",
      comments: "Arriving soon",
      agentName: "Olivia White",
      shipmentType: "Air"
    },
  }
];
