# Overview

ebird-photo-gallery is a website to display and organize photos uploaded to ebird.org.

## Setup

#### Windows

- Install node: https://nodejs.org/en/download/.
- Get the project from git: `git clone https://github.com/tealefristoe/ebird-photo-gallery`
- Install npm in the project directory: `npm install next`

## Running Locally

#### Windows
- Open a PowerShell window in the ebird-photo-gallery directory.
- `npm run dev`

## Adding a New User

- Get life and photo lists from user. Ask the user to follow these directions, then send you the spreadsheets they downloaded:

  #### Life List
  1. Go to https://ebird.org/MyEBird?cmd=list&r=world
  2. Log into ebird (if you aren't already logged in)
  3. Choose SORT BY: Taxonomic (right side just above your life list)
  4. Click Download (csv) (top right of the page)
  5. Save the file. It should be called something like ebird_world_life_list.csv

  #### Photo List
  1. Go to ebird.org
  2. Log into ebird if you aren't already logged in
  3. Click "NUMBER Species with photos" on the left
  4. Click on Recently Uploaded on the right and change to Best Quality (this changes how the photos are sorted and is important for the photo gallery to work properly)
  5. Click Save Spreadsheet just below Best Quality
  6. Save the file. It should be called something like ML_DATE_Photo_NAME.csv

- Create a new directory in the `ebird-photo-gallery/data` directory.
- Name the new directory after the user.
- Add the user's life list (renamed to `life_list.csv`) and photo list (renamed to `photo_list.csv`) to their directory.
- Visit `http://localhost:3000/api/processLists?user=USER`, where `USER` is the the name of the new directory you created. (Replace spaces with '+'.)
- Check to make sure everything worked out by visiting `http://localhost:3000/?user=USER`.
- If everything looks ok, commit your changes to git. The user's new page can be found at `https://ebird-photo-gallery.vercel.app/?user=USER`!

## Updating a User's List

Follow the instructions for creating a new user, but just replace the user's old `life_list.csv` and `photo_list.csv`.

## Updating All Lists

If you made a change that requires updating all user's lists, visit `http://localhost:3000/api/processLists?user=all`.
