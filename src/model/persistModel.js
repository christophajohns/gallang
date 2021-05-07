import { DatabaseModel, AuthenticationModel } from "./firebase";

function persistModel(model) {
    let loadingFromFirebase = false;
    const currentUser = AuthenticationModel.currentUser;
    var uid = "";
    var currentUserName = "";
    if (currentUser != null) {
        uid = currentUser.uid; 
        currentUserName = currentUser.displayName;
    } else {
        uid = "logout";
        currentUserName = "";
    }
    const userRef = DatabaseModel.ref("gallang/"+uid);
    const galleriesRef = userRef.child("galleries");
    const likedImagesRef = userRef.child("likedImageIDs");
    const recentlyViewedImagesRef = userRef.child("recentlyViewedImages");

    model.addObserver(function(){
        if (loadingFromFirebase===true) return;
        else {
            userRef.set({
                currentUser: currentUserName,
                galleries: model.galleries,
                likedImageIDs: model.likedImageIDs,
                recentlyViewedImages: model.recentlyViewedImages,
            });
        }
    });
    console.log(currentUserName);
    galleriesRef.on("value", snapshot => {
        loadingFromFirebase = true;
        const data = snapshot.val();
        if(data) {
            model.setGalleries(data);
        }
    });

    likedImagesRef.on("value", snapshot => {
        loadingFromFirebase = true;
        const data = snapshot.val();
        if (data) {
            model.setLikedImageIDs(data);
        }
        loadingFromFirebase = false;
    })

    recentlyViewedImagesRef.on("value", snapshot => {
        loadingFromFirebase = true;
        const data = snapshot.val();
        if (data) {
            model.setRecentlyViewedImages(data);
        }
        loadingFromFirebase = false;
    })

}

export default persistModel;