
/**
 * Profile view to update a user's account and view all galleries
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.requestCreateGallery - Function that created the gallery
 * */

function CreateGalleryView(props) {
    const {
        requestCreateGallery,
    } = props;

    return (
        <div>
          <h1>create a new gallery</h1>
          <input type="text"></input>
          <button>save</button>
        </div>
        
    );
}

export default CreateGalleryView;