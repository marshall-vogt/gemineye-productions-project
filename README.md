# Gemineye Productions Project

A full-stack React web application for event-goers to purchase tickets to events.

## Why I Built This

As a supporter of independent arts, I wanted to create an app for event-goers to purchase tickets to events to support local artists and DJs.

## Technologies Used

- React.js
- TypeScript
- Node.js
- Express
- PostgreSQL
- HTML5
- CSS3
- Tailwind
- AWS Elastic Beanstalk

## Live Demo

Try the application live at [http://gemineye-productions-project-dev.us-west-2.elasticbeanstalk.com/](http://gemineye-productions-project-dev.us-west-2.elasticbeanstalk.com/)

## Features

- Users can view a list of upcoming events.
- Users can create and login to an account.
- Users can view event details and purchase tickets to events.
- Users can play audio while visiting webpage.

## Preview

![Ticket Purchase Demo](/md.assets/TicketPurchase.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 14 or higher

### Getting Started

1. Clone the repository.

   ```shell
   git clone https://github.com/marshall-vogt/gemineye-productions-project
   cd gemineye-productions-project
   ```

   or

   ```shell
   Clone repo into `vs-code`

   1. From repo on GitHub, click the green `<> Code` button, then copy **SSH** URL
   2. Open `vs-code`, click on blue `><` button in bottom left of `vs-code`
   3. Select `Clone Repository in Container Volume...`
   4. Paste **SSH** URL for your repo, click `Clone git repository from URL`
   ```

2. Install all dependencies with NPM.

   ```shell
   npm install
   ```

#### Start the database

3. Start PostgreSQL
   ```sh
   sudo service postgresql start
   ```

#### Start the development servers

4. Start the project. Once started you can view the application by opening http://localhost:5173 in your browser.

   ```shell
   npm run dev
   ```

**Happy coding!!!!**
