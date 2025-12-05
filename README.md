# Vue 3 Boilerplate - Clean Architecture & Modular Design

A production-ready Vue 3 boilerplate that combines **Clean Architecture** principles with **Modular Design** patterns. This project serves as a playground for building scalable, maintainable, and modular web applications with GraphQL support and multi-language capabilities.

## 🎯 Philosophy

This boilerplate is built on two core architectural principles:

1. **Clean Architecture**: Complete separation of concerns between UI and business logic
2. **Modular Design**: Self-contained modules that can work independently, each with its own components, store, composables, and business logic

## ✨ Features

- 🏗️ **Clean Architecture** - Separated business logic from UI layer
- 📦 **Modular Design** - Self-contained, independent modules
- 🌐 **Multi-language Support** - Built-in i18n with English and Persian (Farsi)
- 🔌 **GraphQL Integration** - Apollo Client with optimized query management
- 🎨 **Design System** - Complete SCSS-based design system with theming
- 🔄 **Shared Kernel** - Reusable ecosystem components and utilities
- 📱 **PWA Ready** - Progressive Web App support
- 🚀 **Vite** - Lightning-fast build tool and dev server
- 🧩 **Plugin System** - Extensible plugin loader for modular architecture
- 📚 **Component Library** - Comprehensive reusable Vue 3 components (feel free to use!)

## 📁 Project Structure

```
├── src/
│   ├── business-logic/          # Business logic layer (Clean Architecture)
│   │   ├── {module}/           # Module-specific business logic
│   │   │   ├── apollo/         # GraphQL queries and mutations
│   │   │   ├── repositories/   # Data access layer
│   │   │   └── services/       # Business logic services
│   │
│   └── user-interface/         # UI layer (Clean Architecture)
│       ├── {module}/           # Module-specific UI
│       │   ├── components/     # Module-specific components
│       │   ├── composables/    # Module-specific composables
│       │   ├── constants/      # Module constants
│       │   ├── router/         # Module routes
│       │   ├── store/          # Module state management
│       │   └── views/          # Module views/pages
│       │
│       └── shared/             # Shared UI across modules
│           ├── assets/        # Shared assets (images, svg, etc.)
│           ├── composables/   # Shared composables
│           ├── layouts/       # Layout components
│           ├── locales/       # i18n translation files
│           └── router/        # Main router configuration
│
└── shared-kernel/              # Shared ecosystem (can be git submodule)
    ├── cross-cutting/         # Cross-cutting concerns
    │   ├── helpers/           # Helper functions
    │   ├── libs/              # Utility libraries
    │   └── utils/             # Utility functions
    ├── design-system/         # SCSS design system
    ├── event-bus/             # Event bus implementation
    ├── plugin-loader/         # Plugin loading system
    ├── shared/                # Shared business logic & UI
    ├── svg-loader/            # SVG component loader
    └── vite-plugins/          # Custom Vite plugins
```

## 🏛️ Architecture Overview

### Clean Architecture Layers

The project follows Clean Architecture principles with clear separation:

```
┌─────────────────────────────────────┐
│      User Interface Layer           │
│  (Views, Components, Stores)         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Business Logic Layer           │
│  (Services, Repositories, Apollo)   │
└─────────────────────────────────────┘
```

**Data Flow:**
```
Component → Store → Service → Repository → Apollo Client → GraphQL API
```

### Modular Design

Each module is self-contained and independent:

```
module-name/
├── user-interface/          # UI concerns
│   ├── components/         # Module-specific components
│   ├── store/             # Module state (Pinia)
│   ├── router/            # Module routes
│   ├── views/             # Module pages
│   └── constants/         # Module constants
│
└── business-logic/         # Business concerns
    ├── apollo/            # GraphQL queries
    ├── repositories/      # Data access
    └── services/          # Business logic
```

**Example: Apply Module**

```
apply/
├── user-interface/
│   ├── store/
│   │   ├── actions.store.js    # Store actions
│   │   ├── state.store.js      # Store state
│   │   └── index.js            # Store definition
│   ├── views/
│   │   └── apply.view.vue      # Apply page
│   └── router/
│       └── index.js            # Apply routes
│
└── business-logic/
    ├── apollo/
    │   └── queries.js          # GraphQL queries
    ├── repositories/
    │   └── apply.repository.js # Data access
    └── services/
        └── apply.service.js    # Business logic
```

## 🔑 Key Concepts

### 1. Module Independence

Each module (`apply`, `main`, `about-us`, etc.) is designed to work independently:

- **Self-contained**: All module-specific code lives within the module folder
- **Isolated**: Modules don't directly depend on each other
- **Reusable**: Modules can be easily moved or reused in other projects

### 2. Shared Module

The `shared` folder in `user-interface` contains:

- **Assets**: Images, SVG files, and other static assets
- **Composables**: Shared composables (useLocale, useDate, etc.)
- **Layouts**: Layout components (default, auth)
- **Locales**: Internationalization translation files (en.json, fa.json)
- **Router**: Main router configuration

**Rule**: If something is used by 2+ modules, it belongs in `shared`.

**Note**: Reusable UI components are located in `shared-kernel/shared/user-interface/components` to enable sharing across multiple applications.

### 3. Business Logic Separation

Business logic is completely separated from UI:

- **`src/business-logic/`**: Contains all business logic for each module
- **`src/user-interface/`**: Contains only UI-related code
- **Stores call services**: UI stores call business logic services, not repositories directly

**Example Flow:**
```javascript
// Component
const applyStore = useApplyStore();
await applyStore.createApplication(data);

// Store (user-interface)
async createApplication(variables) {
  const response = await service.createApplication(variables);
  // ...
}

// Service (business-logic)
static async createApplication(variables) {
  const response = await repository.createApplication(variables);
  return response;
}

// Repository (business-logic)
static async createApplication(variables) {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_APPLICATION,
    variables,
  });
  return data;
}
```

### 4. Shared Kernel

The `shared-kernel` is a powerful concept for multi-application ecosystems:

**Purpose:**
- Share design systems, components, utilities across multiple applications
- Maintain consistency across projects
- Speed up development by reusing tested code

**Structure:**
```
shared-kernel/
├── design-system/        # SCSS design system (colors, typography, etc.)
├── cross-cutting/        # Utilities, helpers, libraries
├── shared/               # Shared business logic & UI
│   ├── business-logic/  # Shared business logic (storage services, etc.)
│   └── user-interface/  # Shared UI components & utilities
│       ├── components/  # Reusable UI components library
│       ├── composables/ # Shared composables
│       ├── constants/   # Shared constants
│       ├── directives/  # Shared directives
│       ├── layouts/     # Shared layouts
│       ├── mappers/     # Shared mappers
│       ├── plugins/     # Shared plugins
│       ├── store/       # Shared store
│       └── views/       # Shared views (404, etc.)
├── plugin-loader/         # Plugin system
└── vite-plugins/         # Build-time plugins
```

**Usage in Multi-App Setup:**
```bash
# In each application
git submodule add <shared-kernel-repo-url> shared-kernel
```

**Benefits:**
- **Consistency**: Same design system and components across all apps
- **Speed**: Updates to shared-kernel automatically benefit all apps
- **Team Efficiency**: Separate team can maintain shared-kernel
- **Quality**: Shared components are battle-tested across projects
- **Component Library**: Pre-built, reusable components ready to use (buttons, inputs, modals, etc.)
- **Component Library**: Pre-built, reusable components ready to use (buttons, inputs, modals, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### Development

```bash
# Start dev server
npm run dev

# Start with specific environment
npm run dev:test
npm run dev:prod
```

### Build

```bash
# Build for production
npm run build:prod

# Build for specific environment
npm run build:dev
npm run build:test
```

### Preview

```bash
npm run preview
```

## 📝 Environment Configuration

Create environment files in `shared-kernel/env/`:

- `.env.dev` - Development environment
- `.env.test` - Test environment
- `.env.prod` - Production environment

**Required Variables:**
```env
VITE_API_BASE_URL=https://api.example.com
VITE_PORT=3000
```

## 🧩 Creating a New Module

### Step 1: Create Module Structure

```bash
# Create module directories
mkdir -p src/user-interface/my-module/{components,store,router,views,constants}
mkdir -p src/business-logic/my-module/{apollo,repositories,services}
```

### Step 2: Set Up Business Logic

**`src/business-logic/my-module/apollo/queries.js`**
```javascript
import { gql } from "@apollo/client/core";

export const GET_MY_DATA = gql`
  query GetMyData {
    myData {
      id
      name
    }
  }
`;
```

**`src/business-logic/my-module/repositories/my-module.repository.js`**
```javascript
import { apolloClient } from "@user-interface/apollo.js";
import { GET_MY_DATA } from "../apollo/queries";

export default class {
  static async getMyData() {
    const { data } = await apolloClient.query({
      query: GET_MY_DATA,
    });
    return data;
  }
}
```

**`src/business-logic/my-module/services/my-module.service.js`**
```javascript
import { myModule as repository } from "../repositories";

export default class {
  static async getMyData() {
    const response = await repository.getMyData();
    return response?.myData || [];
  }
}
```

### Step 3: Set Up UI Store

**`src/user-interface/my-module/store/state.store.js`**
```javascript
export default () => ({
  data: [],
  loading: false,
});
```

**`src/user-interface/my-module/store/actions.store.js`**
```javascript
import { myModule as service } from "@BL/my-module/services";

export default {
  async getMyData() {
    this.loading = true;
    try {
      const response = await service.getMyData();
      this.data = response;
      return response;
    } finally {
      this.loading = false;
    }
  },
};
```

**`src/user-interface/my-module/store/index.js`**
```javascript
import { defineStore } from "pinia";
import actions from "./actions.store.js";
import state from "./state.store.js";
import getters from "./getters.store.js";

export const useMyModuleStore = defineStore("my-module", {
  actions,
  state,
  getters,
});
```

### Step 4: Create View

**`src/user-interface/my-module/views/my-module.view.vue`**
```vue
<template>
  <div>
    <h1>{{ t("myModule.title") }}</h1>
    <button @click="loadData">Load Data</button>
  </div>
</template>

<script setup>
import { useMyModuleStore } from "../store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useMyModuleStore();

const loadData = () => {
  store.getMyData();
};
</script>
```

### Step 5: Add Routes

**`src/user-interface/my-module/router/index.js`**
```javascript
import { createRouter, createWebHistory } from "vue-router";
import MyModuleView from "../views/my-module.view.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/my-module",
      name: "myModule",
      component: MyModuleView,
    },
  ],
});
```

### Step 6: Register Module

Add the module router to the main router configuration.

## 🌐 Internationalization

### Adding Translations

**English (`src/user-interface/shared/locales/en.json`)**
```json
{
  "myModule": {
    "title": "My Module",
    "description": "Module description"
  }
}
```

**Persian (`src/user-interface/shared/locales/fa.json`)**
```json
{
  "myModule": {
    "title": "ماژول من",
    "description": "توضیحات ماژول"
  }
}
```

### Using Translations

```vue
<template>
  <div>{{ t("myModule.title") }}</div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
```

## 🎨 Design System

The design system is located in `shared-kernel/design-system/`:

- **Abstracts**: Colors, typography, spacing, breakpoints
- **Base**: Reset styles, base components
- **Components**: Component-specific styles
- **Themes**: Light/dark theme configurations
- **Tools**: Mixins and utility functions

### Using Design System

```scss
.my-component {
  @include flex($align: center, $justify: space-between);
  padding: space(4);
  color: var(--palette-text-main-1);
  @include typography(bold-18);
  
  @include mq(medium) {
    flex-direction: column;
  }
}
```

## 📦 Component Library

The project includes a comprehensive component library located in `shared-kernel/shared/user-interface/components/`. All components are **auto-imported**, so you can use them directly without imports.

### Available Components

**Buttons & Inputs:**
- `base-button` - Primary button component
- `checkbox-button` - Checkbox button
- `radio-button` - Radio button
- `text-field` - Text input field
- `password-field` - Password input
- `base-select` - Select dropdown
- `badge-select` - Select with badges
- `date-field` - Date input
- `range-date-field` - Date range picker
- `time-field` - Time input
- `range-time-field` - Time range picker
- `file-picker` - File upload component
- `checkbox-group` - Checkbox group
- `radio-group` - Radio group
- `radio-group-tile` - Radio group with tiles

**Layout & Navigation:**
- `the-header` - Main header component
- `mobile-header` - Mobile header
- `the-footer` - Footer component
- `side-menu` - Side navigation menu
- `navigation-side-menu` - Navigation side menu
- `base-menu` - Menu component
- `locale-switcher` - Language switcher

**Modals & Overlays:**
- `base-modal` - Base modal component
- `floating-modal` - Floating modal
- `menu-button` - Menu button component

**Display Components:**
- `base-badge` - Badge component
- `base-avatar` - Avatar/image component
- `image-uploader` - Image upload component
- `certificate-container` - Certificate display
- `collapsible-container` - Collapsible container
- `document-renderer` - Document renderer with rich text support
- `item-preview` - Item preview component
- `profile-details` - Profile details display

**Date & Time:**
- `date-picker` - Date picker
- `day-picker` - Day picker
- `month-picker` - Month picker
- `year-picker` - Year picker
- `date-item` - Date item display

**Other:**
- `divider` - Divider component
- `next-prv-action` - Next/Previous action buttons
- `router-view-wrapper` - Router view wrapper
- `toast-manager` - Toast notification manager
- `toast-notification` - Toast notification component
- `base-tooltip` - Tooltip component

### Using Components

Components are auto-imported, so you can use them directly:

```vue
<template>
  <div>
    <base-button @click="handleClick">Click Me</base-button>
    <base-modal v-model="isOpen">
      <text-field v-model="name" label="Name" />
    </base-modal>
  </div>
</template>
```

If you need explicit imports, use the alias:

```vue
<script setup>
import BaseButton from "@user-interface/shared/components/button/base-button.vue";
</script>
```

**Note**: These components are ready to use and have been included in the boilerplate. Feel free to use them in your projects!

## 🔌 GraphQL Integration

### Creating Queries

**`src/business-logic/my-module/apollo/queries.js`**
```javascript
import { gql } from "@apollo/client/core";

export const GET_DATA = gql`
  query GetData($id: ID!) {
    data(where: { id: $id }) {
      id
      name
    }
  }
`;

export const CREATE_DATA = gql`
  mutation CreateData($name: String!) {
    createData(data: { name: $name }) {
      id
      name
    }
  }
`;
```

### Using in Repository

```javascript
import { apolloClient } from "@user-interface/apollo.js";
import { GET_DATA, CREATE_DATA } from "../apollo/queries";

export default class {
  static async getData(id) {
    const { data } = await apolloClient.query({
      query: GET_DATA,
      variables: { id },
    });
    return data;
  }

  static async createData(variables) {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_DATA,
      variables,
    });
    return data;
  }
}
```

## 📦 Shared Kernel Usage

### As Git Submodule

```bash
# Add shared-kernel as submodule
git submodule add <shared-kernel-repo-url> shared-kernel

# Update shared-kernel
git submodule update --remote shared-kernel
```

### Direct Integration

If using directly (as in this boilerplate), the `shared-kernel` folder is included in the project.

## 🛠️ Development Guidelines

### Code Organization

1. **Keep modules independent**: Don't create cross-module dependencies
2. **Use shared for common code**: If 2+ modules need it, put it in `shared`
3. **Separate concerns**: Business logic in `business-logic`, UI in `user-interface`
4. **Follow naming conventions**: Use kebab-case for files, PascalCase for components

### Best Practices

- ✅ **Do**: Keep business logic in `business-logic` layer
- ✅ **Do**: Use stores to call services, not repositories directly
- ✅ **Do**: Use components from `shared-kernel/shared/user-interface/components` (auto-imported)
- ✅ **Do**: Put app-specific shared code in `user-interface/shared`
- ✅ **Do**: Use i18n for all user-facing text
- ❌ **Don't**: Import from other modules directly
- ❌ **Don't**: Put business logic in UI components
- ❌ **Don't**: Create circular dependencies
- ❌ **Don't**: Put reusable components in `user-interface/shared/components` (use shared-kernel instead)

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit
```

## 📚 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management
- **Vue I18n** - Internationalization
- **Apollo Client** - GraphQL client
- **VeeValidate** - Form validation
- **SCSS** - CSS preprocessor
- **PWA** - Progressive Web App support

## 🤝 Contributing

This is a boilerplate project. Feel free to fork and adapt it to your needs!

## 📄 License

MIT

## 🙏 Acknowledgments

This boilerplate combines concepts from:
- Clean Architecture by Robert C. Martin
- Modular Monolith architecture
- Domain-Driven Design principles

---

**Built with ❤️ for scalable Vue.js applications**
