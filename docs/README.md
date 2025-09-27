# Local Taste - one plate at a time

Looking for a more authentic way to experience a new place? Discover home-cooked meals, explore hidden neighborhood restaurants, join unique food events, and share unforgettable moments with hosts who know the city best. Local Taste helps travelers connect with people, stories, and places — all through the shared joy of cuisine, one plate at a time.

![Home Page](https://res.cloudinary.com/dirjui0i9/image/upload/v1758945672/localtaste_home_gufnvj.png)

## Contributors

- Nhat Le: [LinkedIn](https://www.linkedin.com/in/nhat-le05/) | [GitHub](https://www.linkedin.com/in/nhat-le05/)
- Quy Nguyen: [LinkedIn](https://www.linkedin.com/in/quy-nguyen-b658aa243/) | [GitHub](https://github.com/brunonguyen0701)
- Dan Nguyen: [LinkedIn](https://www.linkedin.com/in/dannguyen24/) | [GitHub](https://github.com/dannguyen24)
- Tam Nguyen: [LinkedIn](https://www.linkedin.com/in/tam-nguyen-m/) | [GitHub](https://github.com/tam-nguyen-3)

Special thanks to our project advisors:

- Khoa Le: [GitHub](https://github.com/khoa165)
- Jenny: [GitHub](https://github.com/hoatuyet423)
- Hai Anh (Hennessy): [GitHub](https://github.com/haianhng31)

## Technologies

- Front-end: React.js (TypeScript), Shadcn UI, TailwindCSS, Socket.io (Client)
- Back-end: Node.js (TypeScript), Express, Socket.io (Server)
- Database: MongoDB, Cloudinary
- APIs / External Integrations: Google Maps / Places, Google OAuth, Stripe Payments, Cloudinary, WebSocket
- Testing: Jest, Vitest
- Deployment: AWS EC2, Docker, AWS Amplify, AWS S3
- CI/CD: Github Actions

### System Design Flow

**System Design Diagram**

![System Design Diagram](https://res.cloudinary.com/dirjui0i9/image/upload/v1758949469/Local_Taste_System_design_diagram_fhhtki.png)

**Deploy Diagram**

![Deploy Diagram](https://res.cloudinary.com/dirjui0i9/image/upload/v1758949469/Local_Taste_deploy_diagram_1_tvxfje.png)

## Features

### 1. Authentication and authorization

* Secure login with JWT-based authentication.
Supports Google OAuth for quick sign-in.

* Two primary user roles:
  * Guest (Traveler): Discover and book authentic experiences.
  * Host: Share your culture and cuisine with travelers.

![Authentication](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWh0MWpiOTdobzV4bmQydWlmdjhnMXA2aDljZjNzZGI5N2ZmeWxiaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GGFFLmcilrEh8oTZMQ/giphy.gif)

### 2. Browse and view upcoming events

**Dashboard view**

* Guests: View recommended upcoming food events.
* Hosts: See requests from travelers wanting to join.
* Track confirmed bookings in one place.

![Dashboard](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2d6cXF6YTRraWMxdmV1eWI5cGFwODhqdmYydGcycmhxYjFrd2tveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xMVl5B3Jmlm2rMghl7/giphy.gif)

**All events field**

- View more events per page, with dynamic filters to select relevant experiences

![View all with filters](filter.png)

### 3. Find nearby events and places with Google Maps!

* Discover hosts, requests, and events visually with Google Maps integration.
* Restaurant data (ratings, reviews, price range) powered by Google Places.

![Discover Places](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmlqeGZ0NzFoMXhxc2Q2bmdwcmZwYTBvZTFtNGtzZHNoMnpzOXFwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LmHEwEQV5KfoKqUufI/giphy.gif)

### 4. Book and checkout an experience

- For guests: Confirm your interest in joining a local host on an event. Note that the decision depends on the host!

- For experiences with a fee associated: checkout securely with payment supported by Stripe! Once the host approve your booking, payment will be authorized and sent to the host from Stripe.

![Confirm Booking](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnNpem5uZXppeGpmam1ieTRsYjZ2N2JtYmpmZjc5d3l3MDVxbWxpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gPM3EusBFPdyguRXdl/giphy.gif)

### 5. [Host] Manage your Listed Experiences

- View guests that indicated interest in your booking and approve/reject the requests.

![Manage Booking](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBidHJzeG4zbXJqZWx1aTJ5emwzMHdvcHFheThlZnJtZmpwMWd5eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P6Rb0hDlieDktKc548/giphy.gif)

### 6. Chat with hosts/guests

- Contact the host about an experience via chat to ask questions!

- For confirmed experience, a broadcast channel or group chat can be created to streamline communication.

![Chat](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3VhdXhlZm5nbTZwdTdtamxjZ2t2ZnV1c3JmanFubnVpa3hod2VudSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BIMZGCnKoE0LFEspz4/giphy.gif)

### 7. Social Feed and Real-time Notifications

- Write, share, and view friends' posts about traveling and cuisine.

- Link your post to a recent experience to spread and share with other people!

- Like and comment on other's post to express interest!

![Feed](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZ5bHY2c2g5bnY1OTd2bTBtbDZrdDRhZGxzZjgzNXEyM29pZGFndCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iBJAsRBLSKOAAdcqo1/giphy.gif)

**Notifications**

- Get real-time nofitications when people interacted with your post.

![Notification](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGExaWdnYmE3MTQ4cnI3bGphN3FrZHd4cm9hemZ3YTYzemVoNG9nZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IU9g4KDAQ1pgUkCzu3/giphy.gif)

### 8. Manage and View Profiles

- View other's profiles, including their basic informations, recent posts and reviews, and some fun statistics

- Manage and edit your own profile, including profile and cover pictures

![Profile](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFqa3loZ3FiMWc3bjZpNDltZHJ2NWUwYTF0djlzazhpNmF5bnBheSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2kmcSimusMTJpW8zNk/giphy.gif)

## Getting Started (For Developers)

```
# Clone repo
git clone https://github.com/yourusername/local-taste.git

# Install dependencies
npm install

# Start development servers
npm run dev
```

## Roadmap (Next Steps)
*  Friendship system + visibility controls
* AI-driven personalized event recommendations
* Multi-language support
* Mobile app (React Native)

## License

MIT License — feel free to fork, contribute, and build upon Local Taste!
