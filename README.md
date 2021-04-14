# Gallang

> Collect and download high-quality assets for your mood boarding needs.

This project is part of the KTH Royal Institute of Technology course "DH2642: Interaction Programming and the Dynamic Web".

It was created by Christoph A. Johns, Yuqi Liu, Annetta Sillard, and Xiaoying Sun.

The application is publicly available on Heroku at <https://gallang.herokuapp.com>.

## Quick Overview

### Motivation

Designers often create mood-boards, for example using Pinterest or Miro, to explore the design space.
The images provided by these resources are often inconsistent in quality and the recommendation engines hinder, to some degree, truly imaginative and free inspiration.
A digital mood-board bringing together several different sources of high-quality media, for example, stock photography, art galleries, fonts, etc. could lead to more effective exploration of the design space.

### Expected Results

Users will be able to search for images from different online sources, like [Unsplash](https://unsplash.com/developers) for photography, or artworks from [Cooper Hewitt (Smithsonian Art Museum)](https://collection.cooperhewitt.org/api/) and save them into collections (called "Galleries").
If possible, we can add fonts from [Google Fonts](https://fonts.google.com) alongside the images, as well as data from other sources.
If possible, other users should be able to see other users' galleries and add images from these galleries to their own.

## Status Quo

So far, we have implemented the following:

-   Basic home/browse page layout with a mix of mock data and calls to the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/)
-   Search functionality using the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/)
-   Basic routing/navigation using [React Router](https://reactrouter.com/web/guides/quick-start)
-   Non-persisted liking of images
-   A basic recommendation engine to return suggested images with similar medium, type, or participants from the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/) based on a user's liked images
-   A liked content page to view and download (one at a time) your liked images (currently only accessible via direct entry)

## Next Steps

Until the final submission, we aim to add the following features:

-   User authentication using Firebase
-   Persisted application state using Firebase
-   Options to create, edit and delete galleries (collections of images)
-   Additional data source (e.g. [Unsplash](https://unsplash.com/developers) for photography)
-   Infinite scrolling on search and home page to encourage browsing
-   Displaying recommended images based on a user's liked images
-   Possibly showing other users' galleries
-   Download zip file containing all images in a gallery (might be problematic due to cross-origin restrictions of the APIs involved)

## Project File Structure

```
.
├── .vscode                 # Visual Studio Code settings for consistent formatting
├── public                  # Publicly accessible static files (e.g. favicons)
├── src                     # Source files
  ├── components              # Reused components (small views from an architecture perspective)
    ├── HorizontalGrid          # Horizontal (scrollable) grid of images to showcase objects in a collection or gallery
      ├── HorizontalGrid.js       # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── Image                   # Single object (image) showcase including like and download buttons
      ├── Image.js                # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── TopNav                  # Navigation bar for the whole application
      ├── TopNav.js               # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── VerticalGrid            # Vertical (scrollable) grid of images to showcase objects in a the results view
      ├── VerticalGrid.js         # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── index.js                # Imports and export of all components
    └── promiseNoData.js        # Returns loading spinner when promise is pending or false when it is resolved
  ├── model                   # Code related to data, application state and API communication
    ├── CooperHewittSource.js   # Object to interact with the Cooper Hewitt API
    ├── GallangModel.js         # Class for keeping application state
    ├── MockData.js             # Example data to avoid requests to the Cooper Hewitt API during development
    └── index.js                # Imports and export of GallangModel and CooperHewittSource
  ├── presenters              # Framework- (React-)specific code to display views based on the application state, fetch data and handle interactions
    ├── CollectionPresenter.js  # Presenter for the collection page content
    ├── DetailsPresenter.js     # Placeholder presenter to test routing for the details view
    ├── GalleryPresenter.js     # Presenter for the gallery page content
    ├── HomePresenter.js        # Presenter for the Home/Browse view
    ├── HorizontalGridPresenter.js  # Presenter for the HorizontalGrid component
    ├── ImagePresenter.js       # Presenter for the Image component
    ├── LikedContentPresenter.js  # Presenter for the liked content page content
    ├── ResultsPresenter.js     # Presenter for the Results view
    ├── SearchResultsPresenter.js  # Presenter for the search results page content
    ├── TopNavPresenter.js      # Presenter for the TopNav component
    ├── customHooks.js          # Custom React hooks (e.g. to access model properties)
    └── index.js                # Imports and export of all presenters
  ├── types                   # Common type definitions in the JSDoc and PropTypes specifications
    ├── index.js                # Imports and export of type definitions
    ├── jsDocTypes.js           # Type definitions using the JSDoc specification
    └── propTypes.js            # Type definitions using the PropTypes specification
  ├── views                   # Static views to present the application data
    ├── HomeView                # View component for the Home/Browse page content
      ├── CollectionCarousel      # Component to render a carousel of "featured" collections
        ├── CollectionCarousel.js   # Component file
        ├── index.js                # Import and export of component
        └── style.js                # Styling of the component using styled-components
      ├── Quote                   # Component to render a quote
        ├── Quote.js                # Component file
        ├── index.js                # Import and export of component
        └── style.js                # Styling of the component using styled-components
      ├── HomeView.js             # View file
      └── index.js                # Import and export of component
    ├── ResultsView             # View component for the Results (e.g. search results, collection, liked content, gallery) page content
      ├── ResultsView.js          # View file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── DetailsView.js          # Placeholder details view to test routing (would be used to render the full page version of an image and its info)
    └── index.js                # Imports and export of all views
  ├── App.css                 # Common styling for the entire application
  ├── App.js                  # Application definition (incl. routing)
  ├── App.test.js             # (Unused) Common test suite provided by create-react-app
  ├── index.css               # Common styling for entire web page
  ├── index.js                # Model initialization and call to render application
  ├── reportWebVitals.js      # (Unused) Performance measuring provided by create-react-app
  └── setupTests.js           # (Unused) Test setup using jest provided by create-react-app
├── env.example             # Example file for the .env containing environment variables (e.g. access tokens)
├── .gitignore              # Files to be ignored by git
├── README.md               # Project documentation
├── package-lock.json       # Locked version of package.json
└── package.json            # Application manifest (e.g. dependencies)
```

## Development

This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

Before you start, make sure you have locally created .env with the API KEY and ACCESS TOKEN for the Cooper Hewitt API.
See [.env.example](https://gits-15.sys.kth.se/cajohns/gallang/blob/master/.env.example) for file template.

After cloning the project to your local machine, you can run:

```
cd gallang
npm start
```

Then open [http://localhost:3000](http://localhost:3000) to view Gallang in the browser.
