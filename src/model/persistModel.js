import { DatabaseModel } from "./firebase";

/**
 * Connects firebase and the GallangModel properties galleries, likedImageIDs and recentlyViewedImages
 * @param {GallangModel} model - The model keeping the application state
 */
function persistModel(model) {
    let loadingFromFirebase = false; // Flag to show whether we are currently fetching data

    // References via path to the firebase Realtime Database records
    const userPath = `gallang/${model.currentUserID}`;
    const userRef = DatabaseModel.ref(userPath);
    const galleriesRef = userRef.child("galleries");
    const likedImagesRef = userRef.child("likedImageIDs");
    const recentlyViewedImagesRef = userRef.child("recentlyViewedImages");

    // Update firebase whenever changes in the local model occur
    model.addObserver(() => {
        if (loadingFromFirebase === true) return;

        // Update values on firebase
        userRef.set({
            currentUser: model.currentUserName,
            galleries: model.galleries,
            likedImageIDs: model.likedImageIDs,
            recentlyViewedImages: model.recentlyViewedImages,
        });
    });

    // Update galleries property in model when firebase value changes
    galleriesRef.on("value", (snapshot) => {
        loadingFromFirebase = true;

        const galleriesFromFirebase = snapshot.val();
        if (galleriesFromFirebase) {
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
        if (likedImageIDsFromFirebase) {
            model.likedImageIDs = likedImageIDsFromFirebase;
        }

        loadingFromFirebase = false;
    });

    // Update recentlyViewedImages property in model when firebase value changes
    recentlyViewedImagesRef.on("value", (snapshot) => {
        loadingFromFirebase = true;

        const recentlyViewedImagesFromFirebase = snapshot.val();
        if (recentlyViewedImagesFromFirebase) {
            model.recentlyViewedImages = recentlyViewedImagesFromFirebase;
        }

        loadingFromFirebase = false;
    });
}

export default persistModel;
