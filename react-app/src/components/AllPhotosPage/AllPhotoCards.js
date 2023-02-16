import { NavLink } from "react-router-dom";

const AllPhotoCards = ({ photo }) => {
  let { id, city, state, country, img_url } = photo;

  if (img_url && img_url === "No images uploaded yet")
    img_url =
      "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=2000";

  return (
    <NavLink to={`/photos/${id}`}>
      <div className="card-holder" style={ {backgroundImage:`url(${img_url})`} }>
        <div className="content-holder">
          <div className="allPhotosCity">{city}</div>
          <div className="allPhotosState">{state}</div>
          <div className="allPhotosCountry">{country}</div>
        </div>
      </div>

    </NavLink>
  );
};

// style={{
//   backgroundImage: {`url(${img_url})`}
//   }}

export default AllPhotoCards;
