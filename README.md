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

### Results

In its current iteration, Gallang offers users the option to browse through and search for images from a reputable source, the [Cooper Hewitt (Smithsonian Art Museum)](https://collection.cooperhewitt.org/api/).
The user can like and save those images into collections (called "Galleries").
Based on the individual usage behavior (i.e. the user's likes), Gallang computes and displays recommendations for similar artists, institutions, media or types that the user might also be interested in.
When users want to continue their work in other design tools like Figma, they can download the images to their local machine for further use.
This way, Gallang offers users a way to be inspired and to collect high-quality mood boarding assets for their design projects.

> Note: Due to CORS restrictions, we can not download each image directly to the user's local machine. Instead, we open the original image URL in a new tab where the user can save the file from its original source.

## Features

We have implemented the following features:

-   User authentication using Firebase (sign up, login, forgot password, edit user profile, delete user)
-   Persisted application state using Firebase
-   Home/browse page to view "featured" collections (i.e. images of objects from certain periods using the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/)) and recommended images (only displayed if a user has liked at least three images)
-   Search functionality using the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/)
-   Options to create, view and delete galleries (collections of images)
-   Basic recommendation engine to return suggested images with similar medium, type, or participants from the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/) based on a user's liked images
-   Liked content page to view and download your liked images
-   Profile page to view and edits one's user data and profile
-   Drag-and-Drop images to add them to a gallery

## Project File Structure

```
.
├── .vscode                 # Visual Studio Code settings for consistent formatting
├── public                  # Publicly accessible static files (e.g. favicons)
├── src                     # Source files
  ├── components              # Reused components (small views from an architecture perspective)
    ├── AccountSetting          # Row to view and update one individual user property
      ├── AccountSetting.js       # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── AddGalleryModal         # Modal to add a gallery
      ├── AccountSetting.js       # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── CollectionCarousel      # Component to render a carousel of "featured" collections
      ├── AccountSetting.js       # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── HorizontalGrid          # Horizontal (scrollable) grid of images to showcase objects in a collection or gallery
      ├── HorizontalGrid.js       # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── IconButton              # Button that only displays an icon
      ├── Image.js                # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── Image                   # Single object (image) showcase including like and download buttons
      ├── AddImageToGalleryModal.js  # Modal to add an image to a gallery
      ├── Image.js                # Component file
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── Sidebar                 # Single object (image) showcase including like and download buttons
      ├── AddGalleryButton.js     # Button to add a gallery
      ├── GalleryButton.js        # Button linking to the specified gallery
      ├── LikedContentButton.js   # Button linking to the user's liked content
      ├── Sidebar.js              # Component file
      ├── SidebarButton.js        # Button in the collapsed sidebar
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
    ├── firebase.js             # Setup of the firebase connections for persistence and authentication
    ├── persistModel.js         # Connects firebase and the GallangModel properties galleries, likedImageIDs and recentlyViewedImages
    └── index.js                # Imports and export of GallangModel and CooperHewittSource
  ├── presenters              # Framework- (React-)specific code to display views based on the application state, fetch data and handle interactions
    ├── AccountSettingPresenter.js  # Presenter for the account setting component
    ├── CollectionCarouselPresenter.js  # Presenter for the collection carousel
    ├── CollectionPresenter.js  # Presenter for the collection page content
    ├── DetailsPresenter.js     # Placeholder presenter to test routing for the details view
    ├── ForgotPasswordPresenter.js  # Presenter for the forgot password view
    ├── GalleryPresenter.js     # Presenter for the gallery page content
    ├── HomePresenter.js        # Presenter for the Home/Browse view
    ├── HorizontalGridPresenter.js  # Presenter for the HorizontalGrid component
    ├── ImagePresenter.js       # Presenter for the Image component
    ├── LikedContentPresenter.js  # Presenter for the liked content page content
    ├── LoggedInAreaPresenter.js  # Presenter for all app content a user has to be logged in to access
    ├── LoginPresenter.js       # Presenter for the login view
    ├── PeriodPresenter.js      # Presenter for a grid of a period's objects
    ├── PrivateRoute.js         # Presenter to only route to specified component if the user is currently logged in
    ├── ProfilePresenter.js     # Presenter for the profile page
    ├── RecommendationPresenter.js  # Presenter for a horizontal grid of recommended images
    ├── ResultsPresenter.js     # Presenter for the Results view
    ├── SearchResultsPresenter.js  # Presenter for the search results page content
    ├── SidebarPresenter.js     # Presenter for the Sidebar component
    ├── SignupPresenter.js      # Presenter for the signup view
    ├── TopNavPresenter.js      # Presenter for the TopNav component
    ├── customHooks.js          # Custom React hooks (e.g. to access model properties)
    └── index.js                # Imports and export of all presenters
  ├── types                   # Common type definitions in the JSDoc and PropTypes specifications
    ├── index.js                # Imports and export of type definitions
    ├── jsDocTypes.js           # Type definitions using the JSDoc specification
    └── propTypes.js            # Type definitions using the PropTypes specification
  ├── views                   # Static views to present the application data
    ├── DetailsView             # Details view to render the full page version of an image and its info
      ├── BackButton.js           # Button to return to the previous page
      ├── DetailsView.js          # View file
      ├── DownloadButton.js       # Button to download an image
      ├── ImageButtons.js         # Component to like or download an image or view its information
      ├── ImageSection.js         # Section of the page displaying the large image
      ├── InfoButton.js           # Button to scroll down and view an image's information details
      ├── InfoSection.js          # Section of the page displaying the information details about the image (object)
      ├── LikeButton.js           # Button to like an image
      ├── ScrollToTopButton.js    # Button to scroll up to the image
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── HomeView                # View component for the Home/Browse page content
      ├── Quote                   # Component to render a quote
        ├── Quote.js                # Component file
        ├── index.js                # Import and export of component
        └── style.js                # Styling of the component using styled-components
      ├── HomeView.js             # View file
      └── index.js                # Import and export of component
    ├── ProfileView             # Profile view to update a user's account and view all galleries
        ├── AccountSettings.js    # Section to view and update account settings
        ├── Galleries.js          # Section to display the currently logged in user's galleries
        ├── LikedContent.js       # Section to display the currently logged in user's liked content
        ├── ProfileView.js        # View file
        ├── User.js               # Component to display summary information about the currently logged in user
        ├── index.js              # Import and export of component
        └── style.js              # Styling of the component using styled-components
    ├── ResultsView             # View component for the Results (e.g. search results, collection, liked content, gallery) page content
      ├── DownloadAllButton.js    # Button saying "Download all"
      ├── LoadMoreButton.js       # Button saying "Load more"
      ├── ResultsView.js          # View file
      ├── ScrollToTopButton.js    # Button to scroll up to the top of the page
      ├── index.js                # Import and export of component
      └── style.js                # Styling of the component using styled-components
    ├── auth                    # Views for the authentication flow
      ├── ForgotPasswordView      # View component for the forgot password page
        ├── ForgotPasswordView.js   # View file
        └── index.js                # Import and export of component
      ├── LoginView               # View component for the login page
        ├── LoginView.js            # View file
        ├── index.js                # Import and export of component
        └── style.js                # Styling of the component using styled-components
      ├── SignupView              # View component for the signup page
        ├── ConfirmPasswordInput.js # Component to render a the confirm password text input field
        ├── SignupView.js           # View file
        ├── index.js                # Import and export of component
        └── style.js                # Styling of the component using styled-components
      ├── AuthInputField.js       # Component to render a text input field for the authentication pages
      ├── EmailInput.js           # Component to render a text input field for the email
      ├── PasswordInput.js        # Component to render a text input field for the password
      ├── UsernameInput.js        # Component to render a text input field for the username
      ├── index.js                # Imports and exports of the authentication views
      └── style.js                # Common styling for the authentication views
    └── index.js                # Imports and export of all views
  ├── App.css                 # Common styling for the entire application
  ├── App.js                  # Application definition (incl. routing)
  ├── App.test.js             # (Unused) Common test suite provided by create-react-app
  ├── index.css               # Common styling for entire web page
  ├── index.js                # Model initialization and call to render application
  ├── reportWebVitals.js      # (Unused) Performance measuring provided by create-react-app
  ├── setupTests.js           # (Unused) Test setup using jest provided by create-react-app
  └── utils.js                # Utility functions
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
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) to view Gallang in the browser.
