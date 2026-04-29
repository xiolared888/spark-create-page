# Lexie's Walks

A modern dog walking service web application for the Five Cities area of Central California. Lexie's Walks demonstrates full-stack automation and booking workflow design for a local service business.

## Overview

Lexie's Walks is a standalone web application that handles dog walking service scheduling, client management, and booking. Built as a demonstration project within the Binary Horizon automation consulting practice, it showcases practical integration patterns for small service businesses looking to streamline client interactions and operational workflows.

## Features

**Client-Facing**
- Service inquiry and booking interface
- Dog profile management
- Walk scheduling and confirmation
- Service history and pricing transparency

**Backend Integration Ready**
- Webhook architecture for booking confirmations
- API endpoints for service status updates
- Email and SMS notification hooks
- Calendar synchronization potential

**Design**
- Mobile-responsive interface
- Warm, accessible aesthetic centered on the Five Cities community
- Zero external dependencies (standalone bundle)

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (React)
- **Deployment**: Single-file HTML bundle with embedded assets
- **Architecture**: Lovable.dev bundled application
- **Integration Points**: Webhook-ready for n8n, Make, Zapier automation

## Getting Started

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/lexies-walks.git
   cd lexies-walks
   ```

2. Open `Lexies_Walks__standalone_.html` in a modern web browser:
   ```bash
   # macOS
   open Lexies_Walks__standalone_.html
   
   # Linux
   xdg-open Lexies_Walks__standalone_.html
   
   # Windows
   start Lexies_Walks__standalone_.html
   ```

Or serve it via a local HTTP server:
```bash
python3 -m http.server 8000
# Then navigate to http://localhost:8000/Lexies_Walks__standalone_.html
```

### Browser Requirements

- Modern browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)
- ES2020+ support recommended
- Minimum viewport: 375px width (mobile-first responsive)

## Development

### Modifying the Application

The application is bundled as a single HTML file. To make modifications:

1. **Development workflow**: Use the source files from Lovable.dev or the original component files
2. **Re-bundle**: Export from Lovable.dev as a standalone HTML file
3. **Testing**: Open in browser or serve locally to test changes

### Integration with Automation Workflows

This application is designed to integrate with automation platforms:

**Webhook Integration Example** (n8n, Make, Zapier):
- Booking events trigger webhook payloads
- Service confirmation sends customer notifications
- Calendar updates sync with scheduling systems

**Expected Webhook Payload** (booking submission):
```json
{
  "clientName": "string",
  "clientEmail": "string",
  "clientPhone": "string",
  "dogName": "string",
  "dogBreed": "string",
  "walkDate": "YYYY-MM-DD",
  "walkTime": "HH:MM",
  "duration": "number (minutes)",
  "notes": "string"
}
```

## Project Structure

```
lexies-walks/
├── Lexies_Walks__standalone_.html   # Complete bundled application
├── README.md                         # This file
└── docs/
    ├── INTEGRATION.md               # Webhook and API integration guide
    ├── DEPLOYMENT.md                # Production deployment instructions
    └── CUSTOMIZATION.md             # Brand and content customization
```

## Deployment

### Local Testing
```bash
python3 -m http.server 8000
```

### Production Hosting
- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the HTML file
- **Vercel**: Works with single-file deployment
- **AWS S3 + CloudFront**: For high-traffic scenarios

See `docs/DEPLOYMENT.md` for detailed instructions.

## Customization

To adapt Lexie's Walks for another service business:

1. **Branding**: Business name, logo, color palette (controlled in embedded CSS)
2. **Service Details**: Walk durations, pricing, availability windows
3. **Geographic Region**: Update service area references
4. **Contact Information**: Phone, email, address
5. **Dog Breed Support**: Expand breed list and handling notes

See `docs/CUSTOMIZATION.md` for step-by-step instructions.

## Integration Examples

### With n8n
Trigger an n8n workflow on booking submission to send confirmations, add to Airtable, and schedule calendar reminders.

### With Zapier
Connect booking data to Gmail drafts, Google Sheets, and Slack notifications.

### With Make (formerly Integromat)
Build a multi-step workflow: receive booking → validate client info → send confirmation → update inventory → create invoice.

## Roadmap

- [ ] Real-time availability calendar
- [ ] Client feedback and review system
- [ ] Payment processing integration (Stripe)
- [ ] Multi-walker assignment logic
- [ ] Geolocation-based service area validation
- [ ] Photo uploads for dog profiles

## License

MIT License. See LICENSE file for details.

## About Binary Horizon

This project is maintained by Binary Horizon, an AI automation education and consulting practice. We build practical automation solutions and demonstrate their implementation through portfolio projects like Lexie's Walks.

**Learn more**: [Binary Horizon](https://intelligent-guidance-ai.lovable.app/)

## Support

For technical questions or issues:
- Open an issue on this repository
- Contact: annettepartida@gmail.com

## Credits

Built with [Lovable.dev](https://lovable.dev) and designed with automation integration in mind.

---

**Last updated**: 2026  
**Status**: Active  
**Maintainer**: Binary Horizon
