import { CenterContentDiv } from ".style.js";
/**
 * View for naming and creating a new gallery
 * @param {Object} props - Properties passed to the view
 * @param {Function} props.requestCreateGallery - Function that created the gallery
 * */

function CreateGalleryView(props) {
    const {
        requestCreateGallery,
    } = props;

    return (
        <CenterContentDiv className="">
                    <div>
          <h1>create a new gallery</h1>
          <input type="text"></input>
          <button>save</button>
        </div>
        
        </CenterContentDiv>
    );
}

export default CreateGalleryView;