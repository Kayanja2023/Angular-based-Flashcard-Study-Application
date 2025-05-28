
# Flashcard Study App

## Project Overview

This Angular-based Flashcard Study Application is designed to help learners create, manage, and review flashcards effectively. Built with a modular architecture and a focus on user experience, it includes features like flashcard set creation, study mode, and dynamic editing—all with an intuitive Material UI layout.

---

## Features

- Create and manage flashcard sets
- Edit individual flashcards within sets
- Study flashcards in a flip-card style
- Responsive and visually intuitive UI using Angular Material
- Light mode UI with complementary colors for better accessibility

---

## Technologies Used

- **Angular v16+** with standalone components
- **Angular Material** for UI design
- **RxJS** for reactivity
- **TypeScript** for strongly-typed logic

---

## File Structure

```
flashcard-app/
├── app/
│   ├── models/                # Data interfaces
│   ├── services/              # Business logic for managing flashcards
│   ├── study/
│   │   ├── flashcard-list/    # View existing flashcard sets
│   │   ├── flashcard-edit/    # Create and edit flashcard sets
│   │   └── flashcard-study/   # Study mode view
├── assets/                    # Static assets
├── environments/              # Angular environment configs
├── styles.css                 # Global and component-level theming
├── app.component.ts|html|css  # Root application logic
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd flashcard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

---

## Testing

To be added in future releases.

---



