# Frontend Developer Take-Home Test

Thank you for considering me for the Frontend Developer position. This project is a fully-functional frontend application built using ReactJs/NextJs, fulfilling the requirements specified in the assessment.

## Project Overview

The project consists of two pages:

### Bitcoin (BTC) Price Index page

This page displays the current BTC price index, as provided by the Rest API: [Rest API URL](https://api.coindesk.com/v1/bpi/currentprice.json)

- The page includes price details of USD, GBP, and EUR currencies, refreshed every 5 seconds.
- Users can choose between different data refresh intervals.
- Users can toggle the display of specific currencies.
- User preferences for the features are stored and remembered.

### NFT List page

This page lists the NFTs owned by a connected user's wallet.

- NFT basic details are displayed, including name, description, token ID, image, and smart contract address.
- If available, NFT metadata is also displayed.

## Technologies Used

- NextJs
- Tailwind consist
- Headlessui
- Web3
- Alchemy-sdk

## Setup Instructions

To run this application on your local machine, follow these steps:

1.  Clone the repository:

        git clone https://github.com/mshahzaib101/Insomnia-assignment.git

2.  Install the dependencies:

        yarn

3.  Create an environment file:

        ALCHEMY_API_KEY=your_alchemy_api_key

4.  Start the development server:

        yarn dev

The application will be accessible at `http://localhost:3000`.

## Deployment

The application is deployed to Vercel. You can access it using the following link: [https://insomnia-assignment.vercel.app/]

Thank you for reviewing my submission. If you have any questions or need further clarification, please don't hesitate to reach out.
