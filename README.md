# Voyantra
A collaborative trip planning platform that simplifies creating and booking customized travel itineraries. Built with the MERN stack and powered by Amadeus API to deliver real-time flight and hotel data for a seamless planning experience.

## Features
- **Personalized Itineraries**: Input your dates, guest count, origin, and destination to generate customized trip plans tailored to your preferences
- **Real-Time Travel Data**: Integration with Amadeus API provides live flight options, hotel availability, and pricing
- **Streamlined Booking**: Integrated trip data and document storage displayed in an intuitive card-based interface
- **Collaborative Planning**: Share trip plans with friends who can adjust dates and receive updated travel options in real-time
- **Modern UI**: Clean, responsive design built with Tailwind CSS for an enjoyable user experience

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Integration**: Amadeus Travel API for flight and hotel data
- **Architecture**: RESTful API design with modular component structure

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Amadeus API credentials ([Get them here](https://developers.amadeus.com/))
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/voyantra.git
cd voyantra

# Install dependencies for backend
cd server
npm install

# Install dependencies for frontend
cd ../client
npm install
```

### Configuration
Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret
```

### Running the Application
```bash
# Run backend (from server directory)
npm start

# Run frontend (from client directory)
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure
```
voyantra/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/    # Amadeus API integration
│   └── package.json
└── README.md
```

## API Integration
Voyantra leverages the Amadeus Travel API to provide:
- Real-time flight search and pricing
- Hotel availability and booking options
- Airport and city information
- Travel recommendations

## Roadmap
- [ ] User authentication and profiles
- [ ] Enhanced real-time collaboration features
- [ ] Direct booking integration
- [ ] Mobile responsive optimization
- [ ] Trip budget calculator
- [ ] Weather and activity recommendations
- [ ] Multi-city itinerary support

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
