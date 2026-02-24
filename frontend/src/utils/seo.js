export const setSEO = ({ title, description }) => {
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');

  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }

  metaDesc.content = description;
};
