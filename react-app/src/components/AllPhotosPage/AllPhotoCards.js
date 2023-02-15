import { NavLink } from "react-router-dom";

const AllPhotoCards = ({ photo }) => {
  let { id, city, state, country, img_url } = photo;

  if (img_url && img_url === "No images uploaded yet")
    img_url =
      "https://img.freepik.com/premium-vector/modern-minimal-found-error-icon-oops-page-found-404-error-page-found-with-concept_599740-716.jpg?w=2000";

  return (
    <NavLink to={`/photos/${id}`}>
      <div className="Image-holder">
        <img src={img_url} className="Single-Image" />
      </div>
      <div>{city}</div>
      <div>{state}</div>
      <div>{country}</div>
    </NavLink>
  );
};

export default AllPhotoCards;
