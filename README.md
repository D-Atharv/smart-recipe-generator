# Recipe Snap 🍳📸

Transform your ingredients into delicious meals with AI-powered recipe generation. Snap a photo of your ingredients and discover what you can cook!

![Recipe Snap Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Recipe+Snap+Demo)

## 🌟 Features

### 🔍 **AI-Powered Ingredient Recognition**
- **Photo Recognition**: Simply snap a photo of your ingredients, and our advanced AI identifies them instantly.
- **Smart Detection**: Accurately recognizes fruits, vegetables, proteins, and pantry staples.
- **Cross-Platform Support**: Works on both mobile cameras and desktop uploads.

### 🤖 **Intelligent Recipe Generation**
- **Custom Recipe Creation**: Generate unique recipes based on your available ingredients.
- **Cuisine Preferences**: Choose from global cuisines or let AI surprise you.
- **Dietary Accommodations**: Support for vegetarian, vegan, gluten-free, and other dietary restrictions.

### 🔄 **Smart Substitution Engine**
- **Ingredient Alternatives**: Get suggestions for ingredient substitutions.
- **Dietary Adaptations**: Automatically adapt recipes for dietary needs.
- **Allergy-Safe Options**: Find safe alternatives for common allergens.

### 📱 **User Experience**
- **Responsive Design**: Beautiful interface that works on all devices.
- **Favorites System**: Save your favorite recipes for easy access.
- **Recipe Rating**: Rate and review recipes from the community.
- **Semantic Search**: Find recipes using natural language queries.

### 🎯 **Advanced Search & Discovery**
- **Combined Search**: Fuzzy matching + semantic search for accurate results.
- **Recipe Recommendations**: Personalized suggestions based on your preferences.
- **Exploration Features**: Discover new recipes and cuisines.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful component library

### Backend & AI
- **Google Genkit** - AI workflow orchestration
- **Google Gemini** - Advanced vision and language models
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Robust relational database

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Cross-env** - Cross-platform environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database
- **Google AI API Key** (for Gemini)

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-recipe-generator.git
cd smart-recipe-generator
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/recipe_snap"

# Google AI
GOOGLE_AI_API_KEY="your_google_ai_api_key_here"

```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the Development Server
```bash
npm run dev
```
The application will be available at [http://localhost:9002](http://localhost:9002)

### 6. Start AI Development Environment (Optional)
For AI flow development and testing:
```bash
npm run genkit:dev
```

## 📁 Project Structure
```
src/
├── ai/                     # AI workflows and configurations
│   ├── flows/             # Genkit AI flows
│   │   ├── ingredient-recognition-from-image.ts
│   │   ├── recipe-generation.ts
│   │   ├── recipe-suggestions.ts
│   │   └── ai-powered-substitution-suggestions.ts
│   ├── genkit.ts          # AI configuration
│   └── dev.ts             # Development AI server
├── app/                   # Next.js App Router
│   ├── api/              # API routes
│   ├── snap/             # Photo capture page
│   ├── recipes/          # Recipe browsing
│   ├── favorites/        # User favorites
│   └── ...
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   ├── recipe/          # Recipe-specific components
│   └── layout/          # Layout components
├── lib/                 # Utility functions
│   ├── semantic-search.ts
│   ├── combined-search.ts
│   └── utils.ts
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks

prisma/
├── schema.prisma        # Database schema
└── migrations/          # Database migrations

scripts/
└── generateEmbeddings.py  # Recipe embedding generation
```

## 🔧 Available Scripts
```bash
# Development
npm run dev              # Start development server on port 9002
npm run genkit:dev       # Start Genkit AI development server
npm run genkit:watch     # Start Genkit with watch mode

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking

# Database
npx prisma studio        # Open Prisma Studio
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations
```

## 🎨 Key Features Deep Dive

### Image Recognition Flow
1. User uploads/captures image of ingredients
2. Image processed through Google Gemini Vision API
3. AI identifies individual ingredients with high accuracy
4. Results displayed for user confirmation

### Recipe Generation
1. Identified ingredients sent to recipe generation flow
2. AI considers dietary restrictions and cuisine preferences
3. Complete recipe generated with ingredients, instructions, and nutritional info
4. Recipe formatted and stored in database

### Semantic Search
1. Recipe embeddings generated using sentence transformers
2. User queries converted to vector embeddings
3. Similarity search performed against recipe database
4. Results ranked by relevance and ingredient availability

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run start
```

### Database Deployment
- Use Vercel Postgres, Supabase, or any PostgreSQL provider
- Update `DATABASE_URL` in your production environment

## 🔐 Environment Variables
| Variable                 | Description                  | Required |
| ------------------------ | ---------------------------- | -------- |
| `DATABASE_URL`           | PostgreSQL connection string | ✅       |
| `GOOGLE_AI_API_KEY`      | Google AI/Gemini API key     | ✅       |


⭐ = Optional but recommended for full functionality

## 🤝 Contributing
We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [Google Gemini](https://ai.google.dev/) for powerful AI capabilities
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for seamless deployment
- [Prisma](https://prisma.io/) for excellent database tooling

## 📞 Support
- 📧 Email: support@recipesnap.com
- 🐛 Issues: [GitHub Issues](https://github.com/D-Atharv/smart-recipe-generator)
- 💬 Discussions: [GitHub Discussions](https://github.com/D-Atharv)
