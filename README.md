# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f703a598-545c-4c3b-addf-feb986faa66f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f703a598-545c-4c3b-addf-feb986faa66f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f703a598-545c-4c3b-addf-feb986faa66f) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
import os

# Define the copyright notice
COPYRIGHT_NOTICE = '''\
/*
 * Copyright (c) 2024 Your Name or Your Company
 * All rights reserved.
 */
'''

# Define the file extensions to process
FILE_EXTENSIONS = ['.py', '.js', '.java', '.cpp', '.h']  # Add more as needed

def add_copyright_notice(file_path):
    with open(file_path, 'r+') as file:
        content = file.read()
        if COPYRIGHT_NOTICE not in content:
            file.seek(0, 0)
            file.write(COPYRIGHT_NOTICE + '\n' + content)

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in FILE_EXTENSIONS):
                add_copyright_notice(os.path.join(root, file))

if __name__ == "__main__":
    directory_to_process = 'path/to/your/repo'  # Replace with the path to your repository
    process_directory(directory_to_process)