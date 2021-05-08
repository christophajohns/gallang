import { DatabaseService } from "./firebase";

/**
 * Connects firebase and the GallangModel properties galleries, likedImageIDs and recentlyViewedImages
 * @param {GallangModel} model - The model keeping the application state
 */
function persistModel(model) {
    let loadingFromFirebase = false; // Flag to show whether we are currently fetching data

    // References via path to the firebase Realtime Database records
    let lastUserID = model.currentUser.uid;
    let userPath = `gallang/${model.currentUser.uid}`;
    let userRef = DatabaseService.ref(userPath);
    let galleriesRef = userRef.child("galleries");
    let likedImagesRef = userRef.child("likedImageIDs");
    let recentlyViewedImagesRef = userRef.child("recentlyViewedImages");

    // Update firebase whenever changes in the local model occur
    model.addObserver(() => {
        if (loadingFromFirebase === true) return;

        if (lastUserID !== model.currentUser.uid) {
            lastUserID = model.currentUser.uid;
            userPath = `gallang/${model.currentUser.uid}`;
            userRef = DatabaseService.ref(userPath);
            galleriesRef = userRef.child("galleries");
            likedImagesRef = userRef.child("likedImageIDs");
            recentlyViewedImagesRef = userRef.child("recentlyViewedImages");
        }

        // Update values on firebase
        userRef.set({
            currentUser: model.currentUser.displayName,
            galleries: model.galleries,
            likedImageIDs: model.likedImageIDs,
            recentlyViewedImages: model.recentlyViewedImages,
        });
    });

    // Update galleries property in model when firebase value changes
    galleriesRef.on("value", (snapshot) => {
        loadingFromFirebase = true;

        const galleriesFromFirebase = snapshot.val();

        const galleriesWereUpdated =
            JSON.stringify(model.galleries) !==
            JSON.stringify(galleriesFromFirebase);

        if (galleriesFromFirebase && galleriesWereUpdated) {
            const formattedGalleries = galleriesFromFirebase.map(
                (currentGallery) => ({
                    imageIDs: [], // gallery might not have imageIDs, property would be missing
                    ...currentGallery,
                })
            );
            model.galleries = formattedGalleries; // will notify observers
        }

        loadingFromFirebase = false;
    });

    // Update likedImageIDs property in model when firebase value changes
    likedImagesRef.on("value", (snapshot) => {
        loadingFromFirebase = true;

        const likedImageIDsFromFirebase = snapshot.val();

        const likedImageIDsWereUpdated =
            JSON.stringify(model.likedImageIDs) !==
            JSON.stringify(likedImageIDsFromFirebase);

        if (likedImageIDsFromFirebase && likedImageIDsWereUpdated) {
            model.likedImageIDs = likedImageIDsFromFirebase;
        }

        loadingFromFirebase = false;
    });

    // Update recentlyViewedImages property in model when firebase value changes
    recentlyViewedImagesRef.on("value", (snapshot) => {
        loadingFromFirebase = true;

        const recentlyViewedImagesFromFirebase = snapshot.val();

        const recentlyViewedImagesWereUpdated =
            JSON.stringify(model.recentlyViewedImages) !==
            JSON.stringify(recentlyViewedImagesFromFirebase);

        if (
            recentlyViewedImagesFromFirebase &&
            recentlyViewedImagesWereUpdated
        ) {
            model.recentlyViewedImages = recentlyViewedImagesFromFirebase;
        }

        loadingFromFirebase = false;
    });
}

export default persistModel;
